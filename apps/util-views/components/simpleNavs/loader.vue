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
        </div>
        <div class="absolute fullwidth fullheight-percent flex flexcenter" style="z-index: 2;" >
            <div class="flex flexcenter" >
                <div class="relativ flex flexcenter" >
                    <strong>
                        <!-- Fetching resources -->
                    </strong>
                    <v-icon class="loader" small >mdi-arrow-right-bold</v-icon>
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
}

@keyframes spin {
    0% { left: 0;}
    25%{ left: 100%;}
    50%{ right: 50%;}
    100%{ right: 0;}
}
</style>