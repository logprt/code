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
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpe6ABsCCuF4hDX1_nhEfsWfesrXRhvVbyp8tFaopzNFePND1rCTRjLB06u59Kzr8CP-ww3nu7oKHX-r8Citn-KKwdaFOD94AwIJejnjngN2dBqR0TlcJpKFSn6malsSV6HSuRllGGHu8L5psnZQtmYfatscH0pUxe_w6QaouWuU2e4H8kWAuXAYDmO5eI/s1600/hourglass.gif">
            <h6>Start Test</h6>
            <a href="#" onclick="document.querySelector('.quizz').scrollIntoView({ behavior: 'smooth' }); return false;"><button class="btn-yes" id="yesBtn">Yes</button></a>
            <button class="btn-no" id="noBtn">No</button>
          </div>
        </div>
      `;
    
      document.body.insertAdjacentHTML('beforeend', popupHTML);
    
      // YES button click
      document.getElementById('yesBtn').addEventListener('click', function () {
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


// FLASHCARD
let currentIndex = 0;
const flashcards = document.querySelectorAll('.fc');
const total = flashcards.length;
const counter = document.getElementById('counter');

function showCard(index) {
  flashcards.forEach((card, i) => {
    card.style.display = (i === index) ? 'block' : 'none';

    const front = card.querySelector('.fcf');
    const back = card.querySelector('.fcb');
    front.style.display = 'block';
    back.style.display = 'none';
  });

  updateCounter(index);
}

function updateCounter(index) {
  counter.textContent = `(${index + 1} / ${total})`;
}

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % total;
  showCard(currentIndex);
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + total) % total;
  showCard(currentIndex);
});

flashcards.forEach(card => {
  card.addEventListener('click', () => {
    const front = card.querySelector('.fcf');
    const back = card.querySelector('.fcb');

    if (front.style.display === 'block') {
      front.style.display = 'none';
      back.style.display = 'block';
    } else {
      front.style.display = 'block';
      back.style.display = 'none';
    }
  });
});

// Show the first flashcard on load
showCard(currentIndex);
