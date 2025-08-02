document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const mineralsInput = document.getElementById('mineralsInput');
    const generateBtn = document.getElementById('generateBtn');
    const badgesContainer = document.getElementById('badgesContainer');
    const printBtn = document.getElementById('printBtn');
    const badgeSizeSlider = document.getElementById('badgeSize');
    const badgeSizeValue = document.getElementById('badgeSizeValue');
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    // Modal elements
    const editMineralModal = document.getElementById('editMineralModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelEditBtn = document.getElementById('cancelEditMineral');
    const saveEditBtn = document.getElementById('saveEditMineral');
    
    // State references that can be updated from event listeners
    const currentSizeRef = { value: 100 }; // Default size percentage
    const currentFontScaleRef = { value: 100 }; // Default font scale percentage
    
    // Load saved settings
    const { currentSize, currentFontScale } = loadSavedSettings(
        mineralsInput, 
        badgeSizeSlider, 
        badgeSizeValue, 
        fontSizeSlider, 
        fontSizeValue
    );
    
    // Update reference values
    currentSizeRef.value = currentSize;
    currentFontScaleRef.value = currentFontScale;
    
    // Setup event listeners
    setupEventListeners(
        mineralsInput, 
        badgeSizeSlider, 
        badgeSizeValue, 
        fontSizeSlider, 
        fontSizeValue,
        generateBtn,
        printBtn,
        badgesContainer,
        currentSizeRef,
        currentFontScaleRef
    );
    
    // Generate badges when the button is clicked
    generateBtn.addEventListener('click', function() {
        generateBadges(
            mineralsInput, 
            badgesContainer, 
            printBtn, 
            currentSizeRef.value, 
            currentFontScaleRef.value
        );
    });
    
    // Modal event listeners
    closeModalBtn.addEventListener('click', closeEditMineralModal);
    cancelEditBtn.addEventListener('click', closeEditMineralModal);
    
    // Close modal when clicking outside of it
    editMineralModal.addEventListener('click', function(event) {
        if (event.target === editMineralModal) {
            closeEditMineralModal();
        }
    });
    
    // Save button functionality
    saveEditBtn.addEventListener('click', function() {
        saveMineralEdit(mineralsInput, badgesContainer, printBtn, currentSizeRef.value, currentFontScaleRef.value);
    });
});