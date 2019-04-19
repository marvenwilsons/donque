<template>
  <div class="fullheight-percent flex flexcol">
    <span class="app-admin-list-heading">
      <span class="fullwidth"><strong>Application Admin List</strong></span>
      <span>
        <span>| Total Admins: {{len}}</span>
      </span>
    </span>
    <div class="con relative">
			<div v-if="inputData" class="abs flex">
        <div class="abs">
          <simpleTable @rowSelect="selectedRow" v-bind:onylShowProperties="props" v-bind:inputData="inputData" />
        </div>
        <div class="abs">
          <objectify v-bind:inputData="selectedData" />
        </div>
      </div>
		</div>
  </div>
</template>

<script>
import simpleTable from "@/server/sys/core-apps/pane-system/module/simple-table.vue";
import objectify from "@/server/sys/core-apps/pane-system/module/objectify.vue";

export default {
	data() {
		return {
      inputData: undefined,
      selectedData: undefined,
      props: ["adminName", "username", "title", "email"],
      len: undefined,
		}
  },
  methods: {
    selectedRow(value){
      this.selectedData = value
    }
  },
	components: {
    simpleTable,
    objectify
	},
  mounted() {
    this.$store.commit('changeCurrentPaneSettings',{
      property: 'pane-width',
      value: '100%'
    })

    this.$store
      .dispatch("systemCall", {
        command: "getAdmins",
        section: "adminMethods",
        method: "get"
      })
      .then(data => {
				console.log('1. Fetching inputdata app admin list sample')
        this.inputData = data.data.content;
        this.len = this.inputData.length
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>

<style>
.abs{
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.103);
}
.abs > div:nth-child(1) {
  flex: 1
}
.abs > div:nth-child(2) {
  flex: 1.5
}
.con{
	height: 100%;
	/* border: 2px solid blue; */
}
</style>
