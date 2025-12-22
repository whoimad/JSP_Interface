// ==========================================
// PRESET DATA - Random scenarios + Benchmarks with BKS
// Source: https://github.com/Alexander-Nasuta/jsp-instance-utils
// Original data: http://jobshop.jjvh.nl/
// ==========================================
const PRESETS = {
    "3x3": [
        ["0,3 1,2 2,2", "0,2 2,1 1,4", "1,4 2,3 0,1"],
        ["1,2 0,3 2,4", "2,3 1,2 0,2", "0,1 2,4 1,3"],
        ["0,4 1,3 2,2", "1,2 2,2 0,3", "2,3 0,1 1,2"]
    ],
    "5x5": [
        ["0,2 1,3 2,4 3,2 4,1", "1,3 0,2 3,3 2,1 4,2", "2,2 3,4 1,2 4,3 0,1", "3,1 4,2 0,3 1,2 2,4", "4,3 2,1 1,3 0,2 3,2"],
        ["1,4 2,2 0,3 4,1 3,2", "0,2 3,3 4,2 1,2 2,3", "3,3 1,2 2,4 0,1 4,2", "2,1 4,3 3,2 1,4 0,2", "4,2 0,2 1,3 3,1 2,2"],
        ["0,3 2,2 4,1 1,3 3,2", "2,4 0,2 3,3 4,2 1,1", "1,2 3,3 0,2 2,1 4,3", "4,1 1,2 2,3 3,2 0,4", "3,2 4,1 1,2 0,3 2,2"]
    ],
    "10x10": [
        ["0,3 1,2 2,4 3,1 4,3 5,2 6,4 7,1 8,3 9,2", "1,4 0,2 3,3 2,2 5,1 4,4 7,2 6,3 9,1 8,2", "2,2 3,3 0,1 1,4 6,2 7,3 4,1 5,2 8,4 9,3", "3,3 2,1 1,2 0,3 7,4 6,1 5,2 4,3 9,2 8,1", "4,1 5,4 6,2 7,3 0,2 1,1 2,3 3,4 8,2 9,3", "5,2 4,3 7,1 6,2 1,4 0,3 3,2 2,1 9,4 8,3", "6,4 7,2 4,3 5,1 2,2 3,4 0,1 1,3 8,2 9,1", "7,3 6,1 5,4 4,2 3,3 2,2 1,1 0,4 9,3 8,2", "8,2 9,4 0,3 1,1 4,2 5,3 6,1 7,4 2,2 3,3", "9,1 8,3 1,2 0,4 5,3 4,2 7,1 6,3 3,4 2,1"]
    ],
    // Benchmark instances from jsp-instance-utils (Fisher & Thompson, Lawrence)
    "ft06": [
        ["2,1 0,3 1,6 3,7 5,3 4,6", "1,8 2,5 4,10 5,10 0,10 3,4", "2,5 3,4 5,8 0,9 1,1 4,7", "1,5 0,5 2,5 3,3 4,8 5,9", "2,9 1,3 4,5 5,4 0,3 3,1", "1,3 3,3 5,9 0,10 4,4 2,1"]
    ],
    "ft10": [
        ["0,29 1,78 2,9 3,36 4,49 5,11 6,62 7,56 8,44 9,21", "0,43 2,90 4,75 9,11 3,69 1,28 6,46 5,46 7,72 8,30", "1,91 0,85 3,39 2,74 8,90 5,10 7,12 6,89 9,45 4,33", "1,81 2,95 0,71 4,99 6,9 8,52 7,85 3,98 9,22 5,43", "2,14 0,6 1,22 5,61 3,26 4,69 8,21 7,49 9,72 6,53", "2,84 1,2 5,52 3,95 8,48 9,72 0,47 6,65 4,6 7,25", "1,46 0,37 3,61 2,13 6,32 5,21 9,32 8,89 7,30 4,55", "2,31 0,86 1,46 5,74 4,32 6,88 8,19 9,48 7,36 3,79", "0,76 1,69 3,76 5,51 2,85 9,11 6,40 7,89 4,26 8,74", "1,85 0,13 2,61 6,7 8,64 9,76 5,47 3,52 4,90 7,45"]
    ],
    "la01": [
        ["1,21 0,53 4,95 3,55 2,34", "0,21 3,52 4,16 2,26 1,71", "3,39 4,98 1,42 2,31 0,12", "1,77 0,55 4,79 2,66 3,77", "0,83 3,34 2,64 1,19 4,37", "1,54 2,43 4,79 0,92 3,62", "3,69 4,77 1,87 2,87 0,93", "2,38 0,60 1,41 3,24 4,83", "3,17 1,49 4,25 0,44 2,98", "4,77 3,79 2,43 1,75 0,96"]
    ],
    "la02": [
        ["0,20 3,87 1,31 4,76 2,17", "4,25 2,32 0,24 1,18 3,81", "1,72 2,23 4,28 0,58 3,99", "2,86 1,76 4,97 0,45 3,90", "4,27 0,42 3,48 2,17 1,46", "1,67 0,98 4,48 3,27 2,62", "4,28 1,12 3,19 0,80 2,50", "1,63 0,94 2,98 3,50 4,80", "4,14 0,75 2,50 1,41 3,55", "4,72 2,18 1,37 3,79 0,61"]
    ],
    "la05": [
        ["1,10 3,52 0,72 2,65 4,93", "0,26 3,71 4,5 2,3 1,5", "3,94 4,25 2,76 1,23 0,47", "0,97 1,21 3,43 4,52 2,29", "0,28 2,66 4,63 1,2 3,32", "4,85 2,61 3,40 1,54 0,44", "0,75 2,39 4,34 3,96 1,63", "3,74 0,59 2,15 1,56 4,97", "1,43 3,20 2,46 4,23 0,25", "3,55 4,58 1,76 2,34 0,28"]
    ]
};

