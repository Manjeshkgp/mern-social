const ChatPageSocket = (socket)=>{
    socket.on("create-chat-room",({chatId,messagesArray})=>{
        socket.join(`${chatId}`);
        socket.on("send-message",({chatId,senderId,text})=>{
            messagesArray.push({chatId,senderId,text})
            socket.in(`${chatId}`).emit("updated-messages",messagesArray)
        })
    })
}
export default ChatPageSocket;