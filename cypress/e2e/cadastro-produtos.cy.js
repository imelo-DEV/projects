describe('Painel de Cadastro & Teste de Status HTTP (E2E)', () => {

  beforeEach(() => {
    // Visita a aplicação local (certifique-se de que o servidor Node está rodando)
    cy.visit('http://localhost:3000/index.html');
  });

  it('Deve cadastrar um produto com sucesso (HTTP 201)', () => {
    // Preenche o formulário
    cy.get('#name').type('Monitor Gamer 144Hz');
    cy.get('#category').type('Periféricos');
    cy.get('#price').type('1200.00');
    
    // Seleciona token válido (Simula 201)
    cy.get('#authSim').select('valid');

    // Submete o formulário
    cy.get('button[type="submit"]').click();

    // Valida o status badge e o conteúdo da resposta JSON
    cy.get('#statusBadge').should('be.visible').and('contain', '201');
    cy.get('#jsonResponse').should('contain', 'Monitor Gamer 144Hz');
  });

  it('Deve exibir erro ao tentar cadastrar com campos vazios (HTTP 400)', () => {
    // Mantém campos vazios e envia
    cy.get('#authSim').select('valid');
    cy.get('button[type="submit"]').click();

    // Valida resposta HTTP 400
    cy.get('#statusBadge').should('be.visible').and('contain', '400');
    cy.get('#jsonResponse').should('contain', 'Requisição inválida');
  });

  it('Deve exibir erro de não autorizado sem token (HTTP 401)', () => {
    cy.get('#name').type('Mouse Sem Fio');
    cy.get('#category').type('Periféricos');
    cy.get('#price').type('80.00');
    
    // Seleciona "Sem Token"
    cy.get('#authSim').select('none');

    cy.get('button[type="submit"]').click();

    // Valida resposta HTTP 401
    cy.get('#statusBadge').should('be.visible').and('contain', '401');
    cy.get('#jsonResponse').should('contain', 'Token não fornecido');
  });

  it('Deve exibir erro de acesso proibido com token inválido (HTTP 403)', () => {
    cy.get('#name').type('Teclado RGB');
    cy.get('#category').type('Periféricos');
    cy.get('#price').type('250.00');
    
    // Seleciona token inválido
    cy.get('#authSim').select('invalid');

    cy.get('button[type="submit"]').click();

    // Valida resposta HTTP 403
    cy.get('#statusBadge').should('be.visible').and('contain', '403');
    cy.get('#jsonResponse').should('contain', 'Token sem permissão');
  });

  it('Deve exibir erro interno do servidor ao forçar checkbox (HTTP 500)', () => {
    cy.get('#name').type('Cadeira Gamer');
    cy.get('#category').type('Móveis');
    cy.get('#price').type('900.00');
    cy.get('#authSim').select('valid');

    // Marca o checkbox para forçar o erro 500
    cy.get('#sim500').check();

    cy.get('button[type="submit"]').click();

    // Valida resposta HTTP 500
    cy.get('#statusBadge').should('be.visible').and('contain', '500');
    cy.get('#jsonResponse').should('contain', 'Erro interno no servidor');
  });

});