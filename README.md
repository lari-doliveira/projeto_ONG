# Todos no Tatame 🥋

Site institucional do projeto social Todos no Tatame, uma iniciativa que usa o jiu-jitsu como ferramenta de inclusão e transformação social.

## 🌐 Site Publicado

O site está disponível em: [https://lari-doliveira.github.io/projeto_ONG/](https://lari-doliveira.github.io/projeto_ONG/)

## 📱 Funcionalidades

- **SPA (Single Page Application)**: Navegação dinâmica sem recarregamento da página
- **Layout Responsivo**: Adaptação para mobile, tablet e desktop
- **Formulário de Contato**: 
  - Validação completa dos campos
  - Máscaras para CPF e telefone
  - Feedback visual de erros e sucesso
- **Menu Mobile**: Menu hamburguer para melhor navegação em dispositivos móveis

## 🗂️ Estrutura do Projeto

```
projeto_ONG/
├── index.html           # Container principal (SPA)
├── inicio.html         # Página inicial
├── cadastro.html       # Formulário de contato
├── projeto.html        # Página do projeto
├── css/
│   ├── style.css      # Importações CSS
│   ├── global.css     # Variáveis e reset
│   ├── header.css     # Estilos do cabeçalho
│   ├── main.css       # Estilos principais
│   ├── footer.css     # Estilos do rodapé
│   ├── cadastro.css   # Estilos do formulário
│   ├── projeto.css    # Estilos página projeto
│   ├── responsivo.css # Media queries
│   └── utilidades.css # Classes utilitárias
├── js/
│   ├── app.js         # Router SPA
│   └── formulario.js  # Validação formulário
└── img/               # Imagens e SVGs
```

## 💻 Tecnologias

- HTML5
- CSS3 (com variáveis CSS e media queries)
- JavaScript (vanilla)
- Single Page Application (SPA) sem frameworks

## ✨ Destaques Técnicos

### JavaScript Moderno
- Router SPA customizado com gerenciamento de estado
- Validações de formulário com regex e máscaras
- Injeção dinâmica de scripts
- Feedback visual em tempo real

### CSS Responsivo
- Design mobile-first
- Grid e Flexbox para layouts
- Media queries para breakpoints principais:
  - Mobile: até 480px
  - Tablet: até 768px
  - Laptop: até 1024px
  - Desktop: 1200px+

### Performance
- Carregamento dinâmico de scripts
- Transições suaves entre páginas
- Imagens otimizadas
- CSS modular

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/lari-doliveira/projeto_ONG.git
   ```

2. Abra o projeto em um editor (ex: VS Code)

3. Use uma extensão de servidor local (ex: Live Server) ou abra o `index.html` diretamente

## 📝 Validações do Formulário

O formulário inclui validações para:
- Nome completo (mínimo 3 caracteres, apenas letras)
- E-mail (formato válido)
- CPF (dígitos verificadores)
- Telefone (formato brasileiro)
- Data de nascimento (não aceita datas futuras)
- Endereço e demais campos obrigatórios

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com 💙 por Larissa Oliveira para o projeto social Todos no Tatame.
