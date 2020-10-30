<template>
    <div transition="el-zoom-in-bottom" >
        <div id="mb" class="absolute fullwidth fullheight-percent flex flexcenter loader" 
            style="
                background: #fafafa; z-index: 1; 
                opacity: 0.7; filter: 
                blur(10px); 
                box-shadow: inset 0 300px 3000px rgba(255, 255, 255, .9); 
                backdrop-filter: blur(5px);
                " 
                >
                <!-- <div class="fullheight-percent ddt" style="width:20px; border-bottom:2px solid #389ff4; opacity: 0.5" >
                </div> -->
        </div>
        <div class="absolute fullwidth fullheight-percent flex flexcenter" style="z-index: 2;" >
            <div class="flex flexcenter" >
                <div class="relativ flex flexcenter" >
                    <strong>
                        <!-- Fetching resources -->
                    </strong>
                    <!-- <v-icon class="loader" small >mdi-arrow-right</v-icon> -->
                </div> 
                
            </div>
        </div>
    </div>
</template>

<style>
.loader {
  -webkit-animation: spin 0.8s linear infinite; /* Safari */
  animation: spin 0.8s linear infinite;
  border: none;
  width: 160%;
  border-radius: 1px !important;
}

@keyframes spin {
    0% { left: 0;}
    25%{ left: 100%;}
    50%{ right: 50%;}
    100%{ right: 0;}
}

.ddt {
    animation: elongate 0.8s linear infinite;
}
@keyframes elongate {
    0% { width: 0;}
    25%{ width: 100%;}
    50%{ width: 50%;}
    100%{ width: 0;}
}
</style>