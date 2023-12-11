document.addEventListener('DOMContentLoaded', function(){
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');

    dobInput.addEventListener('change', function(){
        const dob = dobInput.value;
        const age = calculateAge(dob);
        ageInput.value = age;
    });
});
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function submitForm(){
    const form = document.getElementById('employeeForm');
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
    const empId = formData.get('empId');
    if(!empId){
        alert('Employee ID is required.');
        return;
    }
    const requestBody = new URLSearchParams();
    formData.forEach((value,key)=>{
        requestBody.append(key,value);
    });
    requestBody.append('Emp_ID', empId);
    fetch('http://localhost:5500/api/put',{
        method: 'POST',
        body: requestBody,
    })
    .then(response => response.json())
    .then(result =>{
        if(result.success === 1){
            alert('User registration successful!');
            displayAllData();
            document.getElementById('employeeForm').reset();
        }
        else{
            alert('User registration failed. Please try again.');
        }
    })
    .catch(error =>{
        console.log("Error: ", error);
        alert("An error occurred. Please try again later.");
    });
}

function formatDate(dateString){
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function displayAllData() {
    fetch('http://localhost:5500/api/get')
    .then(response => response.json())
    .then(data => {
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.innerHTML = '';
        if (data.success === 1) {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Phone Number</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Age</th>
                        <th>Experience</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.data.map(row => `
                        <tr>                            
                            <td>${row.Emp_ID}</td>
                            <td>${row.Emp_Name}</td>
                            <td>${row.ph_num}</td>
                            <td>${row.designation}</td>
                            <td>${row.dept}</td>
                            <td>${formatDate(row.date_of_birth)}</td>
                            <td>${row.age}</td>
                            <td>${row.experience}</td>
                            <td>${row.salary}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            tableContainer.appendChild(table);
        } else {
            console.error('Error fetching table data:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching all data.');
    });
}

function delEmpDetails() {
    const deleteEmployeeIdInput = document.getElementById('deleteEmployeeId');
    const deleteId = deleteEmployeeIdInput.value;
    if(!deleteId){
        alert('Please enter an Employee ID.');
        return;
    }
    fetch(`http://localhost:5500/api/delete/${deleteId}`,{
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        if(result.success===1){
            alert('Details deleted successfully!');
            displayAllData();
            deleteEmployeeIdInput.value = '';
        }
        else{
            alert('Failed to delete. Please try again');
        }
    })
    .catch(error =>{
        console.error("Error: ",error);
        alert('An error occurred. Please try again later.');
    });
}