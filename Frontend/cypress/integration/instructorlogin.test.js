
describe('Instructor login pg', () => {

    const username = "Prasad"
    const password = "burger"

    it('Instructor should be able to login', ()=>{

        cy.visit('/instructorLogin');
        cy.get('[name=username]').type(`${username}`);
        cy.get('[name=password]').type(`${password}`);
        cy.get('[name=loginbutton]').click();
        
    });


});