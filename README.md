# 🤖 CapitalPrev — Automação de Testes com Playwright

![Playwright](https://img.shields.io/badge/Playwright-TypeScript-blue?logo=playwright)
![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/Licença-Privado-red)

Projeto de automação de testes end-to-end (E2E) do portal **CapitalPrev**, desenvolvido com [Playwright](https://playwright.dev/) e TypeScript, seguindo o padrão **Page Object Model (POM)**.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Cenários Automatizados](#cenários-automatizados)
- [Relatórios](#relatórios)

---

## 📌 Sobre o Projeto

Este projeto automatiza o fluxo de **Adesão** do portal CapitalPrev, cobrindo os 4 passos do processo:

| Passo | Descrição |
|-------|-----------|
| Passo 01 | Informações Pessoais do Titular |
| Passo 02 | Endereço do Titular do Plano |
| Passo 03 | Contribuição e Dados Bancários |
| Passo 04 | Simulação e Confirmação |

O objetivo é garantir a qualidade do fluxo de adesão, validando tanto o **caminho feliz** quanto os **cenários de erro**, como campos obrigatórios, CPF inválido, CEP inválido e datas incorretas.

---

## 🛠 Tecnologias

- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/) — framework de automação E2E
- [TypeScript](https://www.typescriptlang.org/)
- [Allure Report](https://docs.qameta.io/allure/) — relatórios de execução

---

## 📁 Estrutura do Projeto

```
CAPITALPREV-AUTOMACAO-PLAYWRIGHT/
├── .github/                        # Configurações CI/CD (GitHub Actions)
├── allure-report/                  # Relatório Allure gerado
├── allure-results/                 # Resultados brutos do Allure
├── playwright-report/              # Relatório HTML do Playwright
├── test-results/                   # Artefatos de execução (screenshots, vídeos)
├── tests/
│   ├── fixtures/                   # Dados e configurações reutilizáveis
│   ├── pages/                      # Page Objects (POM)
│   │   ├── CapitalPrevPage.ts      # Passo 01 - Informações Pessoais
│   │   ├── CapitalPrevPage2.ts     # Passo 02 - Endereço
│   │   ├── CapitalPrevPage3.ts     # Passo 03 - Contribuição
│   │   └── CapitalPrevPage4.ts     # Passo 04 - Simulação
│   ├── CapitalPrev-FluxoCompleto.spec.ts
│   ├── CapitalPrev-Passo01.spec.ts
│   ├── CapitalPrev-Passo02.spec.ts
│   ├── CapitalPrev-Passo03.spec.ts
│   └── CapitalPrev-Passo04.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
```

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Git](https://git-scm.com/)
- Acesso à URL de homologação: `https://webhmg.intech.com.br/capitalprev/adesao/`

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/intech-qa/capitalprev-automacao-playwright.git

# Acesse a pasta do projeto
cd capitalprev-automacao-playwright

# Instale as dependências
npm install

# Instale os browsers do Playwright
npx playwright install
```

---

## ▶️ Como Executar

```bash
# Executar todos os testes
npx playwright test

# Executar um arquivo específico
npx playwright test tests/CapitalPrev-Passo01.spec.ts

# Executar com interface visual (modo headed)
npx playwright test --headed

# Executar e abrir relatório HTML
npx playwright test --reporter=html
npx playwright show-report

# Gerar e abrir relatório Allure
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🧪 Cenários Automatizados

### Fluxo Completo
| # | Cenário | Tipo |
|---|---------|------|
| 01 | Adesão completa do passo 01 ao 04 | Positivo |

### Passo 01 — Informações do Titular
| # | Cenário | Tipo |
|---|---------|------|
| 01 | Validar campos obrigatórios | Negativo |
| 02 | Bloquear e-mail inválido | Negativo |
| 03 | CPF inválido | Negativo |
| 04 | CPF com menos de 11 dígitos | Negativo |
| 05 | Data de nascimento futura | Negativo |
| 06 | Data de nascimento inexistente | Negativo |
| 07 | Inserção manual via calendário | Positivo |

### Passo 02 — Endereço
| # | Cenário | Tipo |
|---|---------|------|
| 01 | Validar campos obrigatórios | Negativo |
| 02 | Bloquear CEP inválido | Negativo |

### Passo 03 — Contribuição
| # | Cenário | Tipo |
|---|---------|------|
| 01 | Bloquear valor mensal menor que R$ 100,00 | Negativo |
| 02 | Pagamento com cartão de débito | Positivo |
| 03 | Pagamento com desconto em folha | Positivo |
| 04 | Validar campos obrigatórios | Negativo |
| 05 | CPF de correntista inválido | Negativo |

### Passo 04 — Simulação
| # | Cenário | Tipo |
|---|---------|------|
| 01 | Exibir resumo da simulação | Positivo |
| 02 | Navegar entre períodos do gráfico | Positivo |


**Total: 16 cenários automatizados**

---

## 📊 Relatórios

Após a execução, os relatórios ficam disponíveis em:

- **Playwright HTML:** `playwright-report/index.html`
- **Allure Report:** `allure-report/index.html`

Para abrir o relatório Playwright:
```bash
npx playwright show-report
```

---

## 👤 Autor

**Marco Figueiredo**
QA Engineer — INTECH Soluções em Previdência
📧 marco.junio@intech.com.br
🔗 [github.com/marcofigueiredo2001](https://github.com/marcofigueiredo2001)
