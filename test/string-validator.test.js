const e = require("express");

const validator = {
    hasSpecialCharacters(char) {
        if(!char) return false
        if(typeof char == 'number') return false
        const c = char.toString()
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
        return regex.exec(c) == null ? false : true
    },
    hasNumber(char) {
        const regex = /[0-9]/gim;
        return regex.exec(char) != null;
    },
    hasWhiteSpace(char) {
        if(!char) return false
        if(typeof char == 'number') return false

        const c = char.toString()
        return c ? c.indexOf(" ") != -1 : false
    },
    hasUppperCase(char) {
        if(!char) return false
        const regex = /.*[A-Z]/g;
        return regex.exec(char) != null
    },
    hasLowerCase(char) {
        if(!char) return false
        const regex = /.*[a-z]/g;
        return regex.exec(char) != null
    },
    isEmail(char) {
        if(!char) return false
        if(validator.hasSpecialCharacters(char) == false) return false
        const c = char.split('@')
        const userIdentifier = c[0]
        const emailEnding = c[1]
        if(c.length != 2) return false
        if(!userIdentifier) return false
        if(validator.hasSpecialCharacters(userIdentifier)) return false
        if(validator.hasWhiteSpace(userIdentifier)) return false
        if(validator.hasLowerCase(userIdentifier) == false) return false
        let e = emailEnding.split('.')
        if(e.length != 2) return false
        if(!e[1]) return false
        if(validator.hasUppperCase(e[1]) || validator.hasUppperCase(e[0])) return false
        if(e[1].length == 1 || e[0].length == 1) return false
        if(e[1].length > 5) return false
        e[1] = e[1].trim()
        if(validator.hasSpecialCharacters(e[1]) || validator.hasSpecialCharacters(e[0])) return false
        if(validator.hasWhiteSpace(e[1]) || validator.hasWhiteSpace(e[0])) return false
        return true
    }
}

describe('hasSpecialCharacters', () => {
    it('it should detect special characters' , () => {
        // sad path
        expect(validator.hasSpecialCharacters()).toBe(false)
        expect(validator.hasSpecialCharacters(12323421344565678679780)).toBe(false)
        expect(validator.hasSpecialCharacters('12323421344565678679780')).toBe(false)
        expect(validator.hasSpecialCharacters('abcd efg 1234')).toBe(false)
        expect(validator.hasSpecialCharacters('     ')).toBe(false)
        // happy path
        expect(validator.hasSpecialCharacters('   ""  ')).toBe(true)
        expect(validator.hasSpecialCharacters('   !@@  ')).toBe(true)
        expect(validator.hasSpecialCharacters('   ! @ @  ')).toBe(true)
        expect(validator.hasSpecialCharacters('!@#$%^&*()_+')).toBe(true)
        expect(validator.hasSpecialCharacters('0123!@#$%^ABCTSasd')).toBe(true)
        expect(validator.hasSpecialCharacters('lorem empsum.')).toBe(true)
    })
})
describe('Validates nunber', () => {
    it('detects number', () => {
        expect(validator.hasNumber()).toBe(false)
        expect(validator.hasNumber('!@#!$!@)(%*(*&#$%(*@')).toBe(false)
        expect(validator.hasNumber('abcdefghijklmnop')).toBe(false)
        expect(validator.hasNumber(123456789)).toBe(true)
        expect(validator.hasNumber('123456789')).toBe(true)
        expect(validator.hasNumber(['foo','2beers'])).toBe(true)
        expect(validator.hasNumber('abcdefghijklmnop123')).toBe(true)
        expect(validator.hasNumber('asdf123dsfnkjsadbf^&*(0')).toBe(true)
    })
})
describe('Detects whitespace in string', () => {
    it('detects whitespace', () => {
        expect(validator.hasWhiteSpace()).toBe(false)
        expect(validator.hasWhiteSpace(null)).toBe(false)
        expect(validator.hasWhiteSpace(undefined)).toBe(false)
        expect(validator.hasWhiteSpace(['foo','bar'])).toBe(false)
        expect(validator.hasWhiteSpace(['foo',' bar'])).toBe(true)
        expect(validator.hasWhiteSpace(1234567890)).toBe(false)
        expect(validator.hasWhiteSpace('\n')).toBe(false)
        expect(validator.hasWhiteSpace('1234567890')).toBe(false)
        expect(validator.hasWhiteSpace('abcd123')).toBe(false)
        expect(validator.hasWhiteSpace('')).toBe(false)
        expect(validator.hasWhiteSpace(' ')).toBe(true)
        expect(validator.hasWhiteSpace('the quick brown')).toBe(true)
        expect(validator.hasWhiteSpace('LOREM 1234 9 9 9 9 9 ')).toBe(true)
    })
})
describe('Detects uppercase in string', () => {
    it('detects uppercase in a string character', () => {
        expect(validator.hasUppperCase()).toBe(false)
        expect(validator.hasUppperCase("")).toBe(false)
        expect(validator.hasUppperCase("A")).toBe(true)
        expect(validator.hasUppperCase("Aa")).toBe(true)
        expect(validator.hasUppperCase("lorem Ipsum")).toBe(true)
        expect(validator.hasUppperCase("123")).toBe(false)
    })
})
describe('Detects lowercase  in string', () => {
    it('detects lowercases in a string character', () => {
        expect(validator.hasLowerCase()).toBe(false)
        expect(validator.hasLowerCase(null)).toBe(false)
        expect(validator.hasLowerCase(undefined)).toBe(false)
        expect(validator.hasLowerCase(['',''])).toBe(false)
        expect(validator.hasLowerCase(123)).toBe(false)
        expect(validator.hasLowerCase('ABC123 0')).toBe(false)
        expect(validator.hasLowerCase(['abs',''])).toBe(true)
        expect(validator.hasLowerCase(['abs','ABCZ'])).toBe(true)
        expect(validator.hasLowerCase(['absABC',''])).toBe(true)
        expect(validator.hasLowerCase('abcdABCD')).toBe(true)
    })
})
describe('Checks if string is an email', () => {
    it('checks string if email', () => {
        expect(validator.isEmail()).toBe(false)
        expect(validator.isEmail(123456)).toBe(false)
        expect(validator.isEmail('@.com')).toBe(false)
        expect(validator.isEmail('@ABC.com')).toBe(false)
        expect(validator.isEmail('my#@email@ABC.com')).toBe(false)
        expect(validator.isEmail('my email@ABC.com')).toBe(false)
        expect(validator.isEmail('my ema     il@ABC.com')).toBe(false)
        expect(validator.isEmail('1234567@ABC.com')).toBe(false)
        expect(validator.isEmail('1234567')).toBe(false)
        expect(validator.isEmail('johnD@@!@ABC.com')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.Com')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.c')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.io!')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.i o')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.iojhasdgfjas')).toBe(false)
        expect(validator.isEmail('johnDoe@abc.io*')).toBe(false)
        expect(validator.isEmail('johnDoe@A.io')).toBe(false)
        expect(validator.isEmail('johnDoe@a.io')).toBe(false)
        expect(validator.isEmail('johnDoe@a-^&.io')).toBe(false)
        expect(validator.isEmail('johnDoe@abs d.io')).toBe(false)

        // happy
        expect(validator.isEmail('johnDoe@abc.io')).toBe(true)
        expect(validator.isEmail('loremipsum@yahoo.com')).toBe(true)
    })
})
//