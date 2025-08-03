// --- Party Mode Controller ---
document.addEventListener('DOMContentLoaded', () => {
    const partyToggleButton = document.getElementById('party-mode-toggle');
    const docElement = document.documentElement;
    
    // Ensure the button actually exists on the page before adding a listener
    if (!partyToggleButton) {
        return;
    }

    let partyInterval = null; // Use a variable scoped here to hold the interval ID

    partyToggleButton.addEventListener('click', () => {
        // Toggle the 'party' class on the root <html> element
        docElement.classList.toggle('party');
        
        // Check if party mode is now active by seeing if the class exists
        if (docElement.classList.contains('party')) {
            // If party mode is ON and there's no interval running, start one.
            if (!partyInterval) {
                let hue = 0;
                partyInterval = setInterval(() => {
                    hue = (hue + 2) % 360; // Increment the hue value for the color cycle
                    // Update the CSS custom property, which the stylesheet uses for colors
                    docElement.style.setProperty('--party-hue', hue);
                }, 50); // The interval runs every 50ms for a smooth transition
            }
        } else {
            // If party mode is OFF and an interval is running, stop it.
            if (partyInterval) {
                clearInterval(partyInterval);
                partyInterval = null; // Reset the interval ID
                // Remove the inline style to ensure the element reverts to the stylesheet's base state
                docElement.style.removeProperty('--party-hue');
            }
        }
    });
});
