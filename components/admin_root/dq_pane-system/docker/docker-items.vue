<template>
  <div>
    <ul id="dq-nav-ul" v-for="(items,key) in sideItems()" :key="key">
      <!-- dashboard -->
      <span @click="activate(key)">
        <sender
          :class="[isActive == key && 'active']"
          :component="{
        name:items.toLowerCase(),
        headColor:'#0086c0',
        headWidth: $store.state.paneConf[items]['panewidth'][0],
        headName: items,
        closable: false}"
          :position="0"
        > <span class="flex spacebetween"> <span>{{items}}</span> </span> </sender>
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
      r: this.$store.state.resources,
      sideItems() {
        // return Object.keys(this.$store.state.resources)
      },
      arr: this.$store.state.pane_system.arr
    };
  },
  methods: {
    activate(p) {
      // console.log(p)
      let parent = document.getElementById("dq-nav-ul");
      // let btns = parent.getElementsByClassName("light-text");
      // btns[p].className += " active";
      this.isActive = p;
    }
  },
  watch: {
    arr(o,n) {
      n[0].name == 'dashboard' && this.activate(0)
    }
  },
  mounted(){
    this.activate(0)
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
  color: white;
  transition: 0.1s;
}
#dq-nav-ul > span > .active {
  color: white;
}
#dq-nav-ul > span {
  flex: 1;
}
#dq-nav-ul {
  margin: 0;
}
.dq-n-ind{
  margin-right: var(--size-1-full);
  border-radius: 100%;
}
</style>
