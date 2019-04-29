<template>
  <div class="fullheight-percent flex flexcol">
    <span class="app-admin-list-heading">
      <span class="fullwidth">
        <strong>Application Admin List</strong>
      </span>
      <span>
        <span>| Total Admins: {{len}}</span>
      </span>
    </span>
    <div class="con relative">
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
          </span> -->
        </div>

        <div class="relative flex flexcol">
          <!-- 1 -->
          <div v-if="selectedData" class="entity-menu flex">
            <span
              @click="changeView(undefined)"
              :class="[!selectedView ? '_selWin' : ''  ,'pointer','entity-rebbon-menu-btn']"
            >Entity View</span>
            <span
              @click="changeView('actions')"
              :class="[selectedView =='actions' ? '_selWin': '' ,'pointer','entity-rebbon-menu-btn']"
            >Actions</span>
            <span
              @click="changeView('analytics')"
              :class="[selectedView =='analytics' ? '_selWin': '' ,'pointer','entity-rebbon-menu-btn']"
            >Entity Analytics</span>
          </div>
          <!-- 2 -->
          <div class="entity-display flex fullwidth relative entity-host">
            <div class="fullwidth absolute">
              <mongbeans
                v-if="!selectedView && selectedData != undefined"
                v-bind:inputData="selectedData"
              />
              <actionsWindow v-if="selectedView === 'actions'"/>
              <analyticsWindow v-if="selectedView === 'analytics'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import simpleTable from "@/server/sys/core-apps/pane-system/module/simple-table.vue";
import mongbeans from "@/server/sys/core-apps/global-ui/mongbeans/mongbeans.vue";
import actionsWindow from "./actions.vue";
import analyticsWindow from "./analytics.vue";

export default {
  data() {
    return {
      testData: {
        name: {
          k: "marven",
          keyOrValue1: "marven",
          test: {
            test1: "123",
            test2: "123",
            test: {
              test1: "123",
              test2: "123"
            }
          },
          books: {
            jquery: 'true',
            sql: true,
            javascript_frame_works: {
              vue: 'true'
            }
          },
          todos: [
            'go to church',
            'go to metro',
            'buy groceries',
            null
          ]
        }
      },
      inputData: undefined,
      selectedData: undefined,
      props: ["adminName", "username", "title", "email"],
      selectedView: undefined,
      len: undefined,
      isCollapse: false
    };
  },
  methods: {
    selectedRow(value) {
      this.selectedData = value;
      this.selectedView = undefined;
    },
    changeView(data) {
      this.selectedView = data;
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  components: {
    simpleTable,
    mongbeans,
    actionsWindow,
    analyticsWindow
  },
  mounted() {
    this.$store.commit("changeCurrentPaneSettings", {
      property: "pane-width",
      value: "100%"
    });

    this.$store
      .dispatch("systemCall", {
        command: "getAdmins",
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
}
.entity-rebbon-menu-btn {
  padding: calc(var(--fontSize) * 1.25);
}
.entity-host {
  overflow: auto;
}
.entity-menu {
  flex: 1;
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