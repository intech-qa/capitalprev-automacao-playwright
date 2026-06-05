import { Page, Locator, expect } from '@playwright/test';

// ADESÃO - ENDEREÇO DO TITULAR DO PLANO
export class CapitalPrevPage2 {
  readonly page: Page;

  readonly campoCEP:            Locator;
  readonly botaoConsultarCEP:   Locator;
  readonly campoEndereco:       Locator;
  readonly campoNumero:         Locator;
  readonly campoComplemento:    Locator;
  readonly campoBairro:         Locator;
  readonly botaoContinuar:      Locator;
  readonly tituloContribuicao:  Locator; 

  constructor(page: Page) {
    this.page                = page;
    this.campoCEP            = page.locator('#NR_CEP');
    this.botaoConsultarCEP   = page.getByRole('button', { name: 'Consultar' });
    this.campoEndereco       = page.locator('#DS_ENDERECO');
    this.campoNumero         = page.locator('#NR_ENDERECO');
    this.campoComplemento    = page.locator('#DS_COMPLEMENTO');
    this.campoBairro         = page.locator('#NO_BAIRRO');
    this.botaoContinuar      = page.getByRole('button', { name: 'Continuar' });
    this.tituloContribuicao  = page.getByText('Contribuição', { exact: true });
  }

  async abrirPagina() {
    await this.page.goto('https://webhmg.intech.com.br/capitalprev/adesao/#/passo-1');
  }

  async preencherCEP() {
    await this.campoCEP.fill('29010035');
  }

  async preencherCEPInvalido() {
    await this.campoCEP.fill('000000');
  }

  async consultarCEP() {
    await this.botaoConsultarCEP.click();
  }

  async continuar() {
    await this.botaoContinuar.click();
  }

  async validarPreenchimento() {
    await expect(this.campoEndereco).not.toHaveValue('');
    await expect(this.campoBairro).not.toHaveValue('');
    await expect(
    this.page.getByRole('combobox').filter({ hasText: 'ESPIRITO SANTO' })).toBeVisible();
    await expect(this.page.getByRole('combobox').filter({ hasText: 'VITORIA' })).toBeVisible();
  }

  async preencherNumero() {
    await this.campoNumero.fill('0000');
  }

async validarTituloContribuicao() {
  await expect(this.tituloContribuicao).toBeVisible();
}

async preencherPasso02Completo() {
    // PASSO 02 - ENDEREÇO DO TITULAR DO PLANO
    await this.preencherCEP();
    await this.consultarCEP();
    // Valida se endereço, bairro, estado e cidade vieram automaticamente
    await this.validarPreenchimento();
    await this.preencherNumero();
    await this.continuar();
    await this.validarTituloContribuicao()

  }


  
}

