// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Mobile Navigation Elements
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentSections = document.querySelectorAll('.content-section');
  
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

    // Mobile Navigation Functions
    function toggleSidebar() {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Toggle hamburger icon
      const icon = hamburger.querySelector('i');
      if (sidebar.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    }

    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.querySelector('i').className = 'fas fa-bars';
    }

    // Navigation Functions
    function showSection(targetId) {
      // Hide all sections
      contentSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
      
      // Update active nav link
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetId}`) {
          link.classList.add('active');
        }
      });
    }

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile navigation event listeners
    if (hamburger) {
      hamburger.addEventListener('click', toggleSidebar);
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Navigation link event listeners
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          showSection(targetId);
        } else {
          // Mobile: allow normal scrolling, just close sidebar
          closeSidebar();
        }
      });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          sidebar.classList.contains('active') && 
          !sidebar.contains(e.target) && 
          !hamburger.contains(e.target)) {
        closeSidebar();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    });

    // Initialize
    initializeTheme();
    
    // Show home section by default on desktop only
    if (window.innerWidth > 768) {
      showSection('home');
    }
  });