console.clear();
const p = noise;
p.seed(Math.random());
const branches = [];

function setup () {
  createCanvas(windowWidth, windowHeight);
  branches.push(new Branch());
  noFill();
  stroke(0, 0, 0, 20);
  smooth();
  colorMode(HSB);
  blendMode(SCREEN);
  strokeWeight(uiWeight.getValue());
  for (let i=0; i<uiAmount.getValue(); i++) {
      branches.push(new Branch());
  }
}

function reset () {
  resizeCanvas(windowWidth, windowHeight);
  branches.length = 0;
  p.seed(Math.random());
  strokeWeight(uiWeight.getValue());
  for (let i=0; i<uiAmount.getValue(); i++) {
      branches.push(new Branch());
  }
}

function mouseClicked () {
  p.seed(Math.random());
  for (let i=0; i<uiAmount.getValue(); i++) {
      branches.push(new Branch());
  }
}

function windowResized () {
  reset();
}

function draw () {
  clear();
  branches.forEach(branch => branch.update());
}

class Branch {
  constructor () {
    this.v = [];
    this.x = width / 2;
    this.y = height;
    this.color = color(random(uiColor.getValue(), uiColor.getValue() + 100), uiSaturation.getValue(), 100, uiOpacity.getValue());
    this.v.push({x: this.x, y: this.y });
    this.moving = true;
    this.direction = {
      x: random(-2, 2),
      y: random(-0.2, -5)
    };
  }
  draw () {
    stroke(this.color);
    beginShape();
    this.v.forEach(v => {
      vertex(v.x, v.y);
    });
    endShape();
  }
  update () {
    if (this.moving) {
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.moving = false;
      }
      this.move();
    }
    this.draw();
  }
  move () {
    this.direction.x += (p.simplex3(this.x * 0.04 * uiRandom.getValue(), this.y * 0.04 * uiRandom.getValue(), millis() * 0.0001));
    this.direction.y -= abs((p.simplex3(this.y * 0.01, this.x * 0.01, millis() * 0.0001))) * 0.2;
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.v.push({x: this.x, y: this.y });
  }
}

const Walkers = function () {
  this.message = 'dat.gui';
  this.Color = 110;
  this.Saturation = 70;
  this.Opacity = 0.25;
  this.Weight = 1;
  this.Amount = 300;
  this.Random = 0.2;
};

const walkers = new Walkers();
const gui = new dat.GUI();
const uiColor = gui.add(walkers, 'Color', 0, 360, 10);
const uiSaturation = gui.add(walkers, 'Saturation', 0, 100, 5);
const uiOpacity = gui.add(walkers, 'Opacity', 0, 1, 0.01);
const uiWeight = gui.add(walkers, 'Weight', 1, 10, 1);
const uiAmount = gui.add(walkers, 'Amount', 10, 800, 50);
const uiRandom = gui.add(walkers, 'Random', 0, 5, 0.05);
uiColor.onChange(reset);
uiSaturation.onChange(reset);
uiOpacity.onChange(reset);
uiWeight.onChange(reset);
uiAmount.onChange(reset);
uiRandom.onChange(reset);
gui.close()