
describe('Teste de Login com varios usuarios', () => {
    // 1. A variável 'users' deve ser declarada aqui, no escopo do 'describe'.
    // Isso garante que ela seja acessível para todos os testes dentro deste bloco.
    const users = [
        'standard_user',
        'locked_out_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user'
    ];
    
    // A senha
    const password = 'secret_sauce';

    beforeEach(() => {
         // Maximiza a janela para uma resolução Full HD antes de cada teste
        cy.viewport(1920, 1080);
        cy.visit('https://www.saucedemo.com/');
    });

    // 2. Agora, 'users' está definida e pode ser usada no loop
    users.forEach(username => {
        it(`deve tentar fazer login com o usuário: ${username}`, () => {
            cy.get('[data-test="username"]').type(username);
            cy.get('[data-test="password"]').type(password);
            cy.get('[data-test="login-button"]').click();
            if (username === 'locked_out_user') {
                cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
            } else {
                cy.url().should('include', '/inventory.html');
                cy.get('.app_logo').should('be.visible');
            }
        });
    });
});


describe('Adicionar Vários Itens ao Carrinho', () => {

    const productsToAdd = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket'
        // Adicione outros produtos da lista aqui, se necessário
    ];

    beforeEach(() => {
        // Faz o login antes de cada teste
         // Maximiza a janela para uma resolução Full HD antes de cada teste
        cy.viewport(1920, 1080);
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
    });

    it('deve adicionar múltiplos itens ao carrinho e verificar o contador', () => {
        // Variável para armazenar o número de itens adicionados
        let itemCount = 0;

        // Itera sobre a lista de produtos e os adiciona ao carrinho
        productsToAdd.forEach(productName => {
            // Usa o nome do produto para encontrar o contêiner e, em seguida, o botão 'Add to cart'
            cy.contains('.inventory_item', productName)
                .find('[data-test^="add-to-cart"]')
                .click();
            
            // Incrementa o contador de itens a cada clique
            itemCount++;

            // Verifica se o contador do carrinho no cabeçalho é atualizado corretamente
            cy.get('.shopping_cart_badge')
                .should('have.text', itemCount.toString());
        });

        // Opcional: Vai para o carrinho para verificar os itens adicionados
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // Verifica se todos os itens da lista estão no carrinho
        productsToAdd.forEach(productName => {
            cy.contains('.cart_item_label', productName).should('exist');
        });
    });
});


describe('Remover todos os itens do carrinho', () => {

    beforeEach(() => {
        // Antes de cada teste, vamos garantir que o item está no carrinho.
        // Adicione o código para fazer login e adicionar o item ao carrinho.
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_link').click(); // Navega para o carrinho
    });

    it('deve clicar no botão "Remove" para o Sauce Labs Backpack', () => {
        // Clica no botão 'Remove' específico para o item 'Sauce Labs Backpack'
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();

        // Opcional: Verifique se o item foi removido.
        // O elemento não deve mais existir na página.
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist');
    });

});

















