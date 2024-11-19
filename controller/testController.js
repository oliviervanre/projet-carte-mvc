import { loadDepartmentsData } from '../model/data.js';

function initializeDataTable() {
    // Charger les données depuis le localStorage
    const savedData = JSON.parse(localStorage.getItem('departmentsData')) || [];

    // Vérification que le tableau existe dans le DOM
    const tableBody = document.querySelector('#statsTable tbody');
    if (!tableBody) {
        console.error("L'élément <tbody> pour le tableau n'a pas été trouvé dans le DOM.");
        return;
    }

    tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

    // Remplir les lignes du tableau dynamiquement
    savedData.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${department.numero}</td>
            <td>${department.nom}</td>
            <td>${department.region}</td>
            <td>${department.deploiement}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Initialiser DataTable
    if ($.fn.DataTable.isDataTable('#statsTable')) {
        $('#statsTable').DataTable().clear().destroy(); // Réinitialiser DataTable si déjà initialisé
    }

    $('#statsTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true
    });
}

// Événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDataTable();
});
