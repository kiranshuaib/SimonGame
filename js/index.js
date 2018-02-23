//variables
    var userSeq =[];
    var simonSeq =[];
    const NUM_OF_LEVELS = 20;
    var id;
    var level= 0;
    var color;
    var mode = "normal";
    var start=true;
    
    var boardSounds = [
        "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", 
        "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", 
        "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", 
        "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
        ];


//start board sequence
    $(document).ready(function(){
        
        function simon(){
        $(".start").click(function(){
            if(level ===0){
             level++;
            }
            startSequence();
        })
        }
        // strict button function
        $('.strict').on('click', function() {
        mode = "strict";
        alert("You changed the mode to: " + mode);
      })
  

  
  
//   onOff button setting
    
  $('#onoffbtn').click(function() {
      $('.off').toggleClass('on');
      start = true;
    //level = 0;
       if ($('.off').hasClass('on')) {
       $(".display").text("--");
       $('.start').removeAttr('disabled');
       simon();
       } else if (!$('.off').hasClass('on')) {
        $('.start').attr('disabled','disabled');
        userSeq =[];
        simonSeq =[]; 
        start = false;
        $(".display").text("");
        // level = 0;
        
       }
  })
     
// user pad listener
 $(".pad").click(function(){
     id = $(this).attr("id");
     color = $(this).attr("class").split(" ")[1];
     userSeq.push(id);
     console.log(id+" "+color);
     addClassSound(id,color);
    //  checking user sequence
    if(!checkUserSeq()){
       displayError();
       userSeq = [];
    }
    //  check the end of sequence
     if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS){
         level++;
         userSeq =[];
         startSequence();
     }
    //  checking for winners
        if(userSeq.length == NUM_OF_LEVELS){
            $(".display").text("WIN");
            alert("you win the game")
        }
     
   })

 
 
//  checking the user sequence against simon's sequence
function checkUserSeq(){
   for(var i=0;i<userSeq.length;i++){
       if(userSeq[i] != simonSeq[i]){
           return false;
       }
   } 
 return true;
}

// display error
function displayError(){
   console.log("error");
   var counter = 0;
  
   var  myError =setInterval(function(){
        $(".display").text("!!");
        counter++;
        if (counter == 3){
        $(".display").text(level);
        clearInterval(myError);
        userSeq =[];
        counter = 0;
       }
   },1000)
}
// simon start sequence
    function startSequence(){
        console.log(level);
      $(".display").text(level);
      getRandomNum();
       var i=0;
      var myInterval = setInterval(function(){
        id = simonSeq[i];
       color = $("#"+id).attr("class").split(" ")[1];
       console.log(id+" "+color);
        addClassSound(id,color); 
        i++;
        if(i=== simonSeq.length){
           i=0;
           clearInterval(myInterval);
       }
       },1000);
       
    }
    
//generate random number
function getRandomNum(){
    var random = Math.floor(Math.random()*4);
    console.log("random" + random);
    simonSeq.push(random);
}

//add teporary class and play sound
function addClassSound(id,color){
  $("#"+id).addClass(color+"-active");
   playSound(id);
  setTimeout(function(){
    $("#"+id).removeClass(color+"-active");
  },1000);
}


 $(".reset").click(function(){
     location.reload();
 });
//play Board Sound function
function playSound(id){
   
    var sound = new Audio(boardSounds[id]);
    sound.play();
 
}
 

});