document.addEventListener("DOMContentLoaded", function () {
    // Inject final result box (initially hidden)
    const finalResultHTML = `
    <div class="quizFinalResult" style="display:none;">
        <table>
            <tbody>
                <tr><td>Total Score</td><td class="score">0</td></tr>
                <tr><td>Total Questions</td><td class="questions">0</td></tr>
                <tr><td>Total Attempts</td><td class="attempts">0</td></tr>
                <tr><td>Correct Attempts</td><td class="correct">0</td></tr>
            </tbody>
        </table>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", finalResultHTML);

    let totalScore = 0;
    let correctCount = 0;
    let totalAttempts = 0;

    let resultShown = false;

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

                    // Show the result box only once
                    if (!resultShown) {
                        document.querySelector(".quizFinalResult").style.display = "block";
                        resultShown = true;
                    }

                    // Always show the correct option
                    if (correctOption) correctOption.classList.add("correct");

                    if (option.classList.contains("c")) {
                        option.classList.add("correct");
                        totalScore++;
                        correctCount++;
                    } else {
                        option.classList.add("incorrect");
                    }

                    // Mark all options as answered (disable further interaction visually)
                    options.forEach(opt => opt.classList.add("answered"));

                    updateFinalResult();
                });
            });
        });
    });

    function updateFinalResult() {
        document.querySelector(".quizFinalResult .score").innerText = totalScore;
        document.querySelector(".quizFinalResult .questions").innerText = document.querySelectorAll(".quizBox .quiz").length;
        document.querySelector(".quizFinalResult .attempts").innerText = totalAttempts;
        document.querySelector(".quizFinalResult .correct").innerText = correctCount;
    }
});
