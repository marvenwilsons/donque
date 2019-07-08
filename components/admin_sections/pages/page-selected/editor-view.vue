<template>
    <div  class="flex">
        <!-- <iframe class="borderred fullwidth fullheight-percent" src="https://www6.gogoanime.io/lord-el-melloi-ii-sei-no-jikenbo-rail-zeppelin-grace-note-episode-1" frameborder="0"></iframe> -->
        <div class="flex3 flex flexcol">
            <div class="borderred flex1">1</div>
            <div> html trail ? </div>
        </div>
        <div id="dq-page-editor" class="flex1 flex flexcol">
            <div class="borderred flex3">top</div>
            <div id="dq-box-model-v" class="borderred flex1 flex flexcenter">
                <boxmodel/>
            </div>
        </div>
    </div>
</template>

<script>
import el_box_model from './el-box-model'
export default {
    components: {
        boxmodel: el_box_model
    }
}
</script>

<style>
#dq-box-model-v{
    min-height: 140px;
}
#dq-page-editor{
    max-width: 350px;
}
</style>
