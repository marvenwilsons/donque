<template>
    <v-app id="dq-init-page" class="fullheight-VH relative overflowhidden flex flexcenter smth" >
        <div id="bgContainer2" style="width:100%;height:100%;" class="fullwidth  fullheight-percent absolute" ></div>
        <img id="leaves" class="absolute" src="leaves.jpeg" alt="">


        <!-- form behind art -->
        <v-flex class="absolute fullwidth fullheight-percent flex flexcenter" >
            <div id="bgContainer" style="width:350px;height:680px;" class="" >
            </div>
        </v-flex>

        <!-- form -->
        <div style="z-index:3; overflow-x:auto;" :class="['fullheight-VH', slide && !hasError || currentForm == 1 ? ['flex', 'flexcenter', 'smth'] : '']" >
            <div class="flex flexcenter" >
                <section style="background:white; max-width:400px;" class="pad125 margintop125 marginbottom125 flex flexcenter borderRad4 modalShadow" >
                    <div class="padleft125 padright125 padbottom125" >
                        <div class="marginbottom125 margintop125 flex flexcenter flexcol" >
                            <!-- logo -->
                            <div class="relative" style="height:70px;width:70px;" >
                                <img class="absolute" style="height:70px;width:70px; z-index:1;" src="dq-logo.png" alt="">
                                <div v-if="currentForm == 3" style="z-index:0;" class="absolute fullwidth fullheight-percent " >
                                    <loading/>
                                </div>
                            </div>
                            <!-- form title -->
                            <div>
                                <h5 v-if="currentForm != 3 " class="smth" style="font-weight:100;" >
                                    Creat{{currentForm != 3 ? 'e' : 'ing'}} App{{currentForm != 3 ? '' : '...'}}
                                </h5>
                                <h5 v-if="currentForm == 3 " class="smth" style="font-weight:100;" >
                                    Please wait ...
                                </h5>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="true" 
                            :style="!hasError ? {width:'315px', minHeight:formHeight} : {} " 
                            :class="!hasError ? ['flex', 'relative', 'smth', 'overflowhidden', 'flexcenter'] : ''" 
                        >
                            <FirstFom
                                v-if="currentForm == 1"
                                :class="!hasError ? ['absolute', slide ? 'FirstForm_exit' : ''] : ''"
                                :style="!hasError ? {minwidth:'360px'} : ''" 
                                ref="FirstForm"
                                :disableAll="disableAll"
                                id="initFirstForm"
                            />
                            <SecondForm
                                v-if="currentForm == 2"
                                :style="!hasError &&  secondFormConfig.slide ? {width:'315px', right: '-260px'}: ''" 
                                :class="!hasError && secondFormConfig.slide ? ['absolute', slide ? 'FirstForm_exit' : '']: ''"
                                :disableAll="disableAll"
                                id="initSecondForm"
                                ref="SecondForm"
                            />
                        </div>
                        <div v-if="currentForm != 3" class="flex flexend margintop125" >
                            <v-btn :loading="isLoading" @click="next" color="primary" >
                                <strong>
                                    {{currentForm == 1 ? 'next' : 'submit'}}
                                    <v-icon v-if="currentForm == 1" size="medium">
                                        mdi-arrow-right
                                    </v-icon>
                                </strong>
                            </v-btn>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </v-app>
</template>

// on next, --> database_name database username, database password, token_secret, table_prefix
<script>
import h from '@/helper'
import FirstFom from '@/components/init/FirstForm.vue'
import SecondForm from '@/components/init/SecondForm.vue'
import loading from '@/components/init/loading.vue'

