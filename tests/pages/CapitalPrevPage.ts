import { Page, Locator, expect } from '@playwright/test';

// ADESÃO - INFORMAÇÕES PESSOAIS DO TITULAR
export class CapitalPrevPage {
  readonly page:            Page;
  readonly campoNome:             Locator;
  readonly campoCPF:              Locator;
  readonly campoGenero:           Locator;
  readonly opcaoMasculino:        Locator;
  readonly opcaoFeminino:         Locator;
  readonly campoDataNasc:         Locator;
  readonly campoEstadoCivil:      Locator;
  readonly opcaoCasado:           Locator;
  readonly campoEmail:            Locator;
  readonly campoCelular:          Locator;
  readonly botaoCopiarDados:      Locator;
  readonly botaoContinuar:        Locator;
  readonly campoInstituidor:      Locator;
  readonly opcaoCapitalprev:      Locator;
  readonly tituloEnderecoTitular: Locator;  

  constructor(page: Page) {
  
    this.page = page;
    this.campoNome              = page.locator('#NO_PESSOA');
    this.campoCPF               = page.locator('#CPF_CGC');
    this.campoDataNasc          = page.locator('#DT_NASCIMENTO');
    this.campoGenero            = page.locator('#root > div > div > div > main > div > div:nth-child(3) > div > form > div:nth-child(1) > div:nth-child(4) > div > button > div.itc-button-content.drop-shadow-md.flex.flex-1.justify-start');
    this.opcaoMasculino         = page.getByText('MASCULINO', { exact: true }).last();
    this.opcaoFeminino          = page.getByText('FEMININO', { exact: true });
    this.campoEstadoCivil       = page.locator('#root > div > div > div > main > div > div:nth-child(3) > div > form > div:nth-child(1) > div:nth-child(5) > div > button')
    this.opcaoCasado            = page.getByText('CASADO', { exact: true }).last();
    this.campoEmail             = page.locator('#NO_EMAIL');
    this.campoCelular           = page.locator('#NR_CELULAR');
    this.botaoCopiarDados       = page.locator('#root > div > div > div > main > div > div:nth-child(3) > div > form > div:nth-child(4) > button');
    this.botaoContinuar         = page.getByRole('button', { name: 'Continuar' });
    this.campoInstituidor       = page.locator('#root > div > div > div > main > div > div:nth-child(3) > div > form > div:nth-child(4) > div:nth-child(6) > div > button > div.itc-button-content.drop-shadow-md.flex.flex-1.justify-start');
    this.opcaoCapitalprev       = page.getByText('CAPITALPREV', { exact: true }).last();
    this.tituloEnderecoTitular  = page.getByText('Endereço do titular do plano', { exact: true });

    ;
  }


  async abrirPagina() {
    await this.page.goto('https://webhmg.intech.com.br/capitalprev/adesao/#/passo-1');
  }

  async preencherNome() {
    await this.campoNome.fill('Playwright');
  }
  async preencherCPF() {
    const cpf = gerarCPFValido();
    await this.campoCPF.fill(cpf);
    console.log(`CPF usado no teste: ${cpf}`);
  }

  async preencherDataNasc() {
    await this.campoDataNasc.fill('05/10/2001');
  }

async selecionarMasculino() {
  await this.campoGenero.click();
  await this.opcaoMasculino.click();
}

async selecionarFeminino() {
  await this.campoGenero.click();
  await this.opcaoFeminino.click();
}

async selecionarEstado() {
  await this.campoEstadoCivil.click();
  await this.opcaoCasado.click();
}

async preencherEmail() {
    await this.campoEmail.fill('teste@teste.com');
  }

async preencherEmailInvalido() {
    await this.campoEmail.fill('teste31213com');
  }  

async preencherCelular() {
    await this.campoCelular.fill('61981047777');
  }

async copiarDados() {
    await this.botaoCopiarDados.click();
  }

async selecionarInstituidor() {
  await this.campoInstituidor.click();
  await this.opcaoCapitalprev.click();
}

async continuar() {
    await this.botaoContinuar.click();
  }

async validarTituloEndereco() {
  await expect(this.tituloEnderecoTitular).toBeVisible();
}

async preencherPasso01Completo() {
    // INFORMAÇÕES PESSOAIS DO TITULAR:
    await this.preencherNome();
    await this.preencherCPF();
    await this.preencherDataNasc();
    await this.selecionarMasculino();
    await this.selecionarEstado();
    await this.preencherEmail();
    await this.preencherCelular();

    // Empregado, associado ou aposentado
    await this.copiarDados();
    await this.selecionarInstituidor();
    await this.continuar();
    await this.validarTituloEndereco()
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