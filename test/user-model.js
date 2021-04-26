const { expect } = require('chai')
const jwt = require('jsonwebtoken')
const {
    db,
    models: { User },
} = require('../server/db')

describe('User Model', async () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            await User.create({
                email: 'kevin@snacker.com',
                password: 'kevin_pw',
            })
            await User.create({
                email: 'alejandra@snacker.com',
                password: 'alejandra_pw',
            })
            await User.create({
                email: 'yiru@snacker.com',
                password: 'yiru_pw',
            })
        } catch (error) {
            console.log(error)
        }
    })

    describe('JWT authentication', () => {
        it('there are three test users', async () => {
            const users = await User.findAll()
            expect(users.length).to.equal(3)
        })

        describe('User.authenticate', () => {
            describe('correct credentials', () => {
                it('returns a token', async () => {
                    const token = await User.authenticate({
                        email: 'kevin@snacker.com',
                        password: 'kevin_pw',
                    })
                    expect(token).to.be.ok
                })
            })
            describe('incorrect credentials', () => {
                it('throws an error', async () => {
                    try {
                        await User.authenticate({
                            email: 'kevin@snacker.com',
                            password: 'kevin',
                        })
                    } catch (error) {
                        expect(error.status).to.equal(401)
                        expect(error.message).to.equal(
                            'The email address or password that you provided is incorrect.'
                        )
                    }
                })
            })
            describe('with a valid token', async () => {
                it('returns a user', async () => {
                    const users = await User.findAll()
                    const token = await jwt.sign(
                        { id: users[2].id },
                        process.env.JWT
                    )
                    const user = await User.byToken(token)
                    expect(user.email).to.equal('yiru@snacker.com')
                })
            })
            describe('with an invalid token', async () => {
                it('throws an error', async () => {
                    const users = await User.findAll()
                    try {
                        const token = await jwt.sign(
                            { id: users[2].id },
                            'invalid-token'
                        )
                        await User.byToken(token)
                    } catch (error) {
                        expect(error.status).to.equal(401)
                        expect(error.message).to.equal(
                            'The token that you provided is not valid.'
                        )
                    }
                })
            })
        })
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
        expect(users.length).to.equal(4)
    })

    it('should require a password', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        const users = await User.findAll()
        expect(users.length).to.equal(4)
    })

    it('provided email address is valid email address', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        const users = await User.findAll()
        expect(users.length).to.equal(4)
    })

    it('default value for `admin` property is `false`', async () => {
        const user = await User.create({
            email: 'rosie@snacker.com',
            password: '123ert',
        })
        expect(user.admin).to.equal(false)
    })
})
