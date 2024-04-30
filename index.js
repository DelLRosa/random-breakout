window.addEventListener("load", function(){
    const form = document.getElementById("namesForm");
    const groupDisplay = document.getElementById("groupDisplay");
    const clearButton = document.getElementById("clear");
    const designateDriverCheckbox = document.getElementById("designateDriver");
    const groupTypeSelect = document.getElementById("groupType");

    designateDriverCheckbox.addEventListener("change", function(){
        if (this.checked) {
            console.log("Designate driver checked.");
        } else {
            console.log("Designate driver unchecked.");
        }
    });

    form.addEventListener("submit", function(event){
    event.preventDefault();
    const namesInput = document.getElementById('namesInput').value.trim(); 
    const groupType = groupTypeSelect.value;
    let numRooms = parseInt(document.getElementById("numInput").value);

    const namesInputValidation = validateInput(namesInput);
    const numRoomsValidation = validateInput(numRooms);

    if (namesInputValidation === "empty" || numRoomsValidation === "empty"){
        window.alert("All fields are required!");
    } else if (numRoomsValidation === "not a number" || numRooms <= 0){
        window.alert("Number of groups/students per group must be a valid number!");
    } else {
        let namesArray = namesInput.split(",");
        namesArray = namesArray.map(function(name){
            return name.trim();
        });

        let groups;
        if (groupType === "numGroups") {
            groups = randomize(namesArray, numRooms);
        } else if (groupType === "studentsPerGroup") {
            numRooms = Math.ceil(namesArray.length / numRooms);
            groups = randomize(namesArray, numRooms);
        }

        let htmlContent = '';
        groups.forEach(function(group, index){
            htmlContent += `<div class="group">
                                <h3>Group ${index + 1}</h3>
                                <ul>`;
            let driverIndex = Math.floor(Math.random() * group.length); // Randomly select driver
            group.forEach(function(student, studentIndex){
                htmlContent += `<li>${student}`;
                if (designateDriverCheckbox.checked && studentIndex === driverIndex) {
                    htmlContent += ` (Driver)`;
                }
                htmlContent += `</li>`;
            });
            htmlContent += `</ul>
                           </div>`;
        });
        groupDisplay.innerHTML = htmlContent;
    }
});


    clearButton.addEventListener("click", function(){
        let userConfirm = window.confirm("Are you sure you want to clear your class info?");
        if (userConfirm){
            form.reset();
            groupDisplay.innerHTML = "<p>Waiting for input...</p>";
        }
    });

    function validateInput(input){
        let numberInput = Number(input);
        if (input === ""){
            return "empty";
        } else if (isNaN(numberInput)){
            return "not a number";
        } else {
            return "valid";
        }
    }

    function randomize(nameArray, numRooms){
        let randomArrays = [];

        for (let i = 0; i < numRooms; i++){
            randomArrays.push([]);
        }

        while (nameArray.length > 0){
            for (let i = 0; i < randomArrays.length && nameArray.length; i++){
                let randIdx = Math.floor(Math.random() * nameArray.length);
                let student = nameArray.splice(randIdx, 1)[0];
                randomArrays[i].push(student);
            }
        }
        return randomArrays;
    }
});
