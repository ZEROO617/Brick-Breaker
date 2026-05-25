///////////////////////////////////////////////
/*
변경된 사항
1) 패드의 움직임을 캔버스 안으로 제한
2) 게임 종료 후 재시작 기능 구현
3) 6개의 블록을 깰 때마다 공 속도 증가(속도 왼쪽 위에 표시)
4) 모든 블록을 깨면 성공 메시지 출력.
*/
//////////////////////////////////////////////

// ball
let xPos, xDir; // 공의 x축 위치와 진행 방향
let yPos, yDir; // 공의 y축 위치와 진행 방향
let diam;
let speed; // 공의 속도
let victory = false;
// pad
let padX
let padWidth; 

// bricks
let bricks = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
let brickcounts = 0;

function setup() {
  createCanvas(600, 600);
  variableInitialization()
}


function draw() {
  background(128);
  bricksBallCollision();
  bricksDrawing();
  ballDrawingMovement();
  padDrawingMovement();
  ballBouncing();
  displaySpeed();
  deadCheck();

  speedCheck();
  
  if(brickcounts >= 24) {
    victory = true;
  }

  if(victory == true){
    fill("red");
    textSize(100);
    text("승리", 200, 330);

    noLoop();
  }
}
function displaySpeed(){

  fill("white");
  
  stroke("black");
  strokeWeight(2);

  textSize(28);

  // 현재 속도 단계를 계산
  let speedLevel = 1;

  if(brickcounts >= 6){
    speedLevel = brickcounts / 6 + 1;
  }

  // 화면 좌상단에 출력
  text("Speed : " + speedLevel, 20, 40);
}

function mousePressed() {
  if(mouseX>200 && mouseY>350 &&mouseX<410 && mouseY < 410){
    variableInitialization()
    loop();
  }
}

function speedCheck() {
  if(brickcounts%6==0 && brickcounts>0) {
    speed=(2+brickcounts/6);
    
  }
  
}
function deadCheck() {
  if(yPos>=600-diam/2){
    speed = 3;
    fill("rgb(255,255,255))");
    rect(200, 350, 210, 60)
    textSize(30);
    fill("black");
    text("재시작",260,390)
    textSize(80);
    stroke("black");
    fill("red");
    text("Game Over",100,330)
    noLoop();
  }
}

function bricksDrawing(){
  fill("rgb(106,199,121)");
  stroke(0);

  for(let r = 0; r < bricks.length; r++){
    for(let c = 0; c < bricks[r].length; c++){
      if ( bricks[r][c] === 1) {
        rect(c*50, r*50, 50, 50); 
      }
    }
  }
}

function bricksBallCollision(){
  // when the ball hits the bricks
  if ( yPos < 50 * bricks.length && bricks[int(yPos/50)][int(xPos/50)] === 1) {
    yDir *= -1;
    bricks[int(yPos/50)][int(xPos/50)] = 0;
    brickcounts++;
  }
}

function variableInitialization(){
  
  speed = 2.5;
  xPos = width / 2; // 공을 화면의 중심에서 출발
  xDir = speed;
  yPos = height / 2;
  yDir = speed*-1;
  diam = 50;
  padWidth = 200;
}

function ballDrawingMovement(){
  fill("red");
  ellipse(xPos, yPos, diam, diam);
  xPos = xPos + xDir*speed;
  yPos = yPos + yDir*speed;
}

function padDrawingMovement(){
  // pad를 마우스 위치로 이동
  padX = mouseX - padWidth/2;
  
  //패드가 캔버스를 벗어나지 않게하기
  if(padX <= 0){
    padX = 0;
  } 
  if(padX >= width-padWidth){
    padX = width-padWidth;
  }
  
  constrain(padX, 0, width - padWidth)
  //패드를 그리기
  fill(0, 0, 0)
  rect(padX, height-30, padWidth, 30);
}

function ballBouncing(){
  if ( xPos - diam/2 < 0) xDir = xDir * -1; 
  if ( xPos + diam/2 > width) xDir *=  -1;

  if ( yPos - diam/2 < 0) yDir *= -1; 
  if ( yPos + diam/2 > height) yDir *=  -1;

  // ball bouncing with pad
  if ( xPos > padX && xPos < padX + padWidth && yPos > height - 30 - diam/2){
    yDir *= -1;
  }
}