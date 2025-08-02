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

// Function to open the edit mineral modal
function openEditMineralModal(badge) {
    const modal = document.getElementById('editMineralModal');
    const nameInput = document.getElementById('editMineralName');
    const formulaInput = document.getElementById('editMineralFormula');
    const descriptionInput = document.getElementById('editMineralDescription');
    const locationInput = document.getElementById('editMineralLocation');
    
    // Fill form with current mineral data
    nameInput.value = badge.dataset.name || '';
    formulaInput.value = badge.dataset.formula || '';
    descriptionInput.value = badge.dataset.description || '';
    locationInput.value = badge.dataset.location || '';
    
    // Store reference to the badge being edited
    modal.dataset.currentBadgeId = Array.from(badge.parentNode.children).indexOf(badge);
    
    // Show the modal
    modal.style.display = 'flex';
}

// Function to close the edit mineral modal
function closeEditMineralModal() {
    const modal = document.getElementById('editMineralModal');
    modal.style.display = 'none';
}

// Function to parse mineral text input
function parseMineralsInput(inputText) {
    // Get input text and split by new line
    const mineralsList = inputText.trim().split('\n');
    
    // Filter out empty lines
    const filteredList = mineralsList.filter(mineral => mineral.trim() !== '');
    
    // Parse each mineral entry
    return filteredList.map(mineral => {
        // First split by '$' to separate location from the rest
        const mainParts = mineral.split('$');
        const mainInfo = mainParts[0].trim();
        const location = mainParts.length > 1 ? mainParts[1].trim() : '';
        
        // Parse mineral main data by splitting on '|'
        const parts = mainInfo.split('|').map(part => part.trim());
        
        return {
            name: parts[0] || '',
            formula: parts[1] || '',
            description: parts[2] || '',
            location: location
        };
    });
}

// Function to generate badges from input text
function generateBadges(mineralsInput, badgesContainer, printBtn, currentSize, currentFontScale) {
    // Clear previous badges
    badgesContainer.innerHTML = '';
    
    // Parse minerals from input
    const minerals = parseMineralsInput(mineralsInput.value);
    
    if (minerals.length === 0) {
        alert('Пожалуйста, введите хотя бы одно название минерала.');
        return;
    }
    
    // Create badge for each mineral
    minerals.forEach(mineral => {
        const badge = document.createElement('div');
        badge.className = 'mineral-badge';
        
        // Store mineral data as dataset attributes
        badge.dataset.name = mineral.name;
        badge.dataset.formula = mineral.formula;
        badge.dataset.description = mineral.description;
        badge.dataset.location = mineral.location;
        
        // Create first row container (name and formula)
        const firstRow = document.createElement('div');
        firstRow.className = 'mineral-first-row';
        
        const nameElement = document.createElement('span');
        nameElement.className = 'mineral-name';
        nameElement.textContent = mineral.name;

        const formulaElement = document.createElement('span');
        formulaElement.className = 'mineral-formula';
        formulaElement.textContent = mineral.formula;
        
        firstRow.appendChild(nameElement);
        firstRow.appendChild(formulaElement);
        
        const descriptionElement = document.createElement('span');
        descriptionElement.className = 'mineral-description';
        descriptionElement.textContent = mineral.description;

        // Create location info element
        const locationInfo = document.createElement('div');
        locationInfo.className = 'mineral-location';
        locationInfo.textContent = mineral.location;
        
        badge.appendChild(firstRow);
        badge.appendChild(descriptionElement);
        badge.appendChild(locationInfo);
        badgesContainer.appendChild(badge);
        
        // Add click event listener to open edit modal
        badge.addEventListener('click', function() {
            openEditMineralModal(this);
        });
    });
    
    // Apply current size and font size to newly created badges
    updateBadgesSize(currentSize, currentFontScale);
    
    // Show the print button if badges were created
    printBtn.style.display = 'block';
}