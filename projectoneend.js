$(document).ready(function(){
      currscore=localStorage.getItem('curscore');
      //updates the score on the screen
      $('.score').text(currscore.toString()+":Aliens");

      //checks and saves the high score on click
      $('#nenter').click(function(){
        checkHSlocal()
        window.location.href = "projectone-leaderboard.html";
      });

      $('#newgame').click(function(){
        checkHSlocal()
        window.location.href = "projectone.html";
      });


      //takes user name and score and compares score to the localy
      //stored high score table if no such table exists the default
      //table is stored and the users scores are compared
      function checkHSdb(){

        var db= opendatabse('High_scores','1.0','Holds High Scores',2*1024*1024);

        db.transaction(function(tx){
          tx.executeSql('create table if not exists highscore(name,score)')
          tx.executeSql('INSERT INTO HIGHSCORE (name,score) VALUES("Tom",1000)')
          tx.executeSql('INSERT INTO HIGHSCORE (name,score) VALUES("Bill",60)')
          tx.executeSql('INSERT INTO HIGHSCORE (name,score) VALUES("Ted",45)')
          tx.executeSql('INSERT INTO HIGHSCORE (name,score) VALUES("Fred",40)')
          tx.executeSql('INSERT INTO HIGHSCORE (name,score) VALUES("Bert",10)')
        });



      }

      //takes user name and score and compares score to the localy
      //stored high score table if no such table exists the default
      //table is stored and the users scores are compared
      function checkHSlocal(){
        //takes user name from form
        var name=$('input:text').val();
        console.log("name=",name,': ',currscore);

        //if there are no local scores the defaults are loaded
        if(localStorage.getItem('localscores')===null){
          console.log('default scores loaded')
          var highscores=[
            {user:'Tom', score:1000},
            {user:'Bill', score:60},
            {user:'Ted', score:45},
            {user:'Fred', score:20},
            {user:'Bert', score:10}
          ]
          //defaults saved to local storage
          localStorage.setItem('localscores',JSON.stringify(highscores));
        }

        //if scores are present then they are loaded
        else {
          console.log("local high scores loaded")
          var highscores=JSON.parse(localStorage.getItem('localscores'));
        }
        //updates highscore list for the new high scores comparing strings need to fix
        testscore=currscore;
        testname=name;
        //for each high score
        for (var e=0; e<5; e++ ){

          //tests if the current score is higher
          if (testscore>=parseInt(highscores[e].score)){
            // if current score higher it replaces the score tested
            var tempscore=highscores[e].score;
            var tempname=highscores[e].user;

            //score tested becomes the neww curent score
            //and is compared against the rest of the array
            highscores[e].user=testname;
            highscores[e].score=testscore;

            testscore=tempscore;
            testname=tempname;

          }

        }
        //sends updated scores back to locaSl storage
        localStorage.setItem('localscores',JSON.stringify(highscores));
        //should then navigate to the leaderboard page
        for (var e=0; e<5; e++ ){
        console.log(highscores[e].user,highscores[e].score);
        }
      }


});
