//SPA 

const routes = {
  "/": "inicio.html",
  "/projeto": "projeto.html",
  "/cadastro": "cadastro.html",
};

const app = document.getElementById("app");

function getPath() {
  const hash = location.hash.replace(/^#/, "");
  return hash || "/";
}

async function loadPartial(file) {
  const res = await fetch(file, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar página");
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const main = doc.querySelector("main") || doc.body;
  return main.innerHTML;
}


async function router() {
  const path = getPath();
  const file = routes[path];

  app.classList.add("leaving");
  app.setAttribute("aria-busy", "true");

  await new Promise(r => setTimeout(r, 250));

  try {
    if (!file) throw new Error("Rota não encontrada");
    const content = await loadPartial(file);

    app.classList.remove("leaving");
    app.classList.add("entering");
    app.innerHTML = content;

    requestAnimationFrame(() => {
      app.classList.remove("entering");
    });

  } catch {
    app.classList.remove("leaving");
    app.classList.add("entering");
    app.innerHTML = "<h1>404</h1><p>Seção não encontrada.</p>";
    requestAnimationFrame(() => app.classList.remove("entering"));
  } finally {
    app.setAttribute("aria-busy", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (path === "/cadastro") {
      const previous = document.querySelector('script[data-spa-form]');
      if (previous) {
        previous.remove();
        console.log('app.js: script anterior de formulário removido.');
      }

      const s = document.createElement('script');
      s.src = './js/formulario.js';
      s.setAttribute('data-spa-form', 'true');
      s.async = false; 
      document.body.appendChild(s);
      console.log('app.js: script de formulário injetado (src=' + s.src + ').');
    }
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

//Menu Mobile 

function menuShow(){
  let menuMobile = document.querySelector('.mobile-menu');
  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
    document.querySelector('.icon').src = "./img/menu-azul-escuro.svg";
  } else {
    menuMobile.classList.add('open');
    document.querySelector('.icon').src = "./img/menu-fechar.svg";
  }
}


