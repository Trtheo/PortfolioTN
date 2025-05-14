// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
  
    // Theme Management
    function initializeTheme() {
      const savedTheme = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        htmlElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
  
    function toggleTheme() {
      if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    }
  
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    initializeTheme();
  });