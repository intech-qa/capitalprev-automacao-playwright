# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CapitalPrev-Passo02.spec.ts >> Endereço - Bloquear CEP inválido
- Location: tests\CapitalPrev-Passo02.spec.ts:16:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText('CEP Inválido')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByText('CEP Inválido')
    23 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- main [ref=e6]:
  - generic [ref=e7]:
    - img "CapitalPrev" [ref=e10]
    - main [ref=e15]:
      - generic [ref=e17]:
        - img [ref=e19]
        - generic [ref=e21]:
          - generic [ref=e22]: Oops!
          - generic [ref=e23]: Algo deu errado!
        - button "Detalhes" [ref=e24]:
          - generic [ref=e25]: Detalhes
          - img [ref=e27]
    - generic [ref=e29]:
      - text: Versão 0.0.43
      - text: Versão API 0.2.11
```

# Test source

```ts
  1  | import { test, expect }     from '@playwright/test';
  2  | import { CapitalPrevPage }  from './pages/CapitalPrevPage.ts';
  3  | import { CapitalPrevPage2 }  from './pages/CapitalPrevPage2.ts';
  4  | 
  5  | 
  6  | test('Endereço - Validar campos obrigatórios', async ({ page }) => {
  7  |     const passo01 = new CapitalPrevPage(page);
  8  |     const passo02 = new CapitalPrevPage2(page);
  9  |     await passo01.abrirPagina();
  10 |     await passo01.preencherPasso01Completo();
  11 |     await passo01.continuar();
  12 |     await expect(page.getByText('Campo obrigatório')).toHaveCount(6);
  13 |   
  14 |   });  
  15 | 
  16 | test('Endereço - Bloquear CEP inválido', async ({ page }) => {
  17 |     const passo01 = new CapitalPrevPage(page);
  18 |     const passo02 = new CapitalPrevPage2(page);
  19 |     await passo01.abrirPagina();
  20 |     await passo01.preencherPasso01Completo();
  21 |     await passo02.preencherCEPInvalido();
  22 |     await passo02.consultarCEP();
> 23 |     await expect(page.getByText('CEP Inválido')).toHaveCount(1);
     |                                                  ^ Error: expect(locator).toHaveCount(expected) failed
  24 |   });
  25 | 
  26 |   
```