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
    cy.get('#phone-checkbox').check()
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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('seleciona um produto aleatório', () => {
    cy.get('#product option')
      .its('length').then(n => {
        cy.get('#product').select(Cypress._.random(1, n-1)) //o indice 0 está desabilitado portando inicio a busca do índice 1
      })
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#email-checkbox')
      .check()
      .should('be.checked')
    cy.get('#phone-checkbox')
      .check()
      .should('be.checked')
    cy.get('#phone-checkbox')
      .uncheck()
      .should('not.be.checked') 
  })

  it('marca ambos checkboxes, depois desmarca o último 2', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exampleFile')
    cy.get('#file-upload')
      .selectFile('@exampleFile')
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

})
