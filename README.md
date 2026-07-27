# 🚀 QA Automation Suite - API & E2E Testing Lab

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Este é um laboratório de testes completo (Full-Stack QA) desenvolvido para validar regras de negócio e diferentes cenários de Status Codes HTTP (200, 201, 204, 400, 401, 403, 404, 500). 

O projeto conta com uma API Mockada em Node.js, uma interface interativa com Tailwind CSS, automação de interface E2E com Cypress e uma suíte robusta de testes de API no Postman.

## 🎯 Arquitetura do Projeto

* **Backend (API):** Desenvolvido em Node.js com Express para simular o banco de dados em memória e as validações de autorização via JWT (Bearer Token dinâmico).
* **Frontend (UI):** Interface limpa simulando um painel de dev/QA, validando respostas e cores dinâmicas baseadas no HTTP Status.
* **Automação E2E (Cypress):** Cobertura completa de fluxos de sucesso e exceções na interface, simulando as ações reais do usuário.
* **Testes de Contrato e API (Postman):** Coleção de testes validando os retornos JSON e a segurança dos endpoints, com gestão de token em variáveis de ambiente.

## 🛠️ Como executar o projeto localmente

### 1. Clonar e Instalar dependências
```bash
git clone [https://github.com/SEU-USUARIO/qa-automation-suite.git](https://github.com/SEU-USUARIO/qa-automation-suite.git)
cd qa-automation-suite
npm install