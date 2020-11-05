<template>
    <v-app class="fullheight-VH relative" >
        <v-flex class="absolute fullwidth fullheight-percent flex flexcenter" >
            <div id="bgContainer" style="width:350px;height:680px;" class="" >
            </div>
            <div id="bgContainer2" style="width:100%;height:100%;" class="fullwidth absolute fullheight-percent" ></div>
        </v-flex>
        <div style="z-index:1;" class="flex flexcenter" >
            <div style="background:white; width:400px;" class="pad125 borderRad4 modalShadow" >
            <div class="pad125" >
                <div class="marginbottom125  flex flexcenter flexcol" >
                    <img style="height:40px;width:40px;" src="favicon.ico" alt="">
                    <div>
                        <h5 style="font-weight:100;" >
                            Create App
                        </h5>
                    </div>
                </div>
                <div class=" marginbottom125" >
                    <v-text-field
                        label="First Name"
                        dense
                        class="marginbottom125"
                        outlined
                    ></v-text-field>
                    <v-text-field
                        label="Last Name"
                        dense
                        class="marginbottom125"
                        outlined
                    ></v-text-field>
                </div>
                <v-text-field
                    label="Application Name"
                    dense
                    class="marginbottom125"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Username"
                    dense
                    class="marginbottom125"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Password"
                    dense
                    class="marginbottom125"
                    outlined
                    type="password"
                ></v-text-field>
                <div class="flex flexend" >
                    <v-btn color="primary" >
                        <strong>
                            Create App
                        </strong>
                    </v-btn>
                </div>
            </div>
        </div>
        </div>
    </v-app>
</template>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");

#bgContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . .";
    /* clip-path: polygon(0 0, 1600px 0, 1600px 87%, 0 100%); */
    background: rgb(255,161,64);
    background: linear-gradient(90deg, rgba(255,161,64,0.6825105042016807) 0%, rgba(255,64,158,0.43881302521008403) 91%);
    margin-right: 120px;
    margin-top: -85px;
    transform:rotate(40deg);
    overflow: hidden;
    /* transform: skewX(-20deg); */
}
#bgContainer2{
    background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(34,193,195,0.5816701680672269) 0%, rgba(253,187,45,0.5368522408963585) 100%);
    opacity: 0.1;
}
#bgContainer::before {
    content: "";
    background-color: #409eff;
    grid-column: 3;
    grid-row: 1;
}

#bgContainer::after {
    content: "";
    background-color: #409eff;
    grid-column: 4;
    grid-row:12;
}
</style>