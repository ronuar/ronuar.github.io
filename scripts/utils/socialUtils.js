export default {
  rand(min = 0, max = 1) {
    const num = Math.random()*(max - min) + min;

    return Math.round(num);
  },

  getChild() {
    return {
      id: this.rand(1, 20),
      professionId: this.rand(1, 10)
    }
  },

  progressChange(progress) {
    let newProgress = progress;
    newProgress = newProgress < 0 ? 0 : newProgress;
    newProgress = newProgress > 100 ? 100 : newProgress;

    return newProgress;
  }
};
