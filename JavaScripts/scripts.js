document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.getElementById("numberInput");
    const checkButton = document.getElementById("checkNumber");
    const nameSection = document.getElementById("nameSection");
    const nameInput = document.getElementById("nameInput");
    const confirmButton = document.getElementById("confirmSelection");
    const approvedList = document.getElementById("approvedList");
    const timerDisplay = document.getElementById("timer");

    let selectedNumber = null;
    let countdown;
    const timeLimit = 60; 
    let timeLeft = timeLimit;

    let approvedNumbers = JSON.parse(localStorage.getItem("approvedNumbers")) || {};
    updateApprovedList();

    checkButton.addEventListener("click", () => {
        const number = numberInput.value;
        
        if (!number || number < 1 || number > 100) {
            alert("Please enter a number between 1 and 100.");
            return;
        }
        
        if (approvedNumbers[number]) {
            alert(`Number ${number} is already taken by ${approvedNumbers[number]}.`);
        } else {
            selectedNumber = number;
            nameSection.classList.remove("hidden");
            startCountdown();
        }
    });

    confirmButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        
        if (!name) {
            alert("Please enter your name.");
            return;
        }

        approvedNumbers[selectedNumber] = name;
        localStorage.setItem("approvedNumbers", JSON.stringify(approvedNumbers));

        clearTimeout(countdown);
        timeLeft = timeLimit;
        nameSection.classList.add("hidden");
        nameInput.value = "";
        updateApprovedList();
    });

    function updateApprovedList() {
        approvedList.innerHTML = "";
        for (const num in approvedNumbers) {
            const li = document.createElement("li");
            li.textContent = `Number ${num}: ${approvedNumbers[num]}`;
            approvedList.appendChild(li);
        }
    }

    function startCountdown() {
        timeLeft = timeLimit;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(countdown);
                nameSection.classList.add("hidden");
                alert(`Time ran out! Number ${selectedNumber} is now available again.`);
            }
        }, 1000);
    }
});
