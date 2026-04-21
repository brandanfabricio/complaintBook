<template>
  <CContainer sm>
    <div class="container-nav d-flex justify-content-center align-items-end">
      <!-- <img src="@/assets/navbar/logo.svg" alt="Logo Antionio Luquin" /> -->
      <!-- <img src="@/assets/navbar/logo.svg" alt="Logo Antionio Luquin" /> -->
      <CImage
        fluid
        :src="logo"
        class="custom-img-logo mb-4"
        alt="Logo Antionio Luquin"
      />
    </div>
  </CContainer>
</template>

<script setup >
import logo from "@/assets/navbar/logo.svg";
</script>
<style scoped>
.container-nav {
  height: 15vh;
}
.custom-img-logo {
  height: 3rem;

}
.bg-color-nav {
  background-color: #fff;
}
</style>