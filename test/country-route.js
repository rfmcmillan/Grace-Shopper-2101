const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

const db = require('../server')
const Company = db.model('company')

const app = require('../server/app')
const agent = require('supertest')(app)

describe('Company routes', () => {
    let setCountries

    const countryData = [
        {
            name: 'Turkey',
            flag: 'em-flag-tr',
        },
        {
            name: 'Poland',
            flag: 'em-flag-pl',
        },
    ]

    beforeEach(async () => {
        const createdCountries = await Country.bulkCreate(countryData)
        setCountries = createdCountries.map((country) => country.dataValues)
    })

    describe('GET `/api/countries`', () => {
        it('serves up all Countries', async () => {
            const response = await agent.get('/api/countries').expect(200)
            expect(response.body).to.have.length(2)
            expect(response.body[0].name).to.equal(setCountries[0].name)
        })
    })

    describe('GET `/api/countries/:id`', () => {
        it('serves up a single Country by its `id`', async () => {
            const response = await agent.get('/api/companies/2').expect(200)
            expect(response.body.name).to.equal('Spacely Sprockets')
        })
    })
})
