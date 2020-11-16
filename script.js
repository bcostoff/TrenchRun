var canvas;
var ctx;
var gameOver = false;
var xwing = new XWingClass();
var tie = new TieClass();

var touchX = 180;
var touchY = 0;
var picsToLoad = 0;
var randInt = 5000;
const SHAKE_AMOUNT = 5;
var explosionList = [];
 
var shipPic = new Image();
var tiePic = new Image();
var tilePic = new Image();
var tilePicDark1 = new Image();
var tilePicDark2 = new Image();
var tilePicDark3 = new Image();
var tilePicDark4 = new Image();
var logoPic = new Image();
 
const BULLET_SPEED = 20;
const FLASH_RADIUS = 20; 
var bulletPic = new Image(); 
var enemyBulletPic = new Image();
var bullets = new Array();
var tieBullets = new Array();
var shooting = false;
 
var gameTime = 0;
var turretBulletTime = 0;
var tieBulletTime = 0;
var tieTime = 0;
var score;
var scoreInterval;
var gameInterval;

const TURRET_SPEED = 10;
var turrets = new Array();
var totalTurrets = 2;
var trenchGrid = new Array();


const BRICK_COLS = 12;
const BRICK_ROWS = 27;
const BRICK_WIDTH = 30;
const BRICK_HEIGHT = 30;
var rowOffset = 0;
var brickCount = BRICK_COLS*BRICK_ROWS;
//var brickGrid = [
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//3,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,2,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,3,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1,
//1,4,0,0,0,0,0,0,0,0,4,1
//];





var brickGrid = [
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
3,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,2,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,3,
1,4,5,6,5,6,5,6,5,6,4,1,
1,4,7,8,7,8,7,8,7,8,4,1,
1,4,5,6,5,6,5,6,5,6,4,1
];

 
 
 
//-------IMAGE LOADING PROCESS START------//
 
function checkPicsToLoad(){
  picsToLoad--;
  if(picsToLoad == 0){
    //startGame();
    //showSplashScreen();
    setTimeout(showSplashScreen,100);
  }
}
 
function sourceImage(varName, fileName){
  varName.onload = checkPicsToLoad();
  varName.src = fileName;
}
 
function loadImages(){
  imageList = [
    //{varName: shipPic, fileName: "img/3MG74Mx.png"},
    {varName: shipPic, fileName: "img/pixel-xwing.png"},
    {varName: bulletPic, fileName: "img/general-bullet.png"},
    {varName: enemyBulletPic, fileName: "img/mine-bullet.png"},
    {varName: logoPic, fileName: "img/logo.png"},
    //{varName: tiePic, fileName: "img/TIE_Fighter.png"},
    {varName: tiePic, fileName: "img/pixel-tie.png"},
    {varName: tilePic, fileName: "img/deathstar-tile-1-dark.png"},
    {varName: tilePicDark1, fileName: "img/deathstar-tile-1-darkest.png"},
    {varName: tilePicDark2, fileName: "img/deathstar-tile-2-darkest.png"},
    {varName: tilePicDark3, fileName: "img/deathstar-tile-3-darkest.png"},
    {varName: tilePicDark4, fileName: "img/deathstar-tile-4-darkest.png"},
  ];
 
  picsToLoad = imageList.length;
 
  for(var i=0;i<imageList.length;i++){
    sourceImage(imageList[i].varName, imageList[i].fileName);
  }
}
 
//-------IMAGE LOADING PROCESS END------//
 
 
 
 
 
 
 
//-------EVENT HANDLERS START------//
 
document.body.addEventListener('touchend', function(e){
  shooting = false;
  //console.log('shooting ended');
});
 
 
document.body.addEventListener('touchstart', function(e){
  if(gameOver){
    gameOver = false;
    startGame();
  }
});
 
 
document.body.addEventListener('touchmove', function(e){
  touchX = e.changedTouches[0].pageX + 20;
  touchY = e.changedTouches[0].pageY - 50;
  if(touchY < 350){
    xwing.shipY = 350;
  }else if(touchY > canvas.height-80){
    xwing.shipY = canvas.height-80;
  }else{
    xwing.shipY = touchY;
  }
  xwing.shipX = touchX;
  xwing.fireWeapon();
  e.preventDefault();
});
 
//-------EVENT HANDLERS END------//
 
 
 
 
 
