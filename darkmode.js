// Dark mode functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const icon = darkModeToggle.querySelector('i');
    const text = darkModeToggle.querySelector('span');
    
    if (document.body.classList.contains('dark-mode')) {
      icon.className = 'fas fa-sun';
      text.textContent = 'Light Mode';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'Dark Mode';
      localStorage.setItem('darkMode', 'disabled');
    }
  }
  
  // Check for saved dark mode preference
  function initializeDarkMode() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      const darkModeToggle = document.querySelector('.dark-mode-toggle');
      if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
      }
    }
  }
  
  // Initialize dark mode when the page loads
  document.addEventListener('DOMContentLoaded', initializeDarkMode); 