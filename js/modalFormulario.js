const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalForm');
const closeBtn = document.getElementById('closeModalBtn');
const steps = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const finishBtn = document.querySelector('.finish-btn');

let nome = document.getElementById('nome');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let documento = document.getElementById('documento');
let dtnascimento = document.getElementById('dtnascimento');
let cep = document.getElementById('cep');
let logradouro = document.getElementById('logradouro');
let numero = document.getElementById('numero');
let bairro = document.getElementById('bairro');
let cidade = document.getElementById('cidade');
let estado = document.getElementById('estado');

let nomeregex = new RegExp('^[a-zA-Z ]{5,300}$');
let emailregex = new RegExp('^[^\\s]+@[^\\s]+\\.[^\\s]+$'); 
let foneRegex = new RegExp('^\\(\\d{2}\\) \\d{4,5}-\\d{4}$');
let cpfRegex = new RegExp('^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$');
let nascimentoRegex = new RegExp('^\\d{2}/\\d{2}/\\d{4}$');

let currentStep = 0;

openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  showStep(currentStep);
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  currentStep = 0;
});

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    let podeAvancar = true; 

    if (currentStep === 0) { 
      if (!validarNome()) { podeAvancar = false; }
      if (!validarCPF()) { podeAvancar = false; }
      if (!validarNascimento()) { podeAvancar = false; }
    } 
    else if (currentStep === 1) { 
      if (!validarEmail()) { podeAvancar = false; }
      if (!validarTelefone()) { podeAvancar = false; }
    }

    if (podeAvancar && currentStep < steps.length) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

finishBtn.addEventListener('click', () => {
  if (!validarDadosEndereco())
    return;
    
  alert('Processo concluído!');
  modal.style.display = 'none';
  currentStep = 0;
});

const cepInput = document.getElementById('cep');
cepInput.addEventListener('input', function(e) {
  let valor = e.target.value.replace(/\D/g, "");
  if (valor.length > 5) {
    valor = valor.replace(/(\d{5})(\d{1,3}).*/, "$1-$2");
  }
  e.target.value = valor;
});

function validarDadosEndereco() {
  const cep = document.getElementById('cep').value;

  if(!/^\d{5}-\d{3}$/.test(cep)){
    alert("Preencha o campo CEP corretamente");
    document.getElementById('cep').focus();
    return false;
  }

  const logradouro = document.getElementById('logradouro').value;
  if(logradouro == ""){
    alert("Preencha o campo Logradouro");
    document.getElementById('logradouro').focus();
    return false;
  }

  const numero = document.getElementById('numero').value;
  if(/^\d{1,5}$/.test(numero) == false){
    alert("Preencha o campo Número corretamente");
    document.getElementById('numero').focus();
    return false;
  }

  const complemento = document.getElementById('complemento').value;
  if(complemento && /^[A-Za-z0-9\s-]+$/.test(complemento) == false){
    alert("Preencha o campo Complemento corretamente");
    document.getElementById('complemento').focus();
    return false;
  }

  const cidade = document.getElementById('cidade').value;
  if(/^[A-Za-zÀ-ÿ]+([ ][A-Za-zÀ-ÿ]+)*$/.test(cidade) == false){
    alert("Preencha o campo Cidade corretamente");
    document.getElementById('cidade').focus();
    return false;
  }

  const estado = document.getElementById('estado').value;
  if(/^[A-Za-zÀ-ÿ]+([ ][A-Za-zÀ-ÿ]+)*$/.test(estado) == false){
    alert("Preencha o campo Estado corretamente");
    document.getElementById('estado').focus();
    return false;
  }

  return true;
}

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

telefone.addEventListener('input', function(e) {
  let valor = e.target.value.replace(/\D/g, ''); 
  
  if (valor.length > 0) {
      valor = valor.replace(/^(\d{2})(\d)/, '($1) $2'); 
  }
  if (valor.length > 6) {
      valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
  }

  e.target.value = valor.substring(0, 15); 
});

function validarTelefone() {
  if (!foneRegex.test(telefone.value)) {
    alert('Telefone inválido. Use o formato correto (ex: (99) 99999-9999).');
    telefone.focus();
    return false;
  } else {
    return true;
  }
}

dtnascimento.addEventListener('input', function(e) {
  let valor = e.target.value.replace(/\D/g, '');

  if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d)/, '$1/$2');
  }
  if (valor.length > 5) {
      valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
  }

  e.target.value = valor.substring(0, 10);
});

function validarNascimento() {
  if (!nascimentoRegex.test(dtnascimento.value)) {
    alert('Data de Nascimento inválida. Use o formato correto (ex: 99/99/9999).');
    dtnascimento.focus();
    return false;
  } else {
    return true;
  }
}