window.onload = function(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  fillRect(0,0,canvas.width,canvas.height,"black");
  ctx.fillStyle = "white";
  ctx.font = "12px Trebuchet MS";
  ctx.fillText("Loading...",canvas.width/2, canvas.height/2);
  loadImages();  
}


function showSplashScreen(){
drawBitmapCenteredWithRotation(logoPic,canvas.width/2,canvas.height/2-40,0,1,1);
  setTimeout(startGame,5000);
}
 
 
function startGame(){
  //requestAnimationFrame(update);
  gameInterval = setInterval(update,30);
  scoreInterval = setInterval(calculateScore,90);  
  resetTrench();
  resetTurrets()
  xwing.resetShip();
  resetTie();  
  score = 0;
}
 
 
function timeUpdates(){  
  gameTime++;
  tieTime++;
  turretBulletTime++;
  tieBulletTime++;  
}
 
 
function update(){ 
  if(gameOver){
    tie.tieAlive = false;
    clearInterval(scoreInterval);
    clearInterval(gameInterval);
    fillRect(0,0,canvas.width,canvas.height,"black");
    ctx.fillStyle = "white";
    ctx.font = "14px Trebuchet MS";
    ctx.fillText("Squad Leader Down!",canvas.width/2-65, canvas.height/2-60);
    ctx.fillText("Touch to Fly Again!",canvas.width/2-62, canvas.height/2+40);
    ctx.font = "24px Trebuchet MS";
    ctx.fillText("Score: "+score,canvas.width/2-50, canvas.height/2-10);
    //requestAnimationFrame(update);
  }else{ 
    drawGraphics();
    moveGraphics();
    timeUpdates();  
    //requestAnimationFrame(update);
  }
}
 
 
function moveGraphics(){
  fireTurret();
  if(tie.coasting){
    tie.fireTie();
    moveTieBullets();
  }  
  moveTrench();
  moveTurrets();
  moveBullets();
  moveTurretBullets();
  tie.moveTieFighter();
  checkExplosions();
}
 
 
function checkExplosions(){
  if(explosionList.length > 0){
    for(var i=0;i<explosionList.length;i++){
      explosionList[i].explode();
    }
  }
}
 
 
function drawGraphics(){  
  if(shooting){
    preShake();
    fillRect(0,0,canvas.width,canvas.height,"black");
    drawBricks();
    drawTurrets();
    tie.drawTieFighter();
    postShake();
  }else{
    fillRect(0,0,canvas.width,canvas.height,"black");
    drawBricks();
    drawTurrets();
    tie.drawTieFighter();
  }  
  drawUi(); 
  xwing.drawShip();    
  drawBullets();  
  drawTurretBullets();
  drawTieBullets();
  drawScore();
}
 
 
function drawScore(){
  ctx.fillStyle = "red";
  ctx.font = "14px Trebuchet MS";
  ctx.fillText("Score: "+score,6,20);
}
 
 
function calculateScore(){
  score++;
} 


function drawUi(){
  fillRect(0,0,canvas.width,30,"black");
}

function resetTrench(){
  for(var j=0;j<BRICK_ROWS;j++){
    for(var i=0;i<BRICK_COLS;i++){
      var index = colRowBrickIndex(i,j);
      var trenchTile = new Object();
      trenchTile['y'] = BRICK_HEIGHT*j;
      trenchGrid.push(trenchTile);
    }
  }
}
 

function drawBricks(){
  for(var j=0;j<BRICK_ROWS;j++){
    for(var i=0;i<BRICK_COLS;i++){
      var index = colRowBrickIndex(i,j);
      if(brickGrid[index] == 4){
fillRect(BRICK_WIDTH*i,trenchGrid[index].y,BRICK_WIDTH-1,BRICK_HEIGHT-1,"grey");
      }
      if(brickGrid[index] == 1){
        fillRect(BRICK_WIDTH*i,trenchGrid[index].y,BRICK_WIDTH-1,BRICK_HEIGHT-1,"#cccccc");

        
ctx.drawImage(tilePic,BRICK_WIDTH*i,trenchGrid[index].y);
      }
      if(brickGrid[index] == 0){
        fillRect(BRICK_WIDTH*i,trenchGrid[index].y,BRICK_WIDTH-1,BRICK_HEIGHT-1,"black");
      }
      if(brickGrid[index] == 5){
ctx.drawImage(tilePicDark1,BRICK_WIDTH*i,trenchGrid[index].y);
      }
      if(brickGrid[index] == 6){
ctx.drawImage(tilePicDark2,BRICK_WIDTH*i,trenchGrid[index].y);
      }
      if(brickGrid[index] == 7){
ctx.drawImage(tilePicDark3,BRICK_WIDTH*i,trenchGrid[index].y);
      }
      if(brickGrid[index] == 8){
ctx.drawImage(tilePicDark4,BRICK_WIDTH*i,trenchGrid[index].y);
      }
    }
  }
}


