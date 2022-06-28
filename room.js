username = localStorage.getItem('username');
document.getElementById('welcome_h2').innerHTML = "Welcome!!! " + username;

function create_room(){
    window.location = 'create_room.html';
}

function join_room(){
    window.location = 'join_room.html';
}

function logout(){
    localStorage.removeItem('username');
    window.location = 'index.html';
}