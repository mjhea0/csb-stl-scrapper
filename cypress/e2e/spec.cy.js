const addresses = [
  "ARSENAL ST & BENT AVE",
  "ARSENAL ST & ALFRED AVE",
  "ARSENAL ST & PORTIS AVE",
  "ARSENAL ST & LACKLAND AVE",
  "ARSENAL ST & MAURY AVE",
  "ARSENAL ST & GURNEY AVE",
]

const message = "This is a dangerous crosswalk. Please add a stop sign. Yours, Concerned STL Citizen."

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Cannot read properties of undefined (reading 'length')")) {
    return false;
  }
  if (err.message.includes("Cannot read properties of undefined (reading 'value')")) {
    return false;
  }
  return true;
});

for (const address of addresses) {
  describe(address, () => {
    it("", () => {
      // enter location
      cy.visit("https://www.stlouis-mo.gov/government/departments/public-safety/neighborhood-stabilization-office/citizens-service-bureau/csb-request-submit.cfm?action=addresscheck&pbsid=317&stepnum=2&parentNodeId=271&instanceId=0");
      cy.get("input[id='searchBy']").type(address);
      cy.get("input[id='byAddress']").click();
      cy.get("a").contains("Location is correct").click();

      // add details
      cy.get("label")
        .contains("Other - see comments")
        .parent()
        .within(() => {
          cy.get("input[type='radio']").click();
        });
      cy.get("input").contains("Continue").click();
      cy.get("textarea[name='answerList']").type(message);
      cy.get("input").contains("Continue").click();
      cy.get("textarea[name='requestDetail']").type(message);
      cy.get("input").contains("Continue").click();

      // add photos and contact info
      cy.get("a").contains("Skip this step").click();
      cy.get("a").contains("Skip this step").click();

      // ensure request was submitted properly
      cy.get("h1").contains("Request Submitted")
    });
  });
}