function moveTrench(){
  for(var j=0;j<BRICK_ROWS + rowOffset;j++){
    for(var i=0;i<BRICK_COLS;i++){
      var index = colRowBrickIndex(i,j);
      if(trenchGrid[index]){
        trenchGrid[index].y += TURRET_SPEED;
        if(trenchGrid[index].y == canvas.height){
          var trenchTile = new Object();
          trenchTile['y'] = 0;
         trenchGrid.unshift(trenchTile);
  brickGrid.unshift(brickGrid[index]);
          brickGrid.slice(-1);
          trenchGrid.slice(-1);
        }
      }
    }
  }
  rowOffset = 1;
}
 
 
function colRowBrickIndex(col,row){
  return col + (BRICK_COLS * row);
}
 
 
function resetTie() {
  var rand = randomIntFromInterval(6000,10000);
  setTimeout(function() {
    tie.initTieFighter();
    resetTie();  
  }, rand);
}
 
 
 
 
//-------SHIP START------//


function XWingClass(){

  this.shipX;
  this.shipSpeedX = 5;
  this.shipY;
  this.shipSpeedY = 4;
  this.shipAng = degreesToRadians(0);
  this.shipHealth = 5;
  this.shield = 1;
  this.shieldTimeout;

  this.drawShip = function(){
    drawBitmapCenteredWithRotation(shipPic,this.shipX,this.shipY,this.shipAng,0.16,0.16);
    this.drawHealthBar();
  }


  this.resetShip = function(){
    for(var j=0;j<BRICK_ROWS;j++){
      for(var i=0;i<BRICK_COLS;i++){
        var index = colRowBrickIndex(i,j);
        if(brickGrid[index] == 2){
          brickGrid[index] = 7;
          this.shipX = i*BRICK_WIDTH;
          this.shipY = j*BRICK_HEIGHT;
        }
      }
    }   
    this.shipHealth = 5;
    this.shield = 1; 
  }


  this.fireWeapon = function(){
    if(gameTime > 2){
      shooting = true;
      var singleLeftBullet = new Object();
      singleLeftBullet['x'] = touchX-35;
      singleLeftBullet['y'] = this.shipY;
      singleLeftBullet['muzzleFlash'] = false;
      singleLeftBullet['alive'] = true;
      bullets.push(singleLeftBullet);

      var singleRightBullet = new Object();
      singleRightBullet['x'] = touchX+35;
      singleRightBullet['y'] = this.shipY;
      singleRightBullet['muzzleFlash'] = false;
      singleRightBullet['alive'] = true;
      bullets.push(singleRightBullet);
      gameTime = 0;
    }
  }


  this.drawHealthBar = function(){
    ctx.strokeStyle = "rgba(240, 3, 2, " + this.shield + ")";
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    roundRect(ctx, canvas.width-105, 6, 100, 20);
    for(var b=0;b<this.shipHealth;b++){
      fillRect((b*19+3)+canvas.width-105,2+6,20-2,16,"rgba(188, 3, 2, .7)")
    }
  }


  this.reduceHealth = function(){
    if(this.shield > 0){
      this.shield -= .2;
      clearTimeout(this.shieldTimeout);
      this.shieldTimeout = setTimeout(shieldRegen, 4000);
    }else{
      this.shipHealth--;
      if(this.shipHealth <= 0){
        gameOver = true;
      }else{
        clearTimeout(this.shieldTimeout);
        this.shieldTimeout = setTimeout(shieldRegen, 4000);
      }
    }
  }

}



function shieldRegen(){
    xwing.shield = 1;
  }
 
