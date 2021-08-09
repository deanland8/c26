const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, boat;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 200, 310);
  cannon = new Cannon(190, 130, 80, 50, angle);

  boat= new Boat(width, height -200, 200,200, -100);

  

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

 
  
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++)
    {
      if(balls[i] !== undefined && boats[i] !== undefined)
      var collision = Matter.SAT.collides(balls[i].body,boats[j].body)
      if(collision.collided){
        //remove boat from the world
        boats[j].remove(j);
        //remiving ball from the world
        Matter.World.remove(world,balls[i].body);
        balls.splice(i,1);
        i--;
        
      }
    }
  }

  cannon.display();
  tower.display();
  showboat();
}


//creating the cannon ball on key press
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

// function to show the ball.
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

//releasing the cannonball on key release
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showboat(){
if(boats.length>0){
if(boats.length<4 && boats[boats.length -1].body.position.x< width -300)
{
  boat = new Boat(width, height - 100, 200, 200, -100);
  boats.push(boat);
}
for(var i=0; i<boats.length; i++){
  Matter.Body.setVelocity(boats[i].body, {
    x: -0.9,
    y: 0
  });
      boats[i].display();
}
}
else{
boat = new Boat(width, height - 100, 200, 200, -100);
boats.push(boat);
}
}