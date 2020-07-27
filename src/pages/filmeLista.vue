<template>
  <q-page>
    <div class="content">
      <q-infinite-scroll @load="onLoad" :offset="500" @reset="txtBusca">
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12 q-pa-md text-center" v-for="(item, index) in listaFilmes" :key="index">
              <q-card 
                class="my-card bg-black text-grey-2 full-height flex flex-center"
                style="max-width: 200px; height: 250px !important; margin: 0 auto; cursor: pointer;"
                v-if="item.Poster === 'N/A' || !item.Poster"
                @click="verFilme(item.imdbID)"
              >
                <q-card-section class="text-uppercase text-bold">
                  <q-icon name="image_not_supported" color="white" size="50px" /><br>
                  {{ item.Title}}
                </q-card-section>
                <q-tooltip 
                  content-class="bg-grey-8 text-grey-2 text-left"
                  content-style="width: 250px; font-size: 1.0em"
                  anchor="top left"
                  self="top left"
                >
                  <strong 
                    class="text-white" 
                    style="font-size: 1.2em; text-decoration: uppercase"
                  >
                    {{item.Title}}
                  </strong>
                  <q-separator color="grey-5" class="q-my-sm" />
                  <strong>Tipo: </strong>
                  <span>{{item.Type}}</span><br>
                  <strong>Ano: </strong>
                  <span>{{item.Year}}</span><br>
                  <q-btn 
                    class="bg-grey-5 text-white no-shadow q-px-md cursor-pointer"
                    style="z-index: 20"
                    dense
                    @click="verFilme(item.imdbID)"
                  > 
                    <q-icon class="q-mr-sm" name="info" size="18px" /> Info 
                  </q-btn>
                </q-tooltip>
              </q-card>
              <q-img
                clas="full-height bg-transparent"
                :src="item.Poster"
                style="max-width: 200px; max-height: 250px; cursor: pointer;"
                v-else
                @click="verFilme(item.imdbID)"
              >
                <q-tooltip 
                  content-class="bg-grey-8 text-grey-2 text-left"
                  content-style="width: 250px; font-size: 1.0em"
                  anchor="top left"
                  self="top left"
                >
                  <strong
                    class="text-white" 
                    style="font-size: 1.2em; text-decoration: uppercase"
                  >
                    {{item.Title}}
                  </strong>
                  <q-separator color="grey-5" class="q-my-sm" />
                  <strong>Tipo: </strong>
                  <span>{{item.Type}}</span><br>
                  <strong>Ano: </strong>
                  <span>{{item.Year}}</span><br>
                  <q-btn
                    class="bg-grey-5 text-white no-shadow q-px-md cursor-pointer"
                    style="z-index: 20"
                    dense
                    @click="verFilme(item.imdbID)"
                  > 
                    <q-icon class="q-mr-sm" name="info" size="18px" /> Info 
                  </q-btn>
                </q-tooltip>
              </q-img>
          </div>
        </div>
        <template v-slot:loading>
          <div clas="row">
            <div class="col-xs-12 text-center q-my-md" v-if="checaResultados === 'True'">
              <q-spinner-dots color="negative" size="40px" style="margin: 0 auto" />
            </div>
            <div class="col-xs-12 text-center q-my-md" v-if="checaResultados === 'False'">
              Sua pesquisa chegou ao fim!
            </div>
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'filmeLista',
    data(){
        return {
          listaFilmes: [],
          listaProcessada: [],
          txtBusca: '',
          recebeBusca: '',
          paginacaoBusca: 0,
          checaResultados: "False",
          buscaReset: void 0
        }
    },
    methods: {
      verFilme (p) {
        this.$router.push('/filme/' + p)
      },
      onLoad (index, done) {
        setTimeout(() => {
          if(this.checaResultados === "True" && index !== undefined) {
            var url = process.env.API.url + process.env.API.usr
            url = url + '&s=' + this.txtBusca +'&page=' + index
            this.$axios.get(url)
            .then(res => {
              var dados = res.data
              if(dados.Response === "True") {
                this.listaFilmes = this.listaFilmes.concat(dados.Search)
                this.checaResultados = dados.Response
              } else {
                this.checaResultados = "False"
              }
              done()
            })
            .catch(err => {
              this.checaResultados === "False"
              if(err.data === "undefined" || err.data === undefined) {
                this.showNotif('Busca concluida', 'warning', 'orange', 'white', 'bottom')
              } else {
                this.showNotif('Erro ao processar os dados:' + err.data, 'error', 'negative', 'white', 'bottom')
              }
              console.log(err.data)
            })
          }
        }, 2000)
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
    },
    created () {
      this.$root.$on('envBusca', (b) => {
        this.txtBusca = b
        this.checaResultados = "True"
      })
    },
    watch: {
      txtBusca (b) {
        this.listaFilmes = []
        this.checaResultados = "True"
      }
    },
    mounted() {
    }
  }
</script>
