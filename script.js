// DOM elements
const dropdownHeader = document.querySelector('.dropdown-header');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownArrow = document.querySelector('.dropdown-arrow');
const dropdownPlaceholder = document.querySelector('.dropdown-placeholder');
const selectAllCheckbox = document.querySelector('#select-all');
const dropdownOptions = document.querySelector('.dropdown-options');
const selectedValuesDisplay = document.querySelector('#selected-values');

// Set up all event listeners
function setupEventListeners() {
  // Toggle dropdown menu on header click
  dropdownHeader.addEventListener('click', function(event) {
    dropdownMenu.classList.toggle('active');
    dropdownArrow.classList.toggle('open');
    dropdownArrow.innerHTML = dropdownMenu.classList.contains('active') ? '&#9652;' : '&#9662;';
  });
  
  // Handle clicks outside the dropdown
  document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.multi-select-dropdown');
    if (!dropdown.contains(event.target)) {
      dropdownMenu.classList.remove('active');
      dropdownArrow.classList.remove('open');
      dropdownArrow.innerHTML = '&#9662;';
    }
  });
  
  // Handle "Select All" checkbox
  selectAllCheckbox.addEventListener('change', function() {
    const checkboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
    });
    updateSelectedDisplay();
  });
  
  // Handle individual option checkboxes
  const checkboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateSelectAllCheckbox();
      updateSelectedDisplay();
    });
  });
}

// Update the "Select All" checkbox based on individual selections
function updateSelectAllCheckbox() {
  const checkboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]');
  const checkedBoxes = dropdownOptions.querySelectorAll('input[type="checkbox"]:checked');
  
  selectAllCheckbox.checked = checkboxes.length === checkedBoxes.length && checkboxes.length > 0;
  selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length;
}

// Update the display of selected items
function updateSelectedDisplay() {
  const selectedCheckboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]:checked');
  const selectedCount = selectedCheckboxes.length;
  
  // Update dropdown header
  if (selectedCount === 0) {
    dropdownPlaceholder.textContent = 'Select options';
  } else {
    const selectedValues = Array.from(selectedCheckboxes).map(cb => cb.dataset.label);
    
    if (selectedCount <= 2) {
      dropdownPlaceholder.textContent = selectedValues.join(', ');
    } else {
      dropdownPlaceholder.textContent = `${selectedCount} items selected`;
    }
  }
  
  // Update the display of selected values
  const selectedValuesArray = Array.from(selectedCheckboxes).map(cb => cb.value);
  
  if (selectedValuesArray.length === 0) {
    selectedValuesDisplay.textContent = 'None';
  } else {
    selectedValuesDisplay.textContent = selectedValuesArray.join(', ');
  }
  
  // Log to console
  console.log('Selected values:', selectedValuesArray.join(', '));
  
  return selectedValuesArray;
}

// Function to get selected values programmatically
function getSelectedValues() {
  const selectedCheckboxes = dropdownOptions.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(selectedCheckboxes).map(cb => cb.value);
}

// Initialize the dropdown when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupEventListeners);

// Make the getSelectedValues function globally accessible
window.getSelectedValues = getSelectedValues;
