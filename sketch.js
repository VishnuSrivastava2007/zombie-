var player,playerImg,playerGun,bulletImg;
var bg;
var zombie,zombieImg;
var heart1 , heart2,heart3
var bullets=120
var GameState="fight"
var life=3 , score=0 ;
var loseS,exploS,wonS,speedrun;

function preload() {

  bg=loadImage("self design game haloween.jpg");
  playerImg=loadImage("images/shooter_2.png");
  playerGun=loadImage("images/shooter_3.png");
  zombieImg=loadImage("images/images-removebg-preview.png");
  heart1=loadImage("images/heart_1.png");
  heart2=loadImage("images/heart_2.png");
  heart3=loadImage("images/heart_3.png");
  loseS=loadSound("images/assets_lose.mp3");
  exploS=loadSound("images/assets_explosion .mp3");
  wonS=loadSound("images/assets_win.mp3");
  speedrun=loadSound("images/speedrun.mp3")
  bulletImg=loadImage("images/bullet.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  player=createSprite(160,550,70,70);
  player.addImage(playerImg);
  player.scale=0.5
  //player.debug=true
  player.setCollider("rectangle",0,0,200,400);

  zombieGroup=new Group ()
  bulletGroup=new Group ()

 h1=createSprite(1217,40,10,10)
 h1.addImage(heart1);
 h1.scale=0.4
 h1.visible=false

 h2=createSprite(1258,40,10,10)
 h2.addImage(heart2);
 h2.scale=0.4
 h2.visible=false

 h3=createSprite(1300,40,10,10)
 h3.addImage(heart3);
 h3.scale=0.4
}


function draw() {

  background(bg);
   if(GameState==="fight"){
   if(life===3){
     h3.visible=true;
     h1.visible=false;
     h2.visible=false;
   }
    if(life===2){
      h2.visible=true;
      h1.visible=false;
      h3.visible=false;
    }
    if(life===1){
      h1.visible=true;
      h2.visible=false;
      h3.visible=false;
    }
    if(life===0){
      GameState="lost"
      h1.visible=false;
    }
   if(score===100){
     GameState="WON"
   }

  if(keyDown("W")){

    player.y=player.y-10

  }

  if(keyDown("S")){
    player.y=player.y+10
  }
  if(keyDown("space")){
player.addImage(playerGun);

  }
  else if(keyWentUp("space")){
   player.addImage(playerImg)
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        score=score+1
        
      }
    }
    
  }
  if(keyWentDown("space")){
    bullet=createSprite(player.x,player.y-40,10,10);
    bullet.velocityX=20
    player.addImage(playerGun);
    bullet.shapeColor="brown"
    bulletGroup.add(bullet)
    bullets=bullets-1
    bullet.addImage(bulletImg);
    bullet.scale=0.1
    exploS.play();
  }

  else if(keyWentUp("space")){
    player.addImage(playerImg);
  }
  enimy();

   }

  drawSprites();

  if(GameState==="lost"){
    textSize(100);
    fill("red");
    text("GAME OVER",700,500);
    zombieGroup.destroyEach()
    player.destroy()
    loseS.play();
  }
else if(GameState==="WON"){
  textSize(100);
  fill("orange")
  text("You Won",windowWidth,windowHeight)
  zombieGroup.destroyEach();
  player.destroy();
  wonS.play();

}
 if(bullets===0){
   GameState="bullet"
  textSize(100);
  fill("orange")
  text("Ran Out Of Bullet ",400,400);
  loseS.play();
}
if(zombieGroup.isTouching(player)){
  for(i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life=life-1
    }
  }
  
}


textSize(30);
fill("white");
text("Score "+score,950,50);
textSize(30);
fill("white");
text("Bullets "+bullets,750,50);
}

function enimy() {

  if(frameCount%60===0){
    zombie=createSprite(random(1000,1500),random(100,500),70,70);
    zombie.addImage(zombieImg);
    zombie.scale=1
  //zombie.debug=true
  zombie.setCollider("rectangle",0,0,400,950)
    zombie.velocityX=-5

    zombieGroup.add(zombie)

  }

 
  
}
