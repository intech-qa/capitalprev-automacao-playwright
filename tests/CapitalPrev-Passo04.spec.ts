import { test, expect }     from '@playwright/test';
import { CapitalPrevPage }  from './pages/CapitalPrevPage.ts';
import { CapitalPrevPage2 }  from './pages/CapitalPrevPage2.ts';
import { CapitalPrevPage3 }  from './pages/CapitalPrevPage3.ts';
import { CapitalPrevPage4 }  from './pages/CapitalPrevPage4.ts';


test.beforeEach(async ({ page }) => {

    const passo01 = new CapitalPrevPage(page);
    const passo02 = new CapitalPrevPage2(page);
    const passo03 = new CapitalPrevPage3(page);

    await passo01.abrirPagina();
    await passo01.preencherPasso01Completo();
    await passo02.preencherPasso02Completo();
    await passo03.preencherPasso03Completo();
  });



test('Simulação - Deve exibir resumo da simulação', async ({ page }) => {
    const passo04 = new CapitalPrevPage4(page);

    await passo04.validarResumoSimulacao();
  
  });  

test('Simulação - Deve navegar entre períodos do gráfico', async ({ page }) => {
    const passo04 = new CapitalPrevPage4(page);

    await passo04.validarPeriodosGrafico();
  });

  