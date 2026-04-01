(function () {
  window.FormState = {
    currentStep: 1,
    totalSteps: 3,
    setCurrentStep(step) {
      this.currentStep = step;
    },
    resetCurrentStep() {
      this.currentStep = 1;
    },
  };
})();
