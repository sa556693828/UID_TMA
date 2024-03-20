class Part {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.max = 4;

    this.cycle = 0;
    this.alpha = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.max);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    let x = floor(this.pos.x / scle);
    let y = floor(this.pos.y / scle);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  show(seeder) {
    let prob = noise(millis() * seeder);
    let probMark = noise(millis() * seeder);

    let mark = 6;

    if (this.cycle < 200) {
      if (prob < 0.28) {
        if (prob < map(sldr[7].value(), 0, 1, 0.28, 0.22)) {
          icles.fill(255, map(this.alpha, 0, 1, 0, 0.44));
          icles.noStroke();
          icles.rect(this.pos.x, this.pos.y, 1.4, 1.4);
        }
        fill(255, map(this.alpha, 0, 1, 0, map(sldr[7].value(), 0, 1, 0, 0.8)));
        noStroke();
        rect(this.pos.x, this.pos.y, 2, 2);
      }

      if (this.alpha < 1) {
        this.alpha += 0.014;
      }

      this.cycle++;
    } else if (this.cycle < 2200) {
      if (prob < 0.28) {
        if (prob < map(sldr[7].value(), 0, 1, 0.28, 0.22)) {
          icles.fill(255, map(this.alpha, 0, 1, 0, 0.44));
          icles.noStroke();
          icles.rect(this.pos.x, this.pos.y, 1.4, 1.4);
        }
        fill(255, map(this.alpha, 0, 1, 0, map(sldr[7].value(), 0, 1, 0, 0.8)));
        noStroke();
        rect(this.pos.x, this.pos.y, 2, 2);

        if (probMark < 0.08) {
          icles.noFill();
          icles.stroke(255, map(this.alpha, 0, 1, 0, 0.88));
          noFill();
          stroke(255, map(this.alpha, 0, 1, 0, 1));

          if (noise(millis()) < map(sldr[6].value(), 0, 1, 0.2, 0.8)) {
            icles.line(
              this.pos.x - mark,
              this.pos.y,
              this.pos.x + mark,
              this.pos.y
            );
            icles.line(
              this.pos.x,
              this.pos.y - mark,
              this.pos.x,
              this.pos.y + mark
            );
            line(this.pos.x - mark, this.pos.y, this.pos.x + mark, this.pos.y);
            line(this.pos.x, this.pos.y - mark, this.pos.x, this.pos.y + mark);
          } else {
            icles.line(
              this.pos.x - mark,
              this.pos.y - mark,
              this.pos.x + mark,
              this.pos.y + mark
            );
            icles.line(
              this.pos.x - mark,
              this.pos.y + mark,
              this.pos.x + mark,
              this.pos.y - mark
            );
            line(
              this.pos.x - mark,
              this.pos.y - mark,
              this.pos.x + mark,
              this.pos.y + mark
            );
            line(
              this.pos.x - mark,
              this.pos.y + mark,
              this.pos.x + mark,
              this.pos.y - mark
            );
          }
        }
      }

      this.cycle++;
    } else if (this.cycle < 2400) {
      if (prob < 0.28) {
        if (prob < map(sldr[7].value(), 0, 1, 0.28, 0.22)) {
          icles.fill(255, map(this.alpha, 0, 1, 0, 0.44));
          icles.noStroke();
          icles.rect(this.pos.x, this.pos.y, 1.4, 1.4);
        }
        fill(255, map(this.alpha, 0, 1, 0, map(sldr[7].value(), 0, 1, 0, 0.8)));
        noStroke();
        rect(this.pos.x, this.pos.y, 2, 2);
      }

      if (this.alpha > 0) {
        this.alpha -= 0.014;
      }

      this.cycle++;
    }
  }

  edges() {
    let bffr = 0;

    if (this.pos.x < -bffr) {
      this.pos.x = width + bffr;
      this.pos.y = height - this.pos.y;
    }
    if (this.pos.x > width + bffr) {
      this.pos.x = -bffr;
      this.pos.y = height - this.pos.y;
    }
    if (this.pos.y < -bffr) {
      this.pos.y = height + bffr;
      this.pos.x = width - this.pos.x;
    }
    if (this.pos.y > height + bffr) {
      this.pos.y = -bffr;
      this.pos.x = width - this.pos.x;
    }
  }
}
