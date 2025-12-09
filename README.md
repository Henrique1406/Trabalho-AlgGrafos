# Alg Grafos 25.2 - Carrascos

Nosso trabalho tem a interface de um jogo que se passa no velho-oeste, onde o objetivo do jogador é viajar entre cidades e obter dinheiro vendendo e comprando produtos variados. Adaptamos a ideia da arbitragem financeira, que lida com ativos financeiros, para uma ideia mais interessante e um pouco mais complexa, pois agora temos custos de viagem e uma maior análise para obter o lucro. 

<img width="1493" height="773" alt="mapa" src="/mapa.png" />

Algoritmos/Conceitos usados: 
- Floyd Warshall: utilizando esse algoritmo, conseguimos, assim que geramos o mapa, obter as distâncias mínimas entre todos os pares de vértices(cidades).
- Programação Dinâmica: buscamos resolver o problema da mochila(Knapsack Problem), ou seja, maximizar o valor total dos itens dentro de um limite de capacidade(nosso inventário), decompondo sempre em subproblemas menores usando resultados já calculados para decidir se incluímos ou não determinado item. Vale lembrar que Floyd Warshall é usado aqui pois já estamos usando as distâncias mínimas para realizar a Rota do Informante.

Para o Front-End foi utilizado HTML, CSS e JavaScript.
Para o Back-End, usamos Node.js com Express.
Para o Banco de Dados, usamos o SQLite, que já é suficiente para carregar um saving simples com as informações do jogador.

Para rodar o projeto, certifique-se de ter o Node.js instalado!

1)Abra o arquivo pelo terminal

2)Execute esses comandos:

```bash
npm install
```
```bash
npm start
```

3)Acesse no navegador: http://localhost:5000

4)Bom jogo!
