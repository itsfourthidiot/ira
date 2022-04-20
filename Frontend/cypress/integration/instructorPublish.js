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
        cy.visit('/instructorLogin');
        // cy.get('[name=registerlabel]').click();
        cy.get('div[role=tab]').eq(1).click();
        cy.get('[name=newUsername]').type(`${username}`);
        cy.get('[name=newPassword]').type(`${password}`);
        cy.get('[name=registerbutton]').click();


    });

    it('Instructor should be able to login', ()=>{

        cy.visit('/instructorLogin');
        cy.get('[name=username]').type(`${username}`);
        cy.get('[name=password]').type(`${password}`);
        cy.get('[name=loginbutton]').click();
        sleep(1000);
        cy.getLocalStorage('ACCESS_TOKEN').then((token) => {
            console.log(token);
        })
        //cy.getLocalStorage('ACCESS_TOKEN');
        
    });

    it('Instructor should be able to create a new course', ()=>{
        
        cy.get('[name=createCourse]').click();
        let courseName = '';
        for(var ii=0; ii<8; ii++){
            courseName += chars[Math.floor(Math.random() * chars.length)];
        }   
        cy.get('[name=courseName]').type(`${courseName}`);
        
        cy.get('[name=createButton]').click();

    });

    it('Instructor should be able to update course Description and Publish Course', ()=>{
        cy.url().should('include', 'courseDetails')
        
        let description = '';
        for(var ii=0; ii<8; ii++){
            description += chars[Math.floor(Math.random() * chars.length)];
        }  
        cy.get('[name=description]').type(`${description}`);
        cy.get('[name=updateDescription]').click();
        cy.get('[name=publishButton]').click();
        

    });



});