import { departmentsData, loadDepartmentsData, saveDepartmentsData } from '../model/data.js';

document.addEventListener('DOMContentLoaded', () => {
    const departmentSelect = document.getElementById('departmentSelect');
    const deploymentPercentage = document.getElementById('deploymentPercentage');
    const confirmUpdate = document.getElementById('confirmUpdate');
    const messageContainer = document.getElementById('messageContainer');

    // Charger les données des départements
    loadDepartmentsData();

    // Remplir la liste déroulante
    departmentsData.forEach(department => {
        const option = document.createElement('option');
        option.value = department.numero;
        option.textContent = `${department.nom} (${department.numero})`;
        departmentSelect.appendChild(option);
    });

    // Fonction pour afficher un message Bootstrap
    function showMessage(message, type = 'success') {
        messageContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    // Gestion de la confirmation de mise à jour
    confirmUpdate.addEventListener('click', () => {
        const numero = departmentSelect.value;
        const newPercentage = parseInt(deploymentPercentage.value);

        if (!numero || isNaN(newPercentage) || newPercentage < 0 || newPercentage > 100) {
            showMessage("Veuillez sélectionner un département et entrer une valeur valide.", 'danger');
            return;
        }

        // Mise à jour des données
        const department = departmentsData.find(dep => dep.numero === numero);
        if (department) {
            department.deploiement = newPercentage;
            saveDepartmentsData();
            showMessage(`Le pourcentage de déploiement pour ${department.nom} a été mis à jour à ${newPercentage}%.`, 'success');
        }

        // Fermer la modale de confirmation
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
        modal.hide();
    });
});
