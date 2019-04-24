<template>
  <main class="fullheight-percent">
    <div id="docker-heading" class="flex flexcol">
      <div class="flex flexcenter">
        <div class="dq-fav-con flex flexcenter">
          fav icon here
        </div>
      </div>
      <div class="flex flexcol dq-nav-user-info">
        <span>
          {{$store.state.admin.title}}
        </span>
        <span>
          {{$store.state.admin.adminName}}
        </span>
      </div>
    </div>
    <div>
      <docker-items/>
    </div>
  </main>
</template>

<script>
import dockerItems from './docker-items.vue'

export default {
  components: {
    dockerItems
  }
};
</script>


<style scoped>
main {
  min-width: 200px;
}
.light-text{
    padding-left: calc(var(--fontSize)*1.25);
    cursor: pointer;
}
#docker-heading{
  padding-top: calc(var(--fontSize)*1.25);
  padding-bottom: calc(var(--fontSize)*1.25);
}
#docker-heading > div{
  text-align: center;
}
.dq-fav-con{
  height: calc(var(--fontSize) * 10.25);
  width: calc(var(--fontSize) * 10.25);
  border-radius: 100%;
  background-color: white;
}
.dq-nav-user-info{ 
  margin-top: calc(var(--fontSize)*1.25);
}
</style>
