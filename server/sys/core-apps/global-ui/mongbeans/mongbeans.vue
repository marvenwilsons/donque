<template>
    <div>
        <div class="borderred flex mongbeans-head">
            <div>key</div>
            <div>value</div>
            <div>type</div>
        </div>
        <div v-if="gettype(inputData) === 'object'" >
            <objView v-bind:inputData="inputData" ></objView>
        </div>
        <div v-if="gettype(inputData) === 'string'" >
            <strView v-bind:inputData="inputData" ></strView>
        </div>
        <div v-if="gettype(inputData) === 'array'" >
            <arrayView v-bind:inputData="inputData" ></arrayView>
        </div>
    </div>
</template>

<script>
    import arrayView from './arr-view.vue'
    import objView from './obj-view.vue'
    import strView from './str-view.vue'

    export default {
        props: ["inputData"],
        methods: {
            gettype(v) {
                let finalType = undefined;
                if (typeof v === "object") {
                    finalType = Array.isArray(v) ? "array" : "object";
                } else if (typeof v === "string" || typeof v === "number") {
                    finalType = typeof v;
                }
                return finalType;
            }
        },
        components: {
            objView,
            arrayView,
            strView
        }
    }
</script>

<style>
.mongbeans-head > div {
    font-weight: 600;
}
.mongbeans-head > div:nth-child(1),
.mongbeans-head > div:nth-child(3) {
    min-width: 30%;
}
.mongbeans-head > div:nth-child(2) {
    min-width: 50%;
}
</style>