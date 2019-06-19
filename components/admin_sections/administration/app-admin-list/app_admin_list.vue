<template>
  <div class="fullheight-percent flex flexcol ">
    <span class="app-admin-list-heading">
      <span class="fullwidth">
        <strong>Application Admin List</strong>
      </span>
      <span>
        <span>| Total Admins: {{len}}</span>
      </span>
    </span>
    <div class="con relative ">
      <div v-if="inputData" class="abs flex">
        <div :class="[isCollapse && 'win1', 'abs' ,'flex']">
          <simpleTable
            v-show="!isCollapse"
            @rowSelect="selectedRow"
            v-bind:onylShowProperties="props"
            v-bind:inputData="inputData"
          />
          <!-- <span id="dq-collapse-btn-parent" class="flex flexcol flexcenter">
            <span
              @click="collapse"
              class="dq-collapse pointer"
            >{{!isCollapse ? '&#9204;' : '&#9205;'}}</span>
          </span>-->
        </div>

        <div class="relative flex flexcol">
          <!-- 1 -->
          <div v-if="selectedData" class="entity-menu flex">
            <span
              @click="changeView(undefined)"
              :class="[!selectedView ? '_selWin' : ''  ,'pointer','entity-rebbon-menu-btn']"
            >Entity View</span>
            <span
              v-if="selectedData.title != 'owner'"
              @click="changeView('actions')"
              :class="[selectedView =='actions' ? '_selWin': '' ,'pointer','entity-rebbon-menu-btn']"
            >Actions</span>
            <span
              @click="changeView('analytics')"
              :class="[selectedView =='analytics' ? '_selWin': '' ,'pointer','entity-rebbon-menu-btn']"
            >Entity Analytics</span>
          </div>
          <!-- 2 -->
          <div id="mongbeans-wrap" class="entity-display flex fullwidth relative entity-host">
            <div class="fullwidth absolute fullheight-percent">
              <mongbeans
                v-if="!selectedView && selectedData != undefined"
                :inputData="selectedData"
              />
              <actionsWindow :inputData="selectedData" v-if="selectedView === 'actions'"/>
              <analyticsWindow :inputData="selectedData" v-if="selectedView === 'analytics'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import simpleTable from "@/components/global-ui/simple-table/simple-table.vue";
import mongbeans from "@/components/global-ui/mongbeans/host.vue";
import actionsWindow from "./actions.vue";
import analyticsWindow from "./analytics.vue";

export default {
  data() {
    return {
      inputData: undefined,
      selectedData: undefined,
      props: ["adminName", "username", "title", "email"],
      selectedView: undefined,
      len: undefined,
      isCollapse: false,
      refreshMongbeans: false
    };
  },
  methods: {
    selectedRow(ResourceOfSelectedAdmin) {
      // console.log("testing!");
      this.selectedData = ResourceOfSelectedAdmin;
      this.selectedView = undefined;
      // this.$store.dispatch("populateInitailKeys", value);
      // this.$store.dispatch("populateInitailKeys", this.testData);
    },
    changeView(data) {
      this.selectedView = data;
    },
    collapse() {
      console.log("collapsing!");
      this.isCollapse = !this.isCollapse;

      if (this.isCollapse) {
        this.$store.commit("changeCollapseState", true);
        this.$store.commit('mongbeans/setCurWidth',350)
      } else {
        this.$store.commit("changeCollapseState", false);
        // this.$store.state.mongbeans.testData = false;
        this.$store.commit('mongbeans/setCurWidth',248)
      }
    }
  },
  components: {
    simpleTable,
    mongbeans,
    actionsWindow,
    analyticsWindow
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Application admin list",
      maximizable: true
    });
  },
  mounted() {
    this.$store
      .dispatch("systemCall", {
        command: "listAdmins",
        section: "adminMethods",
        method: "get"
      })
      .then(data => {
        console.log("1. Fetching inputdata app admin list sample");
        this.inputData = data.data.content;
        this.len = this.inputData.length;
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>

<style>
.abs {
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.103);
}
.abs > div:nth-child(1) {
  flex: 1;
}
.abs > div:nth-child(2) {
  flex: 1.5;
}
.con {
  height: 100%;
  /* border: 2px solid blue; */
}
._selWin {
  border-bottom: 2px solid var(--hover-blue);
  font-weight: 600;
}
.entity-rebbon-menu-btn {
  padding: calc(var(--fontSize) * 1.25);
  color: var(--dark-1);
}
.entity-host {
  overflow: auto;
}
.entity-menu {
  flex: 1;
  border: 1px solid rgba(128, 128, 128, 0.096);
}
.entity-display {
  flex: 100;
}
.dq-collapse {
  font-size: calc(var(--fontSize) * 1.25);
  padding: calc(var(--fontSize) * 0.25);
  color: var(--blue-text-2);
}
#dq-collapse-btn-parent {
  background-color: var(--blue-3);
}
.win1 {
  max-width: 20px;
  transition: 0.5s;
}
</style>