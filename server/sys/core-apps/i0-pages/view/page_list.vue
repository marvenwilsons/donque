<template>
  <div id="i0-page-list" class="flex">
    <div id="dq-page-list" class="flex flexcol">
      <!-- search -->
      <search :totalPages="pages.length"/>

      <!-- create new page  -->
      <div id="dq-create-new-page" class="flex">
        <small class="dq-button-1">
          <strong>Create new page</strong> &#10010;
        </small>
      </div>
      <div id="dq-page-list-wrapper" class="relative">
        <span class="absolute">
          <!-- list -->
          <div @click="active(items)" :class="[activeLink == items && 'active' ,'dq-list-sender']" v-for="(items,key) in pages" :key="key">
            <sender
              :component="{
            name:'pagesDetails',
            headColor:'#0086c0',
            textColor:'white',
            headWidth:'100%',
            headName:items,
            closable:true,
          }"
              :position="1"
            >
              <div>
                &#128441;
                <strong>{{items}}</strong>
              </div>
              <div>
                <small>
                  <span class="dq-list-page-info flex">lastmodified: 12/23/19 | parent page: about</span>
                  
                  <span class="flex dq-list-methods-wrapper">
                    <span class="dq-text-hover">&#128465; Delete this page</span>
                    <span class="dq-text-hover">&#9998; Edit this page</span>
                  </span>
                </small>
              </div>
            </sender>
          </div>
          <!--  -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import sender from "@/server/sys/core-apps/pane-system/module/component-sender.vue";
import search from "./search.vue";
export default {
  data() {
    return {
      pages: [
        "home",
        "about",
        "contact",
        "register",
        "portfolio",
        "services",
        "menu",
      ],
      activeLink: undefined
    };
  },
  methods: {
    send(comp, pos) {
      this.$store.commit("addComponent", { comp, pos });
    },
    active(i){
      this.activeLink = i
    }
  },
  components: {
    sender,
    search
  },
  mounted() {
    // this.$axios.get("/dq?command=pageList");
    this.$store.state.comp.paneWidth.push({
      "max-width": "300px"
    });
    this.$store.state.comp.paneHeadColor.push({
      "background-color": "#ff63ff"
    });
  }
};
</script>

<style>
#i0-page-list {
  flex: 1;
  color: var(--blue-text);
}
#dq-page-list {
  flex: 1;
}
.dq-list-sender {
  padding-left: var(--size-1-half);
  padding-top: var(--size-1-half);
  padding-bottom: var(--size-1-half);
  border-bottom: 1px solid var(--blue-2);
  font-weight: 500;
}
.dq-list-sender:hover {
  background-color: var(--hover-blue);
  color: white;
  transition: 0.2s;
}
.dq-list-methods-wrapper {
  justify-content: space-around;
}
#dq-create-new-page {
  justify-content: flex-end;
  padding-right: var(--size-1-full);
  padding-bottom: var(--size-1-full);
  cursor: pointer;
  border-bottom: 1px solid var(--blue-2);
}
.dq-text-hover:hover {
  color: var(--blue-3);
}
#dq-page-list-wrapper {
  height: 100%;
  overflow-y: scroll;
}
#dq-page-list-wrapper > span{
  width: 100%;
}
.dq-list-page-info {
  min-width: 100%;
  justify-content: space-around;
}
.active{
  background-color: var(--hover-blue);
  color: white;
  box-shadow: 0px 0px 0px 5px var(--blue-3);
}
.dq-button-1 {
  border-radius: 2px;
  border: 1px solid var(--blue-3);
  background-color: var(--blue-4);
  padding-left: var(--size-1-half);
  padding-right: var(--size-1-half);
  box-shadow: 0px 0px 0px 2px var(--blue-3);
}
.dq-button-1:hover{
  color: var(--blue-2);
}
</style>


