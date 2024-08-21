// Array of riddles and answers
const riddles = [
    { question: "I have keys but open no locks. I have space but no room. You can enter but not go outside. What am I?", answer: "keyboard" },
    { question: "I protect your computer from harmful software and viruses, but I’m not a shield. What am I?", answer: "antivirus" },
    { question: "I have a screen but no touch. I show you pictures and videos but can’t move. What am I?", answer: "monitor" },
    { question: "I keep your files organized and make them easy to find, but I’m not a bookshelf. What am I?", answer: "folder" }
];
//HOLLY IS A BIG DO DO
//ARGGGGGGG
let currentRiddleIndex = 0;
let correctAnswersCount = 0;

// Caesar Cipher encryption function
function encrypt(text, shift) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);
        if (char >= 65 && char <= 90) {
            char = ((char - 65 + shift) % 26) + 65; // Uppercase letters
        } else if (char >= 97 && char <= 122) {
            char = ((char - 97 + shift) % 26) + 97; // Lowercase letters
        }
        encryptedText += String.fromCharCode(char);
    }
    return encryptedText;
}

// Function to display a riddle
function displayRiddle() {
    if (currentRiddleIndex < riddles.length) {
        const selectedRiddle = riddles[currentRiddleIndex];
        document.getElementById('riddle').innerText = selectedRiddle.question;
        document.getElementById('riddle').dataset.answer = selectedRiddle.answer;
        updateProgress(); // Update the progress circle after displaying each riddle
    } else {
        // All riddles completed
        document.getElementById('riddle').innerText = "All riddles completed!";
        document.getElementById('final-password').innerText = "Encrypted Password: O R R N X Q G H U W K H N H B E R U G"; // Set final encrypted password
        document.getElementById('answer-input').style.display = 'none';
        document.querySelector('button[onclick="submitAnswer()"]').style.display = 'none';
        deactivateFirewall(); // Change status to deactivated successfully
    }
}

// Function to handle answer submission
function submitAnswer() {
    const input = document.getElementById("answer-input").value.toLowerCase();
    const feedback = document.getElementById("feedback");
    const riddleAnswer = document.getElementById('riddle').dataset.answer;

    if (input === riddleAnswer) {
        feedback.innerText = "Correct!";
        feedback.style.color = "green";
        correctAnswersCount++;
        currentRiddleIndex++;
        displayRiddle();
        restore(); // Restore the firewall after a correct answer
    } else {
        feedback.innerText = "Incorrect. Try again.";
        feedback.style.color = "red";
        breach(); // Simulate a breach if the answer is incorrect
    }

    // Clear the input field after submission
    document.getElementById("answer-input").value = "";
}

// Function to simulate a firewall breach
function breach() {
    const statusCircle = document.getElementById("status-circle");
    const statusText = document.getElementById("status-text");

    if (statusCircle && statusText) {
        statusCircle.className = "breached"; // Change the class to breached
        statusText.innerText = "Active"; // Update the status text
        statusCircle.style.backgroundColor = "#ff0000"; // Set background color to red
    } else {
        console.error("Element not found"); // Log an error if elements are not found
    }
}

// Function to restore the firewall
function restore() {
    const statusCircle = document.getElementById("status-circle");
    const statusText = document.getElementById("status-text");

    if (statusCircle && statusText) {
        statusCircle.className = "progress"; // Change the class to progress
        statusText.innerText = "Active"; // Update the status text to active
        updateProgress(); // Update progress upon restore
    } else {
        console.error("Element not found"); // Log an error if elements are not found
    }
}

// Function to deactivate the firewall
function deactivateFirewall() {
    const statusCircle = document.getElementById("status-circle");
    const statusText = document.getElementById("status-text");

    if (statusCircle && statusText) {
        statusCircle.classList.remove("progress", "breached"); // Remove other states
        statusCircle.classList.add("deactivated"); // Add deactivated state

        statusText.style.textShadow = "0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff0000, 0 0 20px #ff0000, 0 0 25px #ff0000, 0 0 30px #ff0000";
        statusText.innerHTML = "Deactivated";

        console.log('Firewall Deactivated');
    } else {
        console.error("Element not found");
    }
}

// Function to update the circle's progress
function updateProgress() {
    const statusCircle = document.getElementById("status-circle");
    if (statusCircle) {
        const progress = (correctAnswersCount / riddles.length) * 100;
        statusCircle.style.background = `conic-gradient(red ${progress}%, green ${progress}% 100%)`; // Progress color gradient
        statusCircle.style.transform = `scale(${1 + (progress / 100)})`; // Increase size with progress

    } else {
        console.error("Element not found");
    }
}
document.getElementById('base64DecodeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var base64String = document.getElementById('base64InputField').value;
    var decodedString = atob(base64String);
    if (decodedString == "Holly Is a Stinky Lady") {
        alert('CORRECT! WELL DONE, TELL MR.KLINS THAT THE CODE IS: 137425');
    }
});

// Display the first riddle when the page loads
window.onload = displayRiddle;


//Testing