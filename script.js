// Function to update the privacy fee based on the selected commission type
function updatePrivacyFee() {
    const selectedOption = document.getElementById('commissionType').options[document.getElementById('commissionType').selectedIndex];
    const privacyFee = selectedOption.getAttribute('data-privacy-fee');
    
    console.log("Selected Option Privacy Fee:", privacyFee); // Debugging check
    
    // Set the data-privacy-fee attribute in the checkbox, fallback to '0' if no attribute is found
    if (privacyFee) {
        document.getElementById('privacyFee').setAttribute('data-privacy-fee', privacyFee);
    } else {
        document.getElementById('privacyFee').setAttribute('data-privacy-fee', '0');
    }
}

// Initialize the page with the default privacy fee and complexity max value
window.onload = function() {
    updateCommissionType(); // Initialize the page with default values
    updateTotal(); // Initialize the total cost
};

// Update the complexity slider based on the selected commission type
document.getElementById('commissionType').addEventListener('change', function() {
    updateCommissionType(); // Recalculate everything when commission type changes
});

// Update the displayed value as the sliders are moved
document.getElementById('modelComplexity').addEventListener('input', function() {
    document.getElementById('complexityValue').textContent = this.value;
    updateTotal(); // Recalculate the total whenever slider is moved
});

document.getElementById('expressions').addEventListener('input', function() {
    document.getElementById('expressionsValue').textContent = this.value;
    updateTotal(); // Recalculate the total whenever slider is moved
});

document.getElementById('animatedExpressions').addEventListener('input', function() {
    document.getElementById('animatedExpressionsValue').textContent = this.value;
    updateTotal(); // Recalculate the total whenever slider is moved
});

document.getElementById('handPoses').addEventListener('input', function() {
    document.getElementById('handPosesValue').textContent = this.value;
    updateTotal(); // Recalculate the total whenever slider is moved
});

document.getElementById('toggledParts').addEventListener('input', function() {
    document.getElementById('toggledPartsValue').textContent = this.value;
    updateTotal(); // Recalculate the total whenever slider is moved
});

// Listen to other inputs to update the total automatically
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', updateTotal);
});

function updateTotal() {
    // Get base commission price
    const commissionType = parseInt(document.getElementById('commissionType').value);

    // Check if privacy fee checkbox is checked and get the percentage
    let privacyFeePercent = 0;
    const privacyFeeElement = document.getElementById('privacyFee');
    
    if (privacyFeeElement.checked) {
        const privacyFeeAttribute = privacyFeeElement.getAttribute('data-privacy-fee');
        console.log("Retrieved Privacy Fee Attribute:", privacyFeeAttribute); // Debugging step
        
        if (privacyFeeAttribute) {
            privacyFeePercent = parseInt(privacyFeeAttribute) || 0; // Fallback to 0 if not set
        }
    }

    console.log("Privacy Fee Percent:", privacyFeePercent); // Debugging step

    // Get all the selected options
    const modelComplexity = parseInt(document.getElementById('modelComplexity').value) * (commissionType === 1000 ? 20 : 10);

    // Additional Hairstyle set to $125
    const extraHair = document.getElementById('extraHair').checked ? 125 : 0;

    const tongueOut = document.getElementById('tongueOut').checked ? 50 : 0;
    const prop = document.getElementById('prop').checked ? (commissionType === 1000 ? 50 : 70) : 0;
    const mascot = document.getElementById('mascot').checked ? (commissionType === 1000 ? 100 : 150) : 0;
    const animalEars = document.getElementById('animalEars').checked ? (commissionType === 1000 ? 50 : 70) : 0;
    const horns = document.getElementById('horns').checked ? (commissionType === 1000 ? 60 : 75) : 0;
    const expressions = parseInt(document.getElementById('expressions').value) * (commissionType === 1000 ? 10 : 15);
    const animatedExpressions = parseInt(document.getElementById('animatedExpressions').value) * (commissionType === 1000 ? 25 : 30);
    const handPoses = parseInt(document.getElementById('handPoses').value) * (commissionType === 1000 ? 50 : 70);
    const toggledParts = parseInt(document.getElementById('toggledParts').value) * (commissionType === 1000 ? 10 : 25);
    const nudeBase = document.getElementById('nudeBase').checked ? (commissionType === 1000 ? 50 : 0) : 0;

    // Calculate base total
    let totalCost = commissionType + modelComplexity + extraHair + tongueOut + prop + mascot + animalEars + horns + expressions + animatedExpressions + handPoses + toggledParts + nudeBase;

    // Apply privacy fee if selected
    if (privacyFeePercent > 0) {
        totalCost += (totalCost * privacyFeePercent) / 100;
    }

    // Display the total cost
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
}

// Function to update the complexity slider and other variables based on the selected commission type
function updateCommissionType() {
    const selectedOption = document.getElementById('commissionType').options[document.getElementById('commissionType').selectedIndex];
    
    // Update slider max based on commission type (Full Body vs. Chibi)
    const maxComplexity = selectedOption.getAttribute('data-complexity-max');
    const complexitySlider = document.getElementById('modelComplexity');
    complexitySlider.max = maxComplexity; // Set the slider's max value
    document.getElementById('complexityValue').textContent = complexitySlider.value; // Update the display with the initial value

    // Reset slider value to 1 (default)
    complexitySlider.value = 0;
    document.getElementById('complexityValue').textContent = 0;

    // Update extras labels based on commission type
    const commissionType = parseInt(document.getElementById('commissionType').value);
    document.getElementById('propPrice').textContent = commissionType === 1000 ? 50 : 70;
    document.getElementById('mascotPrice').textContent = commissionType === 1000 ? 100 : 150;
    document.getElementById('animalEarsPrice').textContent = commissionType === 1000 ? 50 : 70;
    document.getElementById('hornsPrice').textContent = commissionType === 1000 ? 60 : 75;

    // Set max value for Animated Expressions and Toggled Parts based on commission type
    const maxAnimatedExpressions = commissionType === 1000 ? 5 : 3; // Full Body -> max 5, Chibi -> max 3
    const maxToggledParts = commissionType === 1000 ? 5 : 3; // Full Body -> max 5, Chibi -> max 3

    // Update the sliders' max values
    const animatedExpressionsSlider = document.getElementById('animatedExpressions');
    animatedExpressionsSlider.max = maxAnimatedExpressions;
    animatedExpressionsSlider.value = Math.min(animatedExpressionsSlider.value, maxAnimatedExpressions); // Ensure current value fits within the new max

    const toggledPartsSlider = document.getElementById('toggledParts');
    toggledPartsSlider.max = maxToggledParts;
    toggledPartsSlider.value = Math.min(toggledPartsSlider.value, maxToggledParts); // Ensure current value fits within the new max

    // Update the displayed values
    document.getElementById('animatedExpressionsValue').textContent = animatedExpressionsSlider.value;
    document.getElementById('toggledPartsValue').textContent = toggledPartsSlider.value;

    // Also update the privacy fee when commission type is selected
    updatePrivacyFee();
    updateTotal(); // Update the total cost based on new selection
}

function copyDiscordProfile() {
    // Copy the Discord name to the clipboard
    navigator.clipboard.writeText("muciduci5");

    // Change the hover text to "Copied"
    document.getElementById("copyHintText").textContent = "Copied";

    // Optionally, you can change it back to "Copy To Clipboard" after a short delay
    setTimeout(function() {
        document.getElementById("copyHintText").textContent = "Copy To Clipboard";
    }, 2000); // 2000 ms = 2 seconds
}




   
