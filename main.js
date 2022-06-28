function user_login(){
    var username = document.getElementById("username_input").value;
    localStorage.setItem("username", username);
    window.location = "room.html";
}