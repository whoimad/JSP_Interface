# Job Shop Schedule - Interface Web

**Demo en ligne** : https://jsp-interface.vercel.app/

Interface web de visualisation pour le problème d'ordonnancement de Job Shop (JSP), implémentant le solveur **Exact (CP-SAT)** et une **Métaheuristique (Algorithme Génétique)** avec visualisation interactive par diagramme de Gantt.

## Fonctionnalités

- **Double Solveur** : Comparaison entre méthode Exacte (OR-Tools CP-SAT) et Métaheuristique (Algorithme Génétique)
- **Diagrammes de Gantt Interactifs** : Visualisation Canvas avec info-bulles au survol
- **Instances de Référence** : Inclut ft06, ft10, la01, la02, la05 de la littérature
- **Comparaison BKS** : Affiche le gap (%) par rapport aux meilleures solutions connues
---
# Modélisation Mathématique (Formulation MILP)

## Ensembles et paramètres

- \( J = \{1,\dots,n\} \) : ensemble des jobs  
- \( M = \{1,\dots,m\} \) : ensemble des machines  
- \( O_{j,k} \) : k-ième opération du job j  
- \( \mu_{j,k} \in M \) : machine requise  
- \( p_{j,k} > 0 \) : durée de traitement  



## Variables de décision

- \( S_{j,k} \ge 0 \) : date de début  
- \( C_{max} \ge 0 \) : makespan  
- \( x_{i,h,j,k} \in \{0,1\} \) : variable d’ordonnancement sur une même machine  



## Fonction objectif

\[
\min C_{max}
\]



## Contraintes

### 1. Contraintes de précédence (ordre interne aux jobs)

\[
S_{j,k+1} \ge S_{j,k} + p_{j,k}
\]

Les opérations d’un même job doivent respecter l’ordre imposé.



### 2. Contraintes disjonctives (capacité machine)

Pour deux opérations exécutées sur une même machine :

\[
S_{j,k} \ge S_{i,h} + p_{i,h} - M(1 - x_{i,h,j,k})
\]

\[
S_{i,h} \ge S_{j,k} + p_{j,k} - M x_{i,h,j,k}
\]

Une machine ne peut traiter qu’une seule opération à la fois.



### 3. Définition du makespan

\[
C_{max} \ge S_{j,m} + p_{j,m}
\]



## Choix de la constante Big-M

\[
M = \sum_{j} \sum_{k} p_{j,k}
\]

Cette valeur constitue une borne supérieure triviale du makespan.

---

# Résolution Exacte – CP-SAT (OR-Tools)

La méthode exacte repose sur la programmation par contraintes avec CP-SAT.

Chaque opération est modélisée par :

- une variable de début \( S_{i,j} \),
- une variable de fin \( E_{i,j} \),
- une variable d’intervalle \( I_{i,j} \).

## Contraintes

- Précédence :
E[i,j] <= S[i,j+1]


- Non-chevauchement machine :
NoOverlap(opérations affectées à la machine k)


- Objectif :
minimize Cmax


Cette approche garantit l’optimalité pour les instances de petite et moyenne taille.

---

# Métaheuristique – Algorithme Génétique

Pour les instances de grande taille, une métaheuristique de type Algorithme Génétique est implémentée.

## Représentation

Encodage de type job-based representation :

- Longueur du chromosome = nombre total d’opérations
- Chaque job apparaît autant de fois que son nombre d’opérations

Exemple :

[1, 2, 3, 1, 3, 2, 1, 2, 3]



## Décodage

Le chromosome est transformé en ordonnancement faisable en :

- suivant la prochaine opération de chaque job,
- respectant la disponibilité des machines,
- planifiant chaque opération à la date la plus tôt possible.



## Fonction d’évaluation

\[
\min C_{max}
\]

Le makespan est calculé après décodage complet.



## Opérateurs génétiques

- Sélection : tournoi (k = 3)  
- Croisement : POX (Precedence Operation Crossover)  
- Mutation : échange de deux positions  
- Élitisme : conservation des 10 % meilleurs individus  



## Critères d’arrêt

- Nombre maximal de générations atteint  
- Absence d’amélioration sur un nombre donné d’itérations  



---
## Démarrage Rapide

### Prérequis
- Python 3.10+
- pip

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/whoimad/JSP_Interface.git
cd JSP_Interface

# Installer les dépendances
pip install -r requirements.txt

# Lancer l'application
python app.py
```

### Accès
Ouvrir le navigateur à l'adresse : **http://127.0.0.1:5000**

## Utilisation

1. **Charger un preset** depuis le menu déroulant (benchmarks ou tests aléatoires)
2. **Cliquer sur Solve** pour exécuter les deux algorithmes
3. **Basculer** entre les résultats Exact et Métaheuristique
4. **Consulter le gap** en pourcentage pour les instances de référence

## Format des Jobs

Les jobs sont définis comme des paires `machine,durée` séparées par des espaces :
```
0,3 1,2 2,4    # Le job s'exécute sur Machine 0 pendant 3 unités, puis Machine 1 pendant 2 unités, etc.
```

## Sources des Benchmarks

- **jsp-instance-utils** : https://github.com/Alexander-Nasuta/jsp-instance-utils
- **Données originales** : http://jobshop.jjvh.nl/
