<template>
  <div class="flex f1" id="i0-page-details">

  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.comp.paneWidth.push({
      flex:1
    })
    this.$store.state.comp.paneHeadColor.push({
      'background-color':'#63ff63'
    })
    
  }
};
</script>

<style>
hgroup {
    text-align: right;
    font-family: Verdana, sans-serif;
    padding-right: 16px;
    border-right: 10px solid #00c8d7;
}
#i0-page-details{
  flex: 1;
  background-color:var(--dark-1);
}
</style>
