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
            await db.sync({ force: true })
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
                expect(response.status).to.equal(200)
                expect(response.body.length).to.equal(2)
            } catch (ex) {
                console.log(ex)
            }
        })

        it('/api/countries/:id', async () => {
            const response = await app.get(`/api/countries/${country1.id}`)
            expect(response.status).to.equal(200)
            expect(response).to.exist
        })
    })
    describe('POST', () => {
        it('/api/countries', async () => {
            const name = 'Iran'
            const { body } = await app
                .post('/api/countries')
                .send({ name: 'Iran', flag: 'em-flag-ir' })
            expect(body).to.exist
            // expect(body.name).to.equal(name)
        })

        // it('/api/countries/:id/products/', async () => {
        //     const response = await app
        //         .post('api/countries/:id/products')
        //         .send({
        //             title: 'Grenadine Juice',
        //             brand: 'Meysu',
        //             description: 'Juice',
        //             price: 4.99,
        //             inventory: 126,
        //             imageUrl:
        //                 'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
        //             countyId: country1.id,
        //         })
        //     expect(response.body.title).to.equal('Grenadine Juice')
        // })
    })

    describe('DELETE', () => {
        it('/api/countries', async () => {
            const toDel = await Country.findOne({
                where: { name: 'Turkey' },
            })
            const response = await app.delete(`/api/countries/${toDel.id}`)
            const country = await Country.findAll()
            expect(response.status).to.equal(204)
            expect(country.length).to.equal(1)
        })
    })
})