function drawBullets(){
  for(var i=0;i<bullets.length;i++){
    if(bullets[i].y < xwing.shipY - 300){
      bullets.splice(i,1);
    }else{
      drawBitmapCenteredWithRotation(bulletPic,bullets[i].x,bullets[i].y-25,0,0.2,0.2)
     
      if(bullets[i].muzzleFlash == false){

  var grd = ctx.createRadialGradient(bullets[i].x,bullets[i].y-20,0,bullets[i].x,bullets[i].y-20,FLASH_RADIUS);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.6,"grey");
        //grd.addColorStop(0.7,"white");
        grd.addColorStop(1,"white");


        fillCircle(bullets[i].x,bullets[i].y-20,FLASH_RADIUS,"white");
        
        bullets[i].muzzleFlash = true;
      }
    }
  }
}
 
function moveBullets(){
  for(var i=0;i<bullets.length;i++){
    bullets[i].y -= BULLET_SPEED;
    for(var t=0;t<totalTurrets;t++){
      if(bullets[i].y > turrets[t].y && bullets[i].y < turrets[t].y + BRICK_HEIGHT && 
        bullets[i].x > turrets[t].x && bullets[i].x < turrets[t].x + BRICK_WIDTH){
        if(turrets[t].alive){
          turrets[t].alive = false;
          turrets[t].explode = true;
        }
      }
      if(bullets[i].y > tie.tieY && bullets[i].y < tie.tieY + 40 && 
        bullets[i].x > tie.tieX && bullets[i].x < tie.tieX + 40){ 
        if(tie.tieAlive){
          tie.tieHealth--;
        }
      }
    }
  }
}
 
//-------SHIP END------//
 
 
 
 
 
 
 
 
//-------TURRET START------//
 
function resetTurrets(){
  for(var j=0;j<BRICK_ROWS;j++){
    for(var i=0;i<BRICK_COLS;i++){
      var index = colRowBrickIndex(i,j);
      if(brickGrid[index] == 3){
        brickGrid[index] = 1;
        var turret = new Object();
        turret["x"] = i*BRICK_WIDTH;
        turret["y"] = j*BRICK_HEIGHT;
        turret["alive"] = true;
        turret["explode"] = false;
        var turretBullets = new Array();
        turret["turretBullets"] = turretBullets;        
        turrets.push(turret);
      }
    }
  }
}
 
 
function drawTurrets(){
  for(var i=0;i<totalTurrets;i++){
    if(turrets[i].alive){
      fillRect(turrets[i].x,turrets[i].y,BRICK_WIDTH,BRICK_HEIGHT,"#cccccc");
    }else{
      if(turrets[i].explode){        
        var e = new explosionClass();
        e.setExplosionXYSpeed(turrets[i].x,turrets[i].y,TURRET_SPEED); 
        explosionList.push(e); 
        turrets[i].explode = false;
      }else{
        //Do Nothing
      }
    }
  }
}
 
function moveTurrets(){
  for(var i=0;i<totalTurrets;i++){
    turrets[i].y += TURRET_SPEED;
    if(turrets[i].y > canvas.height){
      turrets[i].y = -BRICK_HEIGHT-Math.random()*1000;   
      turrets[i].alive = true;
    }
  }
}
 
function fireTurret(){
  if(turretBulletTime > 24 + Math.random() * 300){
    for(var t=0;t<totalTurrets;t++){
      if(turrets[t].alive){
        var singleBullet = new Object();
        singleBullet['x'] = turrets[t].x;
        singleBullet['y'] = turrets[t].y;
        singleBullet['angle'] = Math.getAngle(turrets[t].x,turrets[t].y,touchX,xwing.shipY);
        singleBullet['muzzleFlash'] = false;
        singleBullet['alive'] = true;
        turrets[t].turretBullets.push(singleBullet);
        turretBulletTime = 0;  
      }
    }
  }
}
 
function moveTurretBullets(){
  for(var t=0;t<totalTurrets;t++){
    for(var i=0;i<turrets[t].turretBullets.length;i++){
      if(turrets[t].turretBullets[i].alive){
        turrets[t].turretBullets[i].y += Math.sin(turrets[t].turretBullets[i].angle) * BULLET_SPEED;
        turrets[t].turretBullets[i].x += Math.cos(turrets[t].turretBullets[i].angle) * BULLET_SPEED;
      }
      if(turrets[t].turretBullets[i].y > xwing.shipY - 40 && turrets[t].turretBullets[i].y < xwing.shipY + 40 && 
        turrets[t].turretBullets[i].x > xwing.shipX - 40 && turrets[t].turretBullets[i].x < xwing.shipX + 35){
        turrets[t].turretBullets.splice(i,1);
        xwing.reduceHealth();
      }
    }
  }
}
 
