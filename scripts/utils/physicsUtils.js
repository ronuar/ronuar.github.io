const BALL_COUNT = 10;
const BALL_MIN_SIZE = 40;
const BALL_MAX_SIZE = 125;

export default {
  rand(min = 0, max = 1, isInt = false) {
    const num = Math.random()*(max - min) + min;

    return (isInt) ? Math.round(num) : num;
  },

  initBalls(width, height) {
    const rand = this.rand;
    let balls = [];

    for(let i = 0; i < BALL_COUNT; i++) {
      const size = rand(BALL_MIN_SIZE, BALL_MAX_SIZE);

      balls.push({
        size,
        color: `rgba(${rand(0, 255, true)},${rand(0, 255, true)},${rand(0, 255, true)},${rand(0.1, 0.8)}`,
        y: rand(0, height - size),
        x: rand(0, width - size),
        dx: rand(-1, 1),
        dy: rand(-1, 1),
        id: i
      });
    }

    return balls;
  },

  moveBalls(balls, width, height) {
    return balls.map(ball => {
      const { x, y, dx, dy, size } = ball;

      if(x+dx+size > width || x+dx < 0) ball.dx = -dx;
      if(y+dy+size > height || y+dy < 0) ball.dy = -dy;

      ball.y = y + dy;
      ball.x = x + dx;

      return ball;
    });
  },

  slowDownBalls(balls, id) {
    let newBalls = [].concat(balls);
    const index = newBalls.map(ball => ball.id).indexOf(id);
    const newDx = newBalls[index].dx * 0.4;
    const newDy = newBalls[index].dy * 0.4;

    newBalls[index].dx = newDx;
    newBalls[index].dy = newDy;

    if (Math.abs(newDx) < 0.5 && Math.abs(newDy) < 0.5) {
      newBalls[index].dx = 0;
      newBalls[index].dy = 0;
    }

    return newBalls;
  },

  hasBallsStop(balls) {
    return balls.every(ball => ball.dx === 0 && ball.dy === 0);
  }
};
