<template>
  <div class="layout-container">
    <!-- Sidebar -->
    <aside class="container__sidebar">
      <slot name="sidebar"></slot>
    </aside>

    <!-- Main -->
    <main class="container__main">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layout-container {
  display: flex;
  height: 100%;
  .container__sidebar {
    flex: 1;
    min-width: 200px;
  }

  .container__main {
    /* Take the remaining width */
    flex: 4;

    /* Make it scrollable */
    // overflow: auto;

    padding: 10px;
    // flex-grow: 4;
    min-width: 600px;
  }
}
</style>
