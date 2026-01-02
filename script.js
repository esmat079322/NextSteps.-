// --------------------
// Life Simulator JS
// --------------------

// Language translations
const translations = {
  en: {
    welcome: "Welcome",
    age: "Age:",
    hobby: "Hobby / Interests:",
    dislike: "Dislikes:",
    lifeSummary: "Your 5-Year Life Path"
  },
  ps: {
    welcome: "ښه راغلاست",
    age: "عمر:",
    hobby: "شوق / علاقې:",
    dislike: "نه خوښوي:",
    lifeSummary: "ستاسې راتلونکی ۵ کلن ژوند"
  }
};

// Screen management
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Set language dynamically
function setLanguage(lang){
  document.querySelectorAll('[data-key]').forEach(el=>{
    el.innerText = translations[lang][el.dataset.key];
  });
  localStorage.setItem('lang', lang);
}

// Save user profile
function saveProfile(){
  const profile = {
    age: document.getElementById('age').value,
    hobby: document.getElementById('hobby').value,
    dislike: document.getElementById('dislike').value
  };
  localStorage.setItem('profile', JSON.stringify(profile));
  generateSimulation(profile);
  showScreen('dashboard');
}

// Generate 5-year life simulation
function generateSimulation(profile){
  const summaryEl = document.getElementById('summary');
  const chartEl = document.getElementById('chart');

  // Example random outcomes for 5 years
  const outcomes = [];
  for(let i=1; i<=5; i++){
    const yearOutcome = getRandomOutcome(profile);
    outcomes.push(`Year ${i}: ${yearOutcome}`);
  }

  // Display summary
  summaryEl.innerHTML = `<h3>${translations[localStorage.getItem('lang') || 'en'].lifeSummary}</h3>` +
                        outcomes.join('<br>');
}

// Random outcome generator
function getRandomOutcome(profile){
  const careerEvents = [
    "got a promotion at work",
    "learned a new skill",
    "changed jobs successfully",
    "started a small project",
    "faced a minor setback at work"
  ];
  const hobbyEvents = [
    `enjoyed your hobby of ${profile.hobby}`,
    "tried a new hobby",
    `spent more time on personal growth`,
    `participated in a community event`,
    `made new friends through hobbies`
  ];
  const lifeEvents = [
    "travelled to a new place",
    "met someone important",
    `avoided your dislike of ${profile.dislike}`,
    "focused on health and wellbeing",
    "learned something life-changing"
  ];

  // Randomly pick one from each category
  const career = careerEvents[Math.floor(Math.random()*careerEvents.length)];
  const hobby = hobbyEvents[Math.floor(Math.random()*hobbyEvents.length)];
  const life = lifeEvents[Math.floor(Math.random()*lifeEvents.length)];

  return `${career}, ${hobby}, and ${life}.`;
}

// --------------------
// Page load logic
// --------------------
window.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  setLanguage(lang);

  // Check if profile exists
  const savedProfile = JSON.parse(localStorage.getItem('profile'));
  if(savedProfile){
    generateSimulation(savedProfile);
    showScreen('dashboard');
  } else {
    showScreen('welcome');
  }
});
