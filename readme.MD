# Sorveteria Hakuna Matata

## Repositório para fins de fixação dos estudos de clean architecture

  ****
  ### Estrutura de Pastas
  A estrutura de pastas será modular<br>
  Entidade -> app <br>
  Entidade -> domain -> entities<br>
  Entidade -> infra <br>

  ### Testes 
  Jest com Swc para acelerar o processamento dos testes<br>
  Instalação do jest dentro do container comando:<br> 
  - npm install jest @type/jest --save-dev
  - npx jest --init -> Iniciar a configuração do jest
  - npm install @swc/core @swc/jest --save-dev
  
  ****
  ## Até o momento

  ## Camada de domínio 
  <p>Criei uma pasta Entity com uma abstração que serve de modelo para criação para futuras entidades a serem criadas</p>

  <p>Criei uma pasta com value-objects como UUID e o Barcode até o momentos</p>

  <p>Pasta errors com erros personalizados</p>

  <p>Pasta validators ficam a abstração da class de validação juntamente com a classe de regras de validação e a classes que injeta a lib class-validator as classes de validação, de forma que a qualquer momento posso trocar a lib de validação sem muito esforço ou prejuízo para a aplicação</p>

  <p>Na pasta repository fica o arquivo classe de abstração com os contratos de repository servido de modelo para futuros repositórios a serem criados. <br>
  Também temos uma interface de InMemoryRepository, uma repository em memóry que irá facilitar muito os futuros testes do repositórios</p>

  ****
  ## Teste
  <p>Os testes unitário são sempre criados juntos com qualquer feature.</p>
  <p>Até o momento fiz poucos de testes de integração</p>

