// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Définir le dossier courant comme dossier statique
app.use(express.static(__dirname));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
