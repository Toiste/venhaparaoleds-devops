# 📌 Documentação do Projeto

## 📖 Visão Geral
Este projeto consiste em uma API desenvolvida para o gerenciamento de concursos e candidatos. Permitindo a importação de arquivos, o armazenamento seguro dos dados em um banco PostgreSQL e a disponibilização de endpoints REST para consultas, abrangendo tanto os dados extraídos de arquivos .txt quanto aqueles armazenados no banco de dados.

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
1. **Clone o repositório:**
   ```sh
  git clone https://github.com/Toiste/venhaparaoleds-devops.git
  cd venhaparaoleds-devops
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
**Passo a passo para criar e configurar o Banco de Dados / Etapa Opcional**
3. **Crie uma imagem pro banco de dados com Docker:**
   ```sh
   docker pull postgres:latest
   ```

**Crie e rode o Container pro banco de dados com Docker:**
   ```sh
   docker run --name meu-postgres -e POSTGRES_USER=meu_usuario -e POSTGRES_PASSWORD=minha_senha -e POSTGRES_DB=meu_banco -p 5432:5432 -d postgres
   ```
  ### explicação do comando
  ```sh
  --name meu-postgres → Nome do container.
  -e POSTGRES_USER=meu_usuario → Define o usuário do banco.
  -e POSTGRES_PASSWORD=minha_senha → Define a senha do banco.
  -e POSTGRES_DB=meu_banco → Nome do banco de dados que será criado automaticamente.
  -p 5432:5432 → Mapeia a porta local 5432 para a do container.
  -d postgres → Roda o container em segundo plano com a imagem postgres.

  ```

4. **Configure as variáveis de ambiente:**
   edite o arquivo `.env example` renomeie para `.env` e defina os valores referentes ao seu banco, exemplo:
   ```sh
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=postgres
   DB_PASSWORD=senha
   DB_PORT=5432
   ```

5. **Execute a API:**
   ```sh
   npm run server
   ```

---

## 🔍 Testes e Qualidade de Código

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
O projeto possui um pipeline configurado no **GitHub Actions** para:
1. **Executar testes automatizados**
2. **Analisar a qualidade do código com SonarQube**
3. **Quebrar a pipeline se os testes falharem ou a qualidade for menor que 80%**
4. **Publicar a imagem do Docker no GitHub Packages**

---

## 📌 Endpoints da API

### 📍 **Listar Concursos por CPF**
#### Endpoint de pesquisa dos Arquivos .txt
```http
GET /concursos/:codigo
```
#### Resposta:
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
#### Resposta:
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
GET /concursos/bd/:codigo
```
#### Resposta:
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
#### Endpoint de pesquisa do banco de dados
```http
GET /candidatos/bd/:cpf
```
#### Resposta:
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