const { test, expect } = require('@playwright/test');
const path = require('path');
const readExcelFile = require('C:/Users/Hassan Laptop Point/Desktop/UI_Automation/tests/utils/excelReader.js');

const excelFilePath = path.join(__dirname, 'C:/Users/Hassan Laptop Point/Desktop/UI_Automation/Data/testData.xlsx');

test('GitHub Login Test with Excel Data', async ({ page }) => {
    const testData = readExcelFile(excelFilePath);
    const { username, password } = testData[0];

    await page.goto('https://github.com/login');
    await page.fill('input[name="login"]', username); 
    await page.fill('input[name="password"]', password); 
    await page.click('input[type="submit"]');
    
    await page.waitForURL('https://github.com/');
    
    const title = await page.title();
    const dashboard = page.locator('span.AppHeader-context-item-label:text("Dashboard")');
    await expect(dashboard).toBeVisible();
    
    console.log('Login test passed');
});