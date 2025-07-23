document.addEventListener('DOMContentLoaded', function() {
    const mineralsInput = document.getElementById('mineralsInput');
    const generateBtn = document.getElementById('generateBtn');
    const badgesContainer = document.getElementById('badgesContainer');
    const printBtn = document.getElementById('printBtn');
    const badgeSizeSlider = document.getElementById('badgeSize');
    const badgeSizeValue = document.getElementById('badgeSizeValue');
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    // Base dimensions for badges
    const baseBadgeWidth = 200;
    const baseBadgeHeight = 120;
    
    // Base font sizes
    const baseNameSize = 18;
    const baseFormulaSize = 16;
    const baseLocationSize = 14;
    
    let currentSize = 100; // Default size percentage
    let currentFontScale = 100; // Default font scale percentage
    
    // Keys for localStorage
    const STORAGE_KEYS = {
        MINERALS_TEXT: 'minerals-badges-text',
        BADGE_SIZE: 'minerals-badges-size',
        FONT_SIZE: 'minerals-badges-font-size'
    };
    
    // Function to save data to localStorage
    function saveToStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.warn('Не удалось сохранить данные в localStorage:', error);
        }
    }
    
    // Function to load data from localStorage
    function loadFromStorage(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (error) {
            console.warn('Не удалось загрузить данные из localStorage:', error);
            return defaultValue;
        }
    }
    
    // Function to load saved settings
    function loadSavedSettings() {
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
    }
    
    // Load saved settings on page load
    loadSavedSettings();
    
    // Auto-save minerals text input
    mineralsInput.addEventListener('input', function() {
        saveToStorage(STORAGE_KEYS.MINERALS_TEXT, this.value);
    });
    
    // Update size value display and apply size to existing badges
    badgeSizeSlider.addEventListener('input', function() {
        currentSize = this.value;
        badgeSizeValue.textContent = currentSize + '%';
        
        // Save to localStorage
        saveToStorage(STORAGE_KEYS.BADGE_SIZE, currentSize);
        
        // Apply size to all existing badges
        updateBadgesSize();
    });
    
    // Update font size value display and apply font size to existing badges
    fontSizeSlider.addEventListener('input', function() {
        currentFontScale = this.value;
        fontSizeValue.textContent = currentFontScale + '%';
        
        // Save to localStorage
        saveToStorage(STORAGE_KEYS.FONT_SIZE, currentFontScale);
        
        // Apply font size to all existing badges
        updateBadgesFontSize();
    });
    
    // Function to update the size of all badges
    function updateBadgesSize() {
        const badges = document.querySelectorAll('.mineral-badge');
        const newWidth = (baseBadgeWidth * currentSize / 100) + 'px';
        const newHeight = (baseBadgeHeight * currentSize / 100) + 'px';
        
        badges.forEach(badge => {
            badge.style.width = newWidth;
            badge.style.height = newHeight;
        });
        
        // Also update font sizes when badge size changes
        updateBadgesFontSize();
    }
    
    // Function to update font sizes of all badges
    function updateBadgesFontSize() {
        const badges = document.querySelectorAll('.mineral-badge');
        
        badges.forEach(badge => {
            const nameElement = badge.querySelector('.mineral-name');
            const formulaElement = badge.querySelector('.mineral-formula');
            const locationElement = badge.querySelector('.mineral-location');
            
            if (nameElement) {
                nameElement.style.fontSize = (baseNameSize * currentFontScale / 100) + 'px';
            }
            
            if (formulaElement) {
                formulaElement.style.fontSize = (baseFormulaSize * currentFontScale / 100) + 'px';
            }
            
            if (locationElement) {
                locationElement.style.fontSize = (baseLocationSize * currentFontScale / 100) + 'px';
            }
        });
    }
    
    // Generate badges when the button is clicked
    generateBtn.addEventListener('click', function() {
        generateBadges();
    });
    
    // Print badges when the print button is clicked
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Function to generate badges from input text
    function generateBadges() {
        // Clear previous badges
        badgesContainer.innerHTML = '';
        
        // Get input text and split by new line
        const mineralsList = mineralsInput.value.trim().split('\n');
        
        // Filter out empty lines
        const filteredList = mineralsList.filter(mineral => mineral.trim() !== '');
        
        if (filteredList.length === 0) {
            alert('Пожалуйста, введите хотя бы одно название минерала.');
            return;
        }
        
        // Create badge for each mineral
        filteredList.forEach(mineral => {
            const badge = document.createElement('div');
            badge.className = 'mineral-badge';
            
            // Parse mineral data by splitting on '|'
            const parts = mineral.split('|').map(part => part.trim());
            const mineralName = parts[0] || '';
            const mineralFormula = parts[1] || '';
            const mineralLocation = parts[2] || '';
            
            // Create first row container (name and formula)
            const firstRow = document.createElement('div');
            firstRow.className = 'mineral-first-row';
            
            const nameElement = document.createElement('span');
            nameElement.className = 'mineral-name';
            nameElement.textContent = mineralName;
            
            const formulaElement = document.createElement('span');
            formulaElement.className = 'mineral-formula';
            formulaElement.textContent = mineralFormula;
            
            firstRow.appendChild(nameElement);
            firstRow.appendChild(formulaElement);
            
            // Create location info element
            const locationInfo = document.createElement('div');
            locationInfo.className = 'mineral-location';
            locationInfo.textContent = mineralLocation;
            
            badge.appendChild(firstRow);
            badge.appendChild(locationInfo);
            badgesContainer.appendChild(badge);
        });
        
        // Apply current size and font size to newly created badges
        updateBadgesSize();
        
        // Show the print button if badges were created
        printBtn.style.display = 'block';
    }
    
    // Hide print button initially if no badges
    if (badgesContainer.children.length === 0) {
        printBtn.style.display = 'none';
    }
}); 