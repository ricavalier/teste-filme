<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-2 text-black" :class="{ active: estaAtivo }">
      <q-toolbar class="content row">
        <div class="logo q-my-sm" :class="{ 'col-xs-6': estaAtivo }" @click="voltaInicio()">
          INFO FILMES
        </div>
        <div class="text-right" :class="{ 'col-xs-6': estaAtivo }">
            <Busca />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view v-if="verBusca" />
    </q-page-container>
  </q-layout>
</template>

<script>
  import Busca from 'components/Busca.vue'
  export default {
    name: 'FilmesLayout',
    components: { Busca },
    data () {
      return {
        verBusca: false,
        estaAtivo: false,
        filme: '',
        recebeBusca: '',
        paginacaoBusca: 1,
      }
    },
    created () {
      this.$root.$on('showBusca', (b) => {
        if(!!b) {
          this.verBusca = true
          this.estaAtivo = true
        }
      })
    },
    methods: {
      voltaInicio() {
        this.verBusca = false
        this.estaAtivo = false
        this.$router.push('/')
      },
      showNotif (message, icon, color, txtColor, position) {
        this.$q.notify({
          message: message,
          icon: icon,
          color: color,
          textColor: txtColor,
          position: position,
          multiLine: true,
          dense: true
        })
      }
    }
  }
</script>
