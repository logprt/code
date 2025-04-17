document.addEventListener("DOMContentLoaded", function () {
    // Inject final result box
    const finalResultHTML = `
    <div class="quizFinalResult">
        <table>
            <tbody>
                <tr><td>Total Score</td><td>0</td></tr>
                <tr><td>Total Questions</td><td>0</td></tr>
                <tr><td>Total Attempts</td><td>0</td></tr>
                <tr><td>Correct Attempts</td><td>0</td></tr>
            </tbody>
        </table>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", finalResultHTML);

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let totalAttempts = 0;

    const quizBoxes = document.querySelectorAll(".quizBox");

    quizBoxes.forEach(quizBox => {
        const quizzes = quizBox.querySelectorAll(".quiz");

        quizzes.forEach((quiz, index) => {
            // Auto-number questions
            const questionDiv = quiz.querySelector(".q");
            if (questionDiv) {
                questionDiv.innerHTML = `<b>${index + 1}</b> ${questionDiv.innerHTML}`;
            }

            let attempted = false;
            const options = quiz.querySelectorAll("li");
            const correctOption = quiz.querySelector("li.c");

            options.forEach(option => {
                option.addEventListener("click", function () {
                    if (attempted) return;
                    attempted = true;
                    totalAttempts++;

                    // Always show correct
                    if (correctOption) correctOption.classList.add("correct");

                    if (option.classList.contains("c")) {
                        option.classList.add("correct");
                        totalScore++;
                        correctCount++;
                    } else {
                        option.classList.add("incorrect");
                        incorrectCount++;
                    }

                    options.forEach(opt => opt.classList.add("answered"));
                    updateFinalResult();
                });
            });
        });
    });

    function updateFinalResult() {
        const final = document.querySelector(".quizFinalResult");
        const tds = final.querySelectorAll("td");
        tds[1].innerText = totalScore;
        tds[3].innerText = document.querySelectorAll(".quizBox .quiz").length;
        tds[5].innerText = totalAttempts;
        tds[7].innerText = correctCount;
    }
});

// POPUP Expand Full width Screen
setTimeout(function () {
      // Inject stylish popup HTML
      const popupHTML = `
        <div class="popup-overlay" id="popup">
          <div class="popup-box">
            <h2>Do you want to Start this Test?</h2>
            <button class="btn-yes" id="yesBtn">Yes</button>
            <button class="btn-no" id="noBtn">No</button>
          </div>
        </div>
      `;
    
      document.body.insertAdjacentHTML('beforeend', popupHTML);
    
      // YES button click
      document.getElementById('yesBtn').addEventListener('click', function () {
        const quizDiv = document.querySelector('.quizz');
        if (quizDiv) {
          quizDiv.style.width = '100%';
          quizDiv.style.background = 'white';
          quizDiv.style.zIndex = '1';
          quizDiv.style.position = 'absolute';
          quizDiv.style.left = '0';
          quizDiv.style.right = '0';
          quizDiv.style.top = '0';
          quizDiv.style.padding = '1rem';
        }
        closePopup();
      });
    
      // NO button click
      document.getElementById('noBtn').addEventListener('click', function () {
        closePopup();
      });
    
      // Close popup function
      function closePopup() {
        const popup = document.getElementById('popup');
        if (popup) popup.remove();
      }
    }, 10000); // 10,000ms = 10 seconds


// // /// //
// QUIZ 1
// // /// //

// Add question numbers
document.querySelectorAll('.quiz1').forEach(quiz => {
    let count = 1;
    quiz.querySelectorAll('.q1q').forEach(q => {
        q.innerHTML = `<b>${count++}</b> ${q.innerHTML}`;
    });
});

// Handle option click - correct/incorrect
document.querySelectorAll('.quiz1 .q1o li').forEach(option => {
    option.addEventListener('click', function () {
        // Prevent re-clicking
        if (this.classList.contains('q1c') || this.classList.contains('q1w')) return;

        const allOptions = this.parentElement.querySelectorAll('li');
       // allOptions.forEach(opt => opt.style.pointerEvents = 'none'); // Disable all options

        if (this.classList.contains('cq1')) {
            this.classList.add('q1c'); // Correct
        } else {
            this.classList.add('q1w'); // Wrong
        }
    });
});
