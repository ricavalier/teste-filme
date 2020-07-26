<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-2 text-black" :class="{ active: estaAtivo }">
      <q-toolbar class="content row">
        <div class="logo q-my-sm" :class="{ 'col-xs-6': estaAtivo }" @click="restore()">
          INFO FILMES
        </div>
        <div class="text-right" :class="{ 'col-xs-6': estaAtivo }">
            <Busca />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- <router-view v-if="verBusca" :busca="recebeBusca" :resultadoBusca="listaFilmes" @paginacao="processaBusca" /> -->
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
      //alert('bla ' +b)
      if(!!b) {
        this.verBusca = true
        this.estaAtivo = true
      }
		})
	},
  methods: {
    restore() {
      this.verBusca = false
      this.estaAtivo = false
    },
    // enviarBusca (f) {
    //   this.filme = f
    //   //alert(f)
    //   this.verBusca = true
    //   this.estaAtivo = true
    // },
    // processaBusca(f){
    //   var filme = f
    //   if(filme !== this.recebeBusca) {
    //     this.paginacaoBusca = 1
    //     this.listaFilmes = []
    //   } else {
    //     this.paginacaoBusca = this.paginacaoBusca + 1
    //   }
    //   this.recebeBusca = f
    //   this.$q.loading.show({
		// 		message: 'Aguarde, estamos processando...'
    //   })
    //   //alert(JSON.stringify(process.env.API.url))
		// 	var url = process.env.API.url + process.env.API.usr
		// 	url = url + '&s=' + this.recebeBusca +'&page=' + this.paginacaoBusca
		// 	this.$axios.get(url)
		// 		.then(res => {
    //       this.$q.loading.hide()
    //       var dados = res.data
    //       alert(JSON.stringify(dados.Response))
    //       //this.listaFilmes += dados
    //       if(dados.Response === 'True'){
    //         this.paginacaoBusca > 1 ? this.listaFilmes += dados.Search : this.listaFilmes = dados.Search
    //         this.verBusca = true
    //         this.estaAtivo = true
    //       } else {
    //         this.showNotif('Nenhum filme encontrado!', 'warning', 'negative', 'white', 'bottom')
    //       } 
		// 		})
		// 		.catch(err => {
		// 			this.$q.loading.hide()
		// 			this.showNotif('Erro ao processar os dados: <br> ' + err.data, 'error', 'negative', 'white', 'bottom')
		// 			console.log(err.data)
		// 		})
    // },
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
