const users = [] // keep an array of users

const addUserToChat = (id, username, roomId) => {
    const user = { id, username, roomId }

    users.push(user)

    return user
}

const getUserById = (id) => {
    return users.find(user => user.id === id)
}

// const removeUserFromChat = (id) => {
//     const idx = users.findIndex(user => user.id === id)

//     if(idx !== -1) {
//         return users.splice(idx, 1)[0]
//     }
// }

module.exports = {
    addUserToChat: addUserToChat,
    getUserById: getUserById
    // removeUserFromChat: removeUserFromChat
}