document.addEventListener('DOMContentLoaded', function() {
    const mineralsInput = document.getElementById('mineralsInput');
    const generateBtn = document.getElementById('generateBtn');
    const badgesContainer = document.getElementById('badgesContainer');
    const printBtn = document.getElementById('printBtn');
    const badgeSizeSlider = document.getElementById('badgeSize');
    const badgeSizeValue = document.getElementById('badgeSizeValue');
    
    // Base dimensions for badges
    const baseBadgeWidth = 200;
    const baseBadgeHeight = 120;
    
    let currentSize = 100; // Default size percentage
    
    // Update size value display and apply size to existing badges
    badgeSizeSlider.addEventListener('input', function() {
        currentSize = this.value;
        badgeSizeValue.textContent = currentSize + '%';
        
        // Apply size to all existing badges
        updateBadgesSize();
    });
    
    // Function to update the size of all badges
    function updateBadgesSize() {
        const badges = document.querySelectorAll('.mineral-badge');
        const newWidth = (baseBadgeWidth * currentSize / 100) + 'px';
        const newHeight = (baseBadgeHeight * currentSize / 100) + 'px';
        
        badges.forEach(badge => {
            badge.style.width = newWidth;
            badge.style.height = newHeight;
            
            // Adjust font size proportionally for new structure
            const nameElement = badge.querySelector('.mineral-name');
            const formulaElement = badge.querySelector('.mineral-formula');
            const locationElement = badge.querySelector('.mineral-location');
            
            if (nameElement) {
                nameElement.style.fontSize = (18 * currentSize / 100) + 'px';
            }
            
            if (formulaElement) {
                formulaElement.style.fontSize = (16 * currentSize / 100) + 'px';
            }
            
            if (locationElement) {
                locationElement.style.fontSize = (14 * currentSize / 100) + 'px';
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
        
        // Apply current size to newly created badges
        updateBadgesSize();
        
        // Show the print button if badges were created
        printBtn.style.display = 'block';
    }
    
    // Hide print button initially if no badges
    if (badgesContainer.children.length === 0) {
        printBtn.style.display = 'none';
    }
}); 