"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [buttonText, setButtonText] = useState("Enviar solicitação");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [fotoError, setFotoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleMenu = () => setMenuActive((current) => !current);
  const closeMenu = () => setMenuActive(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    setFormData((current) => ({ ...current, telefone: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Dados do agendamento:", formData);
    setButtonDisabled(true);
    setButtonText("Enviando...");

    setTimeout(() => {
      setButtonText("Solicitação enviada!");
      setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });

      setTimeout(() => {
        setButtonText("Enviar solicitação");
        setButtonDisabled(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="page-root">
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav">
          <a href="#inicio" className="logo">
            Dra. Júlia Cabral
          </a>
          <button
            className="nav-toggle"
            aria-label="Abrir menu"
            aria-expanded={menuActive}
            onClick={handleToggleMenu}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-menu ${menuActive ? "active" : ""}`}>
            <li>
              <a href="#inicio" onClick={closeMenu}>
                Início
              </a>
            </li>
            <li>
              <a href="#sobre" onClick={closeMenu}>
                Sobre
              </a>
            </li>
            <li>
              <a href="#servicos" onClick={closeMenu}>
                Serviços
              </a>
            </li>
            <li>
              <a href="#contato" onClick={closeMenu}>
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div
            className="hero-bg"
            style={{ backgroundImage: "url('/picture/capa.jpg')" }}
          />
          <div className="hero-content">
            <h1>
              Consultoria Jurídica com <em>excelência</em>
            </h1>
            <p className="hero-subtitle">
              Atendimento personalizado e ético para proteger seus interesses e
              resolver suas questões legais.
            </p>
            <a href="#contato" className="btn btn-primary">
              Agendar Reunião
            </a>
          </div>
          <div className="hero-decoration" />
        </section>

        <section id="sobre" className="sobre">
          <div className="container">
            <div className="sobre-grid">
              <div className="sobre-imagem">
                <img
                  src="/picture/foto.jpg"
                  alt="Dra. Júlia Cabral"
                  className="foto-sobre"
                  onError={() => setFotoError(true)}
                />
                {!fotoError && (
                  <div className="sobre-img-placeholder" style={{ display: "none" }}>
                    <span>Coloque foto.jpg em picture/</span>
                  </div>
                )}
                {fotoError && (
                  <div className="sobre-img-placeholder">
                    <span>Coloque foto.jpg em picture/</span>
                  </div>
                )}
              </div>
              <div className="sobre-conteudo">
                <h2>Sobre mim</h2>
                <p>
                  Júlia Cabral, advogada recém formada mas com experiência no
                  atendimento a pessoas físicas e jurídicas. Comprometida com a
                  resolução eficiente dos casos e com um atendimento humanizado,
                  prezando pela transparência e confiança em cada etapa do
                  processo.
                </p>
                <p>
                  Trabalho com dedicação para entender suas necessidades e
                  oferecer as melhores soluções jurídicas para o seu caso.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="servicos">
          <div className="container">
            <h2>Áreas de Atuação</h2>
            <p className="section-intro">
              Ofereço serviços especializados nas seguintes áreas do direito:
            </p>
            <div className="servicos-grid">
              <article className="servico-card">
                <div className="servico-icone">⚖️</div>
                <h3>Direito Civil</h3>
                <p>
                  Contratos, indenizações, responsabilidade civil, direitos do
                  consumidor e questões patrimoniais.
                </p>
              </article>
              <article className="servico-card">
                <div className="servico-icone">🏠</div>
                <h3>Direito Imobiliário</h3>
                <p>
                  Compra e venda, locação, usucapião, regularização de imóveis
                  e questões condominiais.
                </p>
              </article>
              <article className="servico-card">
                <div className="servico-icone">💼</div>
                <h3>Direito Trabalhista</h3>
                <p>
                  Rescisão contratual, verbas rescisórias, acidentes de trabalho
                  e reclamações trabalhistas.
                </p>
              </article>
              <article className="servico-card">
                <div className="servico-icone">📋</div>
                <h3>Direito Previdenciário</h3>
                <p>
                  Aposentadoria, benefícios por incapacidade, pensão por morte e
                  revisão de benefícios.
                </p>
              </article>
              <article className="servico-card">
                <div className="servico-icone">📄</div>
                <h3>Consultoria Jurídica</h3>
                <p>
                  Orientação preventiva, análise de documentos e acompanhamento
                  de processos.
                </p>
              </article>
            </div>
            <div className="servicos-cta">
              <p>
                Não encontrou o que procura? Entre em contato para conversarmos
                sobre o seu caso.
              </p>
              <a href="#contato" className="btn btn-outline">
                Falar com a Dra. Júlia
              </a>
            </div>
          </div>
        </section>

        <section id="contato" className="contato">
          <div className="container">
            <div className="contato-grid">
              <div className="contato-info">
                <h2>Agende sua Reunião</h2>
                <p>
                  Estou à disposição para esclarecer suas dúvidas e avaliar o seu
                  caso. Escolha a melhor forma de contato:
                </p>
                <div className="contato-itens">
                  <div className="contato-item">
                    <span className="contato-icone">📧</span>
                    <div>
                      <strong>E-mail</strong>
                      <a href="mailto:contato@juliacabral.adv.br">
                        contato@juliacabral.adv.br
                      </a>
                    </div>
                  </div>
                  <div className="contato-item">
                    <span className="contato-icone">📲</span>
                    <div>
                      <strong>WhatsApp</strong>
                      <a
                        href="https://wa.me/5511111111111?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta"
                        target="_blank"
                        rel="noreferrer"
                      >
                        (XX) XXXXX-XXXX
                      </a>
                    </div>
                  </div>
                  <div className="contato-item">
                    <span className="contato-icone">🕐</span>
                    <div>
                      <strong>Atendimento</strong>
                      <span>Seg a Sex: 9h às 18h</span>
                    </div>
                  </div>
                </div>
              </div>
              <form className="form-contato" id="form-contato" onSubmit={handleSubmit}>
                <h3>Solicite um agendamento</h3>
                <div className="form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="Seu nome"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      required
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="assunto">Assunto / Área de interesse</label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="civil">Direito Civil</option>
                    <option value="imobiliario">Direito Imobiliário</option>
                    <option value="trabalhista">Direito Trabalhista</option>
                    <option value="previdenciario">Direito Previdenciário</option>
                    <option value="consultoria">Consultoria Jurídica</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="mensagem">Breve descrição do caso</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    placeholder="Conte um pouco sobre sua situação para que eu possa me preparar para nossa conversa."
                    value={formData.mensagem}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={buttonDisabled}
                >
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>Dra. Júlia Cabral — OAB/SP XXX.XXX</p>
            <p>© 2025 Júlia Cabral Advocacia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-fixo"
        href="https://wa.me/5511111111111?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        📲
      </a>
    </div>
  );
}
