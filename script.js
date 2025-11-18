
const sliders = document.querySelectorAll('.custom-range');


sliders.forEach(slider => {
  const span = document.getElementById(slider.name + '-value');
  let displayedValue = parseInt(slider.value);
  span.innerText = displayedValue;

  let animFrame = null;

  const updateDisplay = (targetValue) => {
    if (animFrame) cancelAnimationFrame(animFrame);

    const animate = () => {
      displayedValue += (targetValue - displayedValue) * 0.2;

      if (Math.abs(displayedValue - targetValue) < 0.5) {
        displayedValue = targetValue;
      }

      span.innerText = Math.round(displayedValue);

      if (displayedValue !== targetValue) {
        animFrame = requestAnimationFrame(animate);
      } else {
        animFrame = null;
      }
    };

    animate();
  };

  slider.addEventListener('input', () => {
    const targetValue = parseInt(slider.value);
    updateDisplay(targetValue);
  });
});


function calculateResult() {
  const values = {};
  sliders.forEach(slider => values[slider.name] = parseInt(slider.value));

  const scores = {
    "Front-End Developer": values.visual*2 + values.ux*2 + values.logic,
    "Back-End Developer": values.logic*2 + values.security + values.devops,
    "QA Tester / Automation": values.qa*2 + values.logic,
    "Data Analyst": values.data*2 + values.ai,
    "DevOps Engineer": values.devops*2 + values.security,
    "UX/UI Designer": values.visual*2 + values.ux*2,
    "Mobile Developer": values.mobile*2 + values.visual,
    "Game Developer": values.game*2 + values.logic,
    "Cybersecurity Specialist": values.security*2 + values.logic,
    "AI / Machine Learning Engineer": values.ai*2 + values.data + values.logic
  };

  let result = Object.keys(scores).reduce((a,b) => scores[a] > scores[b] ? a : b);

  const techs = {
    "Front-End Developer": ["HTML", "CSS", "JavaScript", "React/Angular", "Bootstrap/Tailwind"],
    "Back-End Developer": ["Node.js / Java", "SQL / MongoDB", "REST APIs", "Docker"],
    "QA Tester / Automation": ["Postman", "Selenium / Cypress", "Jira"],
    "Data Analyst": ["Excel", "SQL", "Python", "Power BI / Tableau"],
    "DevOps Engineer": ["Linux", "Docker", "Kubernetes", "AWS / Azure / GCP"],
    "UX/UI Designer": ["Figma", "Prototyping", "Design Systems"],
    "Mobile Developer": ["Flutter / React Native", "API Integration", "Mobile UI/UX"],
    "Game Developer": ["Unity / Unreal Engine", "C#", "Game Physics"],
    "Cybersecurity Specialist": ["Networking Basics", "Penetration Testing", "Linux Security"],
    "AI / Machine Learning Engineer": ["Python", "TensorFlow / PyTorch", "Data Science"]
  };

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<strong>Rol recomandat:</strong> ${result}<br>
  <h6 class="mt-2">Tehnologii recomandate:</h6>
  <ul class="text-start w-75 mx-auto">` +
    techs[result].map(t => `<li>${t}</li>`).join('') +
  `</ul>`;
  resultDiv.style.display = "block";
}
