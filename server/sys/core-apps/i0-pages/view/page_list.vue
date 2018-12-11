<template>
  <div id="i0-page-list" class="flex">
    <div id="dq-page-list" class="flex flexcol">
      <!-- search -->
      <search :totalPages="pages.length"/>

      <div id="dq-page-list-wrapper">
        <!-- create new page  -->
        <div id="dq-create-new-page" class="flex">
          <small class="dq-text-hover">Create new page &#10010;</small>
        </div>

        <!-- list -->
        <div class="dq-list-sender" v-for="(items,key) in pages" :key="key">
          <sender
            :component="{
            name:'pagesDetails',
            headColor:'#63ff63',
            headWidth:'100%',
            headName:items,
            closable:true,
          }"
            :position="1"
          >
            <div>&#128441; {{items}}</div>
            <div>
              <small>
                <span>lastmodified: 12/23/19 | parent page: about</span>
                <br>
                <span class="flex dq-list-methods-wrapper">
                  <span class="dq-text-hover">&#128465; Delete this page</span>
                  <span class="dq-text-hover">&#9998; Edit this page</span>
                </span>
              </small>
            </div>
          </sender>
        </div>
        <!--  -->
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
        
      ]
    };
  },
  methods: {
    send(comp, pos) {
      this.$store.commit("addComponent", { comp, pos });
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
}
#dq-page-list {
  flex: 1;
}
.dq-list-sender {
  padding-left: var(--size-1-half);
  border-bottom: 1px solid rgba(128, 128, 128, 0.465);
}
.dq-list-sender:hover {
  background-color: #393e42be;
}
.dq-list-methods-wrapper {
  justify-content: space-around;
}
#dq-create-new-page {
  justify-content: flex-end;
  padding-right: var(--size-1-full);
  cursor: pointer;
}
.dq-text-hover:hover {
  color: rgba(128, 128, 128, 0.561);
}
#dq-page-list-wrapper {
  /* border: 1px solid red; */
}
</style>


