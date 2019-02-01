<template>
  <div>
    <ul id="dq-nav-ul">
      <!-- dashboard -->
      <span @click="activate(9)">
        <sender
          :class="[isActive == 9 && 'active']"
          :component="{
        name:'dashboard',
        headColor:'#0086c0',
        headWidth: '100%',
        headName: 'dashboard',
        closable: false}"
          :position="0"
        > <span class="flex spacebetween"> <span>Dashboard</span> </span> </sender>
      </span>

      <!-- pages -->
      <span @click="activate(0)">
        <sender
          :class="[isActive == 0 && 'active']"
          :component="{
        name:'pages',
        headColor:'#0086c0',
        headWidth: '300px',
        headName: 'Pages',
        closable: true}"
          :position="0"
        > <span class="flex spacebetween"> <span>Pages</span> <span class="dq-n-ind" >7</span> </span> </sender>
      </span>

      <!-- pages -->
      <span @click="activate(8)">
        <sender
          :class="[isActive == 8 && 'active']"
          :component="{
        name:'app',
        headColor:'#0086c0',
        headWidth: '300px',
        headName: 'Application and settings',
        closable: true}"
          :position="0"
        >app</sender>
      </span>

      <!-- Collections -->
      <span @click="activate(1)">
        <sender
          :class="[isActive == 1 && 'active']"
          :component="{
        id:'collections',
        name:'collections',
        headColor:'#0086c0',
        headWidth:'300px',
        headName:'Collections',
        closable:true
      }"
          :position="0"
        ><span class="flex spacebetween"> <span>Services</span> <span class="dq-n-ind" >10</span> </span></sender>
      </span>

      <!-- Components -->
      <span @click="activate(2)">
        <sender
          :class="[isActive == 2 && 'active']"
          :component="{
        id:'components',
        name:'components',
        headColor:'#0086c0',
        headName:'Components',
        closable:false
      }"
          :position="0"
        >Components</sender>
      </span>

      <!-- Database -->
      <span @click="activate(3)">
        <sender
          :class="[isActive == 3 && 'active']"
          :component="{
        id:'database',
        name:'database',
        headColor:'#0086c0',
        headName:'databases',
        headWidth:'300px',
        closable:true
      }"
          :position="0"
        >Database</sender>
      </span>

      <!-- Files -->
      <span @click="activate(4)">
        <sender
          :class="[isActive == 4 && 'active']"
          :component="{
        id:'files',
        name:'files',
        headColor:'#0086c0',
        headName:'files',
        headWidth:'100%',
        closable: true
      }"
          :position="0"
        >Files</sender>
      </span>

      <!-- Plugins -->
      <span @click="activate(5)">
        <sender
          :class="[isActive == 5 && 'active']"
          :component="{
        id:'plugins',
        name:'plugins',
        headColor:'#0086c0',
        headName:'plugins',
        headWidth:'100%',
        closable:false
      }"
          :position="0"
        >Plugins</sender>
      </span>

      <!-- MarketPlace -->
      <span @click="activate(6)">
        <sender
          :class="[isActive == 6 && 'active']"
          :component="{
        id:'marketplace',
        name:'marketplace',
        headColor:'#0086c0',
        headName:'marketplace',
        headWidth:'100%',
        closable:false
      }"
          :position="0"
        >Marketplace</sender>
      </span>

      <!-- Shell -->
      <span @click="activate(7)">
        <sender
          :class="[isActive == 7 && 'active']"
          :component="{
          name:'shell',
          'headColor':'#0086c0', 
          headWidth:'1250px', 
          headName:`Shell - ${$store.state.admin.title}@${$store.state.admin.adminName}`, 
          closable: false }"
          :position="0"
        >Shell</sender>
      </span>
    </ul>
  </div>
</template>

<script>
import sender from "../module/component-sender.vue";

export default {
  data() {
    return {
      isActive: undefined,
      arr: this.$store.state.comp.arr
    };
  },
  methods: {
    activate(p) {
      // console.log(p)
      let parent = document.getElementById("dq-nav-ul");
      let btns = parent.getElementsByClassName("light-text");
      // btns[p].className += " active";
      this.isActive = p;
    }
  },
  watch: {
    arr(o,n) {
      n[0].name == 'dashboard' && this.activate(9)
    }
  },
  mounted(){
    this.activate(9)
  },
  components: {
    sender
  }
};
</script>

<style>
#dq-nav-ul > span > li {
  padding-left: calc(var(--fontSize) * 1.25);
  padding-bottom: calc(var(--fontSize) * 0.5);
  padding-top: calc(var(--fontSize) * 0.5);
  color: var(--blue-text);
  font-weight: 600;
}
#dq-nav-ul > span > li:hover {
  background-color: var(--hover-blue);
  color: white;
  transition: 0.2s;
}
#dq-nav-ul > span > .active {
  color: white;
}
#dq-nav-ul > span {
  flex: 1;
}
.dq-n-ind{
  margin-right: var(--size-1-full);
  border-radius: 100%;
}
</style>
