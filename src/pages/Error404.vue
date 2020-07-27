<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <img
        alt="Info Filmes APP"
        src="~assets/logo.png"
      >
      <div class="text-grey-8" style="font-size: 15vh">
        404
      </div>

      <div class="text-h4 text-grey-8">
        Vixi, página não encontrada!
      </div>
      <q-btn
        class="q-mt-xl"
        color="grey-8"
        text-color="white"
        unelevated
        to="/"
        label="Inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
