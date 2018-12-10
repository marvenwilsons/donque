<template>
    <div>
        <ul>
        <sender :component="'pages'"        :position="0" > pages </sender>
        <sender :component="'collection'"   :position="0" > collection </sender>
        <sender :component="'components'"   :position="0" > components </sender>
        <sender :component="'database'"     :position="0" > database </sender>
        <sender :component="'files'"        :position="0" > files </sender>
        <sender :component="'plugins'"      :position="0" > plugins </sender>
        <sender :component="'marketplace'"  :position="0" > marketplace </sender>        
        <sender :component="'shell'"        :position="0" > Shell </sender>
      </ul>
    </div>
</template>

<script>
import sender from '../module/component-sender.vue'

export default {
    components: {
        sender
    }
}
</script>