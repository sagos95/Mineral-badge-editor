// Function to load saved settings
function loadSavedSettings(mineralsInput, badgeSizeSlider, badgeSizeValue, fontSizeSlider, fontSizeValue) {
    let currentSize = 100;
    let currentFontScale = 100;
    
    // Load saved minerals text
    const savedText = loadFromStorage(STORAGE_KEYS.MINERALS_TEXT, '');
    if (savedText) {
        mineralsInput.value = savedText;
    }
    
    // Load saved badge size
    const savedBadgeSize = loadFromStorage(STORAGE_KEYS.BADGE_SIZE, '100');
    currentSize = parseInt(savedBadgeSize);
    badgeSizeSlider.value = currentSize;
    badgeSizeValue.textContent = currentSize + '%';
    
    // Load saved font size
    const savedFontSize = loadFromStorage(STORAGE_KEYS.FONT_SIZE, '100');
    currentFontScale = parseInt(savedFontSize);
    fontSizeSlider.value = currentFontScale;
    fontSizeValue.textContent = currentFontScale + '%';
    
    return { currentSize, currentFontScale };
}

// Setup event listeners for UI elements
function setupEventListeners(
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
) {
    // Auto-save minerals text input
    mineralsInput.addEventListener('input', function() {
        saveToStorage(STORAGE_KEYS.MINERALS_TEXT, this.value);
    });
    
    // Update size value display and apply size to existing badges
    badgeSizeSlider.addEventListener('input', function() {
        currentSizeRef.value = this.value;
        badgeSizeValue.textContent = currentSizeRef.value + '%';
        
        // Save to localStorage
        saveToStorage(STORAGE_KEYS.BADGE_SIZE, currentSizeRef.value);
        
        // Apply size to all existing badges
        updateBadgesSize(currentSizeRef.value, currentFontScaleRef.value);
    });
    
    // Update font size value display and apply font size to existing badges
    fontSizeSlider.addEventListener('input', function() {
        currentFontScaleRef.value = this.value;
        fontSizeValue.textContent = currentFontScaleRef.value + '%';
        
        // Save to localStorage
        saveToStorage(STORAGE_KEYS.FONT_SIZE, currentFontScaleRef.value);
        
        // Apply font size to all existing badges
        updateBadgesFontSize(currentFontScaleRef.value);
    });
    
    // Print badges when the print button is clicked
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Show print button only if there are badges
    if (badgesContainer.children.length === 0) {
        printBtn.style.display = 'none';
    } else {
        printBtn.style.display = 'block';
    }
}