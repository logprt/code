document.addEventListener("DOMContentLoaded", function () {
    // FINAL RESULT BOX
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
    let totalAttempts = 0;

    const quizBoxes = document.querySelectorAll(".quizBox");
    quizBoxes.forEach(quizBox => {
        const quizzes = quizBox.querySelectorAll(".quiz");
        quizzes.forEach((quiz, index) => {
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

                    if (correctOption) correctOption.classList.add("correct");

                    if (option.classList.contains("c")) {
                        option.classList.add("correct");
                        totalScore++;
                        correctCount++;
                    } else {
                        option.classList.add("incorrect");
                    }

                    options.forEach(opt => opt.classList.add("answered"));
                    updateFinalResult();
                });
            });
        });
    });

    function updateFinalResult() {
        const tds = document.querySelectorAll(".quizFinalResult td");
        tds[1].innerText = totalScore;
        tds[3].innerText = document.querySelectorAll(".quizBox .quiz").length;
        tds[5].innerText = totalAttempts;
        tds[7].innerText = correctCount;
    }

    // POPUP (after delay)
    setTimeout(() => {
        const popupHTML = `
        <div class="popup-overlay" id="popup">
            <div class="popup-box">
                <h2>Do you want to Practice this Test?</h2>
                <button class="btn-yes" id="yesBtn">Yes</button>
                <button class="btn-no" id="noBtn">No</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        document.getElementById('yesBtn').addEventListener('click', () => {
            const quizDiv = document.querySelector('.quizBox');
            if (quizDiv) {
                quizDiv.style.width = '100%';
                quizDiv.style.background = 'white';
                quizDiv.style.zIndex = '1';
            }
            document.getElementById('popup').remove();
        });

        document.getElementById('noBtn').addEventListener('click', () => {
            document.getElementById('popup').remove();
        });
    }, 1000);

    // QUIZ1: Number questions
    document.querySelectorAll('.quiz1').forEach(quiz => {
        let count = 1;
        quiz.querySelectorAll('.q1q').forEach(q => {
            q.innerHTML = `<b>${count++}</b> ${q.innerHTML}`;
        });
    });

    // QUIZ1: Option click
    document.querySelectorAll('.quiz1 .q1o li').forEach(option => {
        option.addEventListener('click', function () {
            if (this.classList.contains('q1c') || this.classList.contains('q1w')) return;
            if (this.classList.contains('cq1')) {
                this.classList.add('q1c');
            } else {
                this.classList.add('q1w');
            }
        });
    });
});
