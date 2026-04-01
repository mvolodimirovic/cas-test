(function () {
  const getPanels = () => Array.from(document.querySelectorAll('[data-step-panel]'));
  const getIndicators = () => Array.from(document.querySelectorAll('[data-step-indicator]'));

  window.FormUI = {
    renderStep() {
      const panels = getPanels();
      const indicators = getIndicators();
      const state = window.FormState;

      panels.forEach((panel) => {
        const panelStep = Number(panel.dataset.stepPanel);
        const isActive = panelStep === state.currentStep;

        panel.classList.toggle('hidden', !isActive);
      });

      indicators.forEach((indicator) => {
        const indicatorStep = Number(indicator.dataset.stepIndicator);
        const isActive = indicatorStep === state.currentStep;
        const isCompleted = indicatorStep < state.currentStep;

        indicator.classList.toggle('stepper__item--active', isActive);
        indicator.classList.toggle('stepper__item--completed', isCompleted);
      });

      const activePanel = document.querySelector(`[data-step-panel="${state.currentStep}"]`);
      const firstField = activePanel ? activePanel.querySelector('input, select, textarea') : null;

      if (firstField instanceof HTMLElement) {
        window.requestAnimationFrame(() => {
          firstField.focus();
        });
      }
    },

    toggleSubmitState(isVisible) {
      const form = document.getElementById('registrationForm');
      const submitState = document.getElementById('submitState');

      if (!(form instanceof HTMLElement) || !(submitState instanceof HTMLElement)) {
        return;
      }

      form.classList.toggle('hidden', isVisible);
      submitState.classList.toggle('hidden', !isVisible);
    },
  };
})();
