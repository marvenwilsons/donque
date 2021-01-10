module.exports = function (io) {
    // TODO
    io.on('connection', (socket) => {
        console.log('made socket connection')

        socket.on('mydata', (data) => {
            console.log('received')
            setInterval(() => {
                console.log('sending!')
                socket.emit('mydata', 'confimation sent!')
            }, 1500)
        })

        socket.emit('status', 'app loaded')
    })
}