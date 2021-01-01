module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('made socket connection')

        socket.on('mydata', (data) => {
            console.log('received')
            setInterval(() => {
                console.log('sending!')
                socket.emit('mydata', 'confimation sent!')
            }, 1500)
        })

    })
}