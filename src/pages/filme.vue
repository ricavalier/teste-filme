<template>
  <div class="content">
      {{$router}}
  </div>
</template>

<script>
export default {
  name: 'Teste',
  mounted() {
      //setTimeout(()=>{
          alert(JSON.stringify(this.$route.params))
          console.log(this.$route.params)
      //},100)
  }
}
</script>
