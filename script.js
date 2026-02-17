// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Header scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// Formulário de contato
const form = document.getElementById('form-contato');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Simulação de envio - substitua pela integração real (e-mail, API, etc.)
    const dados = {
        nome,
        email,
        telefone,
        assunto,
        mensagem
    };
    
    console.log('Dados do agendamento:', dados);
    
    // Feedback visual ao usuário
    const btn = form.querySelector('button[type="submit"]');
    const textoOriginal = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Solicitação enviada!';
        btn.style.background = '#9a5c63';
        form.reset();
        
        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1000);
});

// Máscara de telefone
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 11) {
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    e.target.value = valor;
});
