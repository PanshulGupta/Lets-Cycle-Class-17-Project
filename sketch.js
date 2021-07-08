var path,cyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkGroup, yellowGroup,redGroup; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  bell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(1200,300);
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  cyclist  = createSprite(70,150);
  cyclist.addAnimation("SahilRunning",mainRacerImg1);
  cyclist.scale=0.07;
    
  cyclist.setCollider("rectangle",0,0,40,40);
  
  pinkGroup = new Group();
  redGroup = new Group();
  yellowGroup = new Group();

  gameOver = createSprite(650,150);
  gameOver.scale = 0.8;
  gameOver.addImage(gameOverImg);

  gameOver.visible = false;    
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   cyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   cyclist .collide(edges);
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  if(keyDown("space")) {
    bell.play();
  }
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCycle();

    } 
    
    else if (select_oppPlayer == 2) {
      yellowCycle();

    }
    
    else {
      redCycle();

    }
  }
  
   if(pinkGroup.isTouching(cyclist)){
      gameState = END;
      player1.addAnimation("opponentPlayer1",oppPink2Img);
      player1.velocityY = 0;

    }
    
    if(redGroup.isTouching(cyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(yellowGroup.isTouching(cyclist)){
      gameState = END;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
      player2.velocityY = 0;

    }
    

    
  }

  else if (gameState === END) {
      gameOver.visible = true;
    
      textSize(20);
      fill(255);
      text("Hit the UP ARROW to restart", 500,200);
    
      path.velocityX = 0;
      cyclist.velocityY = 0;
      cyclist.addAnimation("SahilRunning",mainRacerImg2);
    
      pinkGroup.setVelocityXEach(0);
      pinkGroup.setLifetimeEach(-1);
    
      yellowGroup.setVelocityXEach(0);
      yellowGroup.setLifetimeEach(-1);
    
      redGroup.setVelocityXEach(0);
      redGroup.setLifetimeEach(-1);
      
      if(keyDown("Up_Arrow")) {
        reset();
      }
  }
}

function pinkCycle(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPink1Img);
  player1.setLifetime=170;
  pinkGroup.add(player1);
}

function yellowCycle(){
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.addAnimation("opponentPlayer2",oppYellow1Img);
  player2.velocityX = -(6 + 2*distance/150);
  player2.setLifetime=170;
  yellowGroup.add(player2);
}

function redCycle(){
  
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRed1Img);
  redGroup.add(player3);
  player3.setLifetime=170;

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  cyclist.addAnimation("SahilRunning",mainRacerImg1);

  pinkGroup.destroyEach();
  yellowGroup.destroyEach();
  redGroup.destroyEach();
  distance = 0;
}