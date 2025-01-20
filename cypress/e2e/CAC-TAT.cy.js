describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('teste solicitação de ajuda, digitando texto comprido para o exercício extra 1, obrigada', 10)

    cy.get('#firstName').type('Tulani')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('tulanics@yahoo.com')
    cy.get('#open-text-area').type(longText, { delay:0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Tulani')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('tulanics@yahoo.com')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('verifica se o campo de telefone só aceita números', () => {
    cy.get('#phone').type('abcd')

    cy.get('#phone').should('not.have.value', 'abc')
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Tulani')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('tulanics@yahoo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('[for="phone-checkbox"]').click()
    cy.get('button[type="submit"]').click()


    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Tulani')

      .should('have.value', 'Tulani')
      .clear()

      .should('have.value', '')
    cy.get('#lastName')
      .type('Silva')

      .should('have.value', 'Silva')

      .clear()

      .should('have.value', '')
    cy.get('#email')
      .type('tulanics@yahoo.com')

      .should('have.value', 'tulanics@yahoo.com')

      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('8299999999')

      .should('have.value', '8299999999')
      
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado, recebe objeto como argumento', () => {
    const data = {
      firstName: 'Tulani',
      lastName: 'Silva',
      email: 'tulanics@yahoo.com',
      text: 'teste de comando customizado com objeto'
    }
    cy.fillMandatoryFieldsAndSubmit2(data);

    cy.get('.success').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado, recebe objeto como argumento usando valores padrões ', () => {
    cy.fillMandatoryFieldsAndSubmit3();

    cy.get('.success').should('be.visible')
  })
})
