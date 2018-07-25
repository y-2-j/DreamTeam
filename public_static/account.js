var topper;
var content;
var un;
var tn;
var balance=100;
var purse;
var players=[];
var auctiontable;
var teamdisplay;
var myplayers;
var myplay=[];
var nextpg;
var modalhead;
var modaltext;
var fillun;

$(function () {

    teamdisplay=$('#team');
    purse=$('#balance');
    auctiontable=$('#auctiontable');
    myplayers=$('#myplayers');
    nextpg=$('#nextpg');
    modalhead=$('#modaltitle');
    modaltext=$('#modalfiller');
    fillun=$('#username');
    DisplayLists();
    retrieveNames();
    balanceColor();
    teamshow();
    getPlayers(DisplayLists);
    pursedisplay();
    DisplayLists();
    nextpg.click(function () {

    });


});
function DisplayLists() {
    DisplayPlayers();
    displayMyPlayers();
}
function retrieveNames() {
    let u =localStorage.getItem('username');
    let t =localStorage.getItem('teamname');
    un=JSON.parse(u);
    tn=JSON.parse(t);
}
function balanceColor() {
    if(balance>70){
        purse.attr('class','badge badge-success');
    }
    else if(balance>30){
        purse.attr('class','badge badge-warning')
    }
    else{
        purse.attr('class','badge badge-danger');
    }
}
function teamshow() {
    fillun.append($(`
    <span> ${un}!</span>
    `));
    teamdisplay.append($(`
                <span class="badge badge-info"><h3 class="regheading">${tn}</h3></span>
    `));
}
function pursedisplay() {
    purse.empty();
    purse.append($(`
         <span><h4 class="regheading2">Remaining Balance: ${balance}<i class="fa fa-money"></i> </h4></span>
 
`))
}
function getPlayers(myFun) {
    $.getJSON("data.json",function (data) {
        players=data;
        myFun();

    });
}

function DisplayPlayers() {
    retrieveMyPlayers();
    auctiontable.empty();
    for(var i in players){
        var roler=roleDefiner(players[i]);
        var foreigner=removePlane(players[i]);
        auctiontable.append(
            $(`
        <tr>
        <th scope="row">${+i+1}</th>
            <td><button type="button" id="addtolist" class="adder" onclick="addToMyPlayers(${i})" data-toggle="modal" data-whatever="@mdo"><i class="fa fa-plus-square"></i> </button></td>
            <td>${players[i].name}</td>
            <td>${roler}</td>
            <td>${players[i].price}<i class="fa fa-money"></i> </td>
            <td>${foreigner}</td>
         </tr>   
        `)

    );
    }
}
function displayMyPlayers() {
    retrieveMyPlayers();
    myplayers.empty();
    for(var i in myplay){
        var roler=roleDefiner(myplay[i]);k
        var foreigner=removePlane(myplay[i]);
        myplayers.append(
            $(`
        <tr>
        <th scope="row">${+i+1}</th>
            <td><button id="removefromlist" onclick="deleteFromMyPlayers(${i})"><i class="fa fa-minus-square"></i> </button></td>
            <td>${myplay[i].name}</td>
            <td>${roler}</td>
            <td>${myplay[i].price}<i class="fa fa-money"></i> </td>
            <td>${foreigner}</td>
         </tr>   
        `)

        );

    }


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

function addToMyPlayers(index) {
    var icon=$('.adder');
    var obj=players[index];
    modaltext.empty();
    modalhead.empty();
    balance=balance-obj.price;
    if(balance>=0) {
        myplay.push(obj);
        players.splice(index, 1);
        // console.log(obj);
    }
    else {
        // console.log(players[index]);
        modalhead.append("Oops something went wrong!");
        modaltext.append("You don't have enough amount to buy this player");
        icon.attr('data-target','#exampleModal');
        balance=balance+obj.price;


    }

    pursedisplay();
    saveMyPlayers();
    DisplayPlayers();
    displayMyPlayers();
    balanceColor();

}

function deleteFromMyPlayers(index) {
    var obj=myplay[index];
    balance=balance+obj.price;
    players.push(obj);
    myplay.splice(index,1);
    pursedisplay();
    saveMyPlayers();
    DisplayPlayers();
    displayMyPlayers();
    balanceColor();

}
function saveMyPlayers() {
    let change1=JSON.stringify(myplay);
    let change2=JSON.stringify(players);
    let change3=JSON.stringify(balance);

        localStorage.setItem('myxi',change1);
        localStorage.setItem('others',change2);
        localStorage.setItem('purse',change3);



}
function retrieveMyPlayers() {
    let change1=localStorage.getItem('myxi');
    let change2=localStorage.getItem('others');
    let change3=localStorage.getItem('purse');

    if(change1){
        myplay=JSON.parse(change1);
    }
    if(change2){
        players=JSON.parse(change2);
    }

    if(change3){
        balance=JSON.parse(change3);
    }

}