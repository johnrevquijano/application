// Handle input changes to save to sessionStorage
const inputs = document.querySelectorAll('#certificateForm input, #certificateForm select');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        sessionStorage.setItem(input.id, input.value);
    });
});

// Load data from sessionStorage when the page loads (for home.html)
window.onload = function() {
    inputs.forEach(input => {
        const savedValue = sessionStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    });

    // Populate the certificate with data from sessionStorage (for certificate.html)
    if (document.getElementById('certStudentName')) { // Check if it's the certificate page
        const studentName = sessionStorage.getItem('studentName');
        const course = sessionStorage.getItem('course');
        const gradeYear = sessionStorage.getItem('gradeYear');
        const semester = sessionStorage.getItem('semester');
        const yearStart = sessionStorage.getItem('yearStart');
        const yearEnd = sessionStorage.getItem('yearEnd');
        const day = sessionStorage.getItem('day');
        const month = sessionStorage.getItem('month');
        const yearIssued = sessionStorage.getItem('yearIssued');

        document.getElementById('certStudentName').textContent = studentName || '____';
        document.getElementById('certCourse').textContent = course || '____';
        document.getElementById('certGradeYear').textContent = gradeYear || '_____';
        document.getElementById('certSemester').textContent = semester || '_____';
        document.getElementById('certYear').textContent = `${yearStart}-${yearEnd}` || '____-____';
        document.getElementById('certDay').textContent = day || '____';
        document.getElementById('certMonth').textContent = month || '_____';
        document.getElementById('certYearIssued').textContent = yearIssued || '____';
    }
};

// Handle certificate form submission
document.getElementById('certificateForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const course = document.getElementById('course').value;
    const gradeYear = document.getElementById('gradeYear').value;
    const semester = document.getElementById('semester').value;
    const date = new Date(document.getElementById('date').value);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const yearIssued = date.getFullYear();

    // Calculate the school year
    const yearStart = yearIssued; 
    const yearEnd = yearStart + 1; 

    // Store data in sessionStorage
    sessionStorage.setItem('studentName', studentName.toUpperCase());
    sessionStorage.setItem('course', course);
    sessionStorage.setItem('gradeYear', gradeYear);
    sessionStorage.setItem('semester', semester);
    sessionStorage.setItem('yearStart', yearStart);
    sessionStorage.setItem('yearEnd', yearEnd);
    sessionStorage.setItem('day', day);
    sessionStorage.setItem('month', month);
    sessionStorage.setItem('yearIssued', yearIssued);

    // Redirect to the certificate page
    window.location.href = 'certificate.html';
});

// Handle printing and button visibility
document.getElementById("printButton")?.addEventListener("click", function() {
    hideButtons();
    window.print(); // Trigger print dialog
    showButtons();
});

// Hide buttons before printing
window.addEventListener("beforeprint", hideButtons);
window.addEventListener("afterprint", showButtons);

// Function to hide buttons
function hideButtons() {
    document.getElementById("printButton").style.display = 'none';
    document.querySelector('.back-button').style.display = 'none'; 
}

// Function to show buttons
function showButtons() {
    document.getElementById("printButton").style.display = 'block';
    document.querySelector('.back-button').style.display = 'inline-block';
}
