<template>
    <v-app class="fullheight-VH relative" >
            <div id="bgContainer2" style="width:100%;height:100%;position:fixed;" class="fullwidth  fullheight-percent" ></div>
            <img id="leaves" class="absolute" src="leaves.jpeg" alt="">
        <v-flex class="absolute fullwidth fullheight-percent flex flexcenter" >
            <div id="bgContainer" style="width:350px;height:680px;" class="" >
            </div>
        </v-flex>
        <div style="z-index:1;" class="flex flexcenter margin125" >
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
                <div v-if="error" >
                    <div class="backgrounderr pad050 marginbottom125" >
                        {{error}}
                    </div>
                </div>
                <div class=" marginbottom125" >
                    <v-text-field
                        label="First Name"
                        dense
                        class="marginbottom125"
                        outlined
                        v-model="firstName"
                        :error="errorTarget == 'First Name'"
                    ></v-text-field>
                    <v-text-field
                        label="Last Name"
                        dense
                        class="marginbottom125"
                        outlined
                        v-model="lastName"
                        :error="errorTarget == 'Last Name'"
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        dense
                        class="marginbottom125"
                        outlined
                        v-model="email"
                        :error="errorTarget == 'Email'"
                    ></v-text-field>
                </div>
                <v-text-field
                    label="Application Name"
                    dense
                    class="marginbottom125"
                    outlined
                    v-model="applicationName"
                    :error="errorTarget == 'Application Name'"
                ></v-text-field>
                <v-text-field
                    label="Username"
                    dense
                    class="marginbottom125"
                    outlined
                    v-model="username"
                    :error="errorTarget == 'Username'"
                ></v-text-field>
                <v-text-field
                    label="Password"
                    dense
                    class="marginbottom125"
                    outlined
                    type="password"
                    v-model="password"
                    :error="errorTarget == 'Password'"
                    persistent-hint
                    hint="Password must have Special characters, lower & uppercase letters & numbers"
                ></v-text-field>
                <div class="flex flexend margintop125" >
                    <v-btn :loading="isLoading" @click="createApp" color="primary" >
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

<script>
import h from '@/helper'

export default {
    mixins: [h],
    created() {
        this.h = this

        console.log(this.validateString)
    },
    data: () => ({
        error: undefined,
        errorTarget: undefined,
        isLoading: false,
        firstName: undefined,
        lastName: undefined,
        applicationName: undefined,
        username: undefined,
        password: undefined,
        email: undefined
    }),
    methods: {
        createApp() {
            this.error = undefined
            this.errorTarget = undefined
            try{
                this.commonStringValidations('First Name',this.firstName,2,false)
                this.commonStringValidations('Last Name',this.lastName,2,false)
                this.commonStringValidations('Application Name',this.applicationName,1,false)
                this.commonStringValidations('Username',this.username,5,false)
                console.log('email', this.validateString({mode: 'is-email', value: this.email}))
                if(this.validateString({mode: 'is-email', value: this.email}) == false) {
                    this.error = 'Invalid Email Format'
                    this.errorTarget = 'Email'
                }

                // password should have all caps letters
                // password should have small caps letter
                // password should have special characters
                // password should have special numbers
                const correctPasswordConditions = 
                this.validateString({mode: 'has-special-character', value: this.password}) &&
                this.validateString({mode: 'is-required', value: this.password}) == false &&
                this.validateString({mode: 'has-number', value: this.password}) &&
                this.validateString({mode: 'has-whitespace', value: this.password}) == false &&
                this.validateString({mode: 'has-uppercase', value: this.password}) &&
                this.validateString({mode: 'has-lowercase', value: this.password})

                console.log('has-special-char', this.password, this.validateString({mode: 'has-special-character', value: this.password}))
                console.log('is-required', this.password, this.validateString({mode: 'is-required', value: this.password}))

                if(correctPasswordConditions == false) {
                    this.error = 'Invalid Password Format'
                    this.errorTarget = 'Password'
                }

            }catch(e) {
                this.errorTarget = e.split(':')[0].split('-')[1]
                this.error = e.split(':')[1]
            }

            if(this.error == undefined) {
                this.isLoading = true
                this.$axios.post('/app/initialize-app', {
                    username: 'this.username'
                }).then(res => {
                    // console.log('createApp ', res)
                })
            }
        }
    }
}
</script>

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
#leaves {
    height: 100%;
    /* opacity: 0.2; */
}


/* #bgContainer2{
    background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(34,193,195,0.5816701680672269) 0%, rgba(253,187,45,0.5368522408963585) 100%);
     background: inherit;
} */
</style>