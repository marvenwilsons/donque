<template>
    <v-flex  flexcol style="max-width:250px; background:#232729;color:#206add;"  >
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
                v-for="item in $store.state.app['app-admin-sidebar-items']" :key="item" 
                class="pad050 pointer"
            >
                <div class="pad025">
                    {{item}}
                </div>
            </div>
        </div>
    </v-flex>
</template>