username = localStorage.getItem('username');
document.getElementById('welcome_h2').innerHTML = "Welcome!!! " + username;

function logout(){
    localStorage.removeItem('username');
    window.location = 'index.html';
}

function addroom(){ 
    addroom_name = document.getElementById('input_room').value; firebase.database().ref("/").child(addroom_name).update({ 
        test_key : 'adding_room' 
    }).then(function() { 
        localStorage.setItem('roomname', addroom_name);
        window.location.replace("chatting_page.html");
     });
    }