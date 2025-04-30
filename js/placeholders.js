document.addEventListener('DOMContentLoaded', function() {
  // Функция для обновления состояния подсказки и плейсхолдера
  function updateFieldState(field, isBlurEvent = false) {
    const wrapper = field.closest('.input-wrapper');
    if (!wrapper) return;
    
    const hint = wrapper.querySelector('.form-hint');
    if (!hint) return;
    
    const placeholderText = field.getAttribute('data-placeholder') || field.getAttribute('placeholder');
    
    // Сохраняем оригинальный плейсхолдер в data-атрибут
    if (!field.hasAttribute('data-placeholder') && placeholderText) {
      field.setAttribute('data-placeholder', placeholderText);
    }
    
    const hasValue = field.value && field.value.trim() !== '';
    const isSelectWithValue = field.tagName === 'SELECT' && field.selectedIndex > 0;
    const isFocused = field === document.activeElement;
    
    if (hasValue || isSelectWithValue || isFocused) {
      // Показываем подсказку, скрываем плейсхолдер
      hint.style.opacity = '1';
      field.removeAttribute('placeholder');
    } else {
      // Показываем плейсхолдер, скрываем подсказку
      hint.style.opacity = '0';
      if (field.hasAttribute('data-placeholder')) {
        field.setAttribute('placeholder', field.getAttribute('data-placeholder'));
      }
    }
  }

  // Инициализация всех полей на странице
  function initFields() {
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper select');
    
    inputs.forEach(input => {
      // Сохраняем оригинальный плейсхолдер
      if (input.getAttribute('placeholder') && !input.hasAttribute('data-placeholder')) {
        input.setAttribute('data-placeholder', input.getAttribute('placeholder'));
      }
      
      updateFieldState(input);
      
      input.addEventListener('input', () => updateFieldState(input));
      input.addEventListener('focus', () => updateFieldState(input));
      input.addEventListener('blur', () => updateFieldState(input, true));
      
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => updateFieldState(input));
      }
    });
  }

  initFields();
});