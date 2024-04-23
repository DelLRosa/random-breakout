window.addEventListener("load", function(){
    const form = this.document.getElementById("namesForm")

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const namesInput = document.getElementById('namesInput').value; 
        const numStudentInput = parseInt(document.getElementById("numInput").value);

        let namesArray = namesInput.split(",");
        namesArray = namesArray.map(function(name){
            return name.trim();
        });

        console.log(namesArray);
        console.log(numStudentInput);
    });

    function randomize(nameArray,numStudents){
        
    }

})