(function () {
    if (window.__formulario_loaded) {
        console.log('formulario.js: já inicializado, ignorando nova execução.');
        return;
    }
    window.__formulario_loaded = true;
    console.log('formulario.js: script carregado e inicializando validação.');

    const form = document.getElementById('form');
    if (!form) {
        console.warn('formulario.js: elemento #form não encontrado. Nenhuma validação aplicada.');
        return;
    }
    form.noValidate = true;
    console.log('formulario.js: desativada a validação nativa (novalidate).');

    const submitButtons = form.querySelectorAll('[type="submit"], button');
    submitButtons.forEach(btn => {
        btn.addEventListener('click', () => console.log('formulario.js: botão de submit clicado.'));
    });

    const cpfInput = form.querySelector('#cpf');
    const phoneInput = form.querySelector('#telefone');

    function formatCPF(v) {
        const digits = String(v).replace(/\D/g, '').slice(0, 11);
        let out = digits;
        out = out.replace(/^(\d{3})(\d)/, '$1.$2');
        out = out.replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2');
        out = out.replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2');
        return out;
    }

    function formatPhone(v) {
        const digits = String(v).replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 10) {
            return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/\-$/,'');
        } else {
            return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/\-$/,'');
        }
    }

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            const pos = cpfInput.selectionStart;
            cpfInput.value = formatCPF(cpfInput.value);
        });
        cpfInput.addEventListener('blur', () => {
            const v = cpfInput.value;
            const res = cpfIsValid(v);
            const box = cpfInput.closest('.input_box') || cpfInput.parentElement;
            const err = box ? box.querySelector('.error') : null;
            if (!res.isValid && err) err.innerHTML = res.errorMessage;
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            phoneInput.value = formatPhone(phoneInput.value);
        });
    }

    form.addEventListener('submit', function (e) {
        console.log('formulario.js: submit interceptado.');
        e.preventDefault();

        const fields = [
            { id: 'nome', label: 'Nome Completo', validator: nameIsValid },
            { id: 'telefone', label: 'Telefone', validator: phoneIsValid },
            { id: 'email', label: 'E-mail', validator: emailIsValid },
            { id: 'cpf', label: 'CPF', validator: cpfIsValid },
            { id: 'nascimento', label: 'Data de Nascimento', validator: dateIsValid },
            { id: 'endereco', label: 'Endereço', validator: requiredIsValid },
            { id: 'numero', label: 'Número', validator: numberIsValid },
            { id: 'bairro', label: 'Bairro', validator: requiredIsValid },
            { id: 'cidade', label: 'Cidade', validator: requiredIsValid },
            { id: 'estado', label: 'Estado', validator: selectIsValid }
        ];

        let formIsValid = true;

        fields.forEach(function (field) {
            const input = document.getElementById(field.id);
            if (!input) return; 

            console.log(`formulario.js: validando campo ${field.id} -> value="${String(input.value || '').trim()}"`);

            let inputBox = input.closest('.input_box') || input.parentElement;
            const inputValue = String(input.value || '').trim();

            if (inputBox && !inputBox.classList.contains('input_box')) {
                inputBox.classList.add('input_box');
            }

            if (input && !input.classList.contains('input-field')) {
                input.classList.add('input-field');
            }

            const labelEl = inputBox ? inputBox.querySelector('label') : null;
            if (labelEl && !labelEl.classList.contains('form-label')) {
                labelEl.classList.add('form-label');
            }

            let errorSpan = (inputBox && inputBox.querySelector) ? inputBox.querySelector('.error') : null;
            if (!errorSpan) {
                errorSpan = document.createElement('span');
                errorSpan.className = 'error';

                if (input && input.insertAdjacentElement) {
                    input.insertAdjacentElement('afterend', errorSpan);
                } else if (inputBox) {
                    inputBox.appendChild(errorSpan);
                }
            }
            if (errorSpan) errorSpan.innerHTML = '';

            if (field.id === 'numero' && inputValue === '') {
                if (inputBox) {
                    inputBox.classList.remove('invalid');
                    inputBox.classList.remove('valid');
                }
                if (errorSpan) errorSpan.innerHTML = '';
                return;
            }

            if (inputBox) {
                inputBox.classList.remove('invalid');
                inputBox.classList.add('valid');
            }

            const fieldValidator = field.validator(inputValue);

            if (!fieldValidator.isValid) {
                formIsValid = false;
                if (errorSpan) errorSpan.innerHTML = fieldValidator.errorMessage;
                if (inputBox) {
                    inputBox.classList.add('invalid');
                    inputBox.classList.remove('valid');
                }
            }
        });
    console.log('formulario.js: resultado da validação ->', formIsValid);

        if (formIsValid) {
            let successEl = form.querySelector('.form-success');
            if (!successEl) {
                successEl = document.createElement('div');
                successEl.className = 'form-success';
                successEl.innerText = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
                form.insertAdjacentElement('beforebegin', successEl);
            } else {
                successEl.style.display = '';
            }

            const errorSpans = form.querySelectorAll('.error');
            errorSpans.forEach(s => s.innerHTML = '');
            const fieldsEl = form.querySelectorAll('.field');
            fieldsEl.forEach(f => { f.classList.remove('invalid'); f.classList.add('valid'); });

            form.reset();

            setTimeout(() => {
                if (successEl) successEl.style.display = 'none';
            }, 4000);
        }
    });

    function isEmpty(value) {
        return value === '';
    }

    function nameIsValid(value) {
        const validator = {
            isValid: true,
            errorMessage: null
        };

        if (isEmpty(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo é obrigatório!';
            return validator;
        }

        const min = 3;
        if (value.replace(/\s+/g, '').length < min) {
            validator.isValid = false;
            validator.errorMessage = 'O nome deve ter no mínimo 3 caracteres!';
            return validator;
        }

        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u;

        if (!regex.test(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo deve conter apenas letras e espaços!';
        }

        return validator;
    }

    function emailIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
        if (isEmpty(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo é obrigatório!';
            return validator;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            validator.isValid = false;
            validator.errorMessage = 'Insira um e-mail válido!';
        }
        return validator;
    }

    function phoneIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
        if (isEmpty(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo é obrigatório!';
            return validator;
        }

        const digits = value.replace(/\D+/g, '');
        if (!(digits.length === 10 || digits.length === 11)) {
            validator.isValid = false;
            validator.errorMessage = 'Insira um telefone válido (10 ou 11 dígitos).';
            return validator;
        }
        return validator;
    }

    function cpfIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
        if (isEmpty(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo é obrigatório!';
            return validator;
        }
        const cpf = value.replace(/\D+/g, '');
        if (cpf.length !== 11) {
            validator.isValid = false;
            validator.errorMessage = 'CPF deve ter 11 dígitos.';
            return validator;
        }
        
        if (/^(\d)\1{10}$/.test(cpf)) {
            validator.isValid = false;
            validator.errorMessage = 'CPF inválido.';
            return validator;
        }

        const calcDigit = (base) => {
            let sum = 0;
            for (let i = 0; i < base.length; i++) {
                sum += parseInt(base.charAt(i), 10) * (base.length + 1 - i);
            }
            const rest = (sum * 10) % 11;
            return rest === 10 ? 0 : rest;
        };

        const base9 = cpf.slice(0, 9);
        const d1 = calcDigit(base9);
        const d2 = calcDigit(base9 + d1);
        if (parseInt(cpf.charAt(9), 10) !== d1 || parseInt(cpf.charAt(10), 10) !== d2) {
            validator.isValid = false;
            validator.errorMessage = 'CPF inválido.';
        }
        return validator;
    }

    function requiredIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
        if (isEmpty(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo é obrigatório!';
        }
        return validator;
    }

    function dateIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
        if (isEmpty(value)) {
            validator.isValid = false;
            validator.errorMessage = 'O campo é obrigatório!';
            return validator;
        }
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) {
            validator.isValid = false;
            validator.errorMessage = 'Data inválida.';
            return validator;
        }

        const today = new Date();
        const dOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const tOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (dOnly > tOnly) {
            validator.isValid = false;
            validator.errorMessage = 'A data não pode ser no futuro.';
        }
        return validator;
    }

    function numberIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
    
        if (isEmpty(value)) {
            return validator; // válido
        }
        if (!/^\d+$/.test(value)) {
            validator.isValid = false;
            validator.errorMessage = 'Insira apenas números.';
        }
        return validator;
    }

    function selectIsValid(value) {
        const validator = { isValid: true, errorMessage: null };
        if (!value || value === '') {
            validator.isValid = false;
            validator.errorMessage = 'Selecione uma opção.';
        }
        return validator;
    }
})();