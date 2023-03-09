export default class Pencil {
  constructor(points) {
    this.x = 0;
    this.y = 0;
    this.color = "black";
    this.thickness = 1;
    this.drawing = false;
    this.points = points;
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    if(this.points.length)
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
  }

  handleMouseDown(e) {
    const { x, y } = this.getMousePosition(e);
    console.log(x, y)
    this.drawing = true;
    this.points = [{ x, y }];
  }

  handleMouseMove(e,ctx) {
    const { x, y } = this.getMousePosition(e);
    if (this.drawing) {
      this.points.push({ x, y });
    }
    this.draw(ctx);
  }

  handleMouseUp() {
    this.drawing = false;
    console.log(this.points)
  }
  getMousePosition(e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
}

