var teamname;
var myplayers=[];
var playingXI;
var restSquad;
var myXI=[];
var Rest=[];
var XI;
var bench;
var modaltext;
var modalhead;
var save;

$(function () {
    playingXI=$('#eleven');
    restSquad=$('#others');
    modaltext=$('#modalfiller');
    modalhead=$('#modaltitle');
    save=$('#final');
    retrieveNames();
    benchInit();
    // retrieveXI();
   displayTop();
   displayXI();
   displayRest();
   save.click(function () {
       onSave();
   });

});
function benchInit() {
    Rest=myplayers;
}
function saveTeam() {
     XI=JSON.stringify(myXI);
     bench=JSON.stringify(Rest);
     if(XI){
         localStorage.setItem('playingXI',XI);
     }
     if(bench){
         localStorage.setItem('rest',bench);
     }

}
function retrieveNames() {
    let u =localStorage.getItem('username');
    let t =localStorage.getItem('teamname');
    let chnge =localStorage.getItem('myxi');
    un=JSON.parse(u);
    tn=JSON.parse(t);
    myplayers=JSON.parse(chnge);

}
function displayTop() {
    teamname=$('#team');
    teamname.append(
        $(`
             <span class="badge badge-info"><h3 class="regheading">${tn}</h3></span>        
        `)
    )
}
function displayXI() {
    retrieveNames();
    playingXI.empty();

    for(var i in myXI){
        var roler=roleDefiner(myXI[i]);
        var foreigner=removePlane(myXI[i]);
        playingXI.append(
            $(`
        <tr>
        <th scope="row">${+i+1}</th>
            <td><button id="removefromlist" onclick="removeFromXI(${i})"><i class="fa fa-thumbs-o-down"></i> </button></td>
            <td colspan="2">${myXI[i].name}</td>
            <td colspan="2">${roler}</td>
            <td>${foreigner}</td>
         </tr>
        `)

        );

    }

}
function displayRest() {
    retrieveNames();
    restSquad.empty();


    for(var i in Rest){
        var roler=roleDefiner(Rest[i]);
        var foreigner=removePlane(Rest[i]);
        restSquad.append(
            $(`
        <tr>
        <th scope="row">${+i+1}</th>
            <td><button id="addtolist" onclick="addtoXI(${i})"><i class="adder fa fa-thumbs-o-up"></i> </button></td>
            <td colspan="2">${Rest[i].name}</td>
            <td colspan="2">${roler}</td>
            <td>${foreigner}</td>
         </tr>
        `)

        );

    }
}
function addtoXI(index) {
    // retrieveXI();
    if(myXI.length < 11){
        var obj=Rest[index];
        myXI.push(obj);
        Rest.splice(index,1);
        // saveTeam();

    }
    else{
        modalhead.empty();
        modaltext.empty();
        modalhead.append("Oops something went wrong!");
        modaltext.append("All eleven positions are filled");
        var adder=$('.adder');
        adder.attr('data-target','#exampleModal');
    }
    displayRest();
    displayXI();
}
function removeFromXI(index) {
    // retrieveXI();
    var obj=myXI[index];
    Rest.push(obj);
    myXI.splice(index,1);
    displayRest();
    displayXI();
    // saveTeam();
}
function removePlane(p) {
    if(p.role %2 ==0){
        return  '<i class="fa fa-plane" id="plane"></i>';
    }
    else
        return '';
}
function roleDefiner(p) {
    if((p.role) ==1 || (p.role)==2){
        return "Batsman";
    }

    else if((p.role)==3 || (p.role)==4){
        return "Bowler";
    }

    else if((p.role)==5 || (p.role)==6){
        return "All rounder";
    }

    else if((p.role)==8 || (p.role)==7){
        return "Wicketkeeper";
    }
}


function onSave() {
    modaltext.empty();
    modalhead.empty();
    if(myXI.length != 11){
        modalhead.append("Oops something went wrong!");
        modaltext.append("You must have 11 players in your final squad");
        // data-target="#exampleModal"
    }
    else if(noWK()== true){
        modalhead.append("Oops something went wrong!");
        modaltext.append("You must have atleast one wicketkeeper in your final squad");
    }
    else if(onlyFourForeigners()==true){
        modalhead.append("Oops something went wrong!");
        modaltext.append("You must have only four foreign players in your final squad");
    }
    else if(fiveBowlers()==true){
        modalhead.append("Oops something went wrong!");
        modaltext.append("You must have atleast five bowlers/all rounders in your final squad");
    }
    else{
        modalhead.append("Success!");
        modaltext.append("You are ready to take part in the league now!");
        saveTeam();
    }
    save.attr('data-target','#exampleModal');

}
function noWK() {
    for(var a of myXI){
        if(a.role==7 || a.role == 8){
            return false;
        }
    }
    return true;

}

function onlyFourForeigners() {
    var counter=0;
    for(var a of myXI){
        if(a.role==2 || a.role==4 || a.role==6 || a.role==8 ){
            counter++;
        }
    }
    if(counter>4){
        return true;
    }
    else
        return false;
}

function fiveBowlers() {
    var counter=0;
    for(var a of myXI){
        if(a.role==3 || a.role==4 || a.role==5 || a.role==6){
            counter++;
        }
    }
    if(counter<5){
        return true;
    }
    return false;
}