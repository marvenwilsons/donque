const ws = new WebSocket('ws://localhost:4000')

ws.onopen = () => {
    console.log('it is open')
}

ws.onclose = () => {
    console.log('disconected')
}

ws.onmessage = (payload) => {
    console.log(payload.data)
}

export {ws}