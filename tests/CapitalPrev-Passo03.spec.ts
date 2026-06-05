import { test, expect }     from '@playwright/test';
import { CapitalPrevPage }  from './pages/CapitalPrevPage.ts';
import { CapitalPrevPage2 }  from './pages/CapitalPrevPage2.ts';
import { CapitalPrevPage3 }  from './pages/CapitalPrevPage3.ts';


test('Contribuição - Bloquear valor mensal menor que R$ 100,00', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    const passo03 = new CapitalPrevPage3(page);

    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherPasso02Completo();

    await passo03.preencherValorInvalido();
    await passo03.preencherValorInicial();
    await passo03.continuar();
    await expect(page.getByText('Contribuição mínima de R$ 100,00')).toHaveCount(1);
  
  });  

test('Contribuição - Pagamento com cartão de débito', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    const passo03 = new CapitalPrevPage3(page);

    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherPasso02Completo();

    await passo03.preencherValor();
    await passo03.preencherValorInicial();
    await passo03.selecionarDebito();
    await passo03.preencherDadosBancarios();
    await passo03.preencherCPF();
    await passo03.continuar();
    await passo03.validarRedirecionamento04();
  });

test('Contribuição - Pagamento com Desconto em Folha', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    const passo03 = new CapitalPrevPage3(page);

    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherPasso02Completo();

    await passo03.preencherValor();
    await passo03.preencherValorInicial();
    await passo03.selecionarFolha();
    await passo03.continuar();
    await passo03.validarRedirecionamento04();
  });

test('Contribuição -  Validar campos obrigatórios', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    const passo03 = new CapitalPrevPage3(page);

    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherPasso02Completo();
    await passo03.selecionarDebito();
    await passo03.continuar();
    await expect(page.getByText('Campo obrigatório')).toHaveCount(4);
  });

test('Contribuição -  Validar CPF inválido', async ({ page }) => {
    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    const passo03 = new CapitalPrevPage3(page);

    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherPasso02Completo();

    await passo03.preencherValor();
    await passo03.preencherValorInicial();
    await passo03.selecionarDebito();
    await passo03.preencherDadosBancarios();
    await passo03.preencherCPFInvalido();
    await passo03.continuar();
    await expect(page.getByText('CPF inválido')).toHaveCount(1);
  });



  