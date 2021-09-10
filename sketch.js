var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

 // spookySound.loop();
  tower = createSprite(500,500);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(500,500,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {

    //Movement of Ghost
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-2
    }
    
    if(keyDown("right_arrow")){
     ghost.x=ghost.x+2
    }
    
    if(keyDown("space")){
      ghost.velocityY=-10
    }
    //add Gravity
   ghost.velocityY+=0.8
    
    //Infinite Scrolling effect
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //Making Ghost to moving when it touches
   if(climbersGroup.isTouching(ghost)){
     ghost.destroy();
     gameState = "end"
   }
   
    
    //Making Ghost destroy when it touches invisibleBlockGroup
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 500,500)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;


    
    //add each door to the group
   doorsGroup.add(door)
   climbersGroup.add(climber)
   invisibleBlockGroup.add(invisibleBlock)

    
  }
}

