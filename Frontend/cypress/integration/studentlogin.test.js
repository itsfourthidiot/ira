

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



describe('Instructor login pg', () => {


    const username = string + '@gmail.com';
    const password = "burger1244"

    it('New Instructor should be able to register', ()=>{
        cy.visit('/studentLogin');
        // cy.get('[name=registerlabel]').click();
        cy.get('div[role=tab]').eq(1).click();
        cy.get('[name=newUsername]').type(`${username}`);
        cy.get('[name=newPassword]').type(`${password}`);
        cy.get('[name=registerbutton]').click();


    });

    it('Instructor should be able to login', ()=>{

        cy.visit('/studentLogin');
        cy.get('[name=username]').type(`${username}`);
        cy.get('[name=password]').type(`${password}`);
        cy.get('[name=loginbutton]').click();
        sleep(1000);
        cy.getLocalStorage('ACCESS_TOKEN').then((token) => {
            console.log(token);
        })
        //cy.getLocalStorage('ACCESS_TOKEN');
        
    });




});