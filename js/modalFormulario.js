const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalForm');
const closeBtn = document.getElementById('closeModalBtn');
const steps = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const finishBtn = document.querySelector('.finish-btn');

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
    if (currentStep < steps.length) {
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

function validarDadosEndereco() {

  const cep = document.getElementById('cep').value;

  if(/^\d{8}$/.test(cep) == false){
    alert("Preencha o campo CEP corretamente")
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

  if(/^[A-Za-z]+$/.test(complemento) == false){
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

  return true
}
