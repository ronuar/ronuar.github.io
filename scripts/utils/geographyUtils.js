export default {
  generateMountains(windowWidth, windowHeight, COUNT, COLORS) {
    const mountains = [];

    for (let i = 0; i < COUNT; i++) {
      const mountainPosition = this.getMountainPositionInfo(windowWidth, windowHeight, COUNT - i);
      const { x, x2, y, middle } = mountainPosition;
      const { snowLeft, snowRight, borderDots, height } =
        this.getSnowPositionInfo(innerHeight, mountainPosition);

      mountains.push({
        key: Math.random(),
        x, x2, y, middle,
        color: COLORS[i % 5],
        points: `${x},${innerHeight} ${x2},${innerHeight} ${middle},${y}`,
        snowPoints: `${middle},${y} ${snowLeft},${y + height} ${borderDots} ${snowRight},${y + height}`
      });
    }

    return mountains;
  },

  getMountainPositionInfo(windowWidth, windowHeight, ratio) {
    const x = Math.round(Math.random() * windowWidth - windowWidth * 0.3);
    const x2 = x + Math.round(Math.random() * (1000 - 400) + 400);

    const y = Math.round(Math.random() * (windowHeight * 0.8 / ratio)) + windowHeight*0.2;
    const middle = ((x2 - x) / 2 + x);

    return { x, x2, y, middle };
  },

  getSnowPositionInfo(windowHeight, { x, x2, y, middle }) {
    const height = Math.round(Math.random() * (windowHeight - y) * 0.3 + (windowHeight - y) * 0.2);
    const snowLeft = Math.round(middle - (middle - x) / ((windowHeight - y) / height));
    const snowRight = Math.round(middle + (x2 - middle) / ((windowHeight - y) / height));

    const snowKeysLength = Math.floor(Math.random() * 7) + 2;
    let borderDots = "";

    for (let j = 0; j < snowKeysLength; j++) {
      const x1 = Math.round((snowRight - snowLeft) * (1 / (snowKeysLength + 1) * (j + 1)) + snowLeft);
      const y1 = Math.round((y + height) + (Math.random() - 0.5) * (height * 0.5));
      borderDots = borderDots.concat(`${x1},${y1}`, ' ');
    }

    return { snowLeft, snowRight, borderDots, height };
  }
};
