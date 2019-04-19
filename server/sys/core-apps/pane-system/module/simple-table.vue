<template>
  <div class="fullwidth">
    <table id="objtotbl">
      <tr>
        <th v-for="items in theads" :key="items" >{{items}}</th>
      </tr>
      <tr class="mytr" v-for="(rows,index) in trs" :key="rows">
				<td v-for="items in theads" :key="items" >
					<span v-if="typeof tds[index][items] === 'string'">{{tds[index][items]}}</span>
					<button @click="nestedObjectHandler(tds[index][items])" class="pointer" v-if="typeof tds[index][items] === 'object'">Nested Object</button>
				</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["inputData"],
  data() {
    return {
			theads: undefined,
			trs: undefined,
			tds: undefined
		};
  },
  methods: {
    getHeads(e) {
      console.log("heads!");
      return e.map(items => Object.keys(items))[0]
		},
		nestedObjectHandler(data) {
			console.log(data[Object.keys(data)[0]])
			console.log(typeof data[Object.keys(data)[0]] === 'object')
			console.log(Array.isArray(data[Object.keys(data)[0]]))
		}
  },
  mounted() {
		console.log("2. input Data!");
		// this.theads = this.inputData.map(items => Object.keys(items))[0]
		this.trs = this.inputData.map(items => items).length
		this.tds = this.inputData

		const x = this.inputData.map(items => Object.keys(items))[0]
		const onlyInclude = ['adminName','username','title','email']
		const y = x.filter(items => {
			return onlyInclude.includes(items) && items
		})
		this.theads = y
  }
};
</script>

<style scoped >
table,
th,
td,
td > span {
  /* border-left: 1px solid rgba(0, 0, 0, 0.24); */
  border-collapse: collapse;
  /* border-spacing: 5px; */
  /* font-family: var(--cuprum); */
}
th,
td {
  padding: calc(var(--fontSize) * 0.5);
  text-align: left;
  color: rgb(39, 39, 39);
}
table#objtotbl tr:nth-child(even) {
  background-color: rgba(238, 238, 238, 0.527);
}
table#objtotbl tr:nth-child(odd) {
  background-color: #fff;
}
table {
  border: 1px solid rgba(0, 0, 0, 0.103);
  /* max-width: 100%; */
}
td{
  /* max-width: 800px; */
  /* max-width: 100%; */
  min-width: 100px;
}
table#objtotbl tr.mytr:hover {
  background-color: var(--hover-blue);
  cursor: pointer;
	transition: 0.2s;
}
</style>
