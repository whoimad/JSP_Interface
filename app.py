import json
import random
import time
import copy
from flask import Flask, render_template, request, jsonify
from ortools.sat.python import cp_model

app = Flask(__name__)

# ==========================================
# 1. EXACT SOLVER (Constraint Programming)
# ==========================================
def solve_exact_cp(jobs_data, time_limit=15): # Increased time limit for 20x20
    start_time = time.time()
    model = cp_model.CpModel()

    num_jobs = len(jobs_data)
    if num_jobs == 0: return {"error": "No jobs provided"}
    
    num_machines = 0
    for job in jobs_data:
        for task in job:
            num_machines = max(num_machines, task[0] + 1)
    
    horizon = sum(task[1] for job in jobs_data for task in job)

    named_tasks = {} 
    machine_to_intervals = {m: [] for m in range(num_machines)}

    for job_id, job in enumerate(jobs_data):
        last_end_time = None
        for task_id, task in enumerate(job):
            machine = task[0]
            duration = task[1]
            suffix = f'_{job_id}_{task_id}'
            
            start_var = model.NewIntVar(0, horizon, 'start' + suffix)
            end_var = model.NewIntVar(0, horizon, 'end' + suffix)
            interval_var = model.NewIntervalVar(start_var, duration, end_var, 'interval' + suffix)
            
            named_tasks[(job_id, task_id)] = (start_var, end_var, machine, duration)
            machine_to_intervals[machine].append(interval_var)

            if last_end_time is not None:
                model.Add(start_var >= last_end_time)
            last_end_time = end_var

    for machine in range(num_machines):
        model.AddNoOverlap(machine_to_intervals[machine])

    makespan = model.NewIntVar(0, horizon, 'makespan')
    for job_id in range(num_jobs):
        if jobs_data[job_id]:
            last_task_idx = len(jobs_data[job_id]) - 1
            model.Add(makespan >= named_tasks[(job_id, last_task_idx)][1])
        
    model.Minimize(makespan)

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = time_limit
    status = solver.Solve(model)
    
    end_time = time.time()
    cpu_time = end_time - start_time

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        schedule = []
        for job_id, job in enumerate(jobs_data):
            for task_id, task in enumerate(job):
                start_val = solver.Value(named_tasks[(job_id, task_id)][0])
                end_val = solver.Value(named_tasks[(job_id, task_id)][1])
                machine = task[0]
                schedule.append({
                    "Job": f"Job {job_id+1}",
                    "Task": f"Op {task_id+1}",
                    "Machine": f"Machine {machine}",
                    "Start": start_val,
                    "Finish": end_val,
                    "Duration": task[1]
                })
        status_text = "Optimal" if status == cp_model.OPTIMAL else "Feasible"
        return {
            "algorithm": "Exact (CP-SAT)",
            "status": status_text,
            "makespan": solver.Value(makespan),
            "cpu_time": round(cpu_time, 4),
            "schedule": schedule
        }
    else:
        return {"error": "No solution found within time limit.", "cpu_time": round(cpu_time, 4)}

