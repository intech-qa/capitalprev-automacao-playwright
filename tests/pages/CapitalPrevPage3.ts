import { Page, Locator, expect } from '@playwright/test';


// ADESÃO - CONTRIBUIÇÃO
export class CapitalPrevPage3 {
  readonly page: Page;
  readonly campoValor: Locator;
  readonly campoValorInicial: Locator;
  readonly botaoContinuar: Locator;
  readonly campoAgencia: Locator;
  readonly campoConta: Locator;
  readonly campoNomeCorrentista: Locator;
  readonly campoCpfCorrentista: Locator;
  readonly selectDebito: Locator;
  readonly selectFolha: Locator; 


  constructor(page: Page) {
    this.page                         = page;
    this.campoValor                   = page.locator('#CONTRIB_BASICA');
    this.campoValorInicial            = page.locator('#valorAporte');
    this.botaoContinuar               = page.getByRole('button', { name: 'Continuar' });
    this.campoAgencia                 = page.locator('#CD_AGENCIA');
    this.campoConta                   = page.locator('#NR_CC');
    this.campoNomeCorrentista         = page.locator('#NOME_CORRENTISTA');
    this.campoCpfCorrentista          = page.locator('#CPF_CORRENTISTA ');
    this.selectDebito                 = page.locator('#root > div > div > div > main > div > div:nth-child(3) > div > form > div:nth-child(2) > div:nth-child(3) > label > input');
    this.selectFolha                  = page.locator('#root > div > div > div > main > div > div:nth-child(3) > div > form > div:nth-child(2) > div:nth-child(4) > label > input')
  }

  async preencherValor() {
    await this.campoValor.fill('1000');
  }

  async preencherValorInvalido() {
    await this.campoValor.fill('10');
  }

  async preencherValorInicial() {
    await this.campoValorInicial.fill('1000');
  }

  async continuar() {
    await this.botaoContinuar.click();
  }

  async preencherPasso03Completo() {
    await this.preencherValor();
    await this.preencherValorInicial();
    await this.continuar();

  }

  async selecionarFolha() {
    await this.selectFolha.check();
  }

  async selecionarDebito() {
    await this.selectDebito.check();
  }

  async preencherDadosBancarios() {
    await this.campoAgencia.fill('260')
    await this.campoConta.fill('2600000')
    await this.campoNomeCorrentista.fill('Playwriguerton da Silva')
  }

  async preencherCPF() {
    const cpf = gerarCPFValido();
    await this.campoCpfCorrentista.fill(cpf);
    console.log(`CPF usado no teste: ${cpf}`);
  }

  async preencherCPFInvalido() {
    await this.campoCpfCorrentista.fill('000000000');
  
  }

  async validarRedirecionamento04() {
  await expect(this.page).toHaveURL(/passo-4/);
}

  
}


  // Função para gerar o CPF a cada execução
function gerarCPFValido(): string {
  const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calcularDigito = (base: number[]) => {
    const soma = base.reduce((total, numero, index) => {
      return total + numero * (base.length + 1 - index);
    }, 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(numeros);
  const segundoDigito = calcularDigito([...numeros, primeiroDigito]);

  return [...numeros, primeiroDigito, segundoDigito].join('');
}

