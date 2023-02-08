const BubbleArray = [];

function setup() {
  createCanvas(400, 600);
  for (i = 0; i < 300; i++) {
    BubbleArray.push(new Bubble(random(width), random(height)));
  }
}

function draw() {
  background(0);
  for (i = 0; i < BubbleArray.length; i++) {
    BubbleArray[i].update();
    BubbleArray[i].draw();
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = random(15, 80);
    this.color = color(random(255), random(255), random(255), 180);
    this.acceleration = createVector();
    this.ballPosition = createVector(this.x, this.y);
    this.velocity = createVector();
  }

  draw() {
    circle(this.ballPosition.x, this.ballPosition.y, this.d);
  }

  update() {
    fill(this.color);
    stroke(this.color);
    // circle(this.x, this.y, this.d);
    let mousePosition = createVector(mouseX, mouseY);
    this.acceleration = p5.Vector.sub(this.ballPosition, mousePosition).setMag(
      map(this.ballPosition.dist(mousePosition), 0, 200, 2, 0, true)
    );
    this.velocity.add(this.acceleration);
    this.ballPosition.add(this.velocity.mult(0.5));
    if (this.ballPosition.x > width) this.ballPosition.x = width;
    if (this.ballPosition.y > height) this.ballPosition.y = height;
    if (this.ballPosition.x < 0) this.ballPosition.x = 0;
    if (this.ballPosition.y < 0) this.ballPosition.y = 0;

    this.ballPosition.y = this.ballPosition.y - 2;
    this.d = this.d * 0.99;
    if (this.d < 15) {
      this.d = random(15, 60);
    }
    if (this.ballPosition.y < 1) {
      this.ballPosition.y = height;
      this.ballPosition.x = random(width);
    }
  }
}
