## Structure du projet

- `server.js` : Serveur Express
- `models/Task.js` : Schéma Mongoose
- `routes/tasks.js` : Routes API
- `public/index.html` : Frontend HTML/JS

## Configuration

Créer un fichier `.env` à la racine du projet contenant :

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/ProjetReminder
```

## Lancement du backend (API Node.js + MongoDB)

1. Installer les dépendances :

```bash
npm install
```

2. Démarrer le serveur :

```bash
npm start
```

L’API est accessible à l’adresse :  
 `http://localhost:5000`

## Lancement du frontend (interface web)

Dans le dossier contenant le fichier HTML :

```bash
npx http-server
```

Le serveur frontend sera accessible à l’adresse :  
 `http://localhost:8080`

## Fonctionnalités disponibles

- Ajouter une tâche (titre + description)
- Modifier une tâche existante
- Supprimer une tâche
- Affichage dynamique des tâches depuis MongoDB

---
