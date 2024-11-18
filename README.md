
```markdown
# Projet Déploiement NEO par Département (maquette de refonte de Surfasig)

## Prérequis

- Node.js doit être installé sur votre machine. Vous pouvez le télécharger et l'installer depuis [Node.js](https://nodejs.org/).

## Installation

1. Cloner le dépôt ou copier les fichiers du projet dans un dossier local.
   
   ```bash
   git clone <URL_DU_DEPOT>
   cd votre-projet
   ```

2. Installer les dépendances.

   ```bash
   npm install
   ```

## Lancer l'application en local

Pour lancer l'application sur un serveur local, utilisez la commande suivante :

```bash
npx http-server . -p 3000
```

Cela lancera le serveur sur le port **3000**.

### Accéder à l'application

Ouvrez votre navigateur et accédez à l'adresse suivante :

```
http://localhost:3000
```

## Structure du projet

- `index.html` : Page principale avec la carte interactive.
- `assets/` : Contient les fichiers SVG et autres ressources.
- `controller/` : Fichiers JavaScript pour la logique de contrôle.
- `model/` : Données du projet.
- `view/` : Logique de rendu de la carte.

## Dépendances

- `http-server` : Utilisé pour servir les fichiers statiques en local.

## Problèmes fréquents

1. **Erreur de chargement du SVG** : Assurez-vous que le fichier SVG est bien placé dans le dossier `assets/` et qu'il est accessible.
2. **Problème d'affichage** : Vider le cache de votre navigateur ou ouvrir la page en mode incognito peut aider.


