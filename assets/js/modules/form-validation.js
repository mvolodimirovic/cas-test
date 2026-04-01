(function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+380\s?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

  const normalizePhone = (value) => value.replace(/\D/g, '');

  const getFieldWrapper = (field) => field.closest('.field');
  const getErrorElement = (field) => document.querySelector(`[data-error-for="${field.name}"]`);

  const clearFieldError = (field) => {
    const wrapper = getFieldWrapper(field);
    const errorElement = getErrorElement(field);

    if (wrapper) {
      wrapper.classList.remove('is-invalid');
    }

    field.removeAttribute('aria-invalid');

    if (errorElement) {
      errorElement.textContent = '';
    }
  };

  const setFieldError = (field, message) => {
    const wrapper = getFieldWrapper(field);
    const errorElement = getErrorElement(field);

    if (wrapper) {
      wrapper.classList.add('is-invalid');
    }

    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
    }
  };

  const validateField = (field) => {
    const fieldLabel = field.dataset.label || 'This field';
    const isRequired = field.dataset.required === 'true';
    const fieldValue = field.type === 'checkbox' ? field.checked : field.value.trim();

    clearFieldError(field);

    if (isRequired && !fieldValue) {
      setFieldError(field, `${fieldLabel} is required.`);
      return false;
    }

    if (field.dataset.validate === 'email' && field.value.trim() && !emailPattern.test(field.value.trim())) {
      setFieldError(field, 'Enter a valid email address.');
      return false;
    }

    if (field.dataset.validate === 'phone' && field.value.trim()) {
      const rawPhoneValue = field.value.trim();
      const normalizedPhoneValue = normalizePhone(rawPhoneValue);
      const isFormattedUaPhone = phonePattern.test(rawPhoneValue);
      const isDigitsOnlyUaPhone = /^380\d{9}$/.test(normalizedPhoneValue) || /^0\d{9}$/.test(normalizedPhoneValue);

      if (!isFormattedUaPhone && !isDigitsOnlyUaPhone) {
        setFieldError(field, 'Enter a valid Ukrainian phone number.');
        return false;
      }
    }

    return true;
  };

  const validateStep = (step) => {
    const stepPanel = document.querySelector(`[data-step-panel="${step}"]`);

    if (!stepPanel) {
      return true;
    }

    const fields = Array.from(stepPanel.querySelectorAll('input, select, textarea'));
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
      invalidFields[0].focus();
      return false;
    }

    return true;
  };

  const getSubmissionData = (form) => ({
    personalInfo: {
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      dateOfBirth: form.elements.dateOfBirth.value,
    },
    address: {
      country: form.elements.country.value,
      city: form.elements.city.value.trim(),
      streetAddress: form.elements.streetAddress.value.trim(),
      postalCode: form.elements.postalCode.value.trim(),
    },
    confirmation: {
      agreeTerms: form.elements.agreeTerms.checked,
      subscribeToNewsletter: form.elements.subscribeToNewsletter.checked,
    },
  });

  const bindLiveValidation = () => {
    const fields = Array.from(document.querySelectorAll('#registrationForm input, #registrationForm select, #registrationForm textarea'));

    fields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });

      field.addEventListener('change', () => {
        if (field.type === 'checkbox' || field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });

      field.addEventListener('blur', () => {
        validateField(field);
      });
    });
  };

  const clearAllErrors = () => {
    const fields = Array.from(document.querySelectorAll('#registrationForm input, #registrationForm select, #registrationForm textarea'));

    fields.forEach((field) => {
      clearFieldError(field);
    });
  };

  window.FormValidation = {
    clearFieldError,
    setFieldError,
    validateField,
    validateStep,
    getSubmissionData,
    bindLiveValidation,
    clearAllErrors,
  };
})();