function drawTurretBullets(){
  for(var t=0;t<totalTurrets;t++){
    for(var i=0;i<turrets[t].turretBullets.length;i++){
      if(turrets[t].turretBullets[i].y > canvas.height){
        turrets[t].turretBullets.splice(i,1);
      }else{
        drawBitmapCenteredWithRotation(enemyBulletPic,turrets[t].turretBullets[i].x+BRICK_WIDTH/2,turrets[t].turretBullets[i].y+BRICK_HEIGHT/2,0,0.1,0.1)
        if(turrets[t].turretBullets[i].muzzleFlash == false){
        //fillCircle(turrets[t].turretBullets[i].x+BRICK_WIDTH/2,turrets[t].turretBullets[i].y+BRICK_HEIGHT/2,FLASH_RADIUS*2,"white");
          turrets[t].turretBullets[i].muzzleFlash = true;        
        }
      }
    }
  }
}
 
//-------TURRET END------//
 
 
 
 
 
 
 
 
//-------TIE FIGHTER START------//

function TieClass(){

  this.tieXArray = [-30,390];
  this.tieX;
  this.tieY;
  this.tieAng;
  this.coasting = false;
  this.tieHealth;
  this.tieAlive = false;

  this.initTieFighter = function(){
    if(!this.tieAlive){
      //this.tieX = this.tieXArray[Math.floor(Math.random() * this.tieXArray.length)];
      this.tieX = -30;
      this.tieY = 660;
      this.tieAng = 0;
      this.coasting = false;
      this.tieHealth = 50;
      this.tieAlive = true;
    }
  }

  this.drawTieFighter = function(){
    if(this.tieAlive){
      if(this.tieHealth <= 0){
        this.tieAlive = false;
        var e = new explosionClass();
        e.setExplosionXYSpeed(this.tieX,this.tieY,TURRET_SPEED); 
        explosionList.push(e);        
      }else{
        drawBitmapCenteredWithRotation(tiePic,this.tieX,this.tieY,degreesToRadians(90),0.11,0.11);
      }    
    }
  }

  this.moveTieFighter = function(){
    if(this.tieAlive){
      if(this.coasting){
        this.coastTie();
      }else{
        if(this.tieX <= canvas.width/2+70){
          this.tieX += 3*Math.cos(this.tieAng) + 5;
          this.tieY -= 3*Math.sin(this.tieAng) + 10;
          this.tieAng += 0.05;
        }else{
          this.coasting = true;
          this.coastTie();
        }
      }
    }
  }

  this.coastTie = function(){
    this.tieX = 5*Math.cos(this.tieAng) + this.tieX;
    this.tieAng += 0.05;
  }

  this.fireTie = function(){
    if(this.tieAlive){
      if(tieBulletTime > 24 + Math.random() * 100){    
        var singleBullet = new Object();
        singleBullet['x'] = this.tieX;
        singleBullet['y'] = this.tieY;
        singleBullet['angle'] = Math.getAngle(this.tieX,this.tieY,touchX,xwing.shipY);
        singleBullet['muzzleFlash'] = false;
        singleBullet['alive'] = true;
        tieBullets.push(singleBullet);
        tieBulletTime = 0;
      }
    }
  }

}
 
function drawTieBullets(){
  for(var i=0;i<tieBullets.length;i++){
    if(tieBullets[i].y > canvas.height){
      tieBullets.splice(i,1);
    }else{
      drawBitmapCenteredWithRotation(enemyBulletPic,tieBullets[i].x,tieBullets[i].y,0,0.1,0.1)
      if(tieBullets[i].muzzleFlash == false){
        fillCircle(tieBullets[i].x+BRICK_WIDTH/2,tieBullets[i].y+BRICK_HEIGHT/2,FLASH_RADIUS*2,"white");
        tieBullets[i].muzzleFlash = true;
      }
    }
  }
}
 
