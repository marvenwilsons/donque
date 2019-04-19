<template>
  <div class>
    <table id="objtotbl">
      <tr>
        <th v-for="items in theads" :key="items">{{capitalize(items)}}</th>
      </tr>
      <tr class="mytr mytrtxt" v-for="(rows,index) in trs" :key="rows">
        <td
          :class="currentSelected === index ? 'active' : ''"
          v-for="items in theads"
          :key="items"
          @click="active({rows,index,trs})"
        >
          <span v-if="typeof tds[index][items] === 'string'">{{limitStringLen(tds[index][items])}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["inputData", "onylShowProperties"],
  data() {
    return {
      theads: undefined,
      trs: undefined,
      tds: undefined,
      currentSelected: undefined
    };
  },
  methods: {
    getHeads(e) {
      console.log("heads!");
      return e.map(items => Object.keys(items))[0];
    },
    nestedObjectHandler(data) {
      console.log(data[Object.keys(data)[0]]);
      console.log(typeof data[Object.keys(data)[0]] === "object");
      console.log(Array.isArray(data[Object.keys(data)[0]]));
    },
    active({ rows, index, trs, items }) {
      const selectedObject = this.inputData[index];
      this.$emit("rowSelect", selectedObject);
      this.currentSelected = index;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    limitStringLen(str) {
      if (str.length > 18) {
        const newStr = str.replace(str.slice(20, str.length), "...");

        const i1 = newStr.charAt(0) === ".";
        const i2 = newStr.charAt(1) === ".";
        const i3 = newStr.charAt(2) === ".";

        console.log(`${i1} - ${i2} - ${i3}`);

        if (i1 && i2 && i3) {
          return newStr.replace("...",'');
        } else {
          return str.replace(str.slice(20, str.length), "...");
        }
      } else {
        return str;
      }
    }
  },
  mounted() {
    console.log("2. input Data!");
    // this.theads = this.inputData.map(items => Object.keys(items))[0]
    this.trs = this.inputData.map(items => items).length;
    this.tds = this.inputData;

    const x = this.inputData.map(items => Object.keys(items))[0];
    const onlyInclude = ["adminName", "username", "title", "email"];
    const y = x.filter(items => {
      return onlyInclude.includes(items) && items;
    });
    this.theads = y;
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
  /* color: rgb(39, 39, 39); */
}
table#objtotbl tr:nth-child(even) {
  background-color: #86a6bd3d;
}
table#objtotbl tr:nth-child(odd) {
  background-color: #fff;
}
table {
  /* border: 1px solid rgba(0, 0, 0, 0.103); */
  width: 100%;
}
td {
  /* min-width: 170px; */
  color: var(--dark-1);
}
th {
  color: var(--dark-1);
}
table#objtotbl tr.mytr:hover {
  background-color: var(--hover-blue);
  cursor: pointer;
  transition: 0.2s;
}
.active {
  color: white;
  box-shadow: 2px 2px 15px 1px #393e4244;
  background-color: var(--hover-blue);
}
.mytrtxt:hover > td {
  color: white;
  box-shadow: 2px 2px 15px 1px #393e4244;
}
</style>
