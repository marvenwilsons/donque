<template>
    <v-flex  flexcol style="max-width:220px; background:#232729;color:white;"  >
        <!-- SITE BANNER AND CONTROLS -->
        <div class="pad025">
            <v-flex spacebetween >
                 <div>Site Name</div>
                 <div>asdf</div>
            </v-flex>
        </div>
        <!-- SITE LOGO -->
        <div style="height:200px;" class="pad025 ">
                <div>Site Logo</div>
        </div>
        <!-- SIDE BAR ITEMS -->
        <div class=" flex1">
            <div 
                :style="{background: $store.state.app['active-sidebar-item'] == item ? 'var(--deftheme-dark-secondary)' : ''}"
                v-for="item in $store.state.app['app-admin-sidebar-items']" :key="item" 
                class="pad050 pointer"
                @click="sideBarItemClick(item)"
            >
                <div 
                    style="color:var(--deftheme-blue-text);" 
                    class="pad025"
                    >
                    {{item}}
                </div>
            </div>
        </div>
    </v-flex>
</template>

<script>
import h from '@/helper'

export default {
    mixins: [h],
    created() {
        this.h = this
    },
    methods: {        
        sideBarItemClick(selectedMenu) {
            this.runCompiledTask([
                {
                    taskName: 'insertCompiledTask',
                    taskParam: {
                        compiledTask: this.getCompiledTask('syspane.switch-menu'),
                        payload: {
                            selectedMenu
                        }
                    }
                }
            ])
        }
    },
    mounted() {
        this.sideBarItemClick('Pages')
    }
}
</script>