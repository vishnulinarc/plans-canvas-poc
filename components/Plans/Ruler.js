import Line from "./Line";

class Ruler extends Line {
  constructor(x, y, fill, stroke, lineWidth) {
    super(x, y, fill, stroke, lineWidth);
  }

  addMeasurement(ctx) {
    const midpoint_x = (this.x1 + this.x2) / 2;
    const midpoint_y = (this.y1 + this.y2) / 2;

    // set text style
    ctx.fillStyle = this.stroke;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // draw measurement text
    const distance = Math.sqrt(
      (this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2
    );
    ctx.fillText(`${distance.toFixed(2)} px`, midpoint_x, midpoint_y);
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
    this.addMeasurement(ctx);
  }

  drawHandles(ctx) {
    const handleSize = this.handleSize;

    // Draw handles at each end of the line
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x1 - handleSize / 2,
      this.y1 - handleSize / 2,
      handleSize-4,
      handleSize
    );
    ctx.fillRect(
      this.x2 - handleSize / 2,
      this.y2 - handleSize / 2,
      handleSize-4,
      handleSize
    );
  }
}

export default Ruler;
