const { expect } = require('chai')
const {
    db,
    models: { User },
} = require('../server/db')

describe('Database', () => {
    describe('User Model', async () => {
        beforeEach(async () => {
            try {
                await db.sync({ force: true })
                await User.create({
                    firstName: 'russel',
                    email: 'russel@snacker.com',
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
    })
})
