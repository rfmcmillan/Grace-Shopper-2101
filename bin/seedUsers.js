const {
    models: { User },
} = require('../server/db')
const seedUsers = async () => {
    const alejandra = await User.create({
        email: 'alejandra@snacker.com',
        password: 'alejandra_pw',
    })
    const kevin = await User.create({
        email: 'kevin@snacker.com',
        password: 'kevin_pw',
    })
    const yiru = await User.create({
        email: 'yiru@snacker.com',
        password: 'yiru_pw',
    })
}

seedUsers()

module.exports = { seedUsers }
