// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) => {
    cy.contains('Log in').click()
    if (email) {
        cy.get('#mail').type(email)
    }
    if (password) {
        cy.get('#pass').type(password)
    }
    cy.contains('Submit').click()
});
Cypress.Commands.add('addBook', (book) => {
    
    if (book.title){
        cy.get('#title').type(book.title);
    }
    if (book.description){
        cy.get('#description').type(book.description); 
    }
    if (book.author){
        cy.get('#authors').type(book.author); 
    }
    if (book.fixturePathJpg){
        cy.get('#fileCover').selectFile('cypress/fixtures/Diary_of_a_Bug_Hunter.jpg')
        
    }
    if (book.fixturePathBook){
        cy.get('#fileBook').selectFile('cypress/fixtures/Тобиас Клейн. Дневник охотника за ошибками (2013).pdf')
       
    }

    cy.get('#favorite').check();
    cy.contains('Submit').click();
});
Cypress.Commands.add('addToFavorites', () => {
    if(!cy.contains('Add to favorite')){
        
    }else{
        cy.contains('Add to favorite').click();
    }
});