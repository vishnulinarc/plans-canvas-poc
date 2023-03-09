import Shape from "./Shape";

const fixedRadius = 50;

export default class Ellipse extends Shape {
  constructor(points, fill, stroke) {
    super(points[0].x, points[0].y, fill, stroke);
    this.points = this.getVertices(points);
    this.handleSize = 8;
    this.dragging = false;
    this.draggingHandle = false;
  }

  getVertices(points) {
    if (points.length === 4) return points;
    else if (points.length === 1)
      return [
        { x: points[0].x - fixedRadius, y: this.y },
        { x: this.x, y: points[0].y - fixedRadius },
        { x: points[0].x + fixedRadius, y: this.y },
        { x: this.x, y: points[0].y + fixedRadius },
      ];
  }

  draw(ctx) {
    function drawEllipse(ctx, points) {
      // Calculate the center of the ellipse
      const centerX =
        (points[0].x + points[1].x + points[2].x + points[3].x) / 4;
      const centerY =
        (points[0].y + points[1].y + points[2].y + points[3].y) / 4;

      // Calculate the width and height of the ellipse
      const width = Math.sqrt(
        Math.pow(points[2].x - points[0].x, 2) +
          Math.pow(points[2].y - points[0].y, 2)
      );
      // +
      // Math.sqrt(
      //   Math.pow(points[3].x - points[2].x, 2) +
      //     Math.pow(points[3].y - points[2].y, 2)
      // );
      const height = Math.sqrt(
        Math.pow(points[3].x - points[1].x, 2) +
          Math.pow(points[3].y - points[1].y, 2)
      );
      // +
      // Math.sqrt(
      //   Math.pow(points[0].x - points[3].x, 2) +
      //     Math.pow(points[0].y - points[3].y, 2)
      // );

      // Calculate the angle of the ellipse
      const angle = Math.atan2(
        points[1].y - points[0].y,
        points[1].x - points[0].x
      );

      console.log(
        "centerX: ",
        centerX,
        "centerY: ",
        centerY,
        "width: ",
        width,
        "height: ",
        height,
        "angle: ",
        angle
      );

      // Draw the ellipse
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        width / 2,
        height / 2,
        angle,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
    drawEllipse(ctx, this.points);

    this.drawHandles(ctx);
    console.log(this.points);
  }

  drawHandles(ctx) {
    const handleSize = this.handleSize;
    for (let i = 0; i < this.points.length; i++) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        this.points[i].x - handleSize / 2,
        this.points[i].y - handleSize / 2,
        handleSize,
        handleSize
      );
    }
  }

  handleMouseDown(e) {
    const { x, y } = this.getMousePosition(e);
    this.dragging = this.isPointInEllipse(x, y);
    this.draggingHandle = this.isPointInHandle(x, y);
    this.draggingOffsetX = x - this.x;
    this.draggingOffsetY = y - this.y;
  }

  isPointInEllipse(x, y) {
    const { x: x1, y: y1 } = this.points[0];
    const { x: x2, y: y2 } = this.points[1];
    const { x: x3, y: y3 } = this.points[2];
    const { x: x4, y: y4 } = this.points[3];
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    return ctx.isPointInPath(x, y);
  }

  isPointInHandle(x, y) {
    console.log(x, y);
    const handleSize = this.handleSize;
    for (let i = 0; i < this.points.length; i++) {
      if (
        x >= this.points[i].x - handleSize &&
        x <= this.points[i].x + handleSize &&
        y >= this.points[i].y - handleSize &&
        y <= this.points[i].y + handleSize
      ) {
        return i;
      }
    }
    return false;
  }

  handleMouseMove(e, ctx) {
    const { x, y } = this.getMousePosition(e);
    if (this.draggingHandle) {
      this.resize(x, y);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.draw(ctx);
    } else if (this.dragging) {
      this.move(x, y);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.draw(ctx);
    }
  }

  resize(x, y) {
    this.points[this.draggingHandle].x = x;
    this.points[this.draggingHandle].y = y;
  }

  move(x, y) {
    const dx = x - this.points[0].x;
    const dy = y - this.points[0].y;
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].x += dx;
      this.points[i].y += dy;
    }
  }

  handleMouseUp(x, y) {
    this.dragging = false;
    this.draggingHandle = false;
  }

  getMousePosition(e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
}
