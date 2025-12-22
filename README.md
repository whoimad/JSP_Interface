# Job Shop Problem - Interface Web

**🔗 Demo en ligne** : https://jsp-interface.vercel.app/

Interface web de visualisation pour le problème d'ordonnancement de Job Shop (JSP), implémentant un solveur **Exact (CP-SAT)** et une **Métaheuristique (Algorithme Génétique)** avec visualisation interactive par diagramme de Gantt.

## Fonctionnalités

- **Double Solveur** : Comparaison entre méthode Exacte (OR-Tools CP-SAT) et Métaheuristique (Algorithme Génétique)
- **Diagrammes de Gantt Interactifs** : Visualisation Canvas avec info-bulles au survol
- **Instances de Référence** : Inclut ft06, ft10, la01, la02, la05 de la littérature
- **Comparaison BKS** : Affiche le gap (%) par rapport aux meilleures solutions connues


## Démarrage Rapide

### Prérequis
- Python 3.10+
- pip

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/yourusername/JSP_Interface.git
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
