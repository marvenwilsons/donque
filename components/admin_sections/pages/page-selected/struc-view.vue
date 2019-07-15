<template>
  <div>
    <div class="flex" v-for="(el,el_i) in data.els" :key="`el-${el_i}`">
      <div class="dq-strvw-el padright025 pointer">
        <div @click="openOpt(el.uid,mode, 1)" class="pointer">
          <div>
            <i class="fas fa-caret-right"></i>
            {{trimTitle(el.tag)}}
          </div>
          <div
            @click="openOpt(el.uid,mode, 0)"
            v-if="opn_opts.includes(el.uid)"
            class="flex padleft125 relative"
          >
            <div class="pad025 dq-page-el-opt-bx absolute flex">
              <div class="flex flexcol">
                <div @click="view = 'dddesc'">Desc</div>
                <div @click="view = 'addChild'" >AddChild</div>
                <div @click="view = 'classList'">ClassList</div>
                <div @click="view = 'properties'">Properties</div>
                <div>Cut</div>
                <div @click="view = 'dddel'">Delete</div>
              </div>
              <div class="padleft050">
                <div class=" margin025 fullheight-percent">
                  <div class="fullheight-percent" :data="el" :is="view" ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <strvw :data="el"></strvw>
    </div>
  </div>
</template>

<script>
import addChild from '../struct-view-el-opts/addChild'
import classList from '../struct-view-el-opts/classList'
import dddel from '../struct-view-el-opts/delete'
import dddesc from '../struct-view-el-opts/desc'
import properties from '../struct-view-el-opts/properties'

export default {
  props: ["data"],
  name: "strvw",
  data() {
    return {
      open: "",
      isOpen: false,
      opn_opts: [],
      mode: true,
      gg: [],
      view: 'dddesc'
    };
  },
  components: {
    addChild,
    classList,
    dddel,
    dddesc,
    properties
  },
  methods: {
    trimTitle(t) {
      if (t) {
        return t.split("_").pop();
      } else {
        return t;
      }
    },
    openOpt(uid, mode, c) {
      if (mode == true) {
        if (this.opn_opts.includes(uid)) {
          this.opn_opts.splice(this.opn_opts.indexOf(uid), 1);
        } else {
          this.opn_opts.push(uid);
        }

        this.mode = false;
      } else {
        // console.log(`test ${y}`)

        this.gg.push(c);

        setTimeout(() => {
          if (this.gg[0] === 0) {
            this.mode = false;
          } else if (this.gg[0] == 1) {
            this.mode = true;
            if (this.opn_opts.includes(uid)) {
              this.opn_opts.splice(this.opn_opts.indexOf(uid), 1);
            } else {
              this.opn_opts.push(uid);
            }
          }
          this.gg = [];
        }, 0);
      }
    }
  }
};
</script>

<style>
.dq-strvw-el {
  border-left: 1px solid rgba(128, 128, 128, 0.432);
  color: black;
  min-width: 40px;
}
.dq-strvw-el > div {
  background: skyblue;
  padding: calc(var(--fontSize) * 0.25);
  min-width: 60px;
  border-radius: 2px;
  border-bottom: 1px solid white;
  cursor: pointer;
}
.dq-page-el-opt-bx {
  left: 60px;
  z-index: 900;
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.432);
  min-width: 100px;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(128, 128, 128, 0.432);
  top: -23px;
}
</style>
