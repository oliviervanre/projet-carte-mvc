import { departmentsData, loadDepartmentsData } from '../model/data.js';

function displayDepartments() {
    loadDepartmentsData();
    const departmentsList = document.getElementById('departmentsList');
    departmentsList.innerHTML = '';

    departmentsData.forEach((department, index) => {
        const { numero, nom, deploiement } = department;

        const departmentDiv = document.createElement('div');
        departmentDiv.classList.add('form-group');

        departmentDiv.innerHTML = `
            <label for="deployment-${index}">${nom} (${numero})</label>
            <input type="number" class="form-control" id="deployment-${index}" value="${deploiement || 0}" min="0" max="100">
        `;

        departmentsList.appendChild(departmentDiv);
    });
}

function saveDeployments(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input, index) => {
        const value = parseInt(input.value, 10);
        departmentsData[index].deploiement = isNaN(value) ? 0 : value;
    });
    localStorage.setItem('departmentsData', JSON.stringify(departmentsData));
    alert('Pourcentages enregistrés avec succès.');
}

document.addEventListener('DOMContentLoaded', () => {
    displayDepartments();
    document.getElementById('adminForm').addEventListener('submit', saveDeployments);
});
