class MarkUp {
  constructor(markUp) {
    this.markUp = markUp || {};
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  addMarkUpElement(markUpElement) {
    const generateId = this.generateId();
    this.markUp[generateId] = markUpElement;
    return generateId;
  }

  getMarkUpElement(id) {
    return this.markUp[id];
  }

  getMarkUpElements() {
    return this.markUp;
  }

  updateMarkUpElement(markUpElement) {
    this.markUp[markUpElement.id] = {
      ...this.markUp[markUpElement.id],
      ...markUpElement,
    }
  }

  deleteMarkUpElement(id) {
    delete this.markUp[id];
  }

  deleteAllMarkUpElements() {
    this.markUp = {};
  }
}

export default new MarkUp();
