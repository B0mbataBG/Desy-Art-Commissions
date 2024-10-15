document.getElementById('illustrationType').addEventListener('change', updateAddons);
document.getElementById('privacyFee').addEventListener('change', updateTotal);
document.getElementById('modelComplexity').addEventListener('input', updateComplexity); // Add event listener for slider

function updateAddons() {
    const addonsContainer = document.getElementById('addons');
    addonsContainer.innerHTML = ''; // Clear previous add-ons
    const illustrationType = document.getElementById('illustrationType').value;

    let addons = '';
    switch (illustrationType) {
        case 'headshot':
            addons += `
                <div class="form-group">
                    <label><input type="checkbox" id="extraCharacter"> Additional Character +$50</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="detailedBackground"> Detailed Background starts from +$15</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="props"> Additional props +15% of base price</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="rushFee"> Rush fee +$10</label>
                </div>
            `;
            break;
        case 'halfbody':
            addons += `
                <div class="form-group">
                    <label><input type="checkbox" id="extraCharacter"> Additional Character +$75</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="detailedBackground"> Detailed Background starts from +$10</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="props"> Additional props +15% of base price</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" id="rushFee"> Rush fee +$30</label>
                </div>
            `;
            break;
            case 'character_design':
                addons += `
                    <div class="form-group">
                        <label><input type="checkbox" id="extraOutfit"> Extra Outfit +$30</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="extraHairstyle"> Extra Hairstyle +$15</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="designComplexity"> Design Complexity +$5 to +$50 (Discussed)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="commercialUse"> Commercial Use +$60</label>
                    </div>
                `;
                break;
    
            case 'outfit_design':
                addons += `
                    <div class="form-group">
                        <label><input type="checkbox" id="extraOutfit"> Extra Outfit +$30</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="designComplexity"> Design Complexity +$5 to +$30 (Discussed)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="commercialUse"> Commercial Use +$20</label>
                    </div>
                `;
                break;
    
            case 'pngtuber':
                addons += `
                    <div class="form-group">
                        <label><input type="checkbox" id="complexityCharge"> Additional Charge for Design Complexity +$5</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="extraExpressions"> Additional Expressions +$20</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="extraHeadPose"> Additional Head Pose +$100</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="extraHandPose"> Additional Hand Pose +$30</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="extraAccessories"> Additional Accessories +$5 (Varies)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="animationAdded"> Added Animation +$10 (Varies)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" id="fullBodyModel"> Fullbody Model +$70 (Varies)</label>
                    </div>
                `;
                break;
    }

    addonsContainer.innerHTML = addons;

    document.querySelectorAll('#addons input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    updateTotal(); // Recalculate the total after switching options

}

function updateComplexity() {
    const complexitySlider = document.getElementById('modelComplexity');
    const complexityValue = document.getElementById('complexityValue');
    complexityValue.textContent = complexitySlider.value;
    updateTotal(); // Update the total whenever the slider changes
}

function updateTotal() {
    const basePrice = parseFloat(document.getElementById('illustrationType').selectedOptions[0].getAttribute('data-baseprice'));
    let totalCost = basePrice;

    // Model Complexity pricing adjustment
    const modelComplexity = parseInt(document.getElementById('modelComplexity').value);
    if (modelComplexity <= 3) {
        totalCost += basePrice * (modelComplexity * 0.1);
    } else if (modelComplexity > 3) {
        totalCost += basePrice * (0.3 + (modelComplexity - 3) * 0.2);
    }

    // Calculate additional costs based on checkboxes
    const illustrationType = document.getElementById('illustrationType').value;

    if (illustrationType === 'halfbody') {
        if (document.getElementById('extraCharacter')?.checked) totalCost += 75;
        if (document.getElementById('detailedBackground')?.checked) totalCost += 10;
        if (document.getElementById('rushFee')?.checked) totalCost += 30;
    } else if (illustrationType === 'headshot') {
        if (document.getElementById('extraCharacter')?.checked) totalCost += 50;
        if (document.getElementById('detailedBackground')?.checked) totalCost += 15;
        if (document.getElementById('rushFee')?.checked) totalCost += 10;
    }
    if (document.getElementById('extraOutfit')?.checked) totalCost += 30;
    if (document.getElementById('extraHairstyle')?.checked) totalCost += 15;
    if (document.getElementById('designComplexity')?.checked) totalCost += 30; // Example value, can be adjusted
    if (document.getElementById('commercialUse')?.checked) totalCost += 60;

    // PNGTuber add-ons
    if (document.getElementById('complexityCharge')?.checked) totalCost += 5;
    if (document.getElementById('extraExpressions')?.checked) totalCost += 20;
    if (document.getElementById('extraHeadPose')?.checked) totalCost += 100;
    if (document.getElementById('extraHandPose')?.checked) totalCost += 30;
    if (document.getElementById('extraAccessories')?.checked) totalCost += 5; // Example value, can vary
    if (document.getElementById('animationAdded')?.checked) totalCost += 10; // Example value, can vary
    if (document.getElementById('fullBodyModel')?.checked) totalCost += 70; // Example value, can vary

    // Apply privacy fee if selected
    if (document.getElementById('privacyFee').checked) {
        totalCost *= 1.3;
    }

    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    document.getElementById('complexityValue').textContent = modelComplexity;
}

