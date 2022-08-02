import IO from 'socket.io-client';
const socket = IO('http://127.0.0.1:7001/message',{path: '/testPath'});

const data2: { name: any; xx: any; id: any; fj: any; }[] = []
socket.on('data', msg => {
    if (msg.data != null) {
        let data3 = {
            name: msg.xx.name,
            xx: msg.data,
            id: msg.id,
            fj: msg.xx.fjh
        }
        data2.push(data3)
    }

    console.log('服务端消息', msg, data2)
})
socket.on('connect', () => {
    console.log(socket.connected) // true
})

socket.on('disconnect', () => {
    console.log(socket.connected) // false
})

socket.on('sendMsg', (data) => {
    console.log('sendMsg')
    console.log(data)
})
socket.connect()

export default socket








