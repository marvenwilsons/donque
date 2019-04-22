<template>
  <div class="flex flexcol flexwrap relative">
    <div class="fullheight-percentt fullwidth">
      <span
        class="pointer flex objtfy-list-render flexcol"
        v-for="(props,index) in inputData"
        :key="index"
      >
        <div class="flex">
          <span class="objtfy-list-items flex objtfy-props">{{index}}:</span>
          <span class="objtfy-list-items flex objtfy-values">
            <span>{{typeof props === 'string' ? props : '' }}</span>
            <span
              @click="expand(props,index)"
              class="objtfy-expand"
            >{{typeof props === 'object' ? '...expand' : '' }}</span>
          </span>
        </div>
        <span v-if="isReady && refresh()">
          <span v-if="expanded[index].isOpen">
            <span v-if="getype(props) === 'string' || getype(props) === 'number'">{{props}}</span>
            <span v-if="getype(props) === 'array'">{{props}}</span>
            <span v-if="getype(props) === 'object'">{{props}}</span>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputData"],
  data() {
    return {
      expanded: {},
      isReady: false,
      fromExpand: false
    };
  },
  methods: {
    expand(prop, index) {
      if (this.expanded[index].isOpen) {
        this.expanded[index].isOpen = false;
      } else {
        this.expanded[index].isOpen = true;
      }
      // causes to re render the component
      this.fromExpand = true;
      this.isReady = false;
      this.isReady = true;
    },
    refresh() {
      if (this.fromExpand === true) {
        // scans the current expanded values for unregistered props that need to be added
        Object.keys(this.inputData).map(items => {
          if (Object.keys(this.expanded).includes(items) === false) {
            this.expanded[items] = {
              isOpen: false,
              views: []
            };
          }
        });
        return true;
      } else {
        // the user supplied a new object, this code repopulates the the expanded variable to the new object
        Object.keys(this.inputData).map(i => {
          this.expanded[i] = {
            isOpen: false,
            views: []
          };
        });
        this.fromExpand = false;
        return true;
      }
    },
    getype(v) {
      let finalType = undefined;
      if (typeof v === "object") {
        finalType = Array.isArray(v) ? "array" : "object";
      } else if (typeof v === "string" || typeof v === "number") {
        finalType = typeof v;
      }

      return finalType;
    }
  },
  computed: {
    latestObj: () => {
      return this.expanded != undefined && this.expanded;
    }
  },
  mounted() {
    console.log("mounted");
    console.log(this.inputData);
    Object.keys(this.inputData).map(i => {
      this.expanded[i] = {
        isOpen: false,
        views: []
      };
    });
    this.isReady = true;
  }
};
</script>

<style>
.objtfy-props {
  flex: 1;
  font-weight: 600;
}
.objtfy-values {
  flex: 3;
}
.objtfy-list-items {
  padding: var(--size-1-half);
  color: var(--dark-1);
  flex-wrap: wrap;
}
.objtfy-list-items > span {
  word-wrap: break-word;
  /* flex-wrap: wrap; */
  flex-basis: 600px !important;
  max-width: 600px !important;
}
.objtfy-list-render:nth-child(even) {
  /* background-color: #86a6bd3d; */
  background-color: #86a6bd15;
}
.objtfy-list-render:nth-child(odd) {
  background-color: #86a6bd3d;
}
.objtfy-expand:hover {
  text-decoration: underline;
}
</style>
