document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('customForm');
  const resultBlock = document.getElementById('customResult');
  const stepsBlock = document.getElementById('conversionSteps');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      resultBlock.innerHTML = '';
      stepsBlock.innerHTML = '';

      const numStr = document.getElementById('number').value.trim().toUpperCase();
      const from = parseInt(document.getElementById('fromBase').value, 10);
      const to = parseInt(document.getElementById('toBase').value, 10);

      // Проверка валидности ввода
      const validDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, from);
      const invalidChars = [...numStr].filter(ch => !validDigits.includes(ch));

      if (invalidChars.length > 0) {
        resultBlock.innerHTML = `<p style="color: red;">Ошибка: недопустимые символы для системы счисления ${from}: ${invalidChars.join(', ')}</p>`;
        return;
      }

      // Шаг 1: перевод в десятичное
      let decimal = 0;
      const weightSteps = [];
      for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[i], 36);
        const power = numStr.length - 1 - i;
        const value = digit * Math.pow(from, power);
        decimal += value;
        weightSteps.push(`'${numStr[i]}' = ${digit} × ${from}^${power} = ${value}`);
      }

      // Шаг 2: перевод в целевую систему
      let divSteps = [];
      let temp = decimal;
      while (temp > 0) {
        const rem = temp % to;
        divSteps.push(`${temp} ÷ ${to} = ${Math.floor(temp / to)}, остаток ${rem}`);
        temp = Math.floor(temp / to);
      }

      const converted = decimal === 0 ? '0' : divSteps.map(s => s.split('остаток ')[1]).reverse().join('');

      // Вывод
      resultBlock.innerHTML = `<p>Результат: ${numStr}<sup>${from}</sup> = <strong>${converted}<sup>${to}</sup></strong></p>`;
      stepsBlock.innerHTML = `
        <h3>Порядок действий:</h3>
        <br>
        <ol>
          ${weightSteps.map(s => `<li>${s}</li>`).join('')}
          <li>Сумма весов = ${decimal}</li>
          <li>Деления:</li>
          <ol>
            ${divSteps.map(s => `<li>${s}</li>`).join('')}
          </ol>
          <li>Собираем остатки снизу вверх: <strong>${converted}</strong></li>
        </ol>
      `;
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Спасибо за сообщение!');
      contactForm.reset();
    });
  }
});
