const { expect } = require('chai')
const {
    db,
    models: { Country },
} = require('../server/db')
const app = require('supertest')(require('../server/server'))

describe('Country routes', () => {
    let country1, country2
    beforeEach(async () => {
        try {
            country1 = await Country.create({
                name: 'Turkey',
                flag: 'em-flag-tr',
            })
            country2 = await Country.create({
                name: 'Poland',
                flag: 'em-flag-pl',
            })
        } catch (ex) {
            console.log(ex)
        }
    })
    // afterEach(async () => {
    //     try {
    //         // const countries = await Country.findAll()
    //         await Country.destroy()
    //         // await Country.sync()
    //     } catch (ex) {
    //         console.log(ex)
    //     }
    // })
    describe('GET', () => {
        it('/api/countries', async () => {
            try {
                const response = await app.get('/api/countries')
                console.log('!!!!!response', response.body)
                expect(response.status).to.equal(200)
                // expect(response.body.length).to.equal(2)
            } catch (ex) {
                console.log(ex)
            }
        })

        it('/api/countries/:id', async (id) => {
            const response = await app
                .get(
                    `
            /api/countries/${id}`
                )
                .expect(200)
            expect(response).to.exist
            expect(response[0].body.name).to.equal('Turkey')
            // expect(response.length).to.equal(3)
        })
    })
    describe('POST', () => {
        it('/api/countries', async () => {
            const name = 'Iran'
            const { body } = await app
                .post('/api/countries')
                .send({ name: 'Iran', flag: 'em-flag-ir' })
            expect(body).to.exist
            expect(body.name).to.equal(name)
        })
    })

    describe('DELETE', () => {
        it('/api/countries', async () => {
            const toDel = await Country.findOne({
                where: { name: 'Turkey' },
            })
            const response = await app.delete(`/api/countries/${toDel.id}`)
            const country = await Country.findAll()
            expect(response.status).to.equal(204)
            expect(country.length).to.equal(9)
        })
    })
})
