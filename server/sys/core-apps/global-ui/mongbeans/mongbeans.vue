<template>
  <div v-if="isReady" class="relative">
    <!-- ! -->
    <span class="tew flex absolute fullwidth fullheight-percent">
      <span class="exp">
        <span class="flex flexcenter">|</span>
      </span>
      <span class="exp">
        <span class="flex flexcenter">|</span>
      </span>
      <span class="exp">
        <span class="flex flexcenter">|</span>
      </span>
    </span>
    <!-- ! -->
    <div
      :data-spawn-id="nindex"
      class="mong-items"
      v-for="(val,index,nindex) in inputData"
      :key="index"
    >
      <!-- string case-->
      <div v-if="gettype(val) === 'string'" class="flex c-items2">
        <span class="mongbeans-key">
          <span class="mongbeans-key-str">{{index}}:</span>
        </span>
        <span class="mongbeans-val-ind flex">
          <span class="mongbeans-val-con">"{{val}}"</span>
        </span>
        <span class="mongbeans-type-ind flex flexcenter">String</span>
      </div>
      <!-- number case -->
      <div v-if="gettype(val) === 'number'" class="flex c-items2">
        <span class="mongbeans-key">
          <span class="mongbeans-key-str">{{index}}:</span>
        </span>
        <span class="mongbeans-val-ind flex">
          <span class="mongbeans-val-con">{{val}}</span>
        </span>
        <span class="mongbeans-type-ind flex flexcenter">Number</span>
      </div>
      <!-- boolean case -->
      <div v-if="gettype(val) === 'boolean'" class="flex c-items2">
        <span class="mongbeans-key">
          <span class="mongbeans-key-str">{{index}}:</span>
        </span>
        <span class="mongbeans-val-ind flex">
          <span class="mongbeans-val-con">{{val}}</span>
        </span>
        <span class="mongbeans-type-ind flex flexcenter">Boolean</span>
      </div>translate Vogel im Käfig
      <!-- obj case and array case -->
      <div v-if="gettype(val) === 'obj' || gettype(val) === 'array'">
        <!-- object case expand -->
        <!-- <small class="pad025" :style="{backgroundColor: 'red' , color:'white'}" >{{nindex}} - {{index}}</small> -->
        <div class="flex ">
          <div
            :id="`${nindex}-${index}-${gettype(val)}`"
            :style="{paddingLeft: getPadValForObjCase(nindex,index,gettype(val)) +'px'}"
            class="flex obj-ind-wrapper"
          >
            <span
              v-if="!openId[index]"
              @click="expand({isOpen: true, type: 'obj', val,index, nindex:`nindex${nindex}`})"
              class="pointer mongbeans-expand-btn flex flexcenter"
            >&#43;</span>
            <span
              v-if="openId[index]"
              @click="expand({isOpen: false, type: 'obj', val,index})"
              class="pointer mongbeans-expand-btn flex flexcenter"
            >-</span>
            <span class="mongbeans-key">{{index}}</span>
          </div>
          <span class="mongbeans-val-ind flex">
            <span
              v-if="val != null"
              class="mongbeans-val-con"
            >{{gettype(val) === 'obj' && `{${Object.keys(val).length} fields}` || gettype(val) === 'array' && `[${Object.keys(val).length} elements]`}}</span>
          </span>
          <span
            class="mongbeans-type-ind flex flexcenter"
          >{{gettype(val) === 'obj' && 'Object' || gettype(val) === 'array' && 'Array'}}</span>
        </div>
        <!-- recursive here -->
        <div v-if="openId[index]">
          <mongbeans class="mongbeans-nested padleft125" :recursiveData="{index,nindex}" :inputData="val"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mongbeans",
  props: ["inputData"],
  data() {
    return {
      isOpen: false,
      isReady: true,
      openId: {}
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    expand(data) {
      if (!this.openId[data.index]) {
        this.openId[data.index] = true;
        this.refresh();
      } else if (this.openId[data.index]) {
        this.openId[data.index] = false;
        this.refresh();
      }

      if (data.isOpen) {
        console.log("clicked");
        this.$store.state.mongbeans.being_clicked_current = data.index;
        console.log(this.$store.state.mongbeans.being_clicked_current);
      } else {
        this.$store.dispatch("trimMongBeansArray", data);
      }
    },
    refresh() {
      this.isReady = false;
      this.isReady = true;
    },
    getPadValForObjCase(nindex, index, type) {
      const els = document.getElementById(`${nindex}-${index}-${type}`);

      if (els) {
      console.log(`${nindex}${index}${type}`)
        const initialParent = els.attributes[0].ownerElement.parentElement.parentElement.parentElement
        console.log(initialParent.attributes[0].ownerElement.parentElement);
      }
    },
    gettype(v) {
      let finalType = undefined;
      if (typeof v === "object") {
        finalType = Array.isArray(v) ? "array" : "obj";
      } else if (
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean"
      ) {
        finalType = typeof v;
      }
      return finalType;
    }
  }
};
</script>

<style>
.exp {
  flex: 1;
}
.exp:nth-child(1),
.exp:nth-child(3) {
  background: rgba(128, 128, 128, 0.075);
}
.tew {
  z-index: -1;
}

.c-items {
  /* padding-left: 20px; */
  /* margin-left:20px; */
}
.c-items2 {
  /* margin-left: 20px; */
}
.type-ind-str {
  color: white;
  border-radius: 2px;
  min-width: 15px;
}

.type-ind-obj {
  border-radius: 2px;
}
.obj-ind-wrapper {
  flex: 1;
  max-width: 33.4%;
}
.mongbeans-val-ind {
  flex: 1;
  justify-content: flex-end;
  /* border: 1px solid red; */
  max-width: 35%;
  word-break: break-all;
}
.mongbeans-type-ind {
  flex: 1;
  justify-content: flex-end;
  /* min-width: 100px; */
}
.mongbeans-key {
  display: flex;
  flex: 1;
}
.mongbeans-key-str {
  padding-left: 22px;
}
.mongbeans-val-con {
  flex-basis: 600px;
  max-width: 500px;
  word-wrap: break-word;
}
.mongbeans-expand-btn {
  margin-right: 3px;
  margin-left: 3px;
  margin-top: 2px;
  padding-right: 2px;
  padding-left: 2px;
  font-weight: 600;
  min-width: 15px;
  border-radius: 2px;
  border: 1px solid white;
  max-height: 15px;
  background-color: var(--hover-blue);
  color: white;
}
.mong-items {
  z-index: 900;
}
.mong-items:hover {
  background-color: var(--blue-5);
  cursor: pointer;
  transition: 0.3s;
}
.mongbeans-nested {
  /* margin-left: 20px; */
}
</style>
