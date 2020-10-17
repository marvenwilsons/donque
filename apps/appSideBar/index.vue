<template>
    <v-flex  flexcol style="max-width:220px; background:#232729;color:white;"  >
        <!-- SITE BANNER AND CONTROLS -->
        <div class="pad025">
            <v-flex pad050 flexcol >
                <div class="marginbottom125" > 
                    <span style="color:lightgray;" > <i>dq |</i> </span> {{siteName}}
                </div>
                 <!-- <v-divider color="gray" :light="true" ></v-divider> -->

                 <div class="flex" >
                    <v-avatar class="marginright050" color="indigo" size="48">
                        <span class="white--text headline">MJ</span>
                    </v-avatar>
                    <div class="flex flexcol flexcenter" >
                        <div style="overflow:hidden; margin-bottom:0;" class="fullwidth flex relative" >
                            <div class="absolute" >
                                <small>{{currentUser}}</small>
                                <span class="fullwidth" >
                                    {{userPosition}}
                                </span>
                            </div>
                        </div>
                    </div>

                 </div>
                    <div class="flex flexend margintop125" >
                        <small @click="signOut" :style="{color:$vuetify.theme.themes.light.primary}" class="pointer" >Sign Out </small>
                    </div>
                 <v-divider color="gray" :light="true" ></v-divider>

            </v-flex>
        </div>
        <!-- SITE LOGO -->

        <!-- SIDE BAR ITEMS -->
        <div class=" flex1">
            <div 
                :style="{background: $store.state.app['active-sidebar-item'] == item ? 'var(--deftheme-dark-secondary)' : ''}"
                v-for="item in $store.state.app['app-admin-sidebar-items']" :key="item" 
                class="pad050 pointer"
                @click="sideBarItemClick(item)"
            >
                <div 
                    :style="{color: $vuetify.theme.themes.light.primary}" 
                    class="pad025"
                    >
                    <!-- <span >&#9702;</span> -->
                    <v-icon color="var(--deftheme-blue-text)">
                        mdi-arrow-right-circle
                    </v-icon>
                    <strong>
                        {{item}}
                    </strong>
                </div>
            </div>
        </div>
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
import controlpanel from '@/apps/controlpanel/controlpanel'

export default {
    mixins: [h],
    data: () => ({
        siteName: 'amazon.com',
        currentUser: 'marvenwilsons@gmail.com',
        userPosition: 'level 1 analyst',
        userFullName: undefined,
        avatar: '',
    }),
    created() {
        this.h = this
    },
    methods: {        
        sideBarItemClick(selectedMenu) {
            const { actions } = controlpanel(this)
            actions.syspane.switchMenu(selectedMenu)
        },
        signOut() {
            console.log('sign out')
        }
    }
}
</script>