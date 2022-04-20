var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var string = '';
for(var ii=0; ii<8; ii++){
    string += chars[Math.floor(Math.random() * chars.length)];
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }



describe('Student quiz', () => {


    const username = string + '@gmail.com';
    const password = "burger1244"

    it('New student should be able to register', ()=>{
        cy.visit('/studentLogin');
        // cy.get('[name=registerlabel]').click();
        cy.get('div[role=tab]').eq(1).click();
        cy.get('[name=newUsername]').type(`${username}`);
        cy.get('[name=newPassword]').type(`${password}`);
        cy.get('[name=registerbutton]').click();


    });

    it('Student should login and see available courses', ()=>{

        cy.visit('/studentLogin');
        cy.get('[name=username]').type(`${username}`);
        cy.get('[name=password]').type(`${password}`);
        cy.get('[name=loginbutton]').click();
        sleep(1000);
        cy.getLocalStorage('ACCESS_TOKEN').then((token) => {
            console.log(token);
        })
        cy.url().should('include', '')
        sleep(1000)
        cy.get('[name=dashboard]').click();
        
        cy.url().should('include', 'Dashboard')

        //cy.getLocalStorage('ACCESS_TOKEN');
        
        
    });

    it('Student should be able to see course curriculum and access quiz', ()=>{
        cy.get('.col-4').first().click();  //
        cy.get('[name=matExpansionPanel]').click(); 
        cy.get('.moduleItem').click({multiple: true})
        // cy.get('[name=enrollButton]').click();
        cy.wait(2000)
        cy.get('[name=courseDescription]').click();
        cy.get('[name=matExpansionPanel]').click(); 
        cy.get('.moduleItem').click({multiple: true})

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })
          


    });







});