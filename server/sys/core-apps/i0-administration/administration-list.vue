<template>
  <div class="dq-list-wrapper relative">
    <span class="absolute">
      <div
        @click="active(items)"
        :class="[activeLink == items && 'active' ,'dq-list-sender']"
        v-for="(items,key) in sideBarlist"
        :key="key"
      >
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
          <div>
            <strong>{{items}}</strong>
          </div>
          <div>
              <small>{{itemsDesc[items]}}</small>
          </div>
        </sender>
      </div>
    </span>
  </div>
</template>

<script>
import sender from "@/server/sys/core-apps/pane-system/module/component-sender.vue";

export default {
  data() {
    return {
      sideBarlist: [
        "Admins",
        "Teams",
        "Roles",
        "Organizational Chart",
        "Activities log"
      ],
      itemsDesc: {
          Admins: 'admin related settings, manages administrators to manage application resources',
          Teams: 'Assign admins to teams, a way to categorize admins base on the bussiness role granted to them',
          Roles: 'A way to grant access to admins for the application resources, and a way to regulate admin actions',
          'Organizational Chart':'See the diagram that shows the structure of the organization and the relationships',
          'Activities log': 'A way to track actions of admins, see the log of actions taken by the admins on a certain time'
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
    }
  },
  components: {
    sender
  }
};
</script>

<style>
</style>