function moveTieBullets(){
  for(var i=0;i<tieBullets.length;i++){
    if(tieBullets[i].alive){
      tieBullets[i].y += Math.sin(tieBullets[i].angle) * BULLET_SPEED;
      tieBullets[i].x += Math.cos(tieBullets[i].angle) * BULLET_SPEED;
    }
    if(tieBullets[i].y > xwing.shipY && tieBullets[i].y < xwing.shipY + 80 && 
      tieBullets[i].x > xwing.shipX && tieBullets[i].x < xwing.shipX + 80){
      tieBullets.splice(i,1);
      xwing.reduceHealth();
    }
  }
}
 
//-------TIE FIGHTER END------//
 
 
 
 
 
 
//-------EXPLOSION CLASS START------//

function explosionClass(){
  this.radius = 0;
  this.angle = 0;
  this.opacity = 1;
  this.colour = "white"
  this.explosionX = 0;
  this.explosionY = 0;
  this.explosionSpeed = 0;
  this.exploding = false;
 
  this.explode = function(){  
    if(this.exploding){
    for(var i=0;i<20;i++){
      var randX = randomIntFromInterval(this.explosionX-18,this.explosionX+18);
      var randY = randomIntFromInterval(this.explosionY-18,this.explosionY+18)+this.explosionSpeed;
      if(this.opacity > 0){    
        var grd = ctx.createRadialGradient(randX,randY,this.radius/5,randX,randY,this.radius);
        grd.addColorStop(0,"white");
        grd.addColorStop(0.6,"white");
        grd.addColorStop(0.7,"yellow");
        grd.addColorStop(1,"orange");
        this.radius += Math.abs(10*Math.sin(this.angle)+0.2);
        ctx.globalAlpha = this.opacity;
        this.opacity = this.opacity - 0.007;
        fillCircle(randX,randY,this.radius,grd);
        ctx.globalAlpha = 1;
      }else{
        this.exploding = false;
      }
    }
    }
  }
 
  this.setExplosionXYSpeed = function(explosionX,explosionY,explosionSpeed){
    this.explosionX = explosionX;
    this.explosionY = explosionY;
    this.explosionSpeed = explosionSpeed;
    this.exploding = true;
  }
}
 
//-------EXPLOSION CLASS END------//
 
 
 
 
 
 
//-------HELPER FUNCTIONS START------//
 
function randomIntFromInterval(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
 
Math.getAngle = function(x1,y1,x2,y2){
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.atan2(dy,dx);
 
}
 
function degreesToRadians(degrees){
  return degrees*Math.PI/180;
}
 
function preShake(){
  ctx.save();
  var dx = Math.random() * SHAKE_AMOUNT;
  var dy = Math.random() * SHAKE_AMOUNT;
  ctx.translate(dx,dy);
}
 
function postShake(){
  ctx.restore();
}
 
function drawDebug(){
  colIndex = Math.floor(xwing.shipX/BRICK_WIDTH);
  rowIndex = Math.floor(xwing.shipY/BRICK_HEIGHT);
  ctx.fillStyle="yellow";
  ctx.fillText("x:"+colIndex+" y:"+rowIndex,10,270);
  brickUnderShipIndex = colRowBrickIndex(colIndex,rowIndex);
  ctx.fillText("index:"+brickUnderShipIndex,10,250);
}
 
//-------HELPER FUNCTIONS END------//
 
 
 
 
 
 
 
//-------GRAPHIC FUNCTIONS START------//
 
function fillRect(x,y,w,h,color){
  ctx.fillStyle = color;
  ctx.fillRect(x,y,w,h);
}
 
function fillCircle(centerX,centerY,radius,color){
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.arc(centerX,centerY,radius,0,Math.PI*2);
  ctx.fill();
}
 
function drawBitmapCenteredWithRotation(useBitmap,x,y,angle,scaleX,scaleY){
console.log(useBitmap.width);
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(angle);
  ctx.scale(scaleX,scaleY);
  ctx.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
  ctx.restore();
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if(typeof stroke == 'undefined'){
    stroke = true;
  }
  if(typeof radius === 'undefined'){
    radius = 5;
  }
  if(typeof radius === 'number'){
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  }else{
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for(var side in defaultRadius){
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if(fill){
    ctx.fill();
  }
  if(stroke){
    ctx.stroke();
  }
}
 
//-------GRAPHIC FUNCTIONS END------//