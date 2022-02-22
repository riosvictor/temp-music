Para executar a aplicação

1. instalar as dependencias do projeto
    
    `yarn`
2. executar a aplicação
  
    `yarn start`
3. endpoints acessíveis
  
    GET: `http://localhost:3000/playlist`

    * Foi utilizado query params para o recebimento dos parametros
    

    Exemplos:
      - http://localhost:3000/playlist?longitude=12&latitude=14
      - http://localhost:3000/playlist
      - http://localhost:3000/playlist?longitude=12222&latitude=14
      - http://localhost:3000/playlist?city=feira%20de%20santana
      - http://localhost:3000/playlist?city=london
      - http://localhost:3000/playlist?city=ponta%20grossa

  4.  testes unitários automatizados com cobertura
        
        `yarn test:cov`




Considerações:
  * o ideal seria colocar as secrets e tokens em um arquivo .env, mas estou formalizando aqui que deixei assim por questões de teste
  * seria ideal tbm criar mocks para simular o retorno das APIs externas para testar a variação da temperatura, e validar essa lógica que é 'inteligência' da aplicação
  * o projeto não teve uma cobertura muito alta devido as integrações externas e arquivos de configuração do NestJS, mas isso pode ser desenvolvido posteriormente

  