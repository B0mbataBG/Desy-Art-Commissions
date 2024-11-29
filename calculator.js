console.log("Script loaded successfully");


document.addEventListener("DOMContentLoaded", function () {
    const illustrationType = document.getElementById('illustrationType');
    const modelComplexityGroup = document.getElementById('modelComplexity').closest('.form-group');
    const privacyFeeGroup = document.getElementById('privacyFee').closest('.form-group');


    const params = new URLSearchParams(window.location.search);
    const type = params.get('type'); // Get the type from URL parameter

    if (type) {
        const selectElement = document.getElementById('illustrationType');
        selectElement.value = type; // Set the value based on the URL parameter
        
        updateAddons();
        
        modelComplexityGroup.style.display = "block";
        privacyFeeGroup.style.display = "block";
        addons.style.display = "block";
    }
    else{

        // Initially hide the complexity slider and NDA checkbox
        modelComplexityGroup.style.display = "none";
        privacyFeeGroup.style.display = "none";
        addons.style.display = "none";
    }

    illustrationType.addEventListener('change', function () {
        if (illustrationType.value === "") {
            // Hide the complexity slider and NDA checkbox if no illustration type is selected
            modelComplexityGroup.style.display = "none";
            privacyFeeGroup.style.display = "none";
            addons.style.display = "none";

        } else {
            // Show the complexity slider and NDA checkbox if a valid type is selected
            modelComplexityGroup.style.display = "block";
            privacyFeeGroup.style.display = "block";
            addons.style.display = "block";

        }
        updateAddons();
    });

    document.getElementById('privacyFee').addEventListener('change', updateTotal);
    document.getElementById('modelComplexity').addEventListener('input', updateComplexity); // Add event listener for slider

    

    function updateAddons() {
        console.log("updateAddons called");  // This line helps to debug if the function is actually called

        const addonsContainer = document.getElementById('addons');
        addonsContainer.innerHTML = ''; // Clear previous add-ons
        const illustrationType = document.getElementById('illustrationType').value;

        let addons = '';
        switch (illustrationType) {
            
            case 'fullBodyArt':
                addons += `

                    <h3>Includes</h3>

                        <label>Rig Ready PSD File</label><br>
                        <label>3 Expressions</label><br> 
                
                    <h3>Add Ons</h3>
                    <div class="form-group">
                        <label><input type="checkbox" class="nudeBase" value="200"> Nude Base - $200</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="armToggles" value="100"> Arm Toggles - $100+ (Depending on complexity)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="extraHairstyles" value="300"> Extra Hairstyles - $300</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="tongueOut" value="15"> Tongue Out - $15</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="toggles" value="50"> Toggles - $50+ (Depending on complexity)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="outfits" value="500"> Outfits - $500+ (Depending on complexity)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="expressions" value="50"> Additional Expressions - $50 (Includes 3 free expressions)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="characterSheet" value="300"> No Character Sheet and Need a Design - $300</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="wingsEarsTail" value="50"> Wings/Ears/Tail - $50 (Depending on complexity)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="rushFee" value="0"> Rush Fee - 50%</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="companies" value="0"> Companies - 150%</label>
                    </div>
                `;
                break;

            case 'fullBodyRig':
                addons += `
                    <h3>Includes</h3>

                        <label>Advanced Physics</label><br>
                        <label>3 Expressions</label><br>
                        <label>60 Degree Head Angles</label><br>
                        <label>25 Mouth Forms</label> 

                    <h3>Add Ons</h3>
                    <div class="form-group">
                        <label><input type="checkbox" class="extraExpressions" value="50"> Extra Expressions - $50 Each</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="armToggles" value="100"> Arm Toggles - $100</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="toggles" value="50"> Toggles - $50</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="props" value="50"> Props (Weapons/Crowns/Halos/etc) - $50</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="extraOutfits" value="500"> Extra Outfits - $500 Each</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="extraHair" value="350"> Extra Hair - $350 Each</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="vbridger" value="250"> Vbridger - $250</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="tongueOut" value="100"> Tongue Out - $100</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="advancedHeadAngles" value="500"> Advanced Head Angles (70-90 Degrees) - $500</label>
                    </div>
                    <div class="form-group">
                        <label><input type="checkbox" class="rushFee" value="0"> Rush Fee - 50%</label>
                    </div>
                `;
                break;

            case 'chibiArtRig':
                console.log("Updating addons for Chibi Art & Rig");

                addons += `
                    <h3>Add-Ons</h3>
                    <div class="form-group">
                        <label><input type="checkbox" id="extraHair" value="100"> Additional Hairstyle (varries on complexity between $50-$200) </label>
                    </div>
                    
                    <div class="form-group">
                        <label><input type="checkbox" value="0">Cheek Puff and Mouth X (free)</label>
                    </div>

                    <div class="form-group">
                        <label><input type="checkbox" class="nudeBaseFree" value="0"> Nude Base (free)</label>
                    </div>

                    <div class="form-group">
                        <label><input type="checkbox" id="tongueOut" value="50"> Tongue Out (+$50)</label>
                    </div>

                    <h3>Extras</h3>
                    <div class="form-group" id="extras-checkboxes">
                        <label><input type="checkbox" id="prop" value="70"> Prop (+$<span id="propPrice">70</span>)</label>
                        <label><input type="checkbox" id="mascot" value="150"> Pets / Mascot (+$<span id="mascotPrice">150</span>)</label>
                        <label><input type="checkbox" id="animalEars" value="70"> Animal Ears (+$<span id="animalEarsPrice">70</span>)</label>
                        <label><input type="checkbox" id="horns" value="75"> Horns (+$<span id="hornsPrice">75</span>)</label>
                    </div>
                    
                    <div class="form-group">
                        <label for="expressions">Additional Expressions: <span id="expressionsValue">0</span></label>
                        <input type="range" id="expressions" min="0" max="5" value="0">
                    </div>

                    <div class="form-group">
                        <label for="animatedExpressions">Animated Expressions: <span id="animatedExpressionsValue">0</span></label>
                        <input type="range" id="animatedExpressions" min="0" max="3" value="0">
                    </div>

                    <div class="form-group">
                        <label for="handPoses">Arm / Hand Poses: <span id="handPosesValue">0</span></label>
                        <input type="range" id="handPoses" min="0" max="3" value="0">
                    </div>

                    <div class="form-group">
                        <label for="toggledParts">Toggled Parts: <span id="toggledPartsValue">0</span></label>
                        <input type="range" id="toggledParts" min="0" max="3" value="0">
                    </div>

                `;

                break;
        }

        //console.log("Generated HTML:", addons);  // Check what HTML is generated
        console.log(addonsContainer.innerHTML);

        addonsContainer.innerHTML = addons;

        document.querySelectorAll('#addons input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', updateTotal);
        });

        if (illustrationType == 'chibiArtRig') {
            attachEventListenersForSliders();
        }

        updateTotal();
        }

    function attachCheckboxEventListeners() {
        document.querySelectorAll('#addons input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', updateTotal);
        });
    }

    function attachEventListenersForSliders() {
        document.getElementById('expressions').addEventListener('input', function() {
            updateTotal();
            document.getElementById('expressionsValue').textContent = document.getElementById('expressions').value;
        });
        document.getElementById('animatedExpressions').addEventListener('input', function() {
            updateTotal();
            document.getElementById('animatedExpressionsValue').textContent = document.getElementById('animatedExpressions').value;
        });
        document.getElementById('handPoses').addEventListener('input', function() {
            updateTotal();
            document.getElementById('handPosesValue').textContent = document.getElementById('handPoses').value;
        });
        document.getElementById('toggledParts').addEventListener('input', function() {
            updateTotal();
            document.getElementById('toggledPartsValue').textContent = document.getElementById('toggledParts').value;
        });
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
    
        // Get the commission type and complexity level
        const complexityLevel = parseInt(document.getElementById('modelComplexity').value);
        const commissionType = document.getElementById('illustrationType').value;
    
        // Adjust price based on complexity and commission type
        switch (commissionType) {
            case 'fullBodyArt':
                totalCost += complexityLevel * 25;  // $25 per complexity level
                break;
            case 'fullBodyRig':
                totalCost += complexityLevel * 50;  // $50 per complexity level
                break;
            case 'chibiArtRig':
                totalCost += complexityLevel * 15;  // $15 per complexity level
                const expressionsLevel = parseInt(document.getElementById('expressions').value);
                const animatedExpressionsLevel = parseInt(document.getElementById('animatedExpressions').value);
                const handPosesLevel = parseInt(document.getElementById('handPoses').value);
                const toggledPartsLevel = parseInt(document.getElementById('toggledParts').value);

                totalCost += expressionsLevel * 15; // $15 per level of Additional Expressions
                totalCost += animatedExpressionsLevel * 30; // $30 per level of Animated Expressions
                totalCost += handPosesLevel * 70; // $70 per level of Arm / Hand Poses
                totalCost += toggledPartsLevel * 25; // $25 per level of Toggled Parts

                break;

            // Add more cases as necessary
        }
    
        // Calculate flat fee updates from checkboxes
        document.querySelectorAll('#addons .form-group input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                totalCost += parseFloat(checkbox.value);
            }
        });
    
        // Percentage-based fee calculations
        let percentageIncrease = 0;
        if (document.querySelector('.rushFee')?.checked) {
            percentageIncrease += 50;  // Adding 50%
        }
        if (document.querySelector('.companies')?.checked) {
            percentageIncrease += 150; // Adding 150%
        }

        if (document.getElementById('privacyFee').checked) {
            totalCost *= 2;
        }
    
        totalCost += (totalCost * percentageIncrease / 100); // Apply the total percentage increase
    
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);
        document.getElementById('complexityValue').textContent = complexityLevel;

    }
    
    
});



document.querySelectorAll('#addons input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateTotal);
});


window.onload = function() {

    const selectElement = document.getElementById('illustrationType');
    const defaultOption = selectElement.options[selectElement.selectedIndex];
    defaultOption.style.fontStyle = 'italic';

};
