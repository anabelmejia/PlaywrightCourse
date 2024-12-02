// @ts-check
const { test, expect } = require('@playwright/test');
const {Home} = require('./Pages/home');
const {Form} = require('./Pages/form');
const {Contact} = require('./Pages/contact');
import dotenv from 'dotenv'
import { setTimeout } from 'timers/promises';
dotenv.config()

test.describe('Final Work', () => {

  test.beforeEach('Load the page', async ({ page }) => {
    console.log(process.env.URLBASE)
    await page.goto('/')
    await setTimeout(10000)
  })

  test('Login to the web site',({page})=>{

    test.step('Verify that the page is loaded', async() => {
      const home = new Home(page);
      await home.verifyPage()
    })

    test.step('Click on the Book this Room button', async() =>{
      const home = new Home(page);
      await home.clickBtnBookThisRoom()
    })

  })

  test('Fill the Form from Book this Room section and verify the Error Message', ({page})=>{
    test.step('Fill the form', async()=>{
      const form = new Form(page);
      await form.fillTheForm(process.env.FIRSTNAME,process.env.LASTNAME,process.env.EMAIL,process.env.PHONE)
      await form.clickTheBookButton()
    })

    test.step('validate the Error Message', async()=>{
      const form = new Form(page);
      await form.verifyTheErrorMessage()
      await form.clickTheCancelButton()
    })
  })

  test('Fill the form from Contact section',({page})=>{
    test.step('Verify the Contact section', async()=>{
      const contact = new Contact(page);
      await contact.verifyTheContactSection()
    })

    test.step('Fill the form from Contact section', async()=>{
      const contact = new Contact(page);
      await contact.fillTheForm(process.env.FULLNAME,process.env.EMAIL,process.env.PHONE,process.env.SUBJECT,process.env.MESSAGE)
      await contact.clickTheSubmitButton()
    })

    test.step('Validate the Success Message', async()=>{
      const contact = new Contact(page);
      await contact.verifyTheSuccessMessage(process.env.FULLNAME,process.env.SUBJECT)
    })
  })

}) 