// BKS (Best Known Solutions) 
// Source: https://github.com/Alexander-Nasuta/jsp-instance-utils
// Original: http://jobshop.jjvh.nl/
const BKS = {
    "ft06": 55,
    "ft10": 930,
    "la01": 666,
    "la02": 655,
    "la05": 593
};

// ==========================================
// STATE
// ==========================================
let jobs = [];
let exactResult = null;
let metaResult = null;
let currentView = 'exact'; // 'exact' or 'meta'
let currentBKS = null; // Current benchmark's BKS value

// ==========================================
// DOM ELEMENTS
// ==========================================
const jobsContainer = document.getElementById('jobsContainer');
const addJobBtn = document.getElementById('addJob');
const clearJobsBtn = document.getElementById('clearJobs');
const presetSelect = document.getElementById('presetSelect');
const solveBtn = document.getElementById('solveBtn');
const resultsPlaceholder = document.getElementById('resultsPlaceholder');
const loadingContainer = document.getElementById('loadingContainer');
const loadingStatus = document.getElementById('loadingStatus');
const resultsContainer = document.getElementById('resultsContainer');
const ganttCanvas = document.getElementById('ganttChart');
const tooltip = document.getElementById('tooltip');
const toggleExact = document.getElementById('toggleExact');
const toggleMeta = document.getElementById('toggleMeta');
const statusBadge = document.getElementById('statusBadge');
const makespanValue = document.getElementById('makespanValue');
const cpuTimeValue = document.getElementById('cpuTimeValue');
const exportPngBtn = document.getElementById('exportPng');
const exportPdfBtn = document.getElementById('exportPdf');

