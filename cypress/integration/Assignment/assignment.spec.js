/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
describe('verify the UI', function () {
    context('screenresolution', () => {
        this.beforeEach(() => {
            cy.visit('https://app.klaarhq.com/')
            cy.viewport(1366, 768)

        })
    })

    it('verify login functionality with valid credentials', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.url().should('contain', 'profile')
    })

    it('verify login functionality with Invalid credentials', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.get('.alert.error').should('contain', 'Oops! User does not exis')
    })

    it('verify Forgot Password functionality with a valid email address', function () {
        cy.contains('Forgot Password').click()
        cy.get('input[data-cy="reset-password-email-text-field"]').type("deepa.nayak@gamma.klaar.team")
        cy.contains('Send password reset email').click()
        cy.get('.reset-head-child.full-width.ng-star-inserted').should('contain', 'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.')
    })

    it('verify Forgot Password functionality with a Invalid email address', function () {
        cy.wait(5000)
        cy.contains('Forgot Password').click()
        cy.get('input[data-cy="reset-password-email-text-field"]').type("deepa.nak@gamma.klaar.team")
        cy.contains('Send password reset email').click()
        cy.contains("User doesn't exist").should('be.visible')
    })

    it('verify user is able to navigate to setting option', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.url().should('contain', 'settings')

    })

    it("verify the workspace settings functionality", function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.get('.centert').last().click()
        cy.contains('Workspace Settings').should('be.visible')
        cy.contains(' Save changes ').click()
        cy.contains("Organization name changed").should('be.visible')

    })

    it('verify the functionality for file upload', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.get('.centert').last().click()
        cy.get('input[type="file"]').attachFile('Workspace_Group-Logo.png')
        cy.url().should('contain', 'workspace')
    })


    it('verify the customise modules functionality', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.contains('Customize Modules').click()
        cy.get('span[class="tw-braek-words"]').should('contain', 'Customize Modules')

    })

    it("verify my skill and strength is taged on then it is visible on profile", function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.contains('Customize Modules').click()
        cy.get('button[class="ant-switch"]').first().click()
        cy.wait(5000)
        cy.get('button[class="ant-switch"]').eq(2).click()
        cy.wait(5000)
        cy.get('button[data-cy="profile-nav-menu-button"]').click()
        cy.wait(3000)
        cy.get('h3[data-cy="profile-my-strengths-module-title"]').should('be.visible')
        cy.get('h3[data-cy="profile-my-skills-module-title"]').should('be.visible')
    })

    it.only('verify Teams module and Health is taged on then it is visible on side menu', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.contains('Customize Modules').click()
        cy.get('button[class="ant-switch"]').eq(1).click()
        cy.wait(5000)
        cy.get('button[class="ant-switch"]').last().click()
        cy.wait(5000)
        cy.get('button[data-cy="teams-nav-menu-button"]').should('be.visible')
        cy.get('button[data-cy="health-nav-menu-button"]').should('be.visible')
    })

    it('verify Add a new user functionality', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.contains('User List').click()
        cy.contains('All Users').should('be.visible')
        cy.wait(5000)
        cy.get('button[data-cy="settings-user-list-add-user-button"]').click()
        cy.get('.ant-checkbox-input.ng-untouched.ng-pristine.ng-valid').eq(5).should('not.be.checked')
        cy.get('input[data-cy="settings-add-user-full-name-text-field"]').type('chetana Malleshe')
        cy.get('input[data-cy="settings-add-user-email-text-field"]').type("chetanamalleshe77@gmail.com")
        cy.get('[data-cy="settings-add-user-select-department-dropdown-area"] > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input').type('Software').type('{enter}')
        cy.get('.ant-select-selection-item.ng-star-inserted').should('have.text', 'Software')
        cy.get('[data-cy="settings-add-user-select-title-dropdown-area"] > .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input').type('Quality Manager').type('{enter}')
        cy.get('[data-cy="settings-add-user-select-title-dropdown-area"] > .ant-select-selector > .ant-select-selection-item').should('have.text', 'Quality Manager')
        cy.get('[data-cy="settings-add-user-id-text-field"]').type('chetana@123').type('{enter}')
        cy.contains('Add Now').click()
        cy.get('.ant-tabs-tab-active > .ant-tabs-tab-btn').click()
        cy.get('td[data-cy="user-list-user-id-field"]').should('contain', 'chetana@123')
    })


    it('verify User Custom Fields functionality', function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(5000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.contains('User List').click()
        cy.get(':nth-child(3) > .ant-tabs-tab-btn').click()
        cy.get(':nth-child(1) > :nth-child(2) > [data-cy="settings-user-fields-custom-field-name-text-area"]').type('Avantika')
        cy.get('[data-cy="settings-user-fields-custom-field-save-button"]').click()
        cy.contains('Created new custom field!').should('be.visible')
        cy.get(':nth-child(1) > :nth-child(2) > [data-cy="settings-user-fields-custom-field-name-text-area"]').type('Ashwini')
        cy.get('[data-cy="settings-user-fields-custom-field-save-button"]').click()

    })

    it("Verify Workspace settings are only visible to the admin user and not visible to the non-admin user", function () {
        cy.get('[data-cy="login-email-text-field"]').type('deepa.nayak@gamma.klaar.team')
        cy.get('[data-cy="login-password-text-field"]').type('Klaar2021')
        cy.get('[data-cy="login-submit-button"]').click()
        cy.wait(2000)
        cy.get('button[data-cy="settings-nav-menu-button"]').children('li').last().click()
        cy.get('input[data-cy="settings-workspace-name-field"]').type(' deepa.nayak@gamma.klaar.team')
        cy.contains(' Save changes ').click()
        cy.contains('Organization name changed').should('be.visible')
        cy.contains('User List').click()
        cy.contains('All Users').click()
        cy.get('input[data-cy="user-list-search-text-field"]').type(' deepa.nayak@gamma.klaar.team').should('be.visible')

    })

})