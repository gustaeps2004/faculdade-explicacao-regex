const modalExplicacao = document.getElementById('modal-explicacao');
const stepsExplicacao = document.querySelectorAll('.step-explicacao');
const openBtnExplicacao = document.getElementById('openModalExplicacao');
const closeBtnExplicacao = document.getElementById('closeModalBtnExplicacao');
const nextBtnsExplicacao = document.querySelectorAll('.next-btn-explicacao');
const prevBtnsExplicacao = document.querySelectorAll('.prev-btn-explicacao');
const closeBtnExplicacaoModal = document.querySelector('.close-btn-explicacao-modal');

let currentStepExplicacao = 0;

function showStepExplicacao(index) {
  stepsExplicacao.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

openBtnExplicacao.addEventListener('click', () => {
  modalExplicacao.style.display = 'block';
  showStepExplicacao(currentStepExplicacao);
});

nextBtnsExplicacao.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStepExplicacao < steps.length) {
      currentStepExplicacao++;
      showStepExplicacao(currentStepExplicacao);
    }
  });
});

prevBtnsExplicacao.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStepExplicacao > 0) {
      currentStepExplicacao--;
      showStepExplicacao(currentStepExplicacao);
    }
  });
});

closeBtnExplicacao.addEventListener('click', () => {
  closeModal()
});

closeBtnExplicacaoModal.addEventListener('click', () => {
  closeModal()
});

function closeModal() {
  modalExplicacao.style.display = 'none';
  currentStepExplicacao = 0;
}