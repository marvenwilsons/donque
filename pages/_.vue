<template>
    <div :is="view"></div>
</template>

<script>
// Admin's Root components
import dq_login from '@/components/admin_root/app_login/dqlogin.vue'
import dq_init from '@/components/admin_root/app_init/dqinit.vue'

export default {
  data() {
    return {
      siteTitle: 'petroff',
      mounted_data: undefined
    }
  },
  validate({query,params,store}) {
    // validate if params
    console.log(params)
    console.log(query)

    return true
  },
  head() {
    return {
      title: this.routeEnding,
      meta: [
        {hid: 'description', name: 'description', content: `${this.routeEnding} page`}
      ]
    }
  },
  computed: {
    route () {
      return this.$route.params.pathMatch
    },
    routeEnding () {
      const allRoutes = this.$route.params.pathMatch.split('/')
      return allRoutes[allRoutes.length - 1]  === '' ? this.siteTitle : allRoutes[allRoutes.length - 1]
    },
    queryObject () {
      return this.$route.query
    },
    view() {
      // this code will only execute on after the app is initialized
      // the owner has the capability to change the login link, so it is posible that the login page is
      // not dq login anymore after initialization
      if(this.$store.state.actions[0].title === 'redirect' && this.$store.state.actions[0].content === 'dqlogin'){
        return 'dq_login'
      } 
      // this code will only execute if the app is not initialized yet
      // no admin, no app manifest, no database yet
      else if (this.$store.state.actions[0].title === 'redirect' && this.$store.state.actions[0].content === '__dqinit') {
        return 'dq_init'
      }

      return 'test'
    }
  },
  components: {
    dq_login,
    dq_init
  },
  mounted() {
  }
}
</script>

<style>

</style>
