document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const startOverButton = document.getElementById('startOverButton');
  const state = window.FormState;
  const ui = window.FormUI;
  const validation = window.FormValidation;

  const goToNextStep = () => {
    if (!validation.validateStep(state.currentStep)) {
      return;
    }

    if (state.currentStep < state.totalSteps) {
      state.setCurrentStep(state.currentStep + 1);
      ui.renderStep();
    }
  };

  const goToPreviousStep = () => {
    if (state.currentStep > 1) {
      state.setCurrentStep(state.currentStep - 1);
      ui.renderStep();
    }
  };

  if (form instanceof HTMLFormElement) {
    validation.bindLiveValidation();
    ui.renderStep();

    form.addEventListener('click', (event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const actionButton = target.closest('[data-action]');

      if (!(actionButton instanceof HTMLButtonElement)) {
        return;
      }

      const action = actionButton.dataset.action;

      if (action === 'next') {
        goToNextStep();
      }

      if (action === 'back') {
        goToPreviousStep();
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!validation.validateStep(state.currentStep)) {
        return;
      }

      const submissionData = validation.getSubmissionData(form);

      console.log(JSON.stringify(submissionData, null, 2));

      ui.toggleSubmitState(true);
      form.reset();
      validation.clearAllErrors();
      state.resetCurrentStep();
      ui.renderStep();
    });
  }

  if (startOverButton instanceof HTMLButtonElement && form instanceof HTMLFormElement) {
    startOverButton.addEventListener('click', () => {
      ui.toggleSubmitState(false);
      form.reset();
      validation.clearAllErrors();
      state.resetCurrentStep();
      ui.renderStep();
    });
  }
});
