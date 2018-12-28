<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$axios.$post("/dqapp/users", { data: "use fs _clear", token: this.token })
    .then(res => {
      console.log(res.response)
    })
    .catch((e) => {
      console.log(e)
    })
  }
}
</script>



<style scoped>
@import url('@/server/sys/admin assets/css/normalize.css');
</style>
