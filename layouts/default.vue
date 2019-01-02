<template>
  <div>
    <div v-if="isSet">
      <nuxt/>
    </div>
    <div v-if="!isSet">
      <init-form/>
    </div>
  </div>
</template>

<script>
import initForm from "@/server/sys/core-apps/init-app/init.vue";

export default {
  data(){
    return {
      isSet: undefined
    }
  },
  components:{
    initForm
  },
  mounted(){
    this.$axios.$get("/dqapp/init")
    .then(res => {
      this.isSet = res.response
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
