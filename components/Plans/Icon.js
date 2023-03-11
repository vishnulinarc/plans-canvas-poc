import throttle from "lodash/throttle";
export default class Icon {
  constructor(point, iconSrc, iconSize) {
    this.x = point[0].x;
    this.y = point[0].y;
    this.selectedIcon = false;
    this.selectedHandle = null;
    this.iconSize = iconSize;
    this.iconSrc = iconSrc;
    this.handleSize = 8;
    this.points = this.getVertices();
  }

  getVertices() {
    return [
      { x: this.x, y: this.y },
      { x: this.x + this.iconSize, y: this.y },
      { x: this.x + this.iconSize, y: this.y + this.iconSize },
      { x: this.x, y: this.y + this.iconSize },
    ];
  }

  draw(ctx) {
    const image = new Image();
    image.src = this.iconSrc;
    image.onload = () => {
      ctx.drawImage(image, this.x, this.y, this.iconSize, this.iconSize);
      this.drawBoundingBox(ctx);
      this.drawHandles(ctx);
      //this.drawAllMarkups();
    };
  }

  drawBoundingBox(ctx) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.iconSize, this.iconSize);
  }

  drawHandles(ctx) {
    const handleSize = this.handleSize;
    console.log(this.points);

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

  isMouseOverIcon(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.iconSize &&
      mouseY >= this.y &&
      mouseY <= this.y + this.iconSize
    ); // Change 50 to match icon size
  }

  isMouseOverHandles(mouseX, mouseY) {
    for (let i = 0; i < this.points.length; i++) {
      if (
        mouseX >= this.points[i].x - this.handleSize &&
        mouseX <= this.points[i].x + this.handleSize &&
        mouseY >= this.points[i].y - this.handleSize &&
        mouseY <= this.points[i].y + this.handleSize
      ) {
        return true;
      }
    }
    return false;
  }

  handleMouseDown(e) {
    const { x, y } = this.getMousePosition(e);
    if (this.isMouseOverIcon(x, y)) {
      this.selectedIcon = true;
    } else if (this.isMouseOverHandles(x, y)) {
      this.selectedHandle = true;
    }
  }

  reDraw(ctx, scope) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    scope.draw(ctx);
  }

  handleMouseMove(e, ctx) {
    const { x, y } = this.getMousePosition(e);

    if (this.isMouseOverIcon(x, y)) {
      e.target.style.cursor = "move";
    } else if (this.isMouseOverHandles(x, y)) {
      e.target.style.cursor = "se-resize";
    } else {
      e.target.style.cursor = "default";
    }

    const throttledDraw = throttle(this.reDraw, 1000);

    if (this.selectedIcon) {
      this.points = this.getVertices();
      this.x = x - this.iconSize / 2;
      this.y = y - this.iconSize / 2;
      throttledDraw(ctx, this);
    } else if (this.selectedHandle) {
      this.points = this.getVertices();
      this.iconSize = x - this.x;
      throttledDraw(ctx, this);
    }
  }

  handleMouseOver(e) {
    console.log(e);
    const { x, y } = this.getMousePosition(e);
    if (this.isMouseOverIcon(x, y) || this.isMouseOverHandles(x, y)) {
      e.target.style.cursor = "pointer";
    } else {
      e.target.style.cursor = "default";
    }
  }

  handleMouseUp(e) {
    this.selectedIcon = false;
    this.selectedHandle = false;
  }
  getMousePosition(e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
}
