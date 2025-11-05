document.addEventListener("DOMContentLoaded", function () {
  const totalQuestions = window.totalQuestions || document.querySelectorAll(".q-box").length;
  const marksPerQuestion = window.marksPerQuestion || 1;
  const negativeMarking = window.negativeMarking || 0;
  const passingMarks = window.passingMarks || 0;
  const testDuration = window.testDuration || 10; // in minutes

  const quizBoxes = document.querySelectorAll(".q-box");
  const startTime = new Date();
  const testDurationMs = testDuration * 60 * 1000; // convert to milliseconds

// ✅ Option selection handler
quizBoxes.forEach((qBox) => {
  qBox.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", function () {
      if (li.classList.contains("selected")) return; // prevent multiple clicks on same li
      li.classList.add("selected");
      li.style.pointerEvents = "none"; // disable this li only
      if (li.classList.contains("correct")) li.classList.add("green");
      else li.classList.add("red");
    });
  });
});


  const resultButton = document.querySelector(".result-btn");

  // ✅ Shared result function
  function calculateAndShowResult() {
    const endTime = new Date();
    const totalTimeTakenMin = ((endTime - startTime) / 1000 / 60).toFixed(2);

    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;

    quizBoxes.forEach((qBox) => {
      const allCorrect = qBox.querySelectorAll("li.correct");
      const selected = qBox.querySelectorAll("li.selected");

      if (selected.length > 0) {
        attemptedCount++;

        const selectedAreCorrect =
          selected.length === allCorrect.length &&
          Array.from(selected).every((li) => li.classList.contains("correct"));

        if (selectedAreCorrect) correctCount++;
        else wrongCount++;
      }
    });

    const totalMarks = totalQuestions * marksPerQuestion;
    const yourMarks =
      correctCount * marksPerQuestion +
      wrongCount * (negativeMarking < 0 ? negativeMarking : 0);
    const resultStatus = yourMarks >= passingMarks ? "PASS ✅" : "FAIL ❌";

    let resultDiv = document.querySelector(".result-table");
    if (!resultDiv) {
      resultDiv = document.createElement("div");
      resultDiv.className = "result-table";
      resultButton.insertAdjacentElement("afterend", resultDiv);
    }

    resultDiv.innerHTML = `
      <h6>Your Test Result</h6>
      <table border="1" cellspacing="0" cellpadding="6" style="margin-top:1rem; border-collapse:collapse; width:100%; max-width:600px;">
        <tbody>
          <tr><td class="std" colspan="2"><p><b class="b1">${yourMarks}</b> <i>/</i> <b class="b2">${totalMarks}</b></p></td></tr>
          <tr><td><b>Total Questions</b></td><td>${totalQuestions}</td></tr>
          <tr><td><b>Total Attempts</b></td><td>${attemptedCount}</td></tr>
          <tr><td><b>Correct Answers</b></td><td>${correctCount}</td></tr>
          <tr><td><b>Wrong Answers</b></td><td>${wrongCount}</td></tr>
          <tr><td><b>Total Test Duration</b></td><td>${testDuration} min</td></tr>
          <tr><td><b>Total Time Taken</b></td><td>${totalTimeTakenMin} min</td></tr>
          <tr><td><b>Marks Per Question</b></td><td>${marksPerQuestion}</td></tr>
          <tr><td><b>Negative Marking</b></td><td>${negativeMarking !== 0 ? negativeMarking : "N/A"}</td></tr>
          <tr><td><b>Total Marks</b></td><td>${totalMarks}</td></tr>
          <tr><td><b>Your Marks</b></td><td>${yourMarks}</td></tr>
          <tr><td><b>Result</b></td><td style="font-weight:bold; color:${yourMarks >= passingMarks ? "green" : "red"}">${resultStatus}</td></tr>
        </tbody>
      </table>
    `;

    resultDiv.scrollIntoView({ behavior: "smooth" });
  }

  // ✅ Manual submission (via button)
  if (resultButton) {
    resultButton.addEventListener("click", function () {
      // Confirmation modal
      const modal = document.createElement("div");
      modal.className = "confirm-modal";
      modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-box">
          <h3>Are you sure you want to submit your test?</h3>
          <div class="modal-actions">
            <button class="yes-btn">Yes, Show Result</button>
            <button class="no-btn">No, Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector(".no-btn").addEventListener("click", () => modal.remove());
      modal.querySelector(".yes-btn").addEventListener("click", () => {
        modal.querySelector(".modal-box").innerHTML = `<h3>Loading result ...</h3>`;
        setTimeout(() => {
          modal.remove();
          resultButton.classList.add("hide");
          calculateAndShowResult();
        }, 3000);
      });
    });
  }

  // ⏰ Auto-submit when time finishes
  setTimeout(() => {
    const modal = document.createElement("div");
    modal.className = "confirm-modal";
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-box">
        <h3>⏰ Time's up! Submitting your test...</h3>
      </div>
    `;
    document.body.appendChild(modal);

    // Wait 3 seconds, then auto show result
    setTimeout(() => {
      modal.remove();
      if (resultButton) resultButton.classList.add("hide");
      calculateAndShowResult();
    }, 3000);
  }, testDurationMs);
});
