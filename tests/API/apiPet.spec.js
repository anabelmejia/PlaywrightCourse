const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
import Ajv from "ajv"

test.describe('API Create a new Pet', async()=>{
    const ajv = new Ajv(); 
    const namePet = faker.person.firstName()

    test('POST Create a Pet', async({request})=>{
        const response = await request.post('https://petstore.swagger.io/v2/pet', 
            {data:{name: namePet
        }}
    )

        test.step('Verify that the response status code is 200',async()=>{
            expect(response.status()).toBe(200)
        })

        const responseBody = await response.json()

        test.step('Verify Json schema structure', async()=>{
            const valid = ajv.validate(require('./schemas/newPet.json'),responseBody)
            if(!valid){
                console.error('AJV Validation Error',ajv.errorsText());
            }
            expect(valid).toBe(true);

        })


    })

    test('Any GET Accesible', async({request})=>{
        const response = await request.get('https://petstore.swagger.io/v2/store/inventory')
        test.step('Verify that the response status code is 200',async()=>{
            expect(response.status()).toBe(200)
        })
        
        const responseBody = await response.json()

        test.step('Verify Json schema structure', async()=>{
            const valid = ajv.validate(require('./schemas/status.json'),responseBody)
            if(!valid){
                console.error('AJV Validation Error',ajv.errorsText());
            }
            expect(valid).toBe(true);

        })
    })


        
})