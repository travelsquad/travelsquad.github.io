function validateForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if (!username || !password || !email) {
        alert("All fields are required!");
        return;
    }

    // Send the data to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbw7Yp8l7RPnbJMyFTh0P-xrVjVgIoqYP7eSzrGc8swWbX8xBnJdu_M08EWcZTEKQ_I0/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}&email=${email}`
    })
    .then(response => {
        alert("Thanks for signing up!");
        window.location.href = 'words.html'; // Redirect to the new page
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error. Please try again.");
    });
}