const { test, expect } = require('@playwright/test');

exports.Home = class Home {
    constructor(page){
        this.page = page;
        this.logoPage = page.getByAltText('Hotel logoUrl')
        this.btnBookthisRoom = page.getByRole('button',{name:'Book this room'})
        this.btnBook = page.getByRole('button' , {name:'Book'})
    }

    async verifyPage(){
        await expect(this.logoPage).toBeVisible()
    }

    async clickBtnBookThisRoom(){
        await this.btnBookthisRoom.click()
        await expect(this.btnBook).toBeVisible()
    }
}