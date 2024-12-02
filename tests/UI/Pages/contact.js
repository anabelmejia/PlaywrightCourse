const { test, expect } = require('@playwright/test');

exports.Contact = class Contact {
    constructor(page){
        this.page = page;
        this.btnSubmit = page.getByRole('button',{name:'Submit'})
        this.name = page.getByTestId('ContactName')
        this.email = page.getByTestId('ContactEmail')
        this.phone = page.getByTestId('ContactPhone')
        this.subject = page.getByTestId('ContactSubject')
        this.message = page.getByTestId('ContactDescription')
        //this.successMessage = page.getByText('Thanks for getting in touch ', { exact: false})
    }

    async verifyTheContactSection(){
        await expect(this.btnSubmit).toBeVisible()
    }

    async fillTheForm(name,email,phone,subject,message){
        await this.name.fill(name)
        await this.email.fill(email)
        await this.phone.fill(phone)
        await this.subject.fill(subject)
        await this.message.fill(message)
    }

    async clickTheSubmitButton(){
        await this.btnSubmit.click()
    }

    async verifyTheSuccessMessage(name,subject){
        let contactName = name;
        this.successMessage = page.getByText(`Thanks for getting in touch ${contactName}!`)
        this.subjectSuccessMessage = page.getByText(subject)
        await expect(this.successMessage).toBeVisible()
        await expect(this.subjectSuccessMessage).toBeVisible()
    }

}