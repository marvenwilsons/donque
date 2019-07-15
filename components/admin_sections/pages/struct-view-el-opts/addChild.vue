<template>
    <div>
        <strong>Common HTML</strong>
        <div style="width:350px" class="flex relative flexwrap ">
            <div class="dq-el-ac flex flexcenter pad025 margin025 pointer" v-for="el in els" :key="`el1-${el}`">
                {{el}}
            </div>
        </div>
        <strong>Headings</strong>
        <div style="width:350px" class="flex relative flexwrap ">
            <div class="dq-el-ac flex flexcenter pad025 margin025 pointer" v-for="el in els2"  :key="`el2-${el}`">
                {{el}}
            </div>
        </div>
        <strong>Plugins</strong>
        <div style="width:350px" class="flex relative flexwrap ">
            <div class="dq-el-ac flex flexcenter pad025 margin025 pointer" v-for="el in els3" :key="`el3-${el}`">
                {{el}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            els: [
                'div',
                'span',
                'main',
                'article',
                'footer',
                'p',
                'a',
                'nav',
                'section',
                'button'
            ],
            els2: [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6'
            ],
            els3: [
                'dqFormMaker-free',
                'dqTable-free',
                'objectify'
            ]
        }
    }
}
</script>

<style>
.dq-el-ac{
    border: 1px solid gray;
    min-width: 50px;
    border-radius: 3px;
}
</style>
