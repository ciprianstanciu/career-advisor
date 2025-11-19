const selectedValues = {};

document.querySelectorAll('.rating-group').forEach(group => {
  const name = group.dataset.name;
  const buttons = group.querySelectorAll('.rating-box');

  buttons.forEach(button => {
    button.addEventListener('click', () => {

      buttons.forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');


      selectedValues[name] = parseInt(button.dataset.value);
    });
  });
});


function calculateResult() {
  const values = selectedValues;

  const scores = {
    "Front-End Developer": (values.visual || 0)*2 + (values.ux || 0)*2 + (values.logic || 0),
    "Back-End Developer": (values.logic || 0)*2 + (values.security || 0) + (values.devops || 0),
    "QA Tester / Automation": (values.qa || 0)*2 + (values.logic || 0),
    "Data Analyst": (values.data || 0)*2 + (values.ai || 0),
    "DevOps Engineer": (values.devops || 0)*2 + (values.security || 0),
    "UX/UI Designer": (values.visual || 0)*2 + (values.ux || 0)*2,
    "Mobile Developer": (values.mobile || 0)*2 + (values.visual || 0),
    "Game Developer": (values.game || 0)*2 + (values.logic || 0),
    "Cybersecurity Specialist": (values.security || 0)*2 + (values.logic || 0),
    "AI / Machine Learning Engineer": (values.ai || 0)*2 + (values.data || 0) + (values.logic || 0)
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
