export class Core {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.s = 2;

    this.tMax = random(200, 600);
    this.t = this.tMax - 180;
    this.a = 0;

    this.rRot = 0;
  }

  dots(xPos, yPos, rMag) {
    push();
    translate(width / 2 - para[0] * 1.5, height / 2 - para[0] * 1.5);

    fill(255);
    noStroke();

    this.x = xPos;
    this.y = yPos;

    if (random(1) < map(sldr[1].value(), 0, 1, 0.2, 1)) {
      this.x =
        xPos +
        int(random(-rMag, rMag)) *
        para[0] *
        floor(map(sldr[0].value(), 0, 1, 4, 2));
      this.y =
        yPos +
        int(random(-rMag, rMag)) *
        para[0] *
        floor(map(sldr[0].value(), 0, 1, 4, 2));
    }

    rect(this.x, this.y, this.s);

    noFill();
    stroke(255, 0.14);

    if (random(1) < map(sldr[0].value(), 0, 1, 0.1, 0.2)) {
      ellipse(
        this.x,
        this.y,
        map(sldr[0].value(), 0, 1, 800, 600) + random(-1200, 1200)
      );
    }
    pop();
  }

  lines() {
    push();
    translate(width / 2 - para[0] * 1.5, height / 2 - para[0] * 1.5);
    translate(this.x, this.y);

    noFill();
    stroke(255, this.a);
    strokeWeight(1.4);

    let rAng;

    if (random(1) < map(sldr[2].value(), 0, 1, 1, 0)) {
      let r = random(1);
      if (r < 0.25) {
        rAng = radians(0);
      } else if (r < 0.5) {
        rAng = radians(90);
      } else if (r < 0.75) {
        rAng = radians(180);
      } else {
        rAng = radians(270);
      }
    } else {
      rAng = radians(random(360));
    }

    rotate(rAng);

    if (this.t > 0) {
      if (this.a > 0.14) {
        this.a -= 0.02;
      } else {
        this.a -= 0.0006;
      }
      this.t--;
    } else {
      this.a = 0.8;
      this.t = this.tMax;
      this.rRotReset();
    }

    line(0, 0, 2000, 0);

    if (random() < map(sldr[3].value(), 0, 1, 0.02, 0.8)) {
      rotate(radians(this.rRot));
      stroke(255, this.a / 4);
      line(0, 0, 2000, 0);
    }
    pop();
  }

  rRotReset() {
    let rRotMax = map(sldr[3].value(), 0, 1, 2, 90);
    this.rRot = map(noise(millis()), 0, 1, -rRotMax, rRotMax);
  }
}
