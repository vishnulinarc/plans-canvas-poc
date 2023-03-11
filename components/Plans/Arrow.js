import Line from "./Line";

const ARROW_HEAD_SIZE = 15;
class Arrow extends Line {
  constructor(x, y, fill, stroke, lineWidth) {
    super(x, y, fill, stroke, lineWidth);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();

    if (this.selected) {
      this.drawHandles(ctx);
    }
    this.addArrowHead(ctx);
  }

  addArrowHead(ctx) {
    var angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);

    // calculate the coordinates of the arrowhead
    var arrowX = this.x2 - ARROW_HEAD_SIZE * Math.cos(angle - Math.PI / 6);
    var arrowY = this.y2 - ARROW_HEAD_SIZE * Math.sin(angle - Math.PI / 6);

    // draw the arrowhead
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(
      this.x2 - ARROW_HEAD_SIZE * Math.cos(angle + Math.PI / 6),
      this.y2 - ARROW_HEAD_SIZE * Math.sin(angle + Math.PI / 6)
    );
    ctx.fillStyle = this.stroke;
    ctx.fill();
  }
}

export default Arrow;
