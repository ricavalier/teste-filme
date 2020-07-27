<template>
  <div>
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
    </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'Busca',
  data () {
    return {
      txtBusca: '',
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
