<template>
    <v-app class="flexcenter flex" style="height:100vh; overflow:hidden;" >
        <main style="height:80%;" class="borderred" >
            <v-flex  flexcol style="max-width:250px; background:#232729;color:#206add;"  >
                <div class="pad025">
                    <v-flex spacebetween >
                        <div>Site Name</div>
                        <div>asdf</div>
                    </v-flex>
                </div>
                <div style="height:200px;" class="pad025 ">
                    <div>Site Logo</div>
                </div>
                <div class=" flex1">
                    asdf
                </div>
            </v-flex>
            <v-flex pad125 >
                <nuxt />
            </v-flex>
        </main>
    </v-app>
</template>

<style>
@import url("@/assets/dq-css/dq-fw-0.3.css");
@import url("@/assets/dq-css/normalize.css");

</style>