<template>
  <main>
    <div id="app">
      <header>
        <Navbar />
      </header>
      <main class="bg-color"><router-view /></main>
      <footer></footer>
    </div>
  </main>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
.bg-color {
  background-color: var(--color-background);
}
</style>