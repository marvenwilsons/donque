<template>
    <div>
        <!-- this route will only execute when a user will provide an absolute path -->
        hey: {{$route.params.comp}}
        <span @click="navi('app')">
            app
        </span>
    </div>
</template>

<script>
export default {
  layout: "admin",
  methods:{
      navi(n){
          this.$router.push(`pages/${n}`)
      }
  }
}
</script>

<style>

</style>
