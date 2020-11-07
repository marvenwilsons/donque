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
                <v-expand-transition>
                    <div v-if="error" >
                        <div class="backgrounderr pad050 marginbottom125 borderRad4" >
                            {{error}}
                        </div>
                    </div>
                </v-expand-transition>

                <div class=" marginbottom125" >
                    <v-text-field
                        label="First Name"
                        dense
                        class="marginbottom125"
                        outlined
                        v-model="firstName"
                        :error="errorTarget == 'First Name'"
                        :disabled="disableAll"
                    ></v-text-field>
                    <v-text-field
                        label="Last Name"
                        dense
                        class="marginbottom125"
                        outlined
                        v-model="lastName"
                        :error="errorTarget == 'Last Name'"
                        :disabled="disableAll"
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        dense
                        class="marginbottom125"
                        outlined
                        v-model="email"
                        :error="errorTarget == 'Email'"
                        :disabled="disableAll"
                    ></v-text-field>
                </div>
                <v-text-field
                    label="Application Name"
                    dense
                    class="marginbottom125"
                    outlined
                    v-model="applicationName"
                    :error="errorTarget == 'Application Name'"
                    :disabled="disableAll"
                ></v-text-field>
                <v-text-field
                    label="Username"
                    dense
                    class="marginbottom125"
                    outlined
                    v-model="username"
                    :error="errorTarget == 'Username'"
                    :disabled="disableAll"
                ></v-text-field>
                <v-text-field
                    label="Password"
                    dense
                    class="marginbottom125"
                    outlined
                    :type="show1 ? 'text' : 'password'"
                    v-model="password"
                    :error="errorTarget == 'Password'"
                    persistent-hint
                    hint="Password must have Special characters, lower & uppercase letters & numbers"
                    :disabled="disableAll"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
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
    },
    data: () => ({
        disableAll: false,
        error: undefined,
        errorTarget: undefined,
        isLoading: false,
        firstName: undefined,
        lastName: undefined,
        applicationName: undefined,
        username: undefined,
        password: undefined,
        email: undefined,
        show1: false
    }),
    created() {
        this.firstName = 'Marven Wilson'
        this.lastName = 'Donque'
        this.email = 'marveenwilsons@gmail.com'
        this.applicationName = 'wordpress'
        this.username = 'marvenwilsons'
    },
    methods: {
        createApp() {
            this.error = undefined
            this.errorTarget = undefined
            try{
                const correcntFirstNameConditions = [
                    this.validateString({mode: 'has-special-character', value: this.firstName}) == false,
                    this.validateString({mode: 'has-number', value: this.firstName}) == false,
                    this.validateString({mode: 'is-required', value: this.firstName}) == false
                ]

                switch(correcntFirstNameConditions.indexOf(false)) {
                    case 0:
                        throw 'First Name should not have any special characters'
                    break
                    case 1:
                        throw 'First Name should not have any number characters'
                    break
                    case 2:
                        throw 'First Name should not be left empty or undefined'
                    break
                }

                if(this.validateString({mode: 'is-email', value: this.email}) == false) {
                    throw 'invalid-Email: Invalid Email Format'
                }

                this.commonStringValidations('Last Name',this.lastName,2,false)
                this.commonStringValidations('Application Name',this.applicationName,1,false)
                this.commonStringValidations('Username',this.username,5,false)

                
                const correctPasswordConditions = [
                    this.validateString({mode: 'is-required', value: this.password}),
                    this.validateString({mode: 'has-special-character', value: this.password}),
                    this.validateString({mode: 'has-number', value: this.password}),
                    this.validateString({mode: 'has-whitespace', value: this.password}),
                    this.validateString({mode: 'has-uppercase', value: this.password}),
                    this.validateString({mode: 'has-lowercase', value: this.password})
                ]

                const passwordErrors = [
                    'Password should include special characters',
                    'Password should include number characters',
                    'Password should not have whitespaces',
                    'Password should include uppercase characters',
                    'Password should include lowercase characters'
                ]

                switch(correctPasswordConditions.indexOf(false)) {
                    case 1:
                        throw 'Invalid-Password: Password is required'
                    break
                }

                const allPasswordErrors = correctPasswordConditions.map((e,i) => {
                    console.log(e)
                    if(!e) {
                        return passwordErrors[i]
                    }
                })

                // console.log('ss', allPasswordErrors.toString().replace(",,", ",") )
                console.log(correctPasswordConditions)

            }catch(e) {
                this.errorTarget = e.split(':')[0].split('-')[1] == undefined ? e.split('should')[0].trim() : e.split(':')[0].split('-')[1]
                this.error = e.split(':')[1] == undefined ? e : e.split(':')[1].trim()
            }

            if(this.error == undefined) {
                this.isLoading = true
                this.disableAll = true
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