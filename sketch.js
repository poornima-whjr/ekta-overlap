var PLAY = 1;
var END = 0;

var submarine;
var submarineImg;
var sea;
var invBg;
var gameState = PLAY;
var obstacleGroup;
var start,startImg;
var play, playImg;

var diverImg, whaleImg;
var score=0;

var wall


function preload() {
  submarineImg = loadImage("images/sub.png")
  seaImg = loadImage("images/bg.png");
  diverImg = loadImage("images/obs2.png");
  whaleImg = loadImage("images/obs1.png");
  startImg = loadImage("images/1120358.jpg");
  playImg=loadImage("images/Play.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sea = createSprite(500, windowHeight / 2, 10, 10);
  sea.addImage(seaImg);
 /* start=createSprite(windowWidth/2,windowHeight/1.9,20,20);
  start.addImage(startImg);*/
  
  play = createSprite(windowWidth/2, windowHeight/2, 20,20);
  play.addImage(playImg);

  sea.velocityX = -20;
  submarine = createSprite(windowWidth / 6, windowHeight / 2, 50, 50);
  submarine.addImage(submarineImg);
  submarine.scale = 1.5;
  invBg = createSprite(windowWidth / 2, windowHeight, windowWidth, 20);

  obstacleGroup = new Group();

  submarine.debug=true
  submarine.setCollider("rectangle",0,30,270,50)

  wall = createSprite(-150,height/2,10,height)
}

function draw() {
  
   //  console.log(obstacleGroup.x)



   if (gameState === PLAY) {
     
     play.visible=false;

    if (sea.x < 0) {

      sea.x = sea.width / 2;
    }


    if (keyWentDown("up")) {
      submarine.velocityY = -5;
    }
    if (keyWentUp("up")) {
      submarine.velocityY = 0;

    }
    if (keyWentUp("down")) {
      submarine.velocityY = 0;
    }
    if (keyWentDown("down")) {
      submarine.velocityY = 5;
    }
    invBg.visible = false;

    obstacles();

 /*   for(var i=0; i<obstacleGroup.length; i++){
   
      if(obstacleGroup.get(i).x<38 && obstacleGroup.get(i).x>28){    
        console.log("hello")
        score=score+10
      }
    }
*/

    obstacleGroup.overlap(wall,increaseScore)

    if(submarine.isTouching(obstacleGroup)){
      gameState=END; 
    }

  
  }


    if(gameState===END){
      sea.velocityX=0;
      obstacleGroup.destroyEach();
      play.visible=true;

    }
  drawSprites();
  fill("white");
  textSize(20);
  text("Score= "+score,30,20); 

}

function increaseScore(obs){
  score=score+10
  obs.remove()
}


function obstacles() {
  
  if (World.frameCount % 80 === 0) {
    var obstacle = createSprite(width, 200, 20, 20);
    obstacle.y = Math.round(random(100, 1000));
    //create switch statement
    rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.addImage(whaleImg);
        obstacle.setCollider("rectangle",0,0,650,200)
        break;
      case 2: obstacle.addImage(diverImg);
        break;
      default: break;


    }
    obstacle.debug=true
    obstacle.velocityX = -(10+score/2);
    obstacle.scale = 0.5;
    obstacle.depth = submarine.depth + 1;
    obstacleGroup.add(obstacle);
  }
}