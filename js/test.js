// --- Elementos do DOM ---
const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalForm');
const closeBtn = document.getElementById('closeModalBtn');
const steps = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const finishBtn = document.querySelector('.finish-btn');

// --- Campos do Formulário ---
var nome = document.getElementById('nome');
var email = document.getElementById('email');
var telefone = document.getElementById('telefone');
var documento = document.getElementById('documento');
var dtnascimento = document.getElementById('dtnascimento');
var cep = document.getElementById('cep');
var logradouro = document.getElementById('logradouro');
var numero = document.getElementById('numero');
var bairro = document.getElementById('bairro');
var cidade = document.getElementById('cidade');
var estado = document.getElementById('estado');

let currentStep = 0;

// --- Expressões Regulares (Regex) ---
var nomeregex = new RegExp('^[a-zA-Z ]{5,300}$');
var emailregex = new RegExp('^[^\\s]+@[^\\s]+\\.[^\\s]+$'); 
var foneRegex = new RegExp('^\\(\\d{2}\\) \\d{4,5}-\\d{4}$');
var cpfRegex = new RegExp('^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$');
var nascimentoRegex = new RegExp('^\\d{2}/\\d{2}/\\d{4}$');


// --- Funções de Validação ---
function validarNome() {
  if (!nomeregex.test(nome.value)) {
    alert('Nome inválido. Use apenas letras e espaços (5-300 caracteres).');
    nome.focus();
    return false;
  } else {
    return true;
  }
}
documento.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');

    if (valor.length > 3 && valor.length <= 6) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (valor.length > 6 && valor.length <= 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2}).*/, '$1.$2.$3-$4');
    }

    e.target.value = valor;
});
function validarCPF() {
  if (!cpfRegex.test(documento.value)) {
    alert('CPF inválido. Use o formato correto (ex: 999.999.999-99).');
    documento.focus();
    return false;
  } else {
    return true;
  }
}

function validarEmail() {
  if (!emailregex.test(email.value)) {
    alert('Email inválido. Use o formato correto (ex: exemplo@exemplo.com).');
    email.focus();
    return false;
  } else {
    return true;
  }
}

function validarTelefone() {
  if (!foneRegex.test(telefone.value)) {
    alert('Telefone inválido. Use o formato correto (ex: (99) 99999-9999).');
    telefone.focus();
    return false;
  } else {
    return true;
  }
}

function validarNascimento() {
  if (!nascimentoRegex.test(dtnascimento.value)) {
    alert('Data de Nascimento inválida. Use o formato correto (ex: 99/99/9999).');
    nascimento.focus();
    return false;
  } else {
    return true;
  }
}

// --- Lógica Principal do Modal ---

// Abrir modal
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  showStep(currentStep);
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  currentStep = 0; // Reseta para o primeiro passo ao fechar
});

// Função para mostrar o passo atual e esconder os outros
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

// Botões "Próximo"
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    let podeAvancar = true; // Variável de controle

    // Valida os campos do passo atual
    if (currentStep === 0) { // Passo 1: Dados Pessoais
      if (!validarNome()) { podeAvancar = false; }
      if (!validarCPF()) { podeAvancar = false; }
      if (!validarNascimento()) { podeAvancar = false; }
    } 
    else if (currentStep === 1) { // Passo 2: Contato
      if (!validarEmail()) { podeAvancar = false; }
      if (!validarTelefone()) { podeAvancar = false; }
    }

    // Se todas as validações do passo atual passaram, avança para o próximo
    if (podeAvancar && currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

// Botões "Anterior"
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

// Botão "Finalizar"
finishBtn.addEventListener('click', () => {
  let podeFinalizar = true;

  // Valida os campos do ÚLTIMO passo antes de finalizar
  if (currentStep === 2) { // Supondo que o último passo seja o de endereço (índice 2)
    
  }

  // Se o último passo for válido, finaliza o processo
  if (podeFinalizar) {
    alert('Processo concluído com sucesso!');
    modal.style.display = 'none';
    currentStep = 0;
    // Aqui você adicionaria o código para enviar os dados do formulário
  }
});