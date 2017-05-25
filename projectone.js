

$(document).ready(function(){
//variables
  var mastercolour="red",count=0,timecount=60;
  var audio;

  var keys=['b1','b2','b3','b4',
            'b5','b6','b7','b8',
            'b9','b10','b11','b12'];

  var colours=["red","blue","yellow",
              "green","orange","purple",
              "pink","black","grey",
              "lightblue","lightgreen","magenta"];

var timer=setInterval(function(){roundtimer()},1000);


//initialize board
setaudio();
resetboard();

//calls keypess function on button click
$('.button').click(function(){ keypress($(this).attr('id')); });
$('#mute').click(function(){muteaudio()});

//function deffinitions
function setaudio(){

  if (localStorage.getItem('audio')===null){
    localStorage.setItem('audio','true');
    audio='true';
  }
  audio=localStorage.getItem('audio');
  console.log(audio);
}


//mutes audio sets for whole game can be adjusted on every screen
function muteaudio(){


  if (audio==='true'){
    $('.bg_audio').trigger('pause');
    $('#mute').text('Play Audio');
    audio='false';
    localStorage.setItem('audio','false');
    console.log('Mute audio');
  }
  else {
    $('.bg_audio').trigger('play');
    $('#mute').text('Mute Audio');
    console.log('Play audio');
    localStorage.setItem('audio','true');
    audio='true';

  }


}

//operates timer
function roundtimer(){
  timecount--;

  //if countdown has not reached zero decrement clock
  if (timecount<=0){
    localStorage.setItem('curscore',count);
    window.location.href = "projectoneend.html";
  }

  //else end game
  else{
    $('.timer').text('00:'+timecount.toString());
  }
}

//resets game board
function resetboard(){
  $('#counter').text("Score:"+count.toString());
  //randomize colours
  colours=shuffleArray(colours);

  //setmaster colour
  mastercolour=colours[Math.floor(Math.random() * 11)];
  $('.mastercolour').attr("class",mastercolour+" mastercolour");

  //set board colours
  for (var i=0; i<keys.length;i++){
      $('#'+keys[i]).attr("class",colours[i]+" button");
  }
}

//handels a key press
function keypress(object){

  //if pick is correct
  if (colours[keys.indexOf(object)]==mastercolour){
    count++;
    localStorage.setItem('curscore',count);
    resetboard();
  }
  //if it is incorrect
  else{
    localStorage.setItem('curscore',count);
    window.location.href = "projectoneend.html";
  }

}


//shuffles array Professors code
function shuffleArray(myArray) {
  var currentIndex = myArray.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = myArray[currentIndex];
    myArray[currentIndex] = myArray[randomIndex];
    myArray[randomIndex] = temporaryValue;
  }

  return myArray;
}

});
