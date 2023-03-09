<template>
  <div class="plan-canvas-wrap">
    <canvas ref="canvas" width="1000" height="700" />
  </div>
</template>

<script>
import Line from "./Line";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Pencil from "./Pencil";
export default {
  mounted() {
    this.drawImage();
    setTimeout(() => {
      this.setLine();
      this.setRectangle();
      this.setEllipse();
      this.setPencil();
    }, 1000);
  },
  methods: {
    drawImage() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");

      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
      image.src = "AQQ.png";
    },
    setLine() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const line = new Line(150, 150, 50, 150, "red", "blue");

      // Draw the line on the canvas
      line.draw(ctx);
      addEventListener("mousedown", (e) => line.handleMouseDown(e));
      addEventListener("mousemove", (e) => line.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => line.handleMouseUp(ctx));
    },
    setRectangle() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const rectangle = new Rectangle([{ x: 400, y: 400 }], "red", "blue");

      // Draw the line on the canvas
      rectangle.draw(ctx);

      addEventListener("mousedown", (e) => rectangle.handleMouseDown(e));
      addEventListener("mousemove", (e) => rectangle.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => rectangle.handleMouseUp(ctx));
    },
    setEllipse() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const ellipse = new Ellipse([{ x: 200, y: 200 }], "red", "blue");

      // Draw the line on the canvas
      ellipse.draw(ctx);

      addEventListener("mousedown", (e) => ellipse.handleMouseDown(e));
      addEventListener("mousemove", (e) => ellipse.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => ellipse.handleMouseUp(ctx));
    },
    setPencil() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const pencil = new Pencil([], "red", "blue");

      // Draw the line on the canvas
      pencil.draw(ctx);

      addEventListener("mousedown", (e) => pencil.handleMouseDown(e));
      addEventListener("mousemove", (e) => pencil.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => pencil.handleMouseUp(ctx));
    },
  },
};
</script>

<style scoped>
.plan-canvas-wrap {
  width: 100vw;
  height: 95vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
