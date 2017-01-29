//build the board.
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
for(i=0;i<4;i++){
  for(j=0;j<4;j++){
    ctx.moveTo(0,125*j);
    ctx.lineTo(500,125*j);
    ctx.stroke();

    ctx.moveTo(125*i,0);
    ctx.lineTo(125*i,500);
    ctx.stroke();
     }}

     // variables used
     var x=0.0;
     var y=0.0;
     var random = Math.floor((Math.random() * 10) + 2);
     var dx =0.0;
     var dy=0.0;
     var row = 0;
     var column = 0;
     var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
     var square_check;
     var vertical_check;
     var horizontal_check;
     var hor;
     var ver;
     var helper;
     var total=0;
     var score = 1;

     var visited = localStorage.getItem('visited');
     if (!visited) {
       alert("Click on Play to start the Game!\nRead the Tutorial before starting =]");
       localStorage.setItem('visited', true);
 }

     $("a").click(function(){

     // set up the first random number
     setTimeout(function(){
      $("#number").html(random);
    },1000);



   $("#myCanvas").click(function(){
     getCursorPosition(myCanvas, event);
     getTab(x,y);
     getCord(row,column);
     if (board[row][column]==0){
       board[row][column]= random;
       ctx.fillStyle = "#191970";
       ctx.font = "bold 40px Arial";
       ctx.fillText(random, dy, dx);
       $("#number").html(" ");

          var  indexes = get_all(board,row,column)
       console.log(indexes);
       if (indexes != 0){

         for (var i=0 ; i< 4;i++){
              clearTab(indexes[i][1],indexes[i][0]);
              board[indexes[i][0]][indexes[i][1]]=0;
            }
            total += (20 +Math.floor((Math.random() * 20) + 1));
            console.log(total);
            var s = "Score: "+total
            $("#score").html(s);
         }
       }
       if (checkStatus()==false){
         if(!alert('Game Over, You Lost!')){window.location.reload();}
       }
       setTimeout(getRandomNumber, 500);


   });
});

 // list of functions used.
   function getTab(x,y){
     row = 0;
     column = 0 ;
     while(x > 125) {
       x -= 125;
       column ++;
     }
    while(y > 125) {
        y -= 125;
        row++
      }
      console.log("row: "+ row + " column: "+column);
   }

   function getCord(x,y){
     dx = (x)*125 + 70;
     dy = (y)*125 + 50;
   }

   function getRandomNumber(){
     var tab = [1,1,2,3,4,4,1,5,1,5,6,7,5,7,8,9,10,11,11,1];
     var ran = Math.floor((Math.random() * 10) + 10);
     random = tab[ran];
     $("#number").html(random);
   }
   function getCursorPosition(canvas, event) {
     var rect = myCanvas.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
 }


 function get_all(data,i,j){
  var horiz;
  var vert;
  var squar;
  var square_index;
  var result=0;
  var x;
  var y;

  horiz = horizontal(data,i);
  vert = vertical(data,j);
  squar = square(data,i,j,false);
  square_index = square(data,i,j,true);
    for (var c=0; c< squar.length; c++){
      if (checkDiv(squar[c]) == true) {
        result = square_index[c];
        return result;
      }
    }

    if (checkDiv(horiz)==true){
      result = [[i,0],[i,1],[i,2],[i,3]];
      return result;
    }
    if (checkDiv(vert)==true){
      helper = vert;
      result = [[0,j],[1,j],[2,j],[3,j]];
      return result;
    }

    return result;
 }

 function horizontal(data,i){

  return data[i];
}

function vertical(data,j){
  var result = [];
  for(i=0 ; i<data.length; i++){
    result.push(data[i][j]);
  }

  return result;
}

function square(data,i,j,index){

  var result = [];
  var square1;
  var square2;
  var square3;
  var square4;
  var square5;
  var square6;
  var square7;
  var square8;
  var square9;


  if(index == true){

    square1=[[0,0],[0,1],[1,0],[1,1]];
    square2=[[0,1],[0,2],[1,1],[1,2]];
    square3=[[0,2],[0,3],[1,2],[1,3]];
    square4=[[1,0],[1,1],[2,0],[2,1]];
    square5=[[1,1],[1,2],[2,1],[2,2]];
    square6=[[1,2],[1,3],[2,2],[2,3]];
    square7=[[2,0],[2,1],[3,0],[3,1]];
    square8=[[2,1],[2,2],[3,1],[3,2]];
    square9=[[2,2],[2,3],[3,2],[3,3]];

  }

  else if(index == false){
    square1 = [data[0][0],data[0][1],data[1][0],data[1][1]];
    square2 = [data[0][1],data[0][2],data[1][1],data[1][2]];
    square3 = [data[0][2],data[0][3],data[1][2],data[1][3]];
    square4 = [data[1][0],data[1][1],data[2][0],data[2][1]];
    square5 = [data[1][1],data[1][2],data[2][1],data[2][2]];
    square6 = [data[1][2],data[1][3],data[2][2],data[2][3]];
    square7 = [data[2][0],data[2][1],data[3][0],data[3][1]];
    square8 = [data[2][1],data[2][2],data[3][1],data[3][2]];
    square9 = [data[2][2],data[2][3],data[3][2],data[3][3]];
  }

  if(i==0){
    if(j==0){
      result = square1
    }
    else if(j==1){
      result = [square1,square2]
    }
    else if(j==2){
      result = [square2,square3]
    }
    else if(j==3){
      result = square3
    }
  }
  if(i==1){
    if(j==0){
      result = [square1,square4]
    }
    else if(j==1){
      result = [square1,square2,square4,square5]
    }
    else if(j==2){
      result = [square2,square3,square5,square6]
    }
    else if(j==3){
      result = [square3,square6]
    }
  }
  if(i==2){
    if(j==0){
      result = [square4,square7]
    }
    else if(j==1){
      result = [square4,square5,square7,square8]
    }
    else if(j==2){
      result = [square5,square6,square8,square9]
    }
    else if(j==3){
      result = [square6,square9]
    }
  }

  if(i==3){
    if(j==0){
      result = square7
    }
    else if(j==1){
      result = [square7,square8]
    }
    else if(j==2){
      result = [square8,square9]
    }
    else if(j==3){
      result = square9
    }
  }

  return result

  }

  function findMax(data){
    var max = data[0];
    for (var k=0; k<4 ; k++){
      if (max < data[k]) max = data[k];
    }
    return max
  }

  function checkDiv(data){
    var max = findMax(data);
    var test = true;
    for (var i=0; i<4; i++){
      if ( data[i]==0 || max%data[i]!=0 ) test = false;
    }
    return test;
  }

  function clearTab(x,y){
    var s = x * 125 +2;
    var t = y * 125+2;
    ctx.clearRect(s,t,123,123);
    for(i=0;i<4;i++){
      for(j=0;j<4;j++){
        ctx.moveTo(0,125*j);
        ctx.lineTo(500,125*j);
        ctx.stroke();

        ctx.moveTo(125*i,0);
        ctx.lineTo(125*i,500);
        ctx.stroke();
         }}

  }

  function checkStatus(){
    var test = false;
    for (var i=0; i<4; i++){
      for (var j=0; j<4 ; j++){
        if (board[i][j]==0) test = true;
      }
    }
    return test;
  }

  function wait(){
    return 0;
  }