# ==========================================
# 2. METAHEURISTIC (Genetic Algorithm - OPTIMIZED)
# ==========================================
class JSP_GeneticAlgorithm:
    def __init__(self, jobs_data, population_size, generations, mutation_rate=0.1, patience=30):
        self.jobs_data = jobs_data
        self.num_jobs = len(jobs_data)
        self.pop_size = population_size
        self.generations = generations
        self.mutation_rate = mutation_rate
        self.patience = patience
        
        self.num_machines = 0
        self.job_lens = []
        self.total_ops = 0
        for job in jobs_data:
            self.job_lens.append(len(job))
            self.total_ops += len(job)
            for task in job:
                self.num_machines = max(self.num_machines, task[0] + 1)
        
        self.base_chromosome = []
        for j_idx in range(self.num_jobs):
            self.base_chromosome.extend([j_idx] * self.job_lens[j_idx])

    def decode(self, chromosome):
        # Optimization: Use Lists instead of Dicts for O(1) integer indexing
        # This significantly speeds up large 20x20 loops
        machine_avail = [0] * self.num_machines
        job_avail = [0] * self.num_jobs
        job_step_counter = [0] * self.num_jobs
        
        schedule = []
        _jobs_data = self.jobs_data # Local var for speed
        
        for job_id in chromosome:
            step_idx = job_step_counter[job_id]
            machine, duration = _jobs_data[job_id][step_idx]
            
            # Start time calculation
            start = machine_avail[machine]
            if job_avail[job_id] > start:
                start = job_avail[job_id]
            
            end = start + duration
            
            machine_avail[machine] = end
            job_avail[job_id] = end
            job_step_counter[job_id] += 1
            
            schedule.append({
                "Job": f"Job {job_id+1}",
                "Task": f"Op {step_idx+1}",
                "Machine": f"Machine {machine}",
                "Start": start,
                "Finish": end,
                "Duration": duration
            })
            
        return max(machine_avail), schedule

    def initial_population(self):
        pop = []
        for _ in range(self.pop_size):
            chrom = self.base_chromosome[:]
            random.shuffle(chrom)
            pop.append(chrom)
        return pop

    def crossover_pox(self, p1, p2):
        if self.num_jobs < 2: return p1[:], p2[:]
        
        k = random.randint(1, self.num_jobs - 1)
        job_set = set(random.sample(range(self.num_jobs), k))
        
        len_chrom = len(p1)
        o1 = [-1] * len_chrom
        o2 = [-1] * len_chrom
        
        for i in range(len_chrom):
            if p1[i] in job_set: o1[i] = p1[i]
        for i in range(len_chrom):
            if p2[i] in job_set: o2[i] = p2[i]
            
        p2_idx = 0
        for i in range(len_chrom):
            if o1[i] == -1:
                while p2[p2_idx] in job_set:
                    p2_idx += 1
                o1[i] = p2[p2_idx]
                p2_idx += 1
        
        p1_idx = 0
        for i in range(len_chrom):
            if o2[i] == -1:
                while p1[p1_idx] in job_set:
                    p1_idx += 1
                o2[i] = p1[p1_idx]
                p1_idx += 1
                
        return o1, o2

    def mutate(self, chromosome):
        if random.random() < self.mutation_rate:
            idx1, idx2 = random.sample(range(len(chromosome)), 2)
            chromosome[idx1], chromosome[idx2] = chromosome[idx2], chromosome[idx1]
        return chromosome

    def tournament_selection(self, population_with_fitness, k=3):
        # Optimized tournament
        best_chrom = None
        best_mk = float('inf')
        
        for _ in range(k):
            candidate = random.choice(population_with_fitness)
            if candidate[0] < best_mk:
                best_mk = candidate[0]
                best_chrom = candidate[1]
        return best_chrom

    def run(self):
        population = self.initial_population()
        best_overall_makespan = float('inf')
        best_overall_schedule = []
        no_improvement_counter = 0

        for gen in range(self.generations):
            scored_pop = []
            current_gen_best = float('inf')
            
            for chrom in population:
                mk, sched = self.decode(chrom)
                scored_pop.append((mk, chrom))
                
                if mk < best_overall_makespan:
                    best_overall_makespan = mk
                    best_overall_schedule = sched
                    no_improvement_counter = 0 
                
                if mk < current_gen_best:
                    current_gen_best = mk

            if current_gen_best >= best_overall_makespan:
                no_improvement_counter += 1
            
            if no_improvement_counter >= self.patience:
                break

            # Selection (Elitism + Breeding)
            scored_pop.sort(key=lambda x: x[0])
            elite_count = max(2, int(self.pop_size * 0.1))
            new_pop = [x[1] for x in scored_pop[:elite_count]]
            
            while len(new_pop) < self.pop_size:
                p1 = self.tournament_selection(scored_pop, k=3)
                p2 = self.tournament_selection(scored_pop, k=3)
                
                if random.random() < 0.85: # Slightly higher crossover for large problems
                    o1, o2 = self.crossover_pox(p1, p2)
                else:
                    o1, o2 = p1[:], p2[:]
                
                new_pop.append(self.mutate(o1))
                if len(new_pop) < self.pop_size:
                    new_pop.append(self.mutate(o2))
            
            population = new_pop

        return best_overall_makespan, best_overall_schedule

def solve_ga(jobs_data):
    random.seed(42)
    start_time = time.time()
    
    total_ops = sum(len(j) for j in jobs_data)
    
    # Tuned parameters for different sizes
    if total_ops < 20: 
        pop, gens, patience = 50, 50, 10
    elif total_ops < 100:
        pop, gens, patience = 100, 300, 40
    else: 
        # Large scale (20x20 = 400 ops)
        # We need efficiency here. High population to explore, 
        # lower generations relying on convergence.
        pop, gens, patience = 150, 400, 50

    ga = JSP_GeneticAlgorithm(jobs_data, pop, gens, patience=patience)
    makespan, schedule = ga.run()
    
    end_time = time.time()
    
    return {
        "algorithm": "Metaheuristic (GA)",
        "status": "Heuristic Best",
        "makespan": makespan,
        "cpu_time": round(end_time - start_time, 4),
        "schedule": schedule
    }

# ==========================================
# ROUTES
# ==========================================
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    data = request.json
    algorithm = data.get('algorithm', 'exact')
    jobs_input = data.get('jobs', [])
    
    formatted_jobs = []
    try:
        for job_str in jobs_input:
            tasks = []
            if not job_str.strip(): continue
            operations = job_str.split()
            for op in operations:
                parts = op.split(',')
                if len(parts) != 2: raise ValueError
                m, d = int(parts[0]), int(parts[1])
                if d <= 0: raise ValueError
                tasks.append((m, d))
            formatted_jobs.append(tasks)
    except Exception:
        return jsonify({"error": "Invalid format. Use 'MachineID,Duration' pairs."})

    if algorithm == 'exact':
        result = solve_exact_cp(formatted_jobs)
    elif algorithm == 'meta':
        result = solve_ga(formatted_jobs)
    else:
        res_exact = solve_exact_cp(formatted_jobs)
        res_ga = solve_ga(formatted_jobs)
        result = {
            "comparison": True,
            "exact": res_exact,
            "meta": res_ga
        }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
