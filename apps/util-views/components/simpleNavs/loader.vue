<template>
    <div>
        <div class="absolute fullwidth fullheight-percent flex flexcenter" 
            style="background: lightgray; z-index: 1; opacity: 0.7; filter: blur(10px); box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5); backdrop-filter: blur(5px);" >
        </div>
        <div class="absolute fullwidth fullheight-percent flex flexcenter" style="z-index: 2;" >
            <div class="flex flexcenter" >
                <div class="relativ flex flexcenter" >
                    <strong>
                        Fetching resources
                    </strong>
                    <v-icon class="loader" x-small >mdi-reload</v-icon>
                </div> 
                
            </div>
        </div>
    </div>
</template>

<style>
.loader {
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  border: none;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>