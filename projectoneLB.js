$(document).ready(function(){

var audio='true';

updateLBlocal();

$('#mute').click(function(){muteaudio()});


//function definition

//updates the highscores on the leadeboard if there are
//no highscores in local storage then the defaults are
//saved to local storage
function updateLBlocal(){
  //if there are no local scores the defaults are loaded
  if(localStorage.getItem('localscores') ===null){
    console.log('default scores loaded')
    var highscores=[
      {user:'Tom', score:1000},
      {user:'Bill', score:60},
      {user:'Ted', score:45},
      {user:'Fred', score:20},
      {user:'Bert', score:10}
    ]

    localStorage.setItem('localscores',JSON.stringify(highscores));
  }

  //if local scores are present then they are loaded
  else {
    console.log("local high scores loaded")
    var highscores=JSON.parse(localStorage.getItem('localscores'));
  }
  //adds high scores to page
  for (var i=0; i<5;i++){
   var name=highscores[i].user;
   var score=highscores[i].score;
   var n=(i+1);

   $('#'+n).text(n+ ': '+name+" : "+score);
  }

}

//mutes the audio if it is playing or plays it if it is muted
function muteaudio(){
  if (audio==='true'){
    $('.bg_audio').trigger('pause');
    $('#mute').text('Play Audio');
    audio='false';
  }
  else {
    $('.bg_audio').trigger('play');
    $('#mute').text('Mute Audio');

    audio='true';

  }


}
});
