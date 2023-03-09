class Shape {
  constructor(x, y, fill, stroke) {
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.stroke = stroke;
    this.selected = true;
  }

  draw(ctx) {
    //implement in child classes
  }

  resize(newWidth, newHeight) {}

  move(newX, newY) {
    //implement in child classes
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }
}

export default Shape;
