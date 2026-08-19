window.DINNER_WHEEL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDYBsLduV9Du78PaN6tXDsX09MN-7z_4hA",
  authDomain: "dinner-wheel-61c2a.firebaseapp.com",
  projectId: "dinner-wheel-61c2a",
  storageBucket: "dinner-wheel-61c2a.firebasestorage.app",
  messagingSenderId: "624209509587",
  appId: "1:624209509587:web:efafd7b68cc504c9de6826"
};

// MealPick UI copy override
window.MEALPICK_START_LABEL = "😋 開抽美食";
(function(){
  function applyMealPickStartLabel(){
    var centerText = document.getElementById('centerText');
    if (centerText && centerText.textContent.trim() === '開始決定') {
      centerText.textContent = window.MEALPICK_START_LABEL;
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMealPickStartLabel);
  } else {
    applyMealPickStartLabel();
  }
  setTimeout(applyMealPickStartLabel, 0);
  setTimeout(applyMealPickStartLabel, 300);
})();
