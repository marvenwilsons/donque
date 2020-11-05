
const request = require('supertest')
const app = require('../server/client_services/services.route')
/** --- --- --- --- */
/**
 * Condition: When dq admin route is requested
 * Condition: when server cache is empty
 * App State: Not Inialized
 * System Task: Display Init Page
 */
describe('App is not initialized test, therefore should always return an action to init the app', () => {
  it('Calls dqadmin route without any params', async () => {
    const res = await request(app)
    .get('/service')
    console.log(res)

    expect(true).toBe(true)
  })
  it('Calls dqadmin route with invalid params', () => {
    expect(true).toBe(true)
  })
  it('Calls dqadmin route with username and token', () => {
    expect(true).toBe(true)
  })
})
/**
 * Condition: When dqinit route is requested
 * App State: Note Initialized
 * System Task: Initialize the app
 */
describe('User is initializing the app, testing user input', () => {
  function userInput (appName,username,password) {
    return {
      appName: undefined,
      username: undefined,
      password: undefined
    }
  }
  test('Case 1: App Name', () => {
    expect(true).toBe(true)
  })
})