import { Page, Locator, expect } from '@playwright/test';

// ADESÃO - CONTRIBUIÇÃO
export class CapitalPrevPage4 {
  readonly page: Page;
  readonly cardSaldoProjetado: Locator;
  readonly cardTotalInvestido: Locator;
  readonly cardRendimento: Locator;
  readonly checkboxTermo: Locator;
  readonly botaoContinuar: Locator;
  readonly grafico: Locator;
  readonly periodo12Meses: Locator;
  readonly periodo6Meses: Locator;
  readonly periodo3Meses: Locator;


  constructor(page: Page) {
    this.page                 = page;
    this.cardSaldoProjetado = page.getByText('Saldo projetado', { exact: true });
    this.cardTotalInvestido = page.getByText('Total investido', { exact: true });
    this.cardRendimento = page.getByText('Rendimento', { exact: true });
    this.checkboxTermo        = page.locator('#termo');
    this.botaoContinuar       = page.getByRole('button', { name: 'Continuar' });
    this.grafico = page.locator('canvas, svg').first();
    this.periodo12Meses = page.getByText('12 meses', { exact: true });
    this.periodo6Meses = page.getByText('6 meses', { exact: true });
    this.periodo3Meses = page.getByText('3 meses', { exact: true });

  }

  async marcarTermo() {
  await this.checkboxTermo.check();
}

  async continuar() {
    await this.botaoContinuar.click();
  }

  async preencherPasso04Completo() {
    await this.marcarTermo();
    await this.continuar();

  }

  async validarResumoSimulacao() {
    await expect(this.cardSaldoProjetado).toBeVisible();
    await expect(this.cardTotalInvestido).toBeVisible();
    await expect(this.cardRendimento).toBeVisible();
  }

  async validarPeriodosGrafico() {
    await this.periodo12Meses.click();
    await expect(this.cardSaldoProjetado).toBeVisible();
    await this.periodo6Meses.click();
    await expect(this.cardSaldoProjetado).toBeVisible();
    await this.periodo3Meses.click();
    await expect(this.cardSaldoProjetado).toBeVisible();
  }
  
}

