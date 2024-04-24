window.addEventListener("load", function(){
    const form = document.getElementById("namesForm")
    const groupDisplay = document.getElementById("groupDisplay");
    const clearButton = document.getElementById("clear");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const namesInput = document.getElementById('namesInput').value.trim(); 
        const numRooms = parseInt(document.getElementById("numInput").value);

        const namesInputValidation = validateInput(namesInput);
        const numRoomsValidation = validateInput(numRooms);

        if (namesInputValidation === "empty" || numRoomsValidation === "empty"){
            window.alert("All fields are required!");
        } else if (numRoomsValidation === "not a number" || numRooms<=0){
            window.alert("Number of rooms must be a valid number!");
        } else {
            let namesArray = namesInput.split(",");
            namesArray = namesArray.map(function(name){
                return name.trim();
            });

            let groups = randomize(namesArray, numRooms);
            let htmlContent = '';
            groups.forEach(function(group, index){
                htmlContent += `<div class="group">
                                    <h3>Group ${index + 1}</h3>
                                    <ul>`;
                group.forEach(function(student){
                    htmlContent += `<li>${student}</li>`;
                });
                htmlContent += `</ul>
                               </div>`;
            });
            groupDisplay.innerHTML = htmlContent;
        }
    });

    clearButton.addEventListener("click", function(){
        let userConfirm = window.confirm("are you sure you want to clear your class info?")
        if (userConfirm){
            form.reset();
            groupDisplay.innerHTML = "waiting for input"
        }
    });

    function validateInput(input){
        let numberInput = Number(input);
        if (input===""){
            return "empty"
        } else if (isNaN(numberInput) ){
            return "not a number";
        } else if (!isNaN(numberInput)){
            return "is a number"
        }
    }

    function randomize(nameArray,numRooms){
        let studentsPerRoom = Math.ceil(nameArray.length / numRooms);
        let randomArrays = [];

        for (let i =0; i<numRooms; i++){
            randomArrays.push([]);
        }

        while(nameArray.length>0){
            for (let i=0; i<randomArrays.length && nameArray.length; i++){
                let randIdx = Math.floor(Math.random()*nameArray.length);
                let student = nameArray.splice(randIdx,1)[0];
                randomArrays[i].push(student);
            }
        }
        return randomArrays;
    }




});