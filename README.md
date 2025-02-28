# 📌 Documentação do Projeto

## 📖 Visão Geral
Este projeto consiste em uma API desenvolvida para o gerenciamento de concursos e candidatos. Permitindo a importação de arquivos, o armazenamento seguro dos dados em um banco PostgreSQL e a disponibilização de endpoints REST para consultas, abrangendo tanto os dados extraídos de arquivos .txt quanto aqueles armazenados no banco de dados.

## 📑 Índice  

- [📖 Visão Geral](#-visão-geral)
- [📖 Check List do Desafio](#-check-list-do-desafio)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)  
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)  
- [🔧 Configuração e Execução](#-configuração-e-execução)  
- [🔍 Testes e Qualidade de Código](#-testes-e-qualidade-de-código)  
- [🛠️ CI/CD](#-cicd)  
- [📌 Endpoints da API](#-endpoints-da-api)  
- [📜 Licença](#-licença)  
- [📞 Contato](#-contato)  


## 📖 Check List do Desafio.
### A automação deve Realizar:
- **Executar os testes automatizados** ✅
- **Verificar a qualidade do código** ✅
- **Quebrar o CI quando os testes falharem ou quando a qualidade for menor de 80%** ✅
- **Registrar o docker do software no Github Package** ✅
### Avaliação:
- **Legibilidade do Código** ✅
- **Documentação do código** ✅
- **Documentação da solução** ✅
- **Implementar testes unitários** ✅
- **Implementar integração com Github Action** ✅
- **Implementar integração com Github Action + SonarQube** ✅
- **Implementar usando Docker** ✅
  ### Diferenciais:
- **Criar um serviço com o problema** ✅
- **Utilizar banco de dados** ✅
- **Implementar Clean Code** ✅
- **Implementar o padrão de programação da tecnologia escolhida** ✅
- **Implementar testes comportamentais** ✅
- **Usar tecnologias de IaC (Terraform, ansible, HelmChart, etc)** ❌ Meu cartão de crédito foi bloqueado 😢
---

## 🚀 Tecnologias Utilizadas
- **Node.js** com Express.js para criação da API
- **eslint** para padronização e qualidade do código
- **PostgreSQL** como banco de dados
- **Docker** para containerização
- **GitHub Actions** para CI/CD
- **SonarQube** para análise de qualidade do código
- **Jest** para testes automatizados e garantia de qualidade

---

## 📂 Estrutura do Projeto
```
/
├── .github/workflows/
│   │   │   ├── ci-cd.yml  # Pipeline de CI/CD
├── database/
│   ├── init.sql # código de criação das tabelas do Banco de Dados
├── src/
│   ├── config/
│   │   ├── database.js  # Configuração do PostgreSQL
│   ├── controllers/
│   │   ├── candidato_BD_Controller.js  # Controlador de candidatos no BD
│   │   ├── candidatoFileController.js  # Controlador de candidatos via arquivo .txt
│   │   ├── concurso_BD_Controller.js  # Controlador dos concursos no BD
│   │   ├── concursoFileController.js  # Controlador dos concursos via arquivo .txt
│   │   ├── importarDadosController.js  # Controlador da importação de dados
│   ├── models/
│   │   ├── candidatoModel.js  # model do candidato
│   │   ├── concursoModel.js  # model do concurso
│   ├── routes/
│   │   ├── candidatoRoutes.js  # rota de acesso aos controllers do candidato
│   │   ├── concursoRoutes.js  # rota de acesso aos controllers do concurso
│   │   ├── importarDadosRoutes.js  # rota de acesso aos controllers de importação
│   ├── services/
│   │   ├── candidatoBD.js  # Serviço de gestão de candidatos no BD
│   │   ├── candidatoFile.js  # Serviço de processamento de candidatos via arquivo
│   │   ├── concursoBD.js  # Serviço de gestão de concursos no BD
│   │   ├── concursoFile.js  # Serviço de processamento de concursos via arquivo
│   │   ├── importarDados.js  # Serviço de importação de dados
│   ├── utils/
│   │   ├── funcoes.js  # Funções utilitárias
│   ├── app.js # app do projeto
│   ├── server.js # server do projeto
├── tests/
│   ├── candidatoBD.test.js  # Teste Comportamental
│   ├── candidatoFile.test.js  # Teste Comportamental
│   ├── concursoBD.test.js  # Teste Comportamental
│   ├── concursoFile.test.js  # Teste Comportamental
│   ├── fileReader.test.js  # Testes unitários
│   ├── formatarData.test.js  # Teste unitário
├── candidato.txt # dados .txt dos candidatos
├── concurso.txt # dados .txt dos concursos
├── Dockerfile  # Configuração do Docker
├── eslint.config.mjs  # Configuração do eslint
├── sonar-project.properties  # Configuração do SonarQube
├── package-lock.json  # Dependências do projeto
└── package.json  # Dependências do projeto
```

---

## 🔧 Configuração e Execução

### 📌 Configuração do Ambiente
### 1. **Clone o repositório:**
   ```sh
   git clone https://github.com/Toiste/venhaparaoleds-devops.git
   cd venhaparaoleds-devops
   ```
### 2. **Instale as dependências:**
   ```sh
   npm install
   ```
### 3 **Passo a passo para criar e configurar o Banco de Dados. | Etapa Opcional**
#### 3.1 **Crie uma imagem pro banco de dados com Docker:**
   ```sh
   docker pull postgres:latest
   ```
#### 3.2 **Crie e rode o Container pro banco de dados com Docker:**
   ```sh
   docker run --name meu-postgres -e POSTGRES_USER=meu_usuario -e POSTGRES_PASSWORD=minha_senha -e POSTGRES_DB=meu_banco -p 5432:5432 -d postgres
   ```

### 4 **Configure as variáveis de ambiente:**
   edite o arquivo `.env example` renomeie para `.env` e defina os valores referentes ao seu banco, exemplo:
   ```sh
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=postgres
   DB_PASSWORD=senha
   DB_PORT=5432
   ```

### 5 **Execute a API:**
   ```sh
   npm run server
   ```

---

## 🔍 Testes e Qualidade de Código

📌 candidatoFile.test.js

O que esse teste cobre?
- ✅ Garante que um CPF válido retorna os concursos corretos
- ✅ Testa um CPF que não tem concursos compatíveis
- ✅ Verifica um candidato com múltiplas profissões e se ele retorna todos os concursos adequados
- ✅ Mocka o readFileCandidatos para não precisar de um arquivo real

📌 concursoFile.test.js

O que esse teste cobre?
- ✅ Verifica se retorna os candidatos corretos para um concurso válido
- ✅ Testa um código de concurso inexistente (deve retornar um array vazio)
- ✅ Garante que apenas candidatos aptos, de acordo com as profissões exigidas, são retornados
- ✅ Mocka readFileConcursos para evitar dependência de arquivos reais

📌 candidatoBD.test.js

O que esse teste cobre?
- ✅ Garante que um CPF válido retorna os concursos corretos
- ✅ Testa um CPF que não tem concursos compatíveis
- ✅ Verifica se todas as vagas de um concurso são retornadas, não apenas as compatíveis com o candidato
- ✅ Mocka o pool.query para evitar consultas reais ao banco de dados
- ✅ Testa se a função trata corretamente um erro na consulta ao banco

📌 candidatoBD.test.js

O que esse teste cobre?

- ✅ Verifica se um CPF válido retorna os concursos corretos
- ✅ Garante que a consulta ao banco de dados é chamada corretamente com o CPF fornecido
- ✅ Testa um CPF que não possui concursos associados e espera uma lista vazia como retorno
- ✅ Simula um erro na query do banco de dados e verifica se a exceção é tratada corretamente
- ✅ Mocka a função pool.query para evitar chamadas reais ao banco de dados

📌 fileReader.test.js

O que esse teste cobre?

- ✅ Verifica se o arquivo de candidatos é lido e processado corretamente
- ✅ Verifica se o arquivo de concursos é lido e processado corretamente
- ✅ Garante que um arquivo vazio retorna um array vazio
- ✅ Testa a manipulação de entradas inválidas e garante que o retorno é adequado
- ✅ Cria e remove arquivos temporários para garantir um ambiente de teste isolado

📌 formatarData.test.js

O que esse teste cobre?

- ✅ Garante que a conversão de datas no formato "DD/MM/YYYY" para "YYYY-MM-DD" funciona corretamente
- ✅ Verifica diferentes datas para assegurar a consistência da formatação
- ✅ Garante que um erro é lançado para formatos de data inválidos
- ✅ Testa o comportamento da função ao receber uma string vazia

### ✅ Executar Testes Automatizados
```sh
npm test
```

### 📊 Análise local de Qualidade com SonarQube
```sh
$env:SONAR_TOKEN="seu_token"
npx sonarqube-scanner
```

---

## 🛠️ CI/CD
O projeto possui um pipeline configurado no **GitHub Actions**:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    name: Build and Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Instalar dependências
        run: npm install

      - name: Executar testes
        run: npm test

  sonar:
    needs: build
    name: Verificar qualidade do código
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Instalar dependências
        run: npm install

      - name: Analisar com SonarQube
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        run: |
          npx sonarqube-scanner \
            -Dsonar.projectKey=Toiste_venhaparaoleds-devops \
            -Dsonar.organization=toiste \
            -Dsonar.host.url=https://sonarcloud.io \
            -Dsonar.sources=src \
            -Dsonar.exclusions=**/node_modules/**, **/*.spec.js

      - name: Quebrar pipeline se qualidade for menor que 80%
        run: |
          QUALITY=$(curl -s -u ${{ secrets.SONAR_TOKEN }}: \
            "https://sonarcloud.io/api/qualitygates/project_status?projectKey=Toiste_venhaparaoleds-devops" \
            | jq -r '.projectStatus.status')

          if [ "$QUALITY" != "OK" ]; then
            echo "Qualidade abaixo do esperado. CI interrompido."
            exit 1
          fi

  deploy:
    needs: sonar
    name: Publicar no GitHub Packages
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Login no GitHub Packages
        run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u $GITHUB_ACTOR --password-stdin

      - name: Construir imagem Docker
        run: |
          REPO_NAME=$(echo "${{ github.repository }}" | tr '[:upper:]' '[:lower:]')
          docker build -t ghcr.io/$REPO_NAME/api:latest .



      - name: Publicar imagem no GitHub Packages
        run: |
          REPO_NAME=$(echo "${{ github.repository }}" | tr '[:upper:]' '[:lower:]')
          docker push ghcr.io/$REPO_NAME/api:latest

```
**O Código foi feito com os Seguintes Objetivos:**

1. **Executar testes automatizados**
2. **Analisar a qualidade do código com SonarQube**
3. **Quebrar a pipeline se os testes falharem ou a qualidade for menor que 80%**
4. **Publicar a imagem do Docker no GitHub Packages**

---

## 📌 Endpoints da API

### 📍 **Listar Candidatos por Código do Concurso**
#### Endpoint de pesquisa dos Arquivos .txt
```http
GET /concursos/:codigo
```
#### Exemplo de Resposta:
```json
[
  {
    "nome": "Darren Shields",
    "dataNascimento": "15/07/1980",
    "cpf": "125.478.963-12",
    "profissoes": [
      "carpinteiro",
      "professor de matemática"
    ]
  }
]

```

### 📍 **Listar Candidatos por Código do Concurso**
#### Endpoint de pesquisa do banco de dados
```http
GET /concursos/bd/:codigo
```
#### Exemplo de Resposta:
```json
[
  {
    "nome": "Darren Shields",
    "dataNascimento": "15/07/1980",
    "cpf": "125.478.963-12",
    "profissoes": [
      "carpinteiro",
      "professor de matemática"
    ]
  }
]
```

### 📍 **Listar Concursos por CPF**
#### Endpoint de pesquisa dos Arquivos .txt
```http
GET /candidatos/:cpf
```
#### Exemplo de Resposta:
```json
[
  {
    "orgao": "SEDU",
    "edital": "3/2018",
    "codigo": "54837291012",
    "vagas": ["carpinteiro","analista de sistemas","marceneiro"]
  }
]

```

### 📍 **Listar Concursos por CPF**
#### Endpoint de pesquisa do banco de dados
```http
GET /candidatos/bd/:cpf
```
#### Exemplo de Resposta:
```json
[
  {
    "orgao": "SEDU",
    "edital": "3/2018",
    "codigo": "54837291012",
    "vagas": ["carpinteiro","analista de sistemas","marceneiro"]
  }
]
```

---

## 📜 Licença
Este projeto está sob a Licença MIT.

---

## 📞 Contato
- **Desenvolvedor:** Marllon Ribeiro
- **GitHub:** [github.com/Toiste](https://github.com/Toiste)
- **E-mail:** marllon.ribeiro027@gmail.com
