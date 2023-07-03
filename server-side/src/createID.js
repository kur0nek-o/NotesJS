const { randomInt } = require('node:crypto')

exports.generateID = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let generatedID = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = randomInt(characters.length)

        generatedID += characters[randomIndex]
    }

    return generatedID
}