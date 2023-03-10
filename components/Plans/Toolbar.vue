<template>
  <div>
    <button @click="toolSelected('rect')">Rectangle</button>
    <button @click="toolSelected('circle')">Circle</button>
    <button @click="toolSelected('pen')">Pen</button>
    <button @click="toolSelected('line')">Line</button>
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
