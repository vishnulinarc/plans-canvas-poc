<template>
  <div>
    <button @click="toolSelected('rect')">Rectangle</button>
    <button @click="toolSelected('circle')">Circle</button>
    <button @click="toolSelected('pen')">Pen</button>
    <button @click="toolSelected('line')">Line</button>
    <button @click="toolSelected('ruler')">Ruler</button>
    <button @click="toolSelected('arrow')">Arrow</button>
    <button @click="toolSelected('camera')">Camera</button>
    <button @click="toolSelected('comment')">Comment</button>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  methods: {
    toolSelected(tool) {
      this.$emit("toolSelected", tool);
    },
  },
};
</script>
