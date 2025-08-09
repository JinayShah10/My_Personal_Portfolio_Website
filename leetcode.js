document.addEventListener("DOMContentLoaded", function () {
  const easyProgressCircle = document.querySelector(".easy_progress");
  const mediumProgressCircle = document.querySelector(".medium_progress");
  const hardProgressCircle = document.querySelector(".hard_progress");

  const easyLabel = document.getElementById("easy");
  const mediumLabel = document.getElementById("medium");
  const hardLabel = document.getElementById("hard");

  const totalSolvedEl = document.getElementById("totalSolved");
  const acceptanceRateEl = document.getElementById("acceptanceRate");

  // Animate ring fill from 0 to desired degree
  function animateProgress(element, start, end, duration = 1500) {
    const startTime = performance.now();

    function animate(time) {
      let elapsed = time - startTime;
      if (elapsed > duration) elapsed = duration;

      const progress = start + ((end - start) * (elapsed / duration));
      element.style.setProperty("--progress-degree", `${progress}deg`);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  async function fetchLeetCodeStats(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const parsedData = await response.json();

      // Update numeric labels inside rings
      easyLabel.textContent = `${parsedData.easySolved} / ${parsedData.totalQuestions}`;
      mediumLabel.textContent = `${parsedData.mediumSolved} / ${parsedData.totalQuestions}`;
      hardLabel.textContent = `${parsedData.hardSolved} / ${parsedData.totalQuestions}`;

      // Update concept summary
      totalSolvedEl.textContent = parsedData.totalSolved.toLocaleString();

      const acceptancePercent = parsedData.acceptanceRate;
      acceptanceRateEl.textContent = `${acceptancePercent.toFixed(2)}%`;
    } catch (error) {
      console.error("Error fetching LeetCode stats:", error);
    }
  }

  fetchLeetCodeStats("JinayShah10");
});
