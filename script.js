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
            
            // Adjust font size proportionally
            const nameElement = badge.querySelector('.mineral-name');
            const infoElement = badge.querySelector('.mineral-info');
            
            if (nameElement) {
                nameElement.style.fontSize = (18 * currentSize / 100) + 'px';
            }
            
            if (infoElement) {
                infoElement.style.fontSize = (14 * currentSize / 100) + 'px';
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
            
            const mineralName = document.createElement('div');
            mineralName.className = 'mineral-name';
            mineralName.textContent = mineral.trim();
            
            const mineralInfo = document.createElement('div');
            mineralInfo.className = 'mineral-info';
            
            // Add current date to the badge
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            mineralInfo.textContent = `Каталогизировано: ${formattedDate}`;
            
            badge.appendChild(mineralName);
            badge.appendChild(mineralInfo);
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