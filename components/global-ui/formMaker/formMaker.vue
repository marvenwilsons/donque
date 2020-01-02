<template>
    <div>
        <!-- {{schema}} -->
        <div class="flex flexcol marginbottom125" v-for="(items, item_index) in getSchemaKeys" :key="`${items}-${item_index}`">
            <div><strong>{{items}}</strong></div>
            <div class="flex1 margintop050">
                <dqBoolean v-if="schema[items] == 'Boolean'" />
                <dqDate v-if="schema[items] == 'Date'" />
                <dqHtml v-if="schema[items] == 'HTML'" />
                <dqNumber :placeholder="items" v-if="schema[items] == 'Number'" />
                <dqShortString :placeholder="items" v-if="schema[items] == 'Short String'" />
                <dqLongString :name="items" v-if="schema[items] == 'Long String'" />
                <dqFileSysRef :name="items" v-if="schema[items] == 'file_sys_ref'" />
            </div>
        </div>
    </div>
</template>

<script>
import dqBoolean from './components/boolean'
import dqDate from './components/date'
import dqHtml from './components/hmtl'
import dqLongString from './components/long-string'
import dqNumber from './components/number'
import dqShortString from './components/short-string'
import dqFileSysRef from './components/fyl-sys'

export default {
    props: {
        schema: Object
    },
    computed: {
        getSchemaKeys() {
            return Object.keys(this.schema)
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
    }
}
</script>