export default {
    mixins: [h],
    created() {
        this.h = this
    },
    components: {
        FirstFom,
        SecondForm,
        loading
    },
    data: () => ({
        isLoading: false,
        currentForm: 1,
        disableAll: false,
        slide: false,
        formHeight: '440px',
        hasError: false,
        secondFormConfig: {
            slide: true
        },
        firstFormValue: undefined
    }),
    methods: {
        nextAnimate() {
            this.slide = true
            if(this.currentForm == 2) {
                const el_secondForm = document.getElementById("initSecondForm")
                const el_secondFormHeight = el_secondForm.offsetHeight + 12
                
                this.formHeight = `${el_secondFormHeight}px`
                
                setTimeout(() => {
                    this.$set(this.secondFormConfig,'slide', false)
                }, 1000);
            } else if(this.currentForm == 3) {
                this.formHeight = '0px'
            }
        },
        next() {
            if(this.currentForm == 1) {
                let userInfoErrors = []
                
                const firstName = this.$refs.FirstForm.validateFirstName()
                firstName.errors.length != 0 ? 
                firstName.renderError(() => userInfoErrors.push(true)) :
                firstName.removeErrors()

                const lastName = this.$refs.FirstForm.validateLastName()
                lastName.errors.length != 0 ?
                lastName.renderError(() => userInfoErrors.push(true)) :
                lastName.removeErrors()

                const applicationName = this.$refs.FirstForm.validateApplicationName()
                applicationName.errors.length != 0 ?
                applicationName.renderError(() => userInfoErrors.push(true)) :
                applicationName.removeErrors()

                const username = this.$refs.FirstForm.validateUsername()
                username.errors.length != 0 ?
                username.renderError(() => userInfoErrors.push(true)) :
                username.removeErrors()
                
                const password = this.$refs.FirstForm.validatePassword()
                password.errors.length != 0 ?
                password.renderError(() => userInfoErrors.push(true)) :
                password.removeErrors()

                const email = this.$refs.FirstForm.validateEmail()
                email.errors.length != 0 ?
                email.renderError(() => userInfoErrors.push(true)) :
                email.removeErrors()


                if(!userInfoErrors.includes(true)) {
                    this.firstFormValue = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        applicationName: applicationName.value,
                        username: username.value,
                        password: password.value,
                        email: email.value
                    }

                    console.table(this.firstFormValue)

                    this.hasError = false

                    this.isLoading = true
                    this.disableAll = true
                    this.currentForm = 2
                    
                    setTimeout(() => {
                        this.nextAnimate()
                    }, 0);

                    setTimeout(() => {
                        this.isLoading = false
                        this.disableAll = false
                    }, 500);
                } else {
                    this.hasError = true
                }
            } else if(this.currentForm == 2) {
                const databaseFormErrors = []

                const databaseName = this.$refs.SecondForm.validateDatabaseName()
                databaseName.errors.length != 0 ? 
                databaseName.renderError(() => databaseFormErrors.push(true)) :
                databaseName.removeErrors()

                const databaseUsername = this.$refs.SecondForm.validateDatabaseUsername()
                databaseUsername.errors.length != 0 ? 
                databaseUsername.renderError(() => databaseFormErrors.push(true)) :
                databaseUsername.removeErrors()

                const tablePrefix = this.$refs.SecondForm.validateTablePrefix()
                tablePrefix.errors.length != 0 ? 
                tablePrefix.renderError(() => databaseFormErrors.push(true)) :
                tablePrefix.removeErrors()
                
                const databasePassword = this.$refs.SecondForm.validateDatabasePassword()
                databasePassword.errors.length != 0 ? 
                databasePassword.renderError(() => databaseFormErrors.push(true)) :
                databasePassword.removeErrors()

                if(!databaseFormErrors.includes(true)) {
                    this.hasError = false
                    this.currentForm = 3
                    this.isLoading = true
                    this.disableAll = true
                    this.nextAnimate()
                    setTimeout(() => {
                        this.isLoading = false
                    }, 500);

                    const completedForm = {
                        ...this.firstFormValue,
                        databaseName: databaseName.value,
                        databaseUsername: databaseUsername.value,
                        tablePrefix: tablePrefix.value,
                        databasePassword: databasePassword.value
                    }

                    // submit data to database
                    this.$axios.post('/$dqappservices/v1/initialize', completedForm)
                    .then(res => {
                        console.log('createApp ', res)
                    })

                    const m = setInterval(() => {
                        this.$axios.get('/$dqappservices/apt')
                        .then(res => {
                            if(res.data.status) {
                                clearInterval(m)
                                window.close()
                            }
                        })
                    }, 1000)
                } else {
                    this.hasError = true
                }


            }
        }
    },
    mounted() {
        console.log('init')
        this.socket = this.$nuxtSocket({
            name: 'home',
            channel: '/'
        })

        // this.socket.emit('mydata', {id: 'abc123'}, (resp) => {
        //     console.log('resp')
        // })

        this.socket.on('mydata' , (data) => {
            console.log(data)
        })

        this.socket.on('status', (data) => {
            console.log('status ',data)
        })
    }
}
</script>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");

/* #dq-init-page{
    background: url('~static/leaves.jpeg');
} */
.FirstForm_exit {
    transform: translateX(-260px);
    transition: all 300ms ease;
}


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
    z-index: 2;
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
    /* z-index: 2; */
}


/* #bgContainer2{
    background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(19, 72, 73, 0.219) 0%, rgba(71, 53, 14, 0.247) 100%);
    z-index: 1;
    filter: blur(10px);
} */
</style>