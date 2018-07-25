var submit;
var showTnC;
$(function () {
    var username=$('#username');
    var teamname=$('#teamname');
    var email=$('#email');
    var password=$('#password');
    submit=$('#sub');
    showTnC=$('#showtc');

    submit.click(function () {
        savenames(username.val(),teamname.val());

    });

});
function savenames(a,b) {
    localStorage.setItem('username',JSON.stringify(a));
    localStorage.setItem('teamname',JSON.stringify(b));
}
function showModal() {
    showTnC.attr('data-target','#exampleModal');
}
