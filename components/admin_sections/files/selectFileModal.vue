<template>
    <div style="border:1px solid lightgray;">
        <fileExplorer :UnsetPaneModal="UnsetPaneModal" :filter="CustomData" />
    </div>
</template>

<script>
import fileExplorer from './fileExplorer'
export default {
    props: ['CustomData', 'UnsetPaneModal'],
    components: {
        fileExplorer
    }
}
</script>