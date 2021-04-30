const { expect } = require('chai')
const {
    db,
    models: { Country },
} = require('../server/db')

describe('Country Model', async () => {
    beforeEach(async () => {
        try {
            await db.sync({ force: true })
            await Country.create({
                name: 'Turkey',
                flag: 'em-flag-tr',
            })
        } catch (error) {
            console.log(error)
        }
    })

    it('should exist', async () => {
        const country = await Country.findAll()
        expect(country).to.exist
    })

    it('should return an array', async () => {
        const countries = await Country.findAll()
        expect(countries).to.be.an('array')
        expect(countries.length).to.be.at.least(0)
    })

    it('should require an name', async () => {
        const country = await Country.create({
            name: 'Poland',
            flag: 'em-flag-pl',
        })
        const countries = await Country.findAll()
        expect(countries.length).to.equal(2)
    })
})