// ==========================================
// JOB MANAGEMENT
// ==========================================
function createJobElement(index, value = '') {
    const div = document.createElement('div');
    div.className = 'flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg p-3 min-w-[280px]';
    div.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-500">Job ${index + 1}</span>
            <button class="remove-job text-gray-400 hover:text-red-500 transition" data-index="${index}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <input type="text" 
               class="job-value w-full text-sm bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
               placeholder="e.g. 0,3 1,2 2,4"
               value="${value}"
               data-index="${index}">
    `;
    return div;
}

function renderJobs() {
    jobsContainer.innerHTML = '';
    jobs.forEach((job, index) => {
        jobsContainer.appendChild(createJobElement(index, job));
    });

    document.querySelectorAll('.job-value').forEach(input => {
        input.addEventListener('input', (e) => {
            jobs[parseInt(e.target.dataset.index)] = e.target.value;
        });
    });

    document.querySelectorAll('.remove-job').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            jobs.splice(index, 1);
            renderJobs();
        });
    });
}

function addJob() {
    jobs.push('');
    renderJobs();
    const inputs = document.querySelectorAll('.job-value');
    if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
    }
}

function clearJobs() {
    jobs = [];
    renderJobs();
    hideResults();
}

function loadPreset(presetKey) {
    if (!presetKey || !PRESETS[presetKey]) return;
    const scenarios = PRESETS[presetKey];
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    jobs = [...scenarios[randomIndex]];
    // Set BKS if this is a benchmark instance
    currentBKS = BKS[presetKey] || null;
    renderJobs();
    hideResults();
}

// ==========================================
// SOLVE - Run both algorithms
// ==========================================
async function solve() {
    if (jobs.length === 0 || jobs.every(j => !j.trim())) {
        alert('Please add at least one job with operations.');
        return;
    }

    // Show loading state
    solveBtn.disabled = true;
    solveBtn.textContent = 'Solving...';
    resultsPlaceholder.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    loadingContainer.classList.remove('hidden');

    try {
        // Run Exact method
        loadingStatus.textContent = 'Running Exact Method (CP-SAT)...';
        const exactResponse = await fetch('/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ algorithm: 'exact', jobs })
        });
        exactResult = await exactResponse.json();

        // Run Metaheuristic
        loadingStatus.textContent = 'Running Metaheuristic (Genetic Algorithm)...';
        const metaResponse = await fetch('/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ algorithm: 'meta', jobs })
        });
        metaResult = await metaResponse.json();

        if (exactResult.error && metaResult.error) {
            alert('Error: ' + (exactResult.error || metaResult.error));
            hideResults();
        } else {
            currentView = 'exact';
            showResults();
        }
    } catch (err) {
        alert('Failed to connect to server: ' + err.message);
        hideResults();
    } finally {
        solveBtn.disabled = false;
        solveBtn.textContent = 'Solve';
        loadingContainer.classList.add('hidden');
    }
}

// ==========================================
// GANTT CHART RENDERING
// ==========================================
const JOB_COLORS = [
    '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
    '#06b6d4', '#d946ef', '#0ea5e9', '#facc15', '#a855f7',
    '#fb923c', '#4ade80', '#f43f5e', '#2dd4bf', '#a3e635'
];

function getJobColor(jobIndex) {
    return JOB_COLORS[jobIndex % JOB_COLORS.length];
}

function parseJobNumber(jobStr) {
    const match = jobStr.match(/Job (\d+)/);
    return match ? parseInt(match[1]) - 1 : 0;
}

function parseMachineNumber(machineStr) {
    const match = machineStr.match(/Machine (\d+)/);
    return match ? parseInt(match[1]) : 0;
}

let taskRects = [];

function renderGantt(schedule, makespan) {
    const ctx = ganttCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const machines = [...new Set(schedule.map(t => t.Machine))].sort((a, b) =>
        parseMachineNumber(a) - parseMachineNumber(b)
    );
    const numMachines = machines.length;

    const rowHeight = 40;
    const labelWidth = 90;
    const padding = { top: 30, right: 20, bottom: 40, left: 10 };
    const chartWidth = ganttCanvas.parentElement.clientWidth - 32;
    const chartHeight = padding.top + numMachines * rowHeight + padding.bottom;

    ganttCanvas.style.width = chartWidth + 'px';
    ganttCanvas.style.height = chartHeight + 'px';
    ganttCanvas.width = chartWidth * dpr;
    ganttCanvas.height = chartHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, chartWidth, chartHeight);

    const timelineWidth = chartWidth - labelWidth - padding.left - padding.right;
    const timeScale = timelineWidth / makespan;

    taskRects = [];

    machines.forEach((machine, i) => {
        const y = padding.top + i * rowHeight;

        ctx.fillStyle = i % 2 === 0 ? '#f9fafb' : '#ffffff';
        ctx.fillRect(labelWidth, y, timelineWidth, rowHeight);

        ctx.fillStyle = '#374151';
        ctx.font = '12px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(machine, labelWidth - 10, y + rowHeight / 2 + 4);

        const machineTasks = schedule.filter(t => t.Machine === machine);
        machineTasks.forEach(task => {
            const jobIndex = parseJobNumber(task.Job);
            const x = labelWidth + task.Start * timeScale;
            const width = (task.Finish - task.Start) * timeScale;
            const taskY = y + 6;
            const taskHeight = rowHeight - 12;

            taskRects.push({ x, y: taskY, width, height: taskHeight, task });

            ctx.fillStyle = getJobColor(jobIndex);
            ctx.beginPath();
            ctx.roundRect(x, taskY, width, taskHeight, 4);
            ctx.fill();

            if (width > 30) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(task.Job.replace('Job ', 'J'), x + width / 2, taskY + taskHeight / 2 + 3);
            }
        });
    });

    const axisY = padding.top + numMachines * rowHeight + 10;
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(labelWidth, axisY);
    ctx.lineTo(labelWidth + timelineWidth, axisY);
    ctx.stroke();

    const tickCount = Math.min(10, makespan);
    const tickInterval = makespan / tickCount;
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i <= tickCount; i++) {
        const time = Math.round(i * tickInterval);
        const x = labelWidth + time * timeScale;

        ctx.beginPath();
        ctx.moveTo(x, axisY);
        ctx.lineTo(x, axisY + 5);
        ctx.stroke();

        ctx.fillText(time.toString(), x, axisY + 18);
    }
}

// ==========================================
// TOOLTIP
// ==========================================
ganttCanvas.addEventListener('mousemove', (e) => {
    const rect = ganttCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = null;
    for (const tr of taskRects) {
        if (x >= tr.x && x <= tr.x + tr.width && y >= tr.y && y <= tr.y + tr.height) {
            found = tr.task;
            break;
        }
    }

    if (found) {
        tooltip.innerHTML = `
            <div class="font-semibold">${found.Job} - ${found.Task}</div>
            <div class="text-gray-300">${found.Machine}</div>
            <div class="mt-1 text-xs">Start: ${found.Start} | End: ${found.Finish} | Duration: ${found.Duration}</div>
        `;
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY + 10) + 'px';
        tooltip.classList.remove('hidden');
    } else {
        tooltip.classList.add('hidden');
    }
});

ganttCanvas.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
});

// ==========================================
// RESULTS DISPLAY & TOGGLE
// ==========================================
function showResults() {
    resultsPlaceholder.classList.add('hidden');
    loadingContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');

    updateToggleState();
    displayCurrentResult();
}

function updateToggleState() {
    if (currentView === 'exact') {
        toggleExact.classList.add('active');
        toggleMeta.classList.remove('active');
    } else {
        toggleExact.classList.remove('active');
        toggleMeta.classList.add('active');
    }
}

function displayCurrentResult() {
    const result = currentView === 'exact' ? exactResult : metaResult;
    const gapContainer = document.getElementById('gapContainer');
    const gapValue = document.getElementById('gapValue');

    if (!result || result.error) {
        statusBadge.textContent = 'Error';
        statusBadge.className = 'text-xs px-2 py-1 rounded-full bg-red-100 text-red-700';
        makespanValue.textContent = '-';
        cpuTimeValue.textContent = '-';
        gapContainer.classList.add('hidden');
        return;
    }

    statusBadge.textContent = result.status;
    statusBadge.className = result.status === 'Optimal'
        ? 'text-xs px-2 py-1 rounded-full bg-green-100 text-green-700'
        : 'text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700';
    makespanValue.textContent = result.makespan;
    cpuTimeValue.textContent = result.cpu_time + 's';

    // Show gap if BKS is available
    if (currentBKS !== null) {
        const gap = ((result.makespan - currentBKS) / currentBKS) * 100;
        gapContainer.classList.remove('hidden');
        if (gap === 0) {
            gapValue.textContent = '0% (Optimal)';
            gapValue.className = 'font-semibold text-green-600';
        } else if (gap > 0) {
            gapValue.textContent = '+' + gap.toFixed(2) + '%';
            gapValue.className = 'font-semibold text-orange-600';
        } else {
            gapValue.textContent = gap.toFixed(2) + '%';
            gapValue.className = 'font-semibold text-green-600';
        }
    } else {
        gapContainer.classList.add('hidden');
    }

    renderGantt(result.schedule, result.makespan);
}

function hideResults() {
    resultsPlaceholder.classList.remove('hidden');
    loadingContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    exactResult = null;
    metaResult = null;
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================
async function exportPng() {
    const result = currentView === 'exact' ? exactResult : metaResult;
    if (!result) return;

    const wrapper = document.getElementById('ganttWrapper');
    const canvas = await html2canvas(wrapper, { backgroundColor: '#ffffff' });

    // Convert canvas to blob and download with proper extension
    canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = 'gantt_' + currentView + '_' + Date.now() + '.png';
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 'image/png');
}

async function exportPdf() {
    const result = currentView === 'exact' ? exactResult : metaResult;
    if (!result) return;

    const { jsPDF } = window.jspdf;
    const wrapper = document.getElementById('ganttWrapper');
    const canvas = await html2canvas(wrapper, { backgroundColor: '#ffffff' });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');

    pdf.setFontSize(16);
    pdf.text('Job Shop Scheduling - Gantt Chart', 15, 15);

    pdf.setFontSize(11);
    pdf.text('Algorithm: ' + result.algorithm, 15, 25);
    pdf.text('Status: ' + result.status, 15, 32);
    pdf.text('Makespan: ' + result.makespan, 100, 25);
    pdf.text('CPU Time: ' + result.cpu_time + 's', 100, 32);

    const pdfWidth = pdf.internal.pageSize.getWidth() - 30;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 15, 40, pdfWidth, Math.min(pdfHeight, 150));

    const filename = 'gantt_' + currentView + '_' + Date.now() + '.pdf';
    pdf.save(filename);
}

// ==========================================
// EVENT LISTENERS
// ==========================================
addJobBtn.addEventListener('click', addJob);
clearJobsBtn.addEventListener('click', clearJobs);
presetSelect.addEventListener('change', (e) => {
    loadPreset(e.target.value);
    e.target.value = '';
});
solveBtn.addEventListener('click', solve);
toggleExact.addEventListener('click', () => {
    currentView = 'exact';
    updateToggleState();
    displayCurrentResult();
});
toggleMeta.addEventListener('click', () => {
    currentView = 'meta';
    updateToggleState();
    displayCurrentResult();
});
exportPngBtn.addEventListener('click', exportPng);
exportPdfBtn.addEventListener('click', exportPdf);

window.addEventListener('resize', () => {
    const result = currentView === 'exact' ? exactResult : metaResult;
    if (result && result.schedule) {
        renderGantt(result.schedule, result.makespan);
    }
});

// Initialize with one empty job
addJob();
