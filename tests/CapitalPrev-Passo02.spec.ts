import { test, expect }     from '@playwright/test';
import { CapitalPrevPage }  from './pages/CapitalPrevPage.ts';
import { CapitalPrevPage2 }  from './pages/CapitalPrevPage2.ts';


test('Endereço - Validar campos obrigatórios', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo01.continuar();
    await expect(page.getByText('Campo obrigatório')).toHaveCount(6);
  
  });  

test('Endereço - Bloquear CEP inválido', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherCEPInvalido();
    await passo02.consultarCEP();
    await expect(page.getByText('CEP Inválido')).toHaveCount(1);
  });

  