<template>
  <div>
    <div class="areaBusca bg-grey-2" :class="{'ativo q-py-md q-px-sm' : estaAtivo}">
      <q-input
        bottom-slots
        class="q-pa-xs"
        input-class="text-bold"
        color="grey-8"
        v-model="txtBusca"
        label="Procure seu Filme"
        @keypress="limpaBusca()"
        @keyup.enter="validaBusca(txtBusca)"
        dense
        :rules="rules.requerido"
      >
      <template v-slot:after>
        <q-btn class="cursor-pointer bg-grey-8 text-white" @click="validaBusca(txtBusca)">
          <q-icon name="search" /><span class="btnTxtBusca"> Buscar</span>
        </q-btn>
        <q-btn class="cursor-pointer bg-grey-8 text-white btnVoltar q-ml-sm" to="/">
          <q-icon name="arrow_back" />
        </q-btn>
        <q-btn class="cursor-pointer bg-grey-8 text-white btnFechar q-ml-sm" @click="fechaBusca()">
          <q-icon name="close" />
        </q-btn>
      </template>
      </q-input>
    </div>
    <div class="areaBtn">
      <q-btn class="cursor-pointer bg-grey-8 text-white q-ml-sm" @click="abreBusca()">
        <q-icon name="search" />
      </q-btn>
      <q-btn class="cursor-pointer bg-grey-8 text-white q-ml-sm" to="/">
        <q-icon name="arrow_back" />
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Busca',
  data () {
    return {
      txtBusca: '',
      estaAtivo: false,
      rules: {
				requerido: [
					v => !!v || this.validaCampo('requerido')
				],
      },
			mensagemForm: {
				requerido: 'Preencha o Campo de Busca!'
			}
    }
  },
  methods: {
    abreBusca() {
      this.estaAtivo = true
    },
    fechaBusca() {
      this.estaAtivo = false
    },
    limpaBusca () {
      var rota = this.$router.currentRoute.path
      if(rota !== '/') {
        this.$router.push('/')
      }
    },
    execBusca (b) {
      var busca = '/busca/'+ b
      var rota = this.$router.currentRoute.path

      if(busca === rota) {
        this.showNotif('Sua busca já foi realizada', 'warning', 'orange-8', 'white', 'bottom')
      } else {
        this.$root.$emit('showBusca', b)
        this.$router.push(busca)
        setTimeout(()=> {
          this.$root.$emit('envBusca', b)
        }, 100)
      }
    },
		validaCampo (t) {
			const tipo = t
			if (tipo === 'requerido') {
				 return this.mensagemForm.requerido
			} else {
        this.showNotif('Falha na validação dos Campos', 'error', 'negative', 'white', 'bottom')
			}
    },
    validaBusca (b) {
      this.estaAtivo = false
      if(!!b) {
        this.execBusca(b)
      } else {
        this.showNotif('Verifique o campo de busca!', 'warning', 'orange-8', 'white', 'bottom')
      }
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
