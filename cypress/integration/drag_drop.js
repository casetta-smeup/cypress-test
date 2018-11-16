function getLoginURL(fun) {
  return `http://localhost:8080/WebUP/views/webupExtLogin.jsf?mod=demo&sfunction=C&var=FUN(${fun})`;
}

const fun = "F(EXD;*SCO;) 1(;;) 2(MB;SCP_SCH;WETEST_DND) 4(;;SCH_00)";

describe('My first test', function () {

  // it('test drag', function () {
  //   cy.viewport(1300, 900);

  //   cy.visit(getLoginURL(fun));

  //   // testing all rows
  //   cy.get(".mccdone tbody tr").should("have.length", 20);

  //   // testing draggable rows
  //   cy.get(".mccdone tr[draggable]").should("have.length", 10);

  //   cy.get('.mccdone tbody tr').then($el => {
  //     const rect = $el[10].getBoundingClientRect();

  //     console.log("rect", rect);

  //     // cy.get(".mccdone tr[draggable]")
  //     //   .first()
  //     //   .trigger('mousedown')
  //     //   .trigger('mousemove', { clientX: 0, clientY: 0 })
  //     //   .trigger('mouseup', { force: true })
  //   })

  //   // logout
  //   cy.get("#webup\\:logout").click();
  // })

  it('test drop', function () {
    cy.viewport(1300, 900);

    cy.visit(getLoginURL(fun));

    cy.get('.component.MAT')
      .should("have.length", 2)
      .then($el => {
        const firstMatCompKey = $el[0].classList[4];

        let secondMatID = "";

        const dataTransfer = {
          dataTransfer: {
            getData: function () {
              return JSON.stringify({ "SOURCE_ID": firstMatCompKey, "SOURCE_ROW_RI": 1 });
            }
          }
        }

        cy.get(".component.MAT")
          .should("have.length", 2)
          .eq(1)
          .get(".mccdone tbody tr")
          .eq(11)
          .trigger("drop", dataTransfer)
          .get(".LAB .labelText")
          .should("have.length", 6)
          .eq(0)
          .contains("FROM.STR001 = 001 - TO.STR001 = 001");
      });

    // logout
    cy.get("#webup\\:logout").click();

    cy.get("#login");
  })
});
