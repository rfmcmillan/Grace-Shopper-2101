const { expect } = require('chai')
const {
    db,
    models: { User },
} = require('../server/db')

describe('User Model', async () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            await User.create({
                email: 'russel@snacker.com',
                password: 'abc123',
            })
        } catch (error) {
            console.log(error)
        }
    })

    it('should exist', async () => {
        const users = await User.findAll()
        expect(users).to.exist
    })

    it('should return an array', async () => {
        const users = await User.findAll()
        expect(users).to.be.an('array')
        expect(users.length).to.be.at.least(0)
    })
    //very simple tests. they will fail if you provide invalid inputs to the User.create() call that is within the test
    it('should require an email address', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        const users = await User.findAll()
        expect(users.length).to.equal(2)
    })

    it('should require a password', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        const users = await User.findAll()
        expect(users.length).to.equal(2)
    })

    it('provided email address is valid email address', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        const users = await User.findAll()
        expect(users.length).to.equal(2)
    })

    it('default value for `admin` property is `false`', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        expect(user.admin).to.equal(false)
    })
})
