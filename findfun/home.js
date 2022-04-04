var slider = document.getElementById("myRange");
var output = document.getElementById("slideout");
output.style.alignContent="center"
output.innerHTML = "slide to decide price"; 
slider.oninput = function() {
    if(this.value<=0.1){
        output.innerHTML ="very little"
    }
    else if(this.value > 0.1 && this.value<=0.5){
        output.innerHTML ="a little"
    }
    else if(this.value>0.5 && this.value<=0.9){
        output.innerHTML ="some"
    }
    else if(this.value > 0.9 && this.value<1){
        output.innerHTML ="alot"
    }
    
} 

var noParticipants = document.getElementById("noParticipants");

var participants;
noParticipants.oninput = function(){
  participants = this.value;  
}
var selectedOption = document.getElementsByName("typeAttr")
var sele;



var funButton = document.getElementById("funButton")

funButton.onclick = function(){
    var outActivity = document.getElementById("myActivity");
    var show = document.getElementById("actRes");
    show.style.display = "inline"
    if(outActivity.innerHTML.endsWith("No activity found, try other parameters")){
        show.style.borderStyle ="solid"
        show.style.borderColor="#81383e"
    }
    for(i=0; i<selectedOption.length; i++){
    if(selectedOption[i].checked){
        sele= selectedOption[i].value;
        break;
    }
}
  

    if((sele == null || sele=="whatever") && participants == null){
        fetch('http://www.boredapi.com/api/activity?maxprice=' + slider.value)
    .then(res => res.json())
    .then((out) => {
        
        var outActivity = document.getElementById("myActivity");
        if(out.error == "No activity found with the specified parameters"){


            outActivity.innerHTML = "No activity found, try other parameters"; 

        }
        else{
        var outActivity = document.getElementById("myActivity");
        outActivity.innerHTML = out.activity;
        }
}).catch(err => console.error(err));
    }
    else if(participants == null){
        fetch('http://www.boredapi.com/api/activity?type=' + sele + '&maxprice=' + slider.value )
    .then(res => res.json())
    .then((out) => {
        var outActivity = document.getElementById("myActivity");
        if(out.error == "No activity found with the specified parameters"){


            outActivity.innerHTML = "No activity found, try other parameters"; 
        }
        else{
        var outActivity = document.getElementById("myActivity");
        outActivity.innerHTML = out.activity; 
        }
}).catch(err => console.error(err));
    }
    else if( sele == null || sele=="whatever"){
        fetch('http://www.boredapi.com/api/activity?maxprice=' + slider.value + '&participants=' + participants)
    .then(res => res.json())
    .then((out) => {
        var outActivity = document.getElementById("myActivity");
        if(out == "undefiend"){
            outActivity.innerHTML = "No activity found, try other parameters"; 
        }
        else{
        
        outActivity.innerHTML = out.activity; 
        }
}).catch(err => console.error(err));
    }
    else{

    fetch('http://www.boredapi.com/api/activity?type=' + sele + '&maxprice=' + slider.value + '&participants=' + participants)
    .then(res => res.json())
    .then((out) => {
        var outActivity = document.getElementById("myActivity");
        if(out.error == "No activity found with the specified parameters"){

            outActivity.innerHTML = "No activity found, try other parameters"; 
        }
        else{
        
        outActivity.innerHTML = out.activity; 
    }

    show.style.border = "none"
}).catch(err => console.error(err));
    }

}



var randButton = document.getElementById("randButton")

randButton.onclick = function(){
    var outActivity = document.getElementById("myActivity");
    var show = document.getElementById("actRes");
    show.style.display = "inline"
    fetch('http://www.boredapi.com/api/activity')
    .then(res => res.json())
    .then((out) => {
        
        outActivity.innerHTML = out.activity; 
}).catch(err => console.error(err));
    
}