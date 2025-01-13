/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../cypress-do-zero-a-nuvem/src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  }),
    it("preenche os campos obrigatórios e envia o formulário", () => {
      cy.get('input[name="firstName"]').type("João Pedro");
      cy.get('input[name="lastName"]').type("Xavier");
      cy.get('input#email[name="email"]').type("joao@tat.com");
      cy.get('textarea[name="open-text-area"]').type(
        "Parabéns pelo curso, muito bom! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus venenatis sapien vitae gravida. Nam hendrerit interdum nibh, eu aliquet ipsum egestas in. In at nisl fermentum, venenatis justo at, ornare sapien. Suspendisse placerat, urna id laoreet posuere, massa mauris fermentum nisi, vel fringilla dolor elit vel urna. Nullam vitae nunc gravida",
        { delay: 0 }
      );
      cy.contains('button','Enviar').click();
      cy.get(".success").should("be.visible");
    }),
    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
      cy.get('input[name="firstName"]').type("João Pedro");
      cy.get('input[name="lastName"]').type("Xavier");
      cy.get('input#email[name="email"]').type("joaotat.com");
      cy.get('textarea[name="open-text-area"]').type(
        "Parabéns pelo curso, muito bom!",
        { delay: 0 }
      );
      cy.contains('button','Enviar').click();
      cy.get(".error").should("be.visible");
    }),
    it("valida que não será preenchido caracteres não-numéricos no campo de telefone", () => {
      cy.get('input#phone[name="phone"]').type("abc").should("have.value", "");
    }),
    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get('input[name="firstName"]').type("João Pedro");
      cy.get('input[name="lastName"]').type("Xavier");
      cy.get('input#email[name="email"]').type("joao@tat.com");
      cy.get("input#phone-checkbox").check();
      cy.get('textarea[name="open-text-area"]').type(
        "Parabéns pelo curso, muito bom!",
        { delay: 0 }
      );
      cy.contains('button','Enviar').click();
      cy.get('span[class="error"]').should("be.visible");
    }),
    it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
      cy.get('input[name="firstName"]')
        .type("João Pedro")
        .should("have.value", "João Pedro");
      cy.get('input[name="firstName"]').clear().should("have.value", "");
      cy.get('input[name="lastName"]')
        .type("Xavier")
        .should("have.value", "Xavier");
      cy.get('input[name="lastName"]').clear().should("have.value", "");
      cy.get('input#email[name="email"]')
        .type("joao@tat.com")
        .should("have.value", "joao@tat.com");
      cy.get('input#email[name="email"]').clear().should("have.value", "");
      cy.get('input#phone[name="phone"]')
        .type("21999886655")
        .should("have.value", "21999886655");
      cy.get('input#phone[name="phone"]').clear().should("have.value", "");
    }),
    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
      cy.contains('button','Enviar').click();
      cy.get('span[class="error"]').should("be.visible");
      cy.get('span[class="error"]').contains("Valide os campos obrigatórios!");
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'João Pedro',
        lastName: 'Xavier',
        email: 'joao@tat.com',
        text: 'Teste.'
      }

      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('select#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('select#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('select#product')
      .select(1)
      .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[value="feedback"]')
      .check()
      .should('be.checked')
    });

    it('marca cada tipo de atendimento usando o .each e o .wrap', () => {
      cy.get('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
      .check()
      .should('be.checked')
      })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]').check(['phone', 'email'])
      cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get('input[name="firstName"]').type("João Pedro");
      cy.get('input[name="lastName"]').type("Xavier");
      cy.get('input#email[name="email"]').type("joao@tat.com");
      cy.get("input#phone-checkbox").check();
      cy.get('textarea[name="open-text-area"]').type(
        "Parabéns pelo curso, muito bom!",
        { delay: 0 }
      );
      cy.contains('button','Enviar').click();
      cy.get('span[class="error"]').should("be.visible");
    });

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/avatar.jpg')
      .should(input => {
        expect(input[0].files[0].name).to.equal('avatar.jpg')
      })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/avatar.jpg', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('avatar.jpg')
      })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('avatar.jpg').as('sampleFile')
      cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('avatar.jpg')
      })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target', '_blank')
      .click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    });
});
