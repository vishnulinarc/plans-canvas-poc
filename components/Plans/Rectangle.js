import Shape from "./Shape";
import MarkUp from "./MarkUp";

const fixedWidth = 100;
class Rectangle extends Shape {
  constructor(points, id, fill, stroke) {
    super(points[0].x, points[0].y, fill, stroke);
    this.points = this.getVertices(points);
    this.handleSize = 8;
    this.selectedHandle = null;
    this.selectedRect = null;
    this.uniqueId = id;
  }

  getVertices(points) {
    if (points.length === 4) {
      return points;
    } else if (points.length === 1) {
      return [
        { x: points[0].x - fixedWidth / 2, y: points[0].y - fixedWidth / 2 },
        { x: points[0].x + fixedWidth / 2, y: points[0].y - fixedWidth / 2 },
        { x: points[0].x + fixedWidth / 2, y: points[0].y + fixedWidth / 2 },
        { x: points[0].x - fixedWidth / 2, y: points[0].y + fixedWidth / 2 },
      ];
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    // ctx.fillStyle = this.fill;
    // ctx.fill();
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
    this.drawHandles(ctx);
    MarkUp.updateMarkUpElement({
      id: this.uniqueId,
      type: "rect",
      points: this.points,
      fill: this.fill,
      stroke: this.stroke,
    });
    console.log(MarkUp.getMarkUpElements());
  }

  drawHandles(ctx) {
    const handleSize = this.handleSize;
    for (let i = 0; i < this.points.length; i++) {
      ctx.strokeStyle = "pink";
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
    // check if clicked on a handle
    for (let i = 0; i < this.points.length; i++) {
      if (
        x >= this.points[i].x - this.handleSize &&
        x <= this.points[i].x + this.handleSize &&
        y >= this.points[i].y - this.handleSize &&
        y <= this.points[i].y + this.handleSize
      ) {
        this.selectedHandle = i + 1;
        //change cursor
        document.body.style.cursor = "pointer";
        return;
      }
      this.selectedHandle = null;
    }

    //check if clicked inside the shape

    if (this.isPointInPath(x, y)) {
      this.selectedRect = true;
    } else {
      this.selectedRect = false;
    }
  }

  handleMouseMove(e, ctx, drawImage) {
    const { x, y } = this.getMousePosition(e);
    if (this.selectedHandle) {
      drawImage();
      this.resize(x, y);
      //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setTimeout(() => {
        this.draw(ctx);
        console.log("SquareDrawn");
      }, 1);
    } else if (this.selectedRect) {
      drawImage();
      this.move(x, y);
      //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      console.log("imageDrawn");
      setTimeout(() => {
        this.draw(ctx);
        console.log("SquareDrawn");
      }, 1);
    }
  }

  resize(x, y) {
    const handle = this.selectedHandle;
    if (handle === 1) {
      this.points[0].x = x;
      this.points[0].y = y;
      this.points[3].x = x;
      this.points[1].y = y;
    } else if (handle === 2) {
      this.points[1].x = x;
      this.points[1].y = y;
      this.points[0].y = y;
      this.points[2].x = x;
    } else if (handle === 3) {
      this.points[2].x = x;
      this.points[2].y = y;
      this.points[1].x = x;
      this.points[3].y = y;
    } else if (handle === 4) {
      this.points[3].x = x;
      this.points[3].y = y;
      this.points[2].y = y;
      this.points[0].x = x;
    }
  }

  move(x, y) {
    const dx = x - this.points[0].x;
    const dy = y - this.points[0].y;
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].x += dx;
      this.points[i].y += dy;
    }
  }

  handleMouseUp() {
    this.selectedHandle = null;
    this.selectedRect = null;
    //remove cursor pointer
    document.body.style.cursor = "default";
  }

  getMousePosition(e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }

  isPointInPath(x, y) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    return ctx.isPointInPath(x, y);
  }
}

export default Rectangle;
