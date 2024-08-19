// Array of riddles and answers
const riddles = [
    { question: "I have keys but open no locks. I have space but no room. You can enter but not go outside. What am I?", answer: "keyboard" },
    { question: "I protect your computer from harmful software and viruses, but I’m not a shield. What am I?", answer: "antivirus" },
    { question: "I have a screen but no touch. I show you pictures and videos but can’t move. What am I?", answer: "monitor" },
    { question: "I keep your files organized and make them easy to find, but I’m not a bookshelf. What am I?", answer: "file" }
]

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
        document.getElementById('riddle').innerText = "All riddles completed!";
        document.getElementById('final-password').innerText = "Encrypted Password: " + encrypt("firewallpassword", 3); // Encrypt a sample password
        document.getElementById('answer-input').style.display = 'none';
        document.querySelector('button[onclick="submitAnswer()"]').style.display = 'none';
        restore(); // Automatically restore the firewall after all riddles are answered
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
        restore(); // Automatically restore the firewall after correct answer
    } else {
        feedback.innerText = "Incorrect. Try again.";
        feedback.style.color = "red";
        breach(); // Indicate a breach if incorrect
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
        statusText.innerText = "Breached"; // Update the status text
    } else {
        console.error("Element not found"); // Log an error if elements are not found
    }
}

// Function to restore the firewall
function restore() {
    const statusCircle = document.getElementById("status-circle");
    const statusText = document.getElementById("status-text");

    if (statusCircle && statusText) {
        statusCircle.className = "progress"; // Change the class to active
        statusText.innerText = "Active"; // Update the status text
        updateProgress(); // Update progress upon restore
    } else {
        console.error("Element not found"); // Log an error if elements are not found
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

// Display the first riddle when the page loads
window.onload = displayRiddle;
