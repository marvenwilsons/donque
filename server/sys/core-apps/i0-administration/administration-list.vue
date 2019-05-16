<template>
  <div class="dq-list-wrapper relative">
    <span class="absolute">
      <div
        @click="active(items)"
        :class="[activeLink == items && 'active' ,'dq-list-sender']"
        v-for="(items,key) in sideBarlist"
        :key="key"
      >
        <div>
          <strong>{{items === 'Admins' ? 'Administrators' : items}}</strong>
        </div>
        <div>
          <small>{{itemsDesc[items]}}</small>
        </div>
        <div class="flex flexcol sidebar-method-host">
          <sender
            :component="{
            name:'administrationDetails',
            headColor:'#0086c0',
            textColor:'white',
            headWidth:$store.state.paneConf['Administration']['panewidth'][1],
            headName:items,
            closable:true,
        }"
            :position="1"
          > 
            <span @click="customPane(items2)" class="sidebar-method-btns flex flexcol" v-for="(items2,key2) in sideBarMethods[items]" :key="key2" >
              <span :class="[selectedPane === items2 && 'activePane']">{{items2}}</span>
            </span>
          </sender>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import sender from "@/server/sys/core-apps/pane-system/module/component-sender.vue";

export default {
  data() {
    return {
      selectedPane: undefined,
      sideBarlist: [
        "Admins",
        "Teams",
        "Roles",
        "Organizational Chart",
        "Activities log"
      ],
      sideBarMethods: {
        Admins: ['Add new application admin', 'Add new database admin', 'Application admin list', 'Database admin list','Current live admins', 'Lost password request'],
        Teams: ['Create new team','Display all teams'],
        Roles: ['Create custom roles','Display all roles'],
        "Organizational Chart": [],
        "Activities log": []
      },
      itemsDesc: {
        Admins:
          "admin related settings, manages administrators to manage application resources",
        Teams:
          "Assign admins to teams, a way to categorize admins base on the bussiness role granted to them",
        Roles:
          "A way to grant access to admins for the application resources, and a way to regulate admin actions",
        "Organizational Chart":
          "See the diagram that shows the structure of the organization and the relationships",
        "Activities log":
          "A way to track actions of admins, see the log of actions taken by the admins on a certain time"
      },
      activeLink: undefined
    };
  },
  methods: {
    active(i) {
      this.activeLink = i;
    },
    send(comp, pos) {
      this.$store.commit("addComponent", { comp, pos });
    },
    customPane(paneName){
      this.selectedPane = paneName
      this.$store.state.administrationCurrentView = paneName
    }
  },
  components: {
    sender
  }
};
</script>

<style>
.sidebar-method-host {
  margin: calc(var(--fontSize) * 0.25);
  padding: calc(var(--fontSize) * 0.25);
}
.sidebar-method-host > span {
  padding: calc(var(--fontSize) * 0.25);
  font-weight: 600;
}
.sidebar-method-btns{
  padding: calc(var(--fontSize) * 0.25);
  /* align-items: flex-end; */
}
.sidebar-method-btns:hover{
  text-decoration: underline;
}
.activePane{
  /* font-weight: 600; */
  text-decoration: underline;
}
</style>
