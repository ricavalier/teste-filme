<template>
  <q-page>
    <div class="content">
      <!-- {{dadosFilme}} -->
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-12 q-pa-md text-center">
            <q-card 
              class="my-card bg-black text-grey-2 flex flex-center img-responsive"
              style="margin: 0 auto; height: 400px; min-width: 180px"
              v-if="dadosFilme.Poster === 'N/A' || !dadosFilme.Poster"
            >
              <q-card-section class="text-uppercase" style="font-size: 1.4em; font-weight: bold;">
                <q-icon name="image_not_supported" color="white" size="50px" /><br>
                {{dadosFilme.Title}}
              </q-card-section>
            </q-card>
            <img
              class="img-responsive"
              :src="dadosFilme.Poster"
              v-if="dadosFilme.Poster !== 'N/A'"
            />
        </div>
        <div class="col-md-9 col-sm-8 col-xs-12 q-pa-md">
          <h3 class="q-my-sm text-uppercase">{{dadosFilme.Title}}</h3>
          <q-separator class="q-mb-md" color="negative" />
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 q-px-md">
              <p class="q-mb-xs"><h5 class="q-my-sm text-bold text-uppercase">{{dadosFilme.Type}}</h5>
              <!-- <strong>Tipo: </strong> <span class="text-bold text-uppercase">{{dadosFilme.Type}}</span></p> -->
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12 q-px-md">
              <p class="q-mb-xs" v-if="dadosFilme.Plot"><strong>Sinopse: </strong> <span>{{dadosFilme.Plot}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Director"><strong>Direção: </strong> <span>{{dadosFilme.Director}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Writer"><strong>Escrito por: </strong> <span>{{dadosFilme.Writer}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Actors"><strong>Atores: </strong> <span>{{dadosFilme.Actors}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Production"><strong>Produção: </strong> <span>{{dadosFilme.Production}}</span></p>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12 q-px-md">
              <p class="q-mb-xs" v-if="dadosFilme.Year"><strong>Ano: </strong> <span>{{dadosFilme.Year}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Released"><strong>Estreia: </strong> <span>{{dadosFilme.Released}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Rated"><strong>Classificação: </strong> <span>{{dadosFilme.Rated === 'R' ? 'Restrita' : '' }}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Runtime"><strong>Duração: </strong> <span>{{dadosFilme.Runtime}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Genre"><strong>Genero: </strong> <span>{{dadosFilme.Genre}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Language"><strong>Idioma: </strong> <span>{{dadosFilme.Language}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Country"><strong>País: </strong> <span>{{dadosFilme.Country}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.BoxOffice"><strong>Bilheteria: </strong> <span>{{dadosFilme.BoxOffice}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Awards"><strong>Premiação: </strong> <span>{{dadosFilme.Awards}}</span></p>
              <p class="q-mb-xs" v-if="dadosFilme.Website"><strong>Site: </strong> <span>{{dadosFilme.Website}}</span></p>
            </div>
          </div>
          <q-separator class="q-my-md" color="grey-5" />
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 q-px-md">
              <h5 class="q-my-sm text-bold">Avaliações:</h5>
              <p class="q-mb-xs" v-for="(item,index) in dadosFilme.Ratings" :key="index">
                <strong class="text-uppercase">{{item.Source}} </strong> - <span class="text-bold text-uppercase text-negative">{{item.Value}}</span>
              </p>
            </div>
          </div>

        </div>
      </div>
        
    </div>
    </q-page>
</template>

<script>
export default {
  name: 'Teste',
  data() {
    return {
      idFilme: this.$route.params.id,
      dadosFilme: []
    }
  },
  methods: {
    carregaFilme(){
      var url = process.env.API.url + process.env.API.usr
        url = url + '&i=' + this.idFilme
        this.$axios.get(url)
        .then(res => {
          var dados = res.data
          this.dadosFilme = dados
          // if(dados.Response === "True") {
          //   this.listaFilmes = this.listaFilmes.concat(dados.Search)
          //   this.checaResultados = dados.Response
          // } else {
          //   this.checaResultados = "False"
          // }
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
  mounted() {
    this.idFilme ? this.carregaFilme() : this.showNotif('Erro ao processar os dados do Filme!', 'error', 'negative', 'white', 'bottom')
    //setTimeout(()=>{
      //alert(JSON.stringify(this.$route.params.id))
    //},100)
  }
}
</script>
