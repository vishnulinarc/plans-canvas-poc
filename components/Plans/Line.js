import Shape from "./Shape";
import MarkUp from "./MarkUp";

const fixedLength = 50;
class Line extends Shape {
  constructor(x, y, id, fill, stroke, lineWidth) {
    super(x, y, fill, stroke);
    this.x1 = x - fixedLength;
    this.y1 = y;
    this.x2 = x + fixedLength;
    this.y2 = y;
    this.lineWidth = lineWidth;
    this.handleSize = 6;
    this.selectedHandle = null;
    this.uniqueId = id;
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
    MarkUp.updateMarkUpElement({
      id: this.uniqueId,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      stroke: this.stroke,
      fill: this.fill,
      lineWidth: this.lineWidth,
    });
  }

  drawHandles(ctx) {
    const handleSize = this.handleSize;

    // Draw handles at each end of the line
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x1 - handleSize / 2,
      this.y1 - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      this.x2 - handleSize / 2,
      this.y2 - handleSize / 2,
      handleSize,
      handleSize
    );

    // Draw handle to rotate the line
    // const centerX = (this.x1 + this.x2) / 2;
    // const centerY = (this.y1 + this.y2) / 2;
    // const radius =
    //   Math.sqrt(
    //     Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2)
    //   ) / 2;
    // const angle = Math.atan2(this.y1 - this.y2, this.x1 - this.x2);
    // const handleX = centerX + radius * Math.cos(angle + Math.PI / 2);
    // const handleY = centerY + radius * Math.sin(angle + Math.PI / 2);

    // ctx.fillStyle = "green";
    // ctx.fillRect(
    //   handleX - handleSize / 2,
    //   handleY - handleSize / 2,
    //   handleSize,
    //   handleSize
    // );
  }

  resize(newX, newY) {
    if (this.selectedHandle === "start") {
      this.x1 = newX;
      this.y1 = newY;
    } else if (this.selectedHandle === "end") {
      this.x2 = newX;
      this.y2 = newY;
    } else if (this.selectedHandle === "rotate") {
      const centerX = (this.x1 + this.x2) / 2;
      const centerY = (this.y1 + this.y2) / 2;
      const deltaX = newX - centerX;
      const deltaY = newY - centerY;
      const angle =
        Math.atan2(deltaY, deltaX) -
        Math.atan2(this.y1 - this.y2, this.x1 - this.x2);
      const radius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      const newAngle = Math.atan2(this.y1 - this.y2, this.x1 - this.x2) + angle;
      this.x1 = centerX + radius * Math.cos(newAngle - Math.PI / 2);
      this.y1 = centerY + radius * Math.sin(newAngle - Math.PI / 2);
      this.x2 = centerX + radius * Math.cos(newAngle + Math.PI / 2);
      this.y2 = centerY + radius * Math.sin(newAngle + Math.PI / 2);
    }
  }

  move(newX, newY) {
    // const deltaX = newX - this.x;
    // const deltaY = newY - this.y;
    // this.x1 += deltaX;
    // this.y1 += deltaY;
    // this.x2 += deltaX;
    // this.y2 += deltaY;
    this.x = newX;
    this.y = newY;
  }

  handleMouseDown(e) {
    const { x, y } = this.getMousePosition(e);
    if (this.selected) {
      // Check if the user clicked on a handle
      const centerX = (this.x1 + this.x2) / 2;
      const centerY = (this.y1 + this.y2) / 2;
      const radius =
        Math.sqrt(
          Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2)
        ) / 2;
      const angle = Math.atan2(this.y1 - this.y2, this.x1 - this.x2);

      const startHandleX = this.x1 - this.handleSize / 2;
      const startHandleY = this.y1 - this.handleSize / 2;
      const endHandleX = this.x2 - this.handleSize / 2;
      const endHandleY = this.y2 - this.handleSize / 2;
      const rotateHandleX =
        centerX + radius * Math.cos(angle + Math.PI / 2) - this.handleSize / 2;
      const rotateHandleY =
        centerY + radius * Math.sin(angle + Math.PI / 2) - this.handleSize / 2;
      console.log(
        "handleMouseDown",
        x,
        y,
        startHandleX,
        startHandleY,
        endHandleX,
        endHandleY,
        rotateHandleX,
        rotateHandleY
      );
      if (
        x >= startHandleX &&
        x <= startHandleX + this.handleSize * 2 &&
        y >= startHandleY &&
        y <= startHandleY + this.handleSize * 2
      ) {
        this.selectedHandle = "start";
        return;
      } else if (
        x >= endHandleX &&
        x <= endHandleX + this.handleSize * 2 &&
        y >= endHandleY &&
        y <= endHandleY + this.handleSize * 2
      ) {
        this.selectedHandle = "end";
        return;
      } else if (
        x >= rotateHandleX &&
        x <= rotateHandleX + this.handleSize * 2 &&
        y >= rotateHandleY &&
        y <= rotateHandleY + this.handleSize * 2
      ) {
        this.selectedHandle = "rotate";
        return;
      }
    }
    console.log("handleMouseDown", this.selectedHandle);
    this.selected = true;
  }

  handleMouseMove(e, ctx, drawImage) {
    const { x, y } = this.getMousePosition(e);
    if (this.selectedHandle) {
      drawImage();
      this.resize(x, y);
      //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setTimeout(() => {
        this.draw(ctx);
      }, 1);
    } else {
      this.move(x, y);
    }
  }

  handleMouseUp() {
    this.selectedHandle = null;
  }
  getMousePosition(e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
}

export default Line;
