
  // Certificates Section

  document.addEventListener('DOMContentLoaded', () => {
    // Certificate Filter Elements
    const filterCheckboxes = document.querySelectorAll('.filter-item input');
    const certificateCards = document.querySelectorAll('.certificate-card');

    function filterCertificates() {
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('.filter-item input:checked'))
            .map(checkbox => checkbox.value);

        // Handle "Show All" logic
        if (selectedCategories.includes('all')) {
            // Uncheck all other checkboxes
            filterCheckboxes.forEach(checkbox => {
                if (checkbox.value !== 'all') checkbox.checked = false;
            });
            // Show all certificates
            certificateCards.forEach(card => card.style.display = 'flex');
        } else {
            // Uncheck "Show All" if other checkboxes are selected
            document.querySelector('input[value="all"]').checked = false;
            
            // Filter certificates
            certificateCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const shouldShow = selectedCategories.includes(cardCategory);
                card.style.display = shouldShow ? 'flex' : 'none';
            });
        }
    }

    // Add event listeners to all checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterCertificates);
    });

    // Initial filter on page load
    filterCertificates();
});



  document.getElementById('year').innerHTML = new Date().getFullYear();