document.addEventListener("DOMContentLoaded", function () {
    // Inject final result box (hidden by default)
    const finalResultHTML = `
    <div class="quizFinalResult" style="display:none; position:fixed; bottom:0; left:0; right:0; background:#f0f0f0; padding:10px; z-index:9999;">
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

                    // Show final result box
                    const final = document.querySelector(".quizFinalResult");
                    final.style.display = "block";

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
