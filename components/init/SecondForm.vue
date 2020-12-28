<template>
    <div>
        <div class="" >
            <v-card :elevation="databaseName.errors ? 5 : 0" :class="[databaseName.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="databaseName.errors" class="marginbottom050 err" > 
                    <div v-for="(msg,msgIndex) in databaseName.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                    label="Database Name"
                    dense
                    outlined
                    class="marginbottom125"
                    v-model="databaseName.value"
                    :error="databaseName.errors ? true : false"
                    :disabled="disableAll"
                ></v-text-field>
            </v-card>

            <v-card :elevation="databaseUsername.errors ? 5 : 0" :class="[databaseUsername.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="databaseUsername.errors" class="marginbottom050 err">
                    <div v-for="(msg,msgIndex) in databaseUsername.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                    label="Database Username"
                    dense
                    outlined
                    class="marginbottom125"
                    v-model="databaseUsername.value"
                    :error="databaseUsername.errors ? true : false"
                    :disabled="disableAll"
                ></v-text-field>
            </v-card>

            <v-card :elevation="tablePrefix.errors ? 5 : 0" :class="[tablePrefix.errors  ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="tablePrefix.errors " class="marginbottom050 err"> 
                    <div v-for="(msg,msgIndex) in tablePrefix.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                    label="Table Prefix"
                    outlined
                    dense
                    class="marginbottom125"
                    v-model="tablePrefix.value"
                    :error="tablePrefix.errors ? true : false"
                    :disabled="disableAll"
                ></v-text-field>
            </v-card>

            <v-card :elevation="databasePassword.errors ? 5 : 0" :class="[databasePassword.errors ? 'smth padtop125 padleft125 padright125 marginbottom125' : 'smth']" >
                <div v-if="databasePassword.errors" class="marginbottom050 err" >
                    <div v-for="(msg,msgIndex) in databasePassword.errors" :key="`${msg}${msgIndex}`" >{{msg}}</div>
                </div>
                <v-text-field
                label="Database Password"
                outlined
                dense
                class="marginbottom125"
                :type="show1 ? 'text' : 'password'"
                v-model="databasePassword.value"
                :error="databasePassword.errors ? true : false"
                :disabled="disableAll"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                persistent-hint
                hint="Password must have Special characters, lower & uppercase letters & numbers "
            ></v-text-field>
            </v-card>

        </div>
    </div>
</template>

<script>
import h from '@/helper'

export default {
    mixins: [h],
    props:['disableAll'],
    created() {
        this.h = this
    },
    data: () => ({
        databaseName:    {value: undefined, errors: undefined},
        databaseUsername:{value: undefined, errors: undefined},
        tablePrefix:     {value: undefined, errors: undefined},
        databasePassword:{value: undefined, errors: undefined},
        error:           {value: undefined, errors: undefined},
        show1: false,
    }),
    methods: {
        validateDatabaseName() {
            let errors = []
            const value = this.databaseName.value

            value == undefined && 
                errors.push('Database Name is a required field')


            this.validator.hasNumber(value) &&
                errors.push('Database Name must not have any numbers')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.databaseName,'errors',errors)
                    errors = []
                    cb()
                },
                removeErrors: () => this.$set(this.databaseName,'errors',undefined)
            }
        },
        validateDatabaseUsername() {
            const errors = []
            const value = this.databaseUsername.value

            value == undefined && 
                errors.push('Database Username Name is a required field')

            this.validator.hasSpecialCharacters(value) &&
                errors.push('Database Username must not have any special characters')

            

            this.validator.hasNumber(value) &&
                errors.push('Database Username must not have any numbers')

            this.validator.hasWhiteSpace(value) &&
                errors.push('Database Username must not have any white spaces')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.databaseUsername, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.databaseUsername,'errors',undefined)
            }
        },
        validateTablePrefix() {
            const errors = []
            const value = this.tablePrefix.value

            value == undefined && 
                errors.push('Table Prefix is required')

            this.validator.hasSpecialCharacters(value) &&
                errors.push('Table Prefix must not have any special characters')

            this.validator.hasWhiteSpace(value) &&
                errors.push('Table Prefix must not have any white spaces')

            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.tablePrefix, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.tablePrefix,'errors',undefined)
            }
        },
        validateDatabasePassword() {
            const errors = []
            const value = this.databasePassword.value

            value == undefined && 
                errors.push('Password is required')
            // included
            !this.validator.hasNumber(value) &&
                errors.push('Password must include number characters')

            !this.validator.hasLowerCase(value) &&
                errors.push('Password must include lower case characters')

            !this.validator.hasUppperCase(value) &&
                errors.push('Password must include upper case characters')
            // not included
            this.validator.hasWhiteSpace(value) &&
                errors.push('Password must not include white spaces')
            this.validator.hasSpecialCharacters(value) &&
                errors.push('Password must not include special characters')
            
            return {
                value,
                errors,
                renderError: (cb) => {
                    this.$set(this.databasePassword, 'errors', errors)
                    cb()
                },
                removeErrors: () => this.$set(this.databasePassword,'errors',undefined)
            }
        }
    }
}
</script>

<style>
.smth{
    transition: 300ms !important;
}
</style>