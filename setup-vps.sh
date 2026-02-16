#!/bin/bash
# ============================================
# Script de instalação - Site Advocacia
# Ubuntu 22.04 VPS
#
# Uso: bash setup-vps.sh [dominio_ou_ip] [pasta_arquivos]
#   - dominio_ou_ip: IP ou domínio (opcional, default: _)
#   - pasta_arquivos: pasta com index.html, styles.css, script.js (opcional)
#
# Ex: bash setup-vps.sh
# Ex: bash setup-vps.sh meusite.com.br
# Ex: bash setup-vps.sh meusite.com.br /home/user/site
# ============================================

set -e

SERVER_NAME="${1:-_}"
SRC_DIR_ARG="$2"
SITE_DIR="/var/www/advocacia"

echo "============================================"
echo "  Instalação do site - Advocacia"
echo "============================================"
echo ""

# Verifica se está rodando com privilégios
if [ "$EUID" -ne 0 ]; then
    echo "Executando com sudo..."
    export SETUP_SRCDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    exec sudo -E bash "$0" "$@"
fi

# Pasta com os arquivos (argumento > env > diretório do script)
if [ -n "$SRC_DIR_ARG" ] && [ -d "$SRC_DIR_ARG" ]; then
    SCRIPT_DIR="$SRC_DIR_ARG"
elif [ -n "$SETUP_SRCDIR" ] && [ -d "$SETUP_SRCDIR" ]; then
    SCRIPT_DIR="$SETUP_SRCDIR"
else
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

echo "[1/6] Atualizando pacotes..."
apt update -qq

echo "[2/6] Instalando Nginx..."
apt install nginx -y -qq

echo "[3/6] Criando diretório do site..."
mkdir -p "$SITE_DIR"
chown -R www-data:www-data "$SITE_DIR"

echo "[4/6] Copiando arquivos do site..."
if [ -f "$SCRIPT_DIR/index.html" ] && [ -f "$SCRIPT_DIR/styles.css" ] && [ -f "$SCRIPT_DIR/script.js" ]; then
    cp "$SCRIPT_DIR/index.html" "$SITE_DIR/"
    cp "$SCRIPT_DIR/styles.css" "$SITE_DIR/"
    cp "$SCRIPT_DIR/script.js" "$SITE_DIR/"
    echo "    Arquivos copiados do diretório do script."
else
    echo "    Arquivos não encontrados. Baixando do repositório ou criando padrão..."
    # Cria arquivos mínimos se não existirem (fallback)
    cat > "$SITE_DIR/index.html" << 'INDEXEOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advocacia | Consultoria Jurídica</title>
</head>
<body><h1>Site em configuração. Envie os arquivos index.html, styles.css e script.js para /var/www/advocacia/</h1></body>
</html>
INDEXEOF
fi

chown -R www-data:www-data "$SITE_DIR"

echo "[5/6] Configurando Nginx..."
cat > /etc/nginx/sites-available/advocacia << NGINXEOF
server {
    listen 80;
    server_name $SERVER_NAME;
    root $SITE_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}
NGINXEOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/advocacia /etc/nginx/sites-enabled/

nginx -t && systemctl reload nginx
systemctl enable nginx

echo "[6/6] Configurando firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 80/tcp -q 2>/dev/null || true
    ufw allow 22/tcp -q 2>/dev/null || true
    echo "y" | ufw enable 2>/dev/null || true
fi

echo ""
echo "============================================"
echo "  Instalação concluída!"
echo "============================================"
echo ""
echo "Site disponível em: http://$(curl -s ifconfig.me 2>/dev/null || echo 'SEU_IP')"
echo "Arquivos em: $SITE_DIR"
echo ""
echo "Para HTTPS com Let's Encrypt (se tiver domínio):"
echo "  sudo apt install certbot python3-certbot-nginx -y"
echo "  sudo certbot --nginx -d seudominio.com.br"
echo ""
