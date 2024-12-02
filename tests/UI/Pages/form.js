const { test, expect } = require('@playwright/test');

exports.Form = class Form {
    constructor(page){
        this.page = page;
        this.firstName = page.getByRole('textbox',{name:'Firstname'})
        this.lastName = page.getByRole('textbox',{name:'Lastname'})
        this.email = page.locator('[class="form-control room-email"]')
        this.phone = page.getByTestId('ContactPhone')
        this.btnBook = page.locator('[class="btn btn-outline-primary float-right book-room"]') //page.getByRole('button' , {name:'Book'})
        this.errorMessage = page.getByText('must not be null')
        this.btnCancel = page.getByRole('button' , {name:'Cancel'})
    }

    async fillTheForm(firstname,lastname,email,phone){
        await this.firstName.fill(firstname)
        await this.lastName.fill(lastname)
        await this.email.fill(email)
        this.phone.fill(phone)
    }

    async clickTheBookButton(){
        await this.btnBook.click()
    }

    async verifyTheErrorMessage(){
        await expect(this.errorMessage).toBeVisible()
    }

    async clickTheCancelButton(){
        await this.btnCancel.click()
    }
}
