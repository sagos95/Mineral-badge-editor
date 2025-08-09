// Function to load saved settings
function loadSavedSettings(mineralsInput, badgeSizeSlider, badgeSizeValue, fontSizeSlider, fontSizeValue, chemStyleCheckbox, chemBorderSlider, chemBorderValue, borderLightnessSlider, borderLightnessValue) {
    let currentSize = 100;
    let currentFontScale = 100;
    let chemStyleEnabled = false;
    let chemBorderWidth = 3;
    let badgeBorderLightness = 66; // percentage 0..100
    
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
    
    // Load Chemical lab style state
    const savedChemEnabled = loadFromStorage(STORAGE_KEYS.CHEM_STYLE_ENABLED, '0');
    chemStyleEnabled = savedChemEnabled === '1';
    if (chemStyleCheckbox) {
        chemStyleCheckbox.checked = chemStyleEnabled;
    }

    const savedChemBorder = loadFromStorage(STORAGE_KEYS.CHEM_BORDER_WIDTH, '3');
    chemBorderWidth = parseInt(savedChemBorder) || 3;
    if (chemBorderSlider && chemBorderValue) {
        chemBorderSlider.value = chemBorderWidth;
        chemBorderValue.textContent = chemBorderWidth + 'px';
    }

    // Load saved badge border lightness (for grayscale border)
    const savedLightness = loadFromStorage(STORAGE_KEYS.BADGE_BORDER_LIGHTNESS, '66');
    badgeBorderLightness = Math.min(100, Math.max(0, parseInt(savedLightness) || 66));
    if (borderLightnessSlider && borderLightnessValue) {
        borderLightnessSlider.value = String(badgeBorderLightness);
        const hex = grayscaleFromLightness(badgeBorderLightness);
        borderLightnessValue.textContent = hex;
    }

    return { currentSize, currentFontScale, chemStyleEnabled, chemBorderWidth, badgeBorderLightness };
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
    currentFontScaleRef,
    chemStyleCheckbox,
    chemBorderSlider,
    chemBorderValue,
    borderLightnessSlider,
    borderLightnessValue
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

    // Chemical lab style toggle
    if (chemStyleCheckbox) {
        chemStyleCheckbox.addEventListener('change', function() {
            const enabled = this.checked;
            document.body.classList.toggle('chemical-lab', enabled);
            saveToStorage(STORAGE_KEYS.CHEM_STYLE_ENABLED, enabled ? '1' : '0');

            // Show/hide border width control
            const control = document.getElementById('chemBorderControl');
            if (control) control.style.display = enabled ? 'block' : 'none';

            // Apply current border width when enabling
            if (enabled) {
                applyChemicalBorderWidth(parseInt(chemBorderSlider.value || '3'));
            } else {
                // Remove inline border-left styles when disabled
                resetChemicalBorderStyles();
            }
        });
    }

    // Chemical lab border width slider
    if (chemBorderSlider && chemBorderValue) {
        chemBorderSlider.addEventListener('input', function() {
            const width = parseInt(this.value);
            chemBorderValue.textContent = width + 'px';
            saveToStorage(STORAGE_KEYS.CHEM_BORDER_WIDTH, String(width));
            if (chemStyleCheckbox && chemStyleCheckbox.checked) {
                applyChemicalBorderWidth(width);
            }
        });
    }

    // Grayscale border color slider for .mineral-badge border
    if (borderLightnessSlider && borderLightnessValue) {
        borderLightnessSlider.addEventListener('input', function() {
            const lightness = Math.min(100, Math.max(0, parseInt(this.value)));
            saveToStorage(STORAGE_KEYS.BADGE_BORDER_LIGHTNESS, String(lightness));
            const hex = grayscaleFromLightness(lightness);
            borderLightnessValue.textContent = hex;
            applyBadgeBorderColor(hex);
        });
    }
}

function applyChemicalBorderWidth(widthPx) {
    const descriptions = document.querySelectorAll('.mineral-description');
    descriptions.forEach(desc => {
        desc.style.borderLeftWidth = widthPx + 'px';
        desc.style.borderLeftStyle = 'solid';
        desc.style.borderLeftColor = 'black';
    });
}

function resetChemicalBorderStyles() {
    const descriptions = document.querySelectorAll('.mineral-description');
    descriptions.forEach(desc => {
        desc.style.borderLeftWidth = '';
        desc.style.borderLeftStyle = '';
        desc.style.borderLeftColor = '';
    });
}

function grayscaleFromLightness(lightnessPercent) {
    const value = Math.round(255 * (lightnessPercent / 100));
    const clamped = Math.min(255, Math.max(0, value));
    const hex = clamped.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
}

function applyBadgeBorderColor(hexColor) {
    const badges = document.querySelectorAll('.mineral-badge');
    badges.forEach(badge => {
        badge.style.borderColor = hexColor;
    });
}