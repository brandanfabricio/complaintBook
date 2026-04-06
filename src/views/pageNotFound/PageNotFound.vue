<template>
  <div class="not-found">
    <div class="not-found__card">
      <img class="not-found__logo" src="/logoAL.png" alt="Antonio Luquin" />
      <p class="not-found__code">Error 404</p>
      <h1 class="not-found__title">No encontramos la sucursal o la página solicitada</h1>
      <p class="not-found__text">
        Verificá el enlace desde el que ingresaste o continuá desde el sitio
        oficial de Antonio Luquin.
      </p>
      <a
        class="not-found__button"
        href="https://www.antonioluquin.com.ar/home"
      >
        Ir al sitio oficial
      </a>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, #BDBDBD 0%, #E0E0E0 100%);
}

.not-found__card {
  width: 100%;
  max-width: 520px;
  padding: 40px 32px;
  border-radius: 24px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 18px 45px rgba(46, 36, 24, 0.12);
}

.not-found__logo {
  width: 120px;
  max-width: 100%;
  margin-bottom: 20px;
}

.not-found__code {
  margin: 0 0 8px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8c6b2f;
}

.not-found__title {
  margin: 0 0 16px;
  font-size: 2rem;
  line-height: 1.15;
  color: #2c241b;
}

.not-found__text {
  margin: 0 0 28px;
  font-size: 1rem;
  line-height: 1.6;
  color: #5e564c;
}

.not-found__button {
  display: inline-block;
  padding: 14px 22px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  color: #ffffff;
  background: #a22c29;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.not-found__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(162, 44, 41, 0.24);
}
</style>
