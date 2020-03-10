<template>
  <div>
    <!-- {{schema}} -->
    <div
      class="flex flexcol marginbottom125 pad125 borderRad4 inpcon"
      v-for="(items, item_index) in getSchemaKeys"
      :key="`${items}-${item_index}`"
    >
      <div class="dqinplabel">{{items}}</div>
      <div class="flex1 margintop050 padbottom125 padtop050">
        <dqBoolean ref="fminp" :propkey="items" @onInput="onInput" v-if="schema[items] == 'Boolean'" />
        <dqDate ref="fminp" :propkey="items" @onInput="onInput"  v-if="schema[items] == 'Date'" />
        <!-- <dqHtml @openFileSystem="$emit('openFileSystem')" v-if="schema[items] == 'HTML'" /> -->
        <div v-if="schema[items] == 'HTML'">
          <button @click="openEditor" class="buttonreset pad050 btntr padleft125 padright125 borderRad4">Open Editor</button>
        </div>
        <dqNumber ref="fminp" :propkey="items" @onInput="onInput" :placeholder="items" v-if="schema[items] == 'Number'" />
        <dqShortString ref="fminp" :propkey="items" @onInput="onInput" :placeholder="items" v-if="schema[items] == 'Short String'" />
        <dqLongString ref="fminp" :propkey="items" @onInput="onInput" :name="items" v-if="schema[items] == 'Long String'" />
        <dqFileSysRef ref="'fminp" :propkey="items" @onInput="onInput" :name="items" v-if="schema[items] == 'file_sys_ref'" />
      </div>
    </div>
  </div>
</template>

<script>
import dqBoolean from "./components/boolean";
import dqDate from "./components/date";
import dqHtml from "./components/hmtl";
import dqLongString from "./components/long-string";
import dqNumber from "./components/number";
import dqShortString from "./components/short-string";
import dqFileSysRef from "./components/fyl-sys";

export default {
  props: {
    schema: Object
  },
  data: () => ({
      finalObj: {}
  }),
  computed: {
    getSchemaKeys() {
      return Object.keys(this.schema);
    }
  },
  components: {
    dqBoolean,
    dqDate,
    dqHtml,
    dqLongString,
    dqNumber,
    dqShortString,
    dqFileSysRef
  },
  methods: {
    openEditor() {
      this.$store.dispatch("pane_system/open", {
        name: "CollectionEntryEditor",
        index: 1,
        head_visibility: false,
        pane_width: "95%"
      });
    },
    clearInput() {
        this.$refs.fminp.map(e => {
            e.text = undefined
        })
    },
    onInput(val) {
        this.finalObj[Object.keys(val)[0]] = val[Object.keys(val)[0]]
    }
  }
};
</script>

<style>
.inpcon {
  background: white;
  border: 1px solid #eeeeee;
  box-shadow: 1px 1px 5px 1px #eeeeee;
}
</style>