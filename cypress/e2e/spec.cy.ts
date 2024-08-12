describe("Characters Component", () => {
	beforeEach(() => {
		cy.on("uncaught:exception", (err, runnable) => {
			if (
				err.message.includes("Hydration failed") ||
				err.message.includes("There was an error while hydrating")
			) {
				return false;
			}
		});
		cy.intercept("GET", "**/people?page=1").as("fetchPeople");
		cy.visit("http://localhost:5173");
		cy.wait("@fetchPeople");
	});

	it("renders the Characters component and verifies the character list exists", () => {
		cy.get("[data-testid='loader']").should("not.exist");
		cy.get("[data-testid='character-list']").should("exist");
	});

	it("navigates to the character detail page when a character is clicked", () => {
		cy.get("[data-testid='character-list-item']").first().click();
		cy.url().should("include", "/characters/1");
	});

	it("open modal film of character", () => {
		cy.get("[data-testid='character-list-item']").first().click();
		cy.get("[data-testid='films']").should("exist");
		cy.get("[data-testid='loader']").should("not.exist");
		cy.get("[data-testid='film-list-item']").first().click();
		cy.get("[data-testid='film detail']").should("exist");
	});

	it("Filter characters", () => {
		cy.get("[data-testid='search-input']").type("Luke");
		cy.get("[data-testid='character-list']").should("exist");
		cy.get("[data-testid='character-list-item']").should("have.length", 1);
	});

	it("no characters found", () => {
		cy.get("[data-testid='search-input']").type("ñ");
		cy.get("[data-testid='loader']").should("exist");
		cy.get("[data-testid='no characters found']").should("exist");
	});

	it("404 page", () => {
		cy.visit("http://localhost:5173/characters/1000");
		cy.get("[data-testid='loader']").should("exist");
		cy.get("[data-testid='404']").should("exist");
	});
});
