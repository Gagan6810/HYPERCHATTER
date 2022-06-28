username = localStorage.getItem('username');
room_name = localStorage.getItem('roomname');
var message = "";
var updated_likes = "";


var SpeechRecognition = window.webkitSpeechRecognition;

speechrecog = new SpeechRecognition;

var synth = window.speechSynthesis;

function logout(){
    localStorage.removeItem('username');
    window.location = 'index.html';
}

function send_msg(){
    msg = document.getElementById('input_msg').value;
    firebase.database().ref(room_name).push({
        username : username,
        message : msg,
        likes : 0
    });
    document.getElementById('input_msg').value = "";
}

function voice_msg(){

    document.getElementById('input_msg').value = " ";
    speechrecog.start();
    
    
}

function voice_continue_msg(){
    speechrecog.start();
}

speechrecog.onresult = function(event){

    console.log(event);

    var speech_text = event.results[0][0].transcript;

    document.getElementById('input_msg').value += speech_text;
}

function getData(){

    firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose") { firebase_message_id = childKey; 
      message_data = childData;

      console.log(firebase_message_id);
      console.log(message_data);

      like = message_data['likes'];
     name = message_data['username'];
      message = message_data['message'];
 
      name_tag = '<h3> Username : ' + name + '<img src="user.png" id="user_img"> </h4>';
      message_tag = '<h3 id="message">' + message + '</h3>'
      like_tag = '<button class = "btn btn-warning" id="'+ firebase_message_id + '" value ="' + like +'" onclick = "update_like(this.id)">';
      span_like_tag = '<span class = "glyphicon glyphicon-thumbs-up"> like - ' +  like + '</span></button> <br>';


      row = name_tag + message_tag + like_tag + span_like_tag;
      document.getElementById('output').innerHTML += row;
    } });  }); }

getData();


function update_like(msg_id){

    console.log('User clicked like button '+ msg_id );

    button_id = msg_id;
    likes = document.getElementById(button_id).value;

    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(msg_id).update({
        likes : updated_likes
  });
}