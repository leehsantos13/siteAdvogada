# Site Advocacia - Consultoria Jurídica

Site institucional para advogada, com apresentação de serviços, seção "Sobre" e formulário de contato para agendamento de reuniões.

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- Nginx (produção)

## Estrutura do projeto

```
├── index.html      # Página principal
├── styles.css      # Estilos
├── script.js       # Interatividade (menu mobile, formulário, máscara de telefone)
├── setup-vps.sh    # Script de deploy para Ubuntu 22.04
└── README.md
```

## Seções do site

- **Hero** – Apresentação e CTA para agendar reunião
- **Sobre** – Descrição profissional
- **Serviços** – Áreas de atuação (Civil, Família, Imobiliário, Trabalhista, Previdenciário, Consultoria)
- **Contato** – Formulário de agendamento, e-mail, WhatsApp e horário de atendimento

## Executando localmente

Abra o `index.html` no navegador ou use a extensão **Live Server** no VS Code/Cursor.

## Deploy na VPS (Ubuntu 22.04)

1. Envie os arquivos para a VPS:
   ```bash
   scp index.html styles.css script.js setup-vps.sh usuario@IP_DA_VPS:~/
   ```

2. Na VPS, execute:
   ```bash
   sed -i 's/\r$//' setup-vps.sh   # Corrige quebras de linha (se necessário)
   bash setup-vps.sh
   ```

3. O script instala Nginx, configura o site e define o firewall. O site ficará em `http://IP_DA_VPS`.

### HTTPS com Let's Encrypt (domínio próprio)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d seudominio.com.br
```

## Personalização

Edite o `index.html` para ajustar:

- E-mail de contato
- Número do WhatsApp (`https://wa.me/55DDNNNNNNNNNN`)
- Número da OAB no rodapé
- Texto da seção "Sobre"
- Foto profissional (substituir o placeholder)

## Licença

Uso livre para fins pessoais e comerciais.
