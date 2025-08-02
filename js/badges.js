// Function to update the size of all badges
function updateBadgesSize(currentSize, currentFontScale) {
    const badges = document.querySelectorAll('.mineral-badge');
    const newWidth = (baseBadgeWidth * currentSize / 100) + 'px';
    const newHeight = (baseBadgeHeight * currentSize / 100) + 'px';
    
    badges.forEach(badge => {
        badge.style.width = newWidth;
        badge.style.height = newHeight;
    });
    
    // Also update font sizes when badge size changes
    updateBadgesFontSize(currentFontScale);
}

// Function to update font sizes of all badges
function updateBadgesFontSize(currentFontScale) {
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

// Function to generate badges from input text
function generateBadges(mineralsInput, badgesContainer, printBtn, currentSize, currentFontScale) {
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
        
        const descriptionElement = document.createElement('span');
        descriptionElement.className = 'mineral-description';
        // todo: replace with description
        descriptionElement.textContent = mineralName;

        // Create location info element
        const locationInfo = document.createElement('div');
        locationInfo.className = 'mineral-location';
        locationInfo.textContent = mineralLocation;
        
        badge.appendChild(firstRow);
        badge.appendChild(descriptionElement);
        badge.appendChild(locationInfo);
        badgesContainer.appendChild(badge);
    });
    
    // Apply current size and font size to newly created badges
    updateBadgesSize(currentSize, currentFontScale);
    
    // Show the print button if badges were created
    printBtn.style.display = 'block';
}