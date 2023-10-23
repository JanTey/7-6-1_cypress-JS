const book1 = {
  title: 'Дневник охотника за ошибками',
  description: 'Учебная литература',
  author: 'Тобиас Клейн',
  fixturePathJpg: 'Diary_of_a_Bug_Hunter.jpg',
  fixturePathBook: 'Тобиас Клейн. Дневник охотника за ошибками (2013).pdf'
  };

describe('login page', () => {
  beforeEach(() => {
    cy.visit('/')

  })
  it('should login with valid email and password', () => {
    cy.login('bropet@mail.ru', '123')
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
  })

  it('should not login with empty mail', () => {
    cy.login(null, '123')
    cy.get('#mail').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('should not login with empty password', () => {
    cy.login('bropet@mail.ru', null)
    cy.get('#pass').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })
})  

describe('Add book', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('bropet@mail.ru','123');
    })

  it('Add book', () => {
    cy.contains('Add new').click();
    cy.contains('Book description').should('be.visible');
    cy.addBook(book1);
    cy.contains(book1.title).should('be.visible');
  });

  it('Add to favorite', () => {
    
    if (!cy.contains(book1.title)){
      cy.addBook(book1);
    };
    cy.contains('Delete from favorite').click();
    cy.contains('Add to favorite').click();
    cy.contains('Favorites').click();
    cy.contains(book1.title).should('be.visible');
  });
  
  it('Delete from favorite', () => {
    if (!cy.contains(book1.title)){
      cy.addBook(book1);
    };
    cy.contains('Favorites').click();
    cy.contains('Delete from favorite').click();
    cy.contains('Please add some book to favorit on home page!').should('be.visible');
    cy.contains('Books list').click();
    cy.contains('Add to favorite').click();
  });

  it('View book in favorites', () => {
    if (!cy.contains(book1.title)){
      cy.addBook(book1);
    };
    cy.contains('Favorites').click();
    cy.contains(book1.title).click();
    cy.contains('Dowload book').should('be.visible');
  });

});
