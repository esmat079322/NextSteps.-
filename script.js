// Language translations
const translations = {
  en: {
    welcome: "Welcome",
    age: "Age:",
    hobby: "Hobby / Interests:",
    dislike: "Dislikes:"
  },
  ps: {
    welcome: "ښه راغلاست",
    age: "عمر:",
    hobby: "شوق / علاقې:",
    dislike: "نه خوښوي:"
  }
};

// Show specific screen
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Change language dynamically
function setLanguage(lang){
  document.querySelectorAll('[data-key]').forEach(el=>{
    el.innerText = translations[lang][el.dataset.key];
  });
  localStorage.setItem('lang', lang);
}

// Load saved language
window.onload = () => {
  const lang = localStorage.getItem('lang') || 'en';
  setLanguage(lang);
  showScreen('welcome');
};

// Save profile inputs
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

// Simple simulation example
function generateSimulation(profile){
  const summary = `You are ${profile.age} years old. Your hobby is ${profile.hobby}. Avoid ${profile.dislike}.`;
  document.getElementById('summary').innerText = summary;
  // TODO: Add charts, graphs, advanced simulation logic
}
