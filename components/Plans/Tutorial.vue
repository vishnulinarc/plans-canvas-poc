<template>
  <div class="plan-canvas-wrap">
    <canvas ref="canvas" width="1000" height="700" />
    <Toolbar @toolSelected="toolSelected" />
  </div>
</template>

<script>
import Line from "./Line";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Pencil from "./Pencil";
import Toolbar from "./Toolbar";
import throttle from "lodash/throttle";
export default {
  components: {
    Toolbar,
  },
  data() {
    return {
      tool: null,
    };
  },
  mounted() {
    this.drawImage();
    // setTimeout(() => {
    //   this.setLine();
    //   this.setRectangle();
    //   this.setEllipse();
    //   this.setPencil();
    // }, 1000);
    addEventListener("mousedown", (e) => {
      if (this.tool === "rect") {
        this.setRectangle(e.offsetX, e.offsetY);
      } else if (this.tool === "circle") {
        this.setEllipse(e.offsetX, e.offsetY);
      } else if (this.tool === "pen") {
        this.setPencil();
      } else if (this.tool === "line") {
        this.setLine(e.offsetX, e.offsetY);
      }
      this.tool = null;
    });
  },
  methods: {
    drawImage() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      const image = new Image();
      image.src = "AQQ.png";
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      var zoomLevel = 1;
      var scaleFactor = 1.1;
      // handle trackpad zoom gesture
      canvas.addEventListener("wheel", function (event) {
        event.preventDefault();
        var delta = event.wheelDelta / 120;
        var zoomDir = delta > 0 ? 1 : -1;
        zoomLevel = zoomLevel * Math.pow(scaleFactor, zoomDir);
        redraw();
      });

      // redraw the canvas at the current zoom level
      function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(zoomLevel, zoomLevel);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
      }
    },
    setLine(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const line = new Line(x, y, "red", "blue");

      // Draw the line on the canvas
      line.draw(ctx);
      addEventListener("mousedown", (e) => line.handleMouseDown(e));
      addEventListener("mousemove", (e) => line.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => line.handleMouseUp(ctx));
    },
    setRectangle(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const rectangle = new Rectangle([{ x, y }], "red", "blue");

      // Draw the line on the canvas
      rectangle.draw(ctx);

      addEventListener("mousedown", (e) => rectangle.handleMouseDown(e));

      const throttledMouseMove = throttle((e) => {
        rectangle.handleMouseMove(e, ctx);
      }, 15);
      addEventListener("mousemove", (e) =>{ 
        //this.drawImage();
        throttledMouseMove(e)});
      addEventListener("mouseup", (e) => rectangle.handleMouseUp(ctx));
    },
    setEllipse(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const ellipse = new Ellipse([{ x, y }], "red", "blue");

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
    toolSelected(tool) {
      this.tool = tool;
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
