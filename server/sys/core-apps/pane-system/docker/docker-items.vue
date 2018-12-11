<template>
  <div>
    <ul id="dq-nav-ul">
      <!-- pages -->
      <sender
        :component="{
        name:'pages',
        headColor:'#ff63ff',
        headWidth: '300px',
        headName: 'Page',
        closable: true}"
        :position="0"
      >&#128441; pages</sender>

      <!-- Collections -->
      <sender :component="{
        name:'collection',
        headColor:'orange',
        headWidth:'300px',
        headName:'Collections',
        closable:true
      }" :position="0">&#128297; collection</sender>

      <!-- Components -->
      <sender :component="{
        name:'components',
        headColor:'pink',
        headName:'Components',
        closable:false
      }" :position="0">components</sender>

      <!-- Database -->
      <sender :component="{
        name:'database',
        headColor:'orange',
        headName:'databases',
        headWidth:'300px',
        closable:true
      }" :position="0">&#10066; database</sender>

      <!-- Files -->
      <sender :component="{
        name:'files',
        headColor:'green',
        headName:'files',
        headWidth:'100%',
        closable: true
      }" :position="0">files</sender>

      <!-- Plugins -->
      <sender :component="{
        name:'plugins',
        headColor:'orange',
        headName:'plugins',
        headWidth:'100%',
        closable:false
      }" :position="0">plugins</sender>

      <!-- MarketPlace -->
      <sender :component="{
        name:'marketplace',
        headColor:'orange',
        headName:'marketplace',
        headWidth:'100%',
        closable:false
      }" :position="0">marketplace</sender>

      <!-- Shell -->
      <sender
        :component="{
          name:'shell',
          'headColor':'#63ff63', 
          headWidth:'1000px', 
          headName:'Shell - employee@marven', 
          closable: false }"
        :position="0"
      >&#8984; Shell</sender>
    </ul>
  </div>
</template>

<script>
import sender from "../module/component-sender.vue";

export default {
  components: {
    sender
  }
};
</script>

<style>
#dq-nav-ul > li {
  padding-left: calc(var(--fontSize) * 1.25);
}
</style>
