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
  const age = parseInt(document.getElementById('age').value);
  const hobby = document.getElementById('hobby').value.trim();
  const dislike = document.getElementById('dislike').value.trim();

  if(!age || !hobby || !dislike){
    alert("Please fill all fields!");
    return;
  }

  const profile = { age, hobby, dislike };
  localStorage.setItem('profile', JSON.stringify(profile));

  generateSimulation(profile);
  showScreen('dashboard');
}

// Generate 5-year life simulation based on input
function generateSimulation(profile){
  const summaryEl = document.getElementById('summary');
  const outcomes = [];

  for(let year=1; year<=5; year++){
    outcomes.push(`Year ${year}: ${getLifeEvent(profile, year)}`);
  }

  summaryEl.innerHTML = `<h3>${translations[localStorage.getItem('lang') || 'en'].lifeSummary}</h3>` +
                        outcomes.join('<br>');
}

// Generate life event with input influence
function getLifeEvent(profile, year){
  // Positive and negative events
  const positiveEvents = [
    `improved skills in ${profile.hobby}`,
    "had a productive year at work",
    "built strong friendships",
    "focused on health and wellbeing",
    "experienced personal growth"
  ];
  const negativeEvents = [
    `faced challenges due to ${profile.dislike}`,
    "struggled with motivation",
    "minor setback at work",
    "had conflicts with someone",
    "felt stressed about responsibilities"
  ];

  // Weight positivity based on age and year
  let chancePositive = 50; // base 50%
  if(profile.age < 25) chancePositive += 10;  // younger → more growth
  if(profile.hobby.length > 3) chancePositive += 10; // active hobbies → positive

  const roll = Math.random()*100;
  if(roll < chancePositive){
    return positiveEvents[Math.floor(Math.random()*positiveEvents.length)];
  } else {
    return negativeEvents[Math.floor(Math.random()*negativeEvents.length)];
  }
}

// --------------------
// Page load logic
// --------------------
window.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  setLanguage(lang);

  // Only show dashboard if profile exists AND user has already clicked "next"
  const savedProfile = JSON.parse(localStorage.getItem('profile'));
  if(savedProfile && sessionStorage.getItem('profileEntered') === "true"){
    generateSimulation(savedProfile);
    showScreen('dashboard');
  } else {
    showScreen('welcome');
  }
});
