<template>
    <div>
        This page does not exist yet, but handled anyway.
        <h1>{{route}}</h1>
    </div>
</template>

<script>
export default {
  data() {
    return {
      siteTitle: 'petroff'
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
    }
  }
}
</script>

<style>

</style>
