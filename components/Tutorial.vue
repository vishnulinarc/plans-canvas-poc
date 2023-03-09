<template>
  <div class="plan-canvas-wrap">
    <canvas ref="canvas" width="1000" height="700" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawImage();
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
  },
};
</script>

<style scoped>
.plan-canvas-wrap {
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
