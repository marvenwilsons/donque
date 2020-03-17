<template>
  <div v-if="isReady" class="relative">
    <div
      :data-spawn-id="nindex"
      class="mong-items"
      v-for="(val,index,nindex) in inputData"
      :key="index"
    >
    {{setValAndTypeWidths(nindex,index,gettype(val))}}
      <!-- string case-->
      <div v-if="gettype(val) === 'string'" class="flex c-items2">
        <span class="mongbeans-key">
          <span class="mongbeans-key-str">{{index}}:</span>
        </span>
        <span
          :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
          class="mongbeans-val-ind flex"
        >
          <!-- string val -->
          <span class="mongbeans-val-con"> "{{val}}"</span>
        </span>
        <!-- string key -->
        <span
          :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
          class="mongbeans-type-ind flex flexcenter"
        > String</span>
      </div>
      <!-- number case -->
      <div v-if="gettype(val) === 'number'" class="flex c-items2">
        <span class="mongbeans-key">
          <span class="mongbeans-key-str">{{index}}:</span>
        </span>
        <span
          :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
          class="mongbeans-val-ind flex"
        >
          <span class="mongbeans-val-con">{{val}}</span>
        </span>
        <span
          :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
          class="mongbeans-type-ind flex flexcenter"
        >Number</span>
      </div>
      <!-- boolean case -->
      <div v-if="gettype(val) === 'boolean'" class="flex c-items2">
        <span class="mongbeans-key">
          <span class="mongbeans-key-str">{{index}}:</span>
        </span>
        <span
          :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
          class="mongbeans-val-ind flex"
        >
          <span class="mongbeans-val-con">{{val}}</span>
        </span>
        <span
          :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
          class="mongbeans-type-ind flex flexcenter"
        >Boolean</span>
      </div>
      <!-- obj case and array case -->
      <div v-if="gettype(val) === 'obj' || gettype(val) === 'array'">
        <!-- object case expand -->
        <div class="flex">
          <div class="flex obj-ind-wrapper">
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
            <!-- object key -->
            <span class="mongbeans-key">{{index}}</span>
          </div>
          <!-- object val -->
          <span
            :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
            class="mongbeans-val-ind flex"
          >
            <span
              v-if="val != null"
              class="mongbeans-val-con"
            > {{gettype(val) === 'obj' && `{${Object.keys(val).length} fields}` || gettype(val) === 'array' && `[${Object.keys(val).length} elements]`}}</span>
          </span>
          <!-- object type -->
          <span
            :id="`${nindex}-${index}-${gettype(val)}`"
            :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
            class="mongbeans-type-ind flex flexcenter"
          >{{gettype(val) === 'obj' && 'Object' || gettype(val) === 'array' && 'Array'}}</span>
        </div>
        <!-- recursive here -->
        <div v-if="openId[index]">
          <mongbeans
            class="mongbeans-nested padleft125"
            :recursiveData="{parent:index,parent_index:nindex}"
            :inputData="val"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mongbeans",
  props: ["inputData", "recursiveData"],
  data() {
    return {
      isOpen: false,
      isReady: true,
      openId: {}
    };
  },
  mounted(){
    this.refresh()
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
        this.$store.state.mongbeans.being_clicked_current = data.index;
      } else {
        
      }
    },
    refresh() {
      this.isReady = false;
      this.isReady = true;
    },
    setValAndTypeWidths(nindex, index, type) {
      const els = document.getElementById(`${nindex}-${index}-${type}`);
      if (els) {
        this.$store.state.mongbeans.widths[`${nindex}-${index}-${type}`] =
          els.offsetWidth;

      }
      // this.$store.state.mongbeans.curr_width = Object.values(
      //   this.$store.state.mongbeans.widths
      // ).sort()[0];
      this.$store.commit('mongbeans/setCurWidth')

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
  align-items: center;
}
.mongbeans-val-ind {
  flex: 1;
  justify-content: flex-end;
  /* border: 1px solid greenyellow; */
  border: 1px solid rgba(128, 128, 128, 0.096);
  max-width: 35%;
  word-break: break-all;
  padding:  calc(var(--fontSize) * 0.50);
}
.mongbeans-type-ind {
  flex: 1;
  justify-content: flex-end;
  /* min-width: 100px; */
  border: 1px solid rgba(128, 128, 128, 0.096);
}
.mongbeans-key {
  display: flex;
  flex: 1;
  border: 1px solid rgba(128, 128, 128, 0.096);
  align-items: center;
  padding:  calc(var(--fontSize) * 0.50);
  /* border: 1px solid red; */
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
  color: var(--dark-1);
  font-weight: 600;
}
.mong-items:hover {
  background-color: var(--blue-5);
  cursor: pointer;
  transition: 0.3s;
}
</style>
