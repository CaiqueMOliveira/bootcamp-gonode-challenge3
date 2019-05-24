# Desafio 3

Você deve melhorar a aplicação de **Marketplace** com as seguintes funcionalidades:

- Armazene as intenções de compra (Purchase) no MongoDB criando um Model e salvando os dados da purchase no método `store` do PurchaseController;
- Crie uma nova rota para o vendedor aceitar uma intenção de compra declarando o item como vendido e a partir desse momento o anúncio não deve ser mais exibido nas listagens e não deve ser mais possível realizar uma intenção de compra para esse anúncio;
- O Ad deve possui um campo adicional chamado `purchasedBy` que armazena o ID da Purchase que o vendedor aceitou, caso esse campo esteja presente, quer dizer que o anúncio foi vendido;

<p align="center">
<img src="https://media0.giphy.com/media/Ie2Hs3A0uJRtK/giphy.gif?cid=790b76115cc2696532554f53733c635c&rid=giphy.gif" alt="challenge accepted">
</p>
