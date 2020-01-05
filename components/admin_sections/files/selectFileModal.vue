<template>
    <div style="height:700px;border:1px solid lightgray;">
        <fileExplorer :filter="CustomData" />
    </div>
</template>

<script>
import fileExplorer from './fileExplorer'
export default {
    props: ['CustomData'],
    components: {
        fileExplorer
    }
}
</script>