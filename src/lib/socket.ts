import IO from 'socket.io-client';
import {SET_SOCKET_ERROR} from "@/store/reducers/socketError";
import {store} from "@/store/index"
import {ADD_MESSAGE} from "@/store/reducers/messageList";
import {ADD_CONVERSATION} from "@/store/reducers/conversationList";
const socket = IO('http://127.0.0.1:7001/message',{path: '/testPath'});



socket.on('connect', () => {
    console.log(socket.connected) // true
})

socket.on('disconnect', () => {
    console.log(socket.connected) // false
})

socket.on('sendMsg', (data) => {
    console.log('sendMsg')
    console.log(data)
    const storeData = store.getState()
    console.log(storeData)
    if (storeData.currentConversation._id === data.conversation._id) {
        store.dispatch(ADD_MESSAGE(data.message))
    }
    store.dispatch(ADD_CONVERSATION(data.conversation))

})

socket.on('error',(msg) => {
    store.dispatch(SET_SOCKET_ERROR(msg))
    console.log(msg)
})
socket.connect()

export default socket








