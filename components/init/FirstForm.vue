<template>
    <div>
        <div class=" marginbottom125" >
            <v-card style="z-index:100" :elevation="firstName.errors ? 5 : 0" :class="[firstName.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="firstName.errors" class="marginbottom050 err" > 
                    <div v-for="(msg,msgIndex) in firstName.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                    label="First Name"
                    dense
                    outlined
                    class="marginbottom125"
                    v-model="firstName.value"
                    :error="firstName.errors ? true : false"
                    :disabled="disableAll"
                ></v-text-field>
            </v-card>

            <v-card :elevation="lastName.errors ? 5 : 0" :class="[lastName.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="lastName.errors" class="marginbottom050 err">
                    <div v-for="(msg,msgIndex) in lastName.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                    label="Last Name"
                    dense
                    outlined
                    class="marginbottom125"
                    v-model="lastName.value"
                    :error="lastName.errors ? true : false"
                    :disabled="disableAll"
                ></v-text-field>
            </v-card>

            <v-card :elevation="email.errors ? 5 : 0" :class="[email.errors  ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="email.errors " class="marginbottom050 err"> 
                    <div v-for="(msg,msgIndex) in email.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                    label="Email"
                    outlined
                    dense
                    class="marginbottom125"
                    v-model="email.value"
                    :error="email.errors ? true : false"
                    :disabled="disableAll"
                ></v-text-field>
            </v-card>

        </div>
        <v-card :elevation="applicationName.errors ? 5 : 0" :class="[applicationName.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
            <div v-if="applicationName.errors" class="marginbottom050 err" >
                <div v-for="(msg,msgIndex) in applicationName.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
            </div>
            <v-text-field
                label="Application Name"
                outlined
                dense
                class="marginbottom125"
                v-model="applicationName.value"
                :error="applicationName.errors ? true : false"
                :disabled="disableAll"
            ></v-text-field>
        </v-card>

        <v-card :elevation="username.errors ? 5 : 0" :class="[username.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
            <div v-if="username.errors" class="marginbottom050 err">
                <div v-for="(msg,msgIndex) in username.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
            </div>
            <v-text-field
                label="Username"
                outlined
                dense
                class="marginbottom125"
                v-model="username.value"
                :error="username.errors ? true : false"
                :disabled="disableAll"
            ></v-text-field>
        </v-card>

        <v-card :elevation="password.errors ? 5 : 0" :class="[password.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
            <div v-if="password.errors" class="marginbottom050 err" >
                <div v-for="(msg,msgIndex) in password.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
            </div>
            <v-text-field
                label="Password"
                outlined
                dense
                class="marginbottom125"
                :type="show1 ? 'text' : 'password'"
                v-model="password.value"
                :error="password.errors ? true : false"
                persistent-hint
                hint="Password must have Special characters, lower & uppercase letters & numbers"
                :disabled="disableAll"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
            ></v-text-field>
        </v-card>

    </div>
</template>

<script>
import h from '@/helper.js'
export default {
    mixins:[h],
    props:['disableAll','errorTargets'],
    created() {
        this.h = h

        if(process.env.NODE_ENV == 'development') {
            this.firstName.value = 'Marven Wilson'
            this.lastName.value = 'Donque'
            this.email.value = 'marvenwilsons@gmail.com'
            this.applicationName.value = 'sampleapp'
            this.username.value = 'marvenwilsons'
            this.password.value = 'password123ABC@'
        }
        
    },
    data: () => ({
        firstName:      {value: undefined, errors: undefined},
        lastName:       {value: undefined, errors: undefined},
        email:          {value: undefined, errors: undefined},
        applicationName:{value: undefined, errors: undefined},
        username:       {value: undefined, errors: undefined},
        password:       {value: undefined, errors: undefined},
        error:          {value: undefined, errors: undefined},
        show1: false,
    }),
    methods: {
        validateFirstName() {
            let errors = []
            const value = this.firstName.value

            value == undefined && 
                errors.push('First Nane is a required field')

            this.validator.hasSpecialCharacters(value) &&
                errors.push('First Name must not have any special characters')

            this.validator.hasNumber(value) &&
                errors.push('First Name must not have any numbers')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.firstName,'errors',errors)
                    errors = []
                    cb()
                },
                removeErrors: () => this.$set(this.firstName,'errors',undefined)
            }
        },
        validateLastName() {
            const errors = []
            const value = this.lastName.value

            value == undefined && 
                errors.push('Last Name is a required field')

            this.validator.hasSpecialCharacters(value) &&
                errors.push('Last Name must not have any special characters')

            

            this.validator.hasNumber(value) &&
                errors.push('Last Name must not have any numbers')

            this.validator.hasWhiteSpace(value) &&
                errors.push('Last Name must not have any white spaces')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.lastName, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.lastName,'errors',undefined)
            }
        },
        validateApplicationName() {
            const errors = []
            const value = this.applicationName.value

            value == undefined && 
                errors.push('Application name is required')

            this.validator.hasSpecialCharacters(value) &&
                errors.push('Application Name must not have any special characters')

            this.validator.hasWhiteSpace(value) &&
                errors.push('Application Name must not have any white spaces')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.applicationName, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.applicationName,'errors',undefined)
            }
        },
        validateUsername() {
            const errors = []
            const value = this.username.value

            value == undefined 
                && errors.push('Username is required')

            this.validator.hasSpecialCharacters(value) &&
                errors.push('Username must not have any special characters')

            this.validator.hasWhiteSpace(value) &&
                errors.push('Username must not have any white spaces')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.username, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.username,'errors',undefined)
            }
        },
        validatePassword() {
            const errors = []
            const value = this.password.value

            this.password == undefined && 
                errors.push('Password is required')
            // included
            !this.validator.hasSpecialCharacters(value) &&
                errors.push('Password must include special characters')

            !this.validator.hasNumber(value) &&
                errors.push('Password must include number characters')

            !this.validator.hasLowerCase(value) &&
                errors.push('Password must include lower case characters')

            !this.validator.hasUppperCase(value) &&
                errors.push('Password must include upper case characters')
            // not included
            this.validator.hasWhiteSpace(value) &&
                errors.push('Password must not have any white spaces')
            
            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.password, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.password,'errors',undefined)
            }
        },
        validateEmail() {
            const errors = []
            const value = this.email.value

            value == undefined &&
                errors.push('Email is a required field')

            !this.validator.isEmail(value) &&
                errors.push('Invalid Email Format')
            
            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.email, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.email,'errors',undefined)
            }
        },
    }
}
</script>

<style>
.smth{
    transition: 300ms !important;
}
</style>