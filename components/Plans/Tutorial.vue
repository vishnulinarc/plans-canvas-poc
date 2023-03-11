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
import Ruler from "./Ruler";
import MarkUp from "./MarkUp";
import Arrow from "./Arrow";
import Camera from "./Camera";
import Comment from "./Comment";
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
      } else if (this.tool === "ruler") {
        this.setRuler(e.offsetX, e.offsetY);
      } else if (this.tool === "arrow") {
        this.setArrow(e.offsetX, e.offsetY);
      } else if (this.tool === "camera") {
        this.setCamera(e.offsetX, e.offsetY);
      } else if (this.tool === "comment") {
        this.setComment(e.offsetX, e.offsetY);
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
        this.drawAllMarkups();
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
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      const id = MarkUp.addMarkUpElement({
        type: "line",
      });
      // Create a new line
      const line = new Line(x, y, id, "red", "blue");

      // Draw the line on the canvas
      line.draw(ctx);
      addEventListener("mousedown", (e) => line.handleMouseDown(e));
      addEventListener("mousemove", (e) =>
        line.handleMouseMove(e, ctx, this.drawImage)
      );
      addEventListener("mouseup", (e) => line.handleMouseUp(ctx));
    },
    setRuler(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const id = MarkUp.addMarkUpElement({
        type: "ruler",
      });

      // Create a new line
      const ruler = new Ruler(x, y, id, "red", "blue");

      // Draw the line on the canvas
      ruler.draw(ctx);
      addEventListener("mousedown", (e) => ruler.handleMouseDown(e));
      addEventListener("mousemove", (e) =>
        ruler.handleMouseMove(e, ctx, this.drawImage)
      );
      addEventListener("mouseup", (e) => ruler.handleMouseUp(ctx));
    },
    setArrow(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const id = MarkUp.addMarkUpElement({
        type: "arrow",
      });

      // Create a new line
      const arrow = new Arrow(x, y, id, "red", "blue");

      // Draw the line on the canvas
      arrow.draw(ctx);
      addEventListener("mousedown", (e) => arrow.handleMouseDown(e));
      addEventListener("mousemove", (e) =>
        arrow.handleMouseMove(e, ctx, this.drawImage)
      );
      addEventListener("mouseup", (e) => arrow.handleMouseUp(ctx));
    },
    setRectangle(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const id = MarkUp.addMarkUpElement({});

      // Create a new line
      const rectangle = new Rectangle([{ x, y }], id, "red", "blue");

      // Draw the line on the canvas
      rectangle.draw(ctx);

      addEventListener("mousedown", (e) => rectangle.handleMouseDown(e));

      const throttledMouseMove = throttle((e) => {
        rectangle.handleMouseMove(e, ctx);
      }, 15);
      addEventListener("mousemove", (e) => {
        //this.drawImage();

        rectangle.handleMouseMove(e, ctx, this.drawImage);
      });
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
    setCamera(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const camera = new Camera([{ x, y }], "red", "blue");

      // Draw the line on the canvas
      camera.draw(ctx);

      addEventListener("mousedown", (e) => camera.handleMouseDown(e));
      addEventListener("mousemove", (e) => camera.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => camera.handleMouseUp(ctx));

    },
    setComment(x, y) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Create a new line
      const comment = new Comment([{ x, y }], "red", "blue");

      // Draw the line on the canvas
      comment.draw(ctx);

      addEventListener("mousedown", (e) => comment.handleMouseDown(e));
      addEventListener("mousemove", (e) => comment.handleMouseMove(e, ctx));
      addEventListener("mouseup", (e) => comment.handleMouseUp(ctx));
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
    drawAllMarkups() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const markups = MarkUp.getMarkUpElements();
      for (let key in markups) {
        if (markups[key].type === "rect") {
          const rectangle = new Rectangle(
            markups[key].points,
            markups[key].id,
            markups[key].fill,
            markups[key].stroke
          );
          rectangle.draw(ctx);
        }
      }
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
