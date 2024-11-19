import { departmentsData, loadDepartmentsData } from '../model/data.js';

document.addEventListener('DOMContentLoaded', () => {
    loadDepartmentsData();

    const avgDeployment = document.getElementById('avgDeployment');
    const maxDeployment = document.getElementById('maxDeployment');
    const minDeployment = document.getElementById('minDeployment');
    const statsTable = document.getElementById('statsTable');

    // Calculer les statistiques
    const totalDeployment = departmentsData.reduce((sum, dep) => sum + dep.deploiement, 0);
    const avg = (totalDeployment / departmentsData.length).toFixed(2);
    const maxDep = departmentsData.reduce((a, b) => (a.deploiement > b.deploiement ? a : b));
    const minDep = departmentsData.reduce((a, b) => (a.deploiement < b.deploiement ? a : b));

    // Mettre à jour les éléments de la page
    avgDeployment.textContent = `${avg}%`;
    maxDeployment.textContent = `${maxDep.nom} (${maxDep.numero}) - ${maxDep.deploiement}%`;
    minDeployment.textContent = `${minDep.nom} (${minDep.numero}) - ${minDep.deploiement}%`;

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
        info: true,
        scrollX: true, // Activer le défilement horizontal
        autoWidth: true, // Autoriser DataTables à ajuster la largeur
    });
    
    document.querySelector('.dataTables_wrapper').className = '';


    // Initialiser le graphique
    const ctx = document.getElementById('deploymentChart').getContext('2d');

    // Préparer les données pour le graphique
    const labels = departmentsData.map(dep => `${dep.nom} (${dep.numero})`);
    const data = departmentsData.map(dep => dep.deploiement);

    // Créer le graphique
    const deploymentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pourcentage de Déploiement',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw}%`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Pourcentage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Départements'
                    }
                }
            }
        }
    });
});
