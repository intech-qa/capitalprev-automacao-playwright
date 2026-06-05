import { test, expect }     from '@playwright/test';
import { CapitalPrevPage }  from './pages/CapitalPrevPage.ts';


  test('Informações do Titular - Validar campos obrigatórios', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    await passo01.abrirPagina();
    await passo01.continuar();
    await expect(page.getByText('Campo obrigatório')).toHaveCount(12);
    
  });

  test('Informações do Titular - Bloquear e-mail inválido', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    await passo01.abrirPagina();
    await passo01.preencherNome();
    await passo01.preencherCPF();
    await passo01.preencherDataNasc();
    await passo01.selecionarMasculino();
    await passo01.selecionarEstado();
    await passo01.preencherEmailInvalido();
    await passo01.preencherCelular();

    // Empregado, associado ou aposentado
    await passo01.copiarDados();
    await passo01.selecionarInstituidor();
    await passo01.continuar();
    await expect(page.locator('#NO_EMAIL')).toHaveJSProperty('validity.valid', false);
    
  });

