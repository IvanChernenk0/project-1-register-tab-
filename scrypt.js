'use strict';

const continueBtn = document.querySelector('.continue-btn');
const registerStep1 = document.querySelector('.register-step-1');
const registerStep2 = document.querySelector('.register-step-2');
const registerStep3 = document.querySelector('.register-step-3');
const yourName = document.querySelector('.name');
const email = document.querySelector('.email');
const titleName = document.querySelector('.title-input-name');
const titleEmail = document.querySelector('.title-input-email');
const step = document.querySelector('.step');
const dotBtns = document.querySelectorAll('.dot-btn');
const selectTopicBtnContainer = document.querySelector('.select-topic-btn-container');

let stepCount = 1;
const maxSteps = 2;
const registerSteps = [registerStep1, registerStep2, registerStep3];
const topics = [];

const validateInput = function (condition, title) {
  if (condition) {
    title.classList.add('incorrect-data');
    return false;
  } else {
    title.classList.remove('incorrect-data');
    return true;
  }
};

const updateStep = function () {
  if (stepCount > maxSteps) return;
  stepCount++;
  step.textContent = `Step ${stepCount} of 3`;
  dotBtns.forEach((btn) => {
    btn.classList.remove('active-dot-btn');
  });
  dotBtns[stepCount - 1].classList.add('active-dot-btn');
};

const registerStep = function () {
  if (stepCount > maxSteps) return;
  updateStep();
  registerSteps[stepCount - 2].classList.add('hidden');
  registerSteps[stepCount - 1].classList.remove('hidden');
};

const renderStep3 = function (){
  registerStep3.insertAdjacentHTML('beforeend',`
    <div class="summary-container-1">
        <p class="headline">Name: <span class="data">${yourName.value}</span></p>
        <p class="headline">Email: <span class="data">${email.value}</span></p>
    </div>
    <div>
        <p class="headline">Topics:</p>
        <ul class="data-topics-container">
        ${topics.map(t => `<li class="data-topic">${t}</li>`).join('')}
        </ul>
    </div>`)    
}

selectTopicBtnContainer.addEventListener('click', function (e) {
  if (e.target === selectTopicBtnContainer) return;
  e.target.classList.toggle('active-select-topic-btn');
  if (e.target.classList.contains('active-select-topic-btn') && !topics.includes(e.target.textContent)){
    topics.push(e.target.textContent)
  } else {
    const index = topics.indexOf(e.target.textContent);
    if (index !== -1) topics.splice(index, 1);
  }
  
});

continueBtn.addEventListener('click', function () {
  const invalidName = validateInput(
    yourName.value.trim().length < 3,
    titleName
  );
  const invalidEmail = validateInput(
    !email.value.includes('@') || email.value.trim().length < 3,
    titleEmail
  );
  if (!invalidName || !invalidEmail) return;
  if (stepCount === 2 && topics.length === 0) {
    alert('You need to select at least one topic.')
    return
  }
  if (stepCount === 2) {
    renderStep3();
  }  
  if (stepCount === 3)  alert('🎉 Success')
  registerStep();
});

