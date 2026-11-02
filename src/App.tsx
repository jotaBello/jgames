import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type Issue = {
  number: string;
  date: string;
  pages: string;
  title: string;
  description: string;
  image: string;
  badge: string;
};

type Review = {
  title: string;
  studio: string;
  score: string;
  verdict: string;
  image: string;
  quote: string;
  good: string;
  caveat: string;
  author: string;
};

type Article = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  summary: string;
  image?: string;
  author?: string;
};

type Product = {
  name: string;
  note: string;
  description: string;
  price: number;
  image: string;
};

type CartLine = { name: string; price: number; quantity: number };

const image = {
  current:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD4LqoOVNJzkL38ku_yvqX0m7u2gIF85eST37JHHTLAkLLpynj1MufYBRkBUHGUb1JrmsWYPw-7gR6Oq9R7AkmB-1SUb5N_FQTpMqRUUJe1VKJfDxCdXj-CMvS5jDwi7vZh4C3u0h7r_xu22BjYxsaDOi82F7OCqW2t46DR1ma-ktv-hCyBxlcsg67ioGRlbwIPSmpEssNpVToSLLebvCSopg_iUSLlqGOpyd5kqxAp",
  issue40:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBAeVNFKIXVlyj6SqmmYzyERiYO1PL0Qhq7F9AKpZsfURgzw4xYVItp6knTr-6CDZjzaRTIPMQj8pLP-Jj7w6cHOZRFqfo5ze5ZEuvxioDYAs0cUQbGSvtnOdYwKpty4sDy2WVn3BMs1xNcpYx57WDs8_Vp3plqJPSTj-Gbl7E6XcESH2VB9ZyaxjQhKpQSKGhLDV8PXg9ayZuvBmc6rARoJf0zFBSPV22n4-a72uJ-",
  issue39:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAeJcpcP7B3v0fHO4PIA-5flDjKY-ojJdsy8kfEXmnqSRGHylDXKTyxJ3CLHAMPY5gr-p5t4XSGRo8L3zq7VRLFiQ7JCPBKRpCQuhkQ4d6gtAjf-HGDQKTytoKV3B4dvcranMrWqNOCnAzxTPdmLxXfqbUR19bV1OqdtnefoHAm_BekXQ9v8zz1n3xcoFGkBg1u5l0cG6AE5jRS6Bd3XWMvrUJg4wXGtXNq0bcr2n2g",
  issue38:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAXiSt7wMCa2q_G9eQJl5uaBprbwgiAis3mMPwP44gocXV9MpLdqo2r1L5ar2BaRLSC2Tc4bMlACLTylfBytNaLT-2YYnp7NyJXqp2VOQU9rlO7DFXCdCn_uBNnLAPUOyglbpJHEASlREGhm7AOkCpDMcM6n92CUz82oDhX02vq23Nv_WFsnzLy7uD7e_clh9qZU-bgmBf6otl-pqXlCiZeDCeSlZeF3qTgbKucraSB",
  silentHill:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOfxNM_PraYVQgrzKRHFj3XLTRrjtsEJv_5dDojY4LR9wGgwCCRhvjSMCc14BuCjuMERxR0aA2pKvpREJJ7b87xaxGe0eUa1oPA0-3axMM0_EoOgx-x9m_Wa2yTCKF3lSQt42zkNhuFoUt6gyOjw-3g0PErC80zHjN9WY863B3bI6trkQ885DP6ftsefWgku2DmwT17Jt8e0geI2bPLtl2jC1xLwZMdV6rVZda5T2q",
  animalWell:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC8OWS4tZlq211_BYHnMx7VqakiEtVtj1OtcbUW_cOsIZ09L4A6b6s1nLK1fBU_Grqb4XI6mG-2mbHfhinBkHXA_QvxU1GepXnmEU7XXLy1XtJU6TVAOIUWgrYNr3OWjRXcW14czVMdfcHbCOlTCz-1YB0ITrNl80q2Z7adjFKBZNDFgOTwaytaw4whcG_IiNmcgu_Iqog92_x9zfttnOCG8ks2BA4swHkelkk4l1dy",
  astroBot:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAVguyxQI3N06lHVBZaJi0EwwthSW_NbpskT5Xa1o6oBhSawDBwTsP2Zv2zN4bTT7GiV3Yp1-RIBQ8qPWxLaS7wUAiVuWuHDsGcw5yfEg3DjRcPXGITQkHxGr4MXbYMntggTmMoEmy2cE3qdNee_wkyHL-dOBVbk9IhCPey0XZNBiLbRlokI_yK2E4tTBidUK_t_UBNT9RzwdFBiqh2ufwQBcUSVlmfE7yC-8-9Gsex",
  report:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAi5FMOy7-CPTbXCFL_DvfxnBZyx3oqWDTNplsqMv083Fag5qdEhAXxJV9GHhvuaGnMtpS8rmSGFpjds8VQK-bF8fx2Qo8sGQMRqBt1hwScaTMHrn1LyTE7CN_XcQ7Zuwj10N4ijP5UZ58xfD7B6wFcBHE0eW_SsrUozHTB8Ifg8DUzmw3gJ3z0VXqUigrmrtWnz8XeiRIlx3wSu5NFapsOrKOYCiUchtnS9AdRwxmb",
  shirt:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPryWJO91K8QGmwr3OJxtxGopI9c6RSutFpzJKYgVNPd4oqOjyX0-ZC_VTTSOvh-Jr18kcD-hkbBnajrDzLg97FV39UNMFyLwygxatK8GXG8Kb4Oon-0BMyRURnV08Fm5dnEkCnf0_LUGb6e_Y4X9GIS31HMwe4atLTISpk7X3Eq9FPf8aoT0NYwxc0Z-EU9MZ7qNln08BgoV1LbfxIZFEQTXK2tX3_8CRjVld0vM",
  cap:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCErKa6j-6Z8xk0NSRJq0SPPZRuAEGB-wWOXH_QFCRrABZq_DG28b0i1sMXG7A13z4dC9MKutujGMmDxME7mMiM2VuLKLCPfAdHDpb_K74PUcGSRhsqnBs5gYv5mnJ73iTak92s6b352NH_JeyWa2wu4Yqifa8nAWSfJZ9XBXluSvCp4RdpzSfC2MBgYleUDEN7dvBv4oKGS3D3v5ae5qXDPBIIlzQtObbFHTeTzBRZ",
  book:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3l_c10BRCv3YZ3jkzzPjyTkWrEhfEZ2TrDZJTuMxvDl1MIutqH9-D6DRBtfQSge-fdAW_IIF9FREyAxFlwlPexk9Dsri2A6HDXdawdZKzOv69smnH7HAdg26tQYv8FYnG06886xVj6f2IgvGJqIOBKxHFlFkHpy06ICiANKPxtgMDCP4vSvk8TWKjuq99drkurgqPcXgUtWmSqw1bZsjz01ZD9hS8D3L1lzz7K9Qx",
  deskmat:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCRM4g3M9ocE8ZbtzqB0PO-aOAVYoGZ4zne9_fS-3QFE3EJs91Od17EVa76v_FfriAwd6U45FjRg153onLVEoZ1zEP7R8NrsapQyhrNa4EpasLN0rXvtI-k5qLsnbzorOhHQCGYLjlKw3rUKDvSHBuZZvPWyJ0E40U0VzmT8l8NY0vbetT9jRja1Q7NiWzx1xjJM78yWshy-K0ZO4iu2fTTlLA7lGB8W3O_Yh_EZaYL",
};

const issues: Issue[] = [
  {
    number: "40",
    date: "JULIO 2024",
    pages: "164 PÁGS",
    title: "#40 LA ERA DE LOS 16-BITS",
    description:
      "Arqueología del chip Yamaha FM, el declive de las recreativas de barrio y entrevista con Naoto Ohshima.",
    image: image.issue40,
    badge: "SERIGRAFÍA PLATA",
  },
  {
    number: "39",
    date: "ABRIL 2024",
    pages: "180 PÁGS",
    title: "#39 MUNDOS ABIERTOS EN CRISIS",
    description:
      "La fatiga del coleccionable compulsivo, topografía interactiva y ensayos sobre el vacío digital.",
    image: image.issue39,
    badge: "ÚLTIMAS 20 UNIDADES",
  },
  {
    number: "38",
    date: "ENERO 2024",
    pages: "156 PÁGS",
    title: "#38 ESPECIAL INDIE ESPAÑOL",
    description:
      "Radiografía del tejido autoral independiente y fotografías en los estudios de sus creadores.",
    image: image.issue38,
    badge: "REEDICIÓN LIMITADA",
  },
];

const reviews: Review[] = [
  {
    title: "SILENT HILL 2",
    studio: "BLOOBER TEAM / KONAMI",
    score: "10/10",
    verdict: "OBRA MAESTRA",
    image: image.silentHill,
    quote:
      "Una reconstrucción quirúrgica de la culpa humana. Este juego expande el silencio y la niebla con una madurez escénica sobrecogedora.",
    good: "Un diseño sonoro que convierte la niebla en un personaje vivo.",
    caveat: "Exige paciencia absoluta y rechaza las prisas modernas.",
    author: "MARTA G. CARRILLO",
  },
  {
    title: "ANIMAL WELL",
    studio: "SHARED MEMORY / INDIE",
    score: "9.5",
    verdict: "RECOMENDADO JGAMES",
    image: image.animalWell,
    quote:
      "El micro-laberinto más denso y fascinante de la década. Cada pantalla altera las leyes físicas del misterio.",
    good: "Criptografía lúdica sin parangón en el medio interactivo.",
    caveat: "Puede alienar a quien busca una narrativa lineal.",
    author: "DIEGO ALONSO",
  },
  {
    title: "ASTRO BOT",
    studio: "TEAM ASOBI / SONY",
    score: "8.0",
    verdict: "NOTABLE ALTO",
    image: image.astroBot,
    quote:
      "Júbilo cinético y festín táctil. A veces, su nostalgia de marca nubla su propia identidad.",
    good: "Invención continua de mecánicas y un control excelente.",
    caveat: "La nostalgia corporativa ocupa demasiado espacio.",
    author: "SERGI MONTERO",
  },
];

const leadArticle: Article = {
  category: "REPORTAJE CENTRAL",
  date: "28 OCT",
  readTime: "12 MIN DE LECTURA",
  title:
    "LA OLA DE DESPIDOS EN LA INDUSTRIA DEL VIDEOJUEGO: ¿QUIÉN DECIDE EL VALOR DEL JUEGO?",
  summary:
    "Voces de desarrolladores de distintos estudios analizan cómo los fondos de inversión están transformando el trabajo creativo en balances trimestrales.",
  image: image.report,
  author: "REDACCIÓN JGAMES",
};

const articles: Article[] = [
  {
    category: "COLUMNA",
    date: "26 OCT",
    readTime: "5 MIN",
    title:
      "¿POR QUÉ LA PRESERVACIÓN DIGITAL DEPENDE MÁS DE LA PIRATERÍA QUE DE LAS GRANDES COMPAÑÍAS?",
    summary:
      "El cierre de tiendas digitales pone de manifiesto la obsolescencia programada del patrimonio cultural del software.",
  },
  {
    category: "ENTREVISTA",
    date: "24 OCT",
    readTime: "8 MIN",
    title:
      'CONVERSACIÓN CON YUJI HORII: «EL ROL NUNCA FUE SOBRE NÚMEROS»',
    summary:
      "Un encuentro sobre la sencillez de los menús, la aventura y la eternidad del trazo de Toriyama.",
  },
  {
    category: "TECNOLOGÍA",
    date: "21 OCT",
    readTime: "6 MIN",
    title: "EL OCASO DE LOS MOTORES PROPIOS Y EL MONOPOLIO INVISIBLE",
    summary:
      "Cómo la homogeneización técnica amenaza con borrar la firma de autor en el 3D contemporáneo.",
  },
];

const products: Product[] = [
  {
    name: "CAMISETA ‘INSERT COIN BAUHAUS’",
    note: "EDICIÓN 150 UDS",
    description: "Algodón peinado de 240 g y serigrafía bicromática.",
    price: 28,
    image: image.shirt,
  },
  {
    name: "GORRA JGAMES CLUB 6-PANEL",
    note: "BORDADO DE ALTA DENSIDAD",
    description: "Sarga de algodón negro lavado y cierre metálico.",
    price: 24,
    image: image.cap,
  },
  {
    name: "ANUARIO CONCEPT ART 2024",
    note: "LIBRO DE ARTE EN TELA",
    description: "320 páginas con bocetos de 40 ilustradores indie.",
    price: 45,
    image: image.book,
  },
  {
    name: "DESKMAT ‘BRUTALIST GRID’",
    note: "900 × 400 MM / 4 MM",
    description: "Base de caucho antideslizante con costura reforzada.",
    price: 22,
    image: image.deskmat,
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(price);

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d="M4 8h16l-1 13H5L4 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce(
    (total, line) => total + line.price * line.quantity,
    0,
  );
  const visibleArticles = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    if (!query) return articles;
    return articles.filter((article) =>
      `${article.category} ${article.title} ${article.summary}`
        .toLocaleLowerCase("es")
        .includes(query),
    );
  }, [search]);

  function addToCart(name: string, price: number) {
    setCart((current) => {
      const existing = current.find((line) => line.name === name);
      if (existing) {
        return current.map((line) =>
          line.name === name ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...current, { name, price, quantity: 1 }];
    });
    setCartMessage(`${name} añadido a la cesta.`);
    setCartOpen(true);
  }

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="header-main">
          <a className="wordmark" href="#inicio" aria-label="JGAMES, inicio">
            JGAMES
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-bars" aria-hidden="true">
              {menuOpen ? "×" : "☰"}
            </span>
            <span className="sr-only">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
          <nav
            className={`main-nav${menuOpen ? " is-open" : ""}`}
            id="site-navigation"
            aria-label="Navegación principal"
          >
            <a href="#archivo" onClick={closeMenu}>Revista</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#noticias" onClick={closeMenu}>Noticias</a>
            <a href="#merch" onClick={closeMenu}>Merch</a>
            <label className="header-search">
              <SearchIcon />
              <span className="sr-only">Buscar noticias</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="BUSCAR NOTICIAS..."
              />
            </label>
          </nav>
          <div className="cart-wrap">
            <button
              className="button button-light button-small cart-button"
              type="button"
              aria-expanded={cartOpen}
              aria-controls="cart-panel"
              onClick={() => setCartOpen((open) => !open)}
            >
              <BagIcon />
              <span>Cesta ({cartCount})</span>
            </button>
            {cartOpen && (
              <div className="cart-panel" id="cart-panel" role="region" aria-label="Cesta de compra">
                <div className="cart-panel-heading">
                  <strong>Tu cesta</strong>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => setCartOpen(false)}
                    aria-label="Cerrar cesta"
                  >
                    ×
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p>Tu cesta está vacía. Descubre la revista y los objetos de colección.</p>
                ) : (
                  <>
                    <ul className="cart-lines">
                      {cart.map((line) => (
                        <li key={line.name}>
                          <span>{line.quantity} × {line.name}</span>
                          <strong>{formatPrice(line.price * line.quantity)}</strong>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total">
                      <span>Subtotal</span>
                      <strong>{formatPrice(cartTotal)}</strong>
                    </div>
                    <p className="cart-note">El envío se calcula al confirmar el pedido.</p>
                  </>
                )}
              </div>
            )}
          </div>
          <a className="button button-red button-small header-cta" href="#club">
            Suscríbete
          </a>
        </div>
      </header>

      <div className="ticker" aria-label="Novedades de JGAMES">
        <div className="ticker-track" aria-hidden="true">
          <span>✦ EL VIDEOJUEGO TAMBIÉN SE LEE EN PAPEL</span>
          <b>///</b>
          <span>CRÍTICA INDEPENDIENTE, SIN ATADURAS</span>
          <b>///</b>
          <span className="ticker-highlight">NÚMERO 41 · EDICIÓN CON PÓSTER</span>
          <b>///</b>
          <span>HISTORIA, CULTURA Y VIDEOJUEGOS</span>
          <b>///</b>
          <span>✦ EL VIDEOJUEGO TAMBIÉN SE LEE EN PAPEL</span>
          <b>///</b>
          <span>CRÍTICA INDEPENDIENTE, SIN ATADURAS</span>
          <b>///</b>
          <span className="ticker-highlight">NÚMERO 41 · EDICIÓN CON PÓSTER</span>
        </div>
      </div>

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <p className="eyebrow boxed-eyebrow">
                <span className="eyebrow-dot" />
                REVISTA INDEPENDIENTE · EDICIÓN DE COLECCIÓN
              </p>
              <h1 id="hero-title">
                EL PERIODISMO DE VIDEOJUEGOS <span>VUELVE AL PAPEL</span>
              </h1>
              <p className="hero-description">
                Ensayos profundos, crítica sin ataduras comerciales y fotografía
                artística en papel de alto gramaje. Una revista hecha para leer,
                guardar y volver a abrir.
              </p>
              <div className="hero-actions">
                <a className="button button-yellow button-large" href="#numero-actual">
                  Comprar número 41 · 12,50 €
                </a>
                <a className="button button-light button-large" href="#club">
                  Suscripción anual
                </a>
              </div>
              <dl className="spec-grid" aria-label="Características de la revista">
                <div><dt>Papel</dt><dd>140 g · mate</dd></div>
                <div><dt>Contenido</dt><dd>176 páginas</dd></div>
                <div><dt>Edición</dt><dd>Sin anuncios</dd></div>
              </dl>
            </div>

            <article className="current-issue" id="numero-actual">
              <div className="current-issue-top">
                <div>
                  <span className="label-dark">VOL. 41</span>
                  <p>EDICIÓN DE COLECCIÓN</p>
                </div>
                <span className="label-red">CON PÓSTER A2</span>
              </div>
              <div className="current-cover image-frame">
                <img
                  src={image.current}
                  alt="Portada de JGAMES con arte ciberpunk en blanco y negro y tipografía amarilla"
                  fetchPriority="high"
                />
                <div className="cover-caption">
                  <strong>MONOGRÁFICO: CIBERPUNK Y NOSTALGIA</strong>
                  <span>12,50 €</span>
                </div>
              </div>
              <div className="issue-stock">
                <span>DISPONIBLE · EDICIÓN LIMITADA</span>
                <span className="red-text">12,50 €</span>
              </div>
              <button
                className="button button-dark full-width"
                type="button"
                onClick={() => addToCart("JGAMES · Número 41", 12.5)}
              >
                Añadir a la cesta + póster de regalo
              </button>
            </article>
          </div>
        </section>

        <section className="archive section page-width" id="archivo" aria-labelledby="archive-title">
          <SectionHeading
            eyebrow="[ ARCHIVO FÍSICO DE COLECCIÓN ]"
            title="NÚMEROS ANTERIORES"
            headingId="archive-title"
            description="Cada edición es una pieza para coleccionar: encuadernación cuidada, tintas directas y cero publicidad invasiva."
          />
          <div className="issue-grid">
            {issues.map((issue) => (
              <article className="issue-card card-offset" key={issue.number}>
                <div className="issue-meta">
                  <span className="label-dark">#{issue.number}</span>
                  <span>{issue.date}</span>
                  <span className="label-outline">{issue.pages}</span>
                </div>
                <div className="issue-cover image-frame">
                  <img src={issue.image} alt={`Portada del número ${issue.number} de JGAMES`} loading="lazy" />
                  <span className="cover-badge">{issue.badge}</span>
                </div>
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
                <div className="card-footer">
                  <strong>12,50 €</strong>
                  <button
                    className="button button-dark button-small"
                    type="button"
                    onClick={() => addToCart(`JGAMES · Número ${issue.number}`, 12.5)}
                  >
                    Añadir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews section" id="reviews" aria-labelledby="reviews-title">
          <div className="page-width">
            <SectionHeading
              eyebrow="CRÍTICA FORMAL · SIN COPIAS DE PRENSA CONDICIONADAS"
              title="ANÁLISIS SIN CONCESIONES"
              headingId="reviews-title"
              description="Nuestro equipo juega, investiga y escribe con independencia. Cada nota viene acompañada de argumentos."
            />
            <div className="review-grid">
              {reviews.map((review) => (
                <ReviewCard review={review} key={review.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="news section page-width" id="noticias" aria-labelledby="news-title">
          <div className="section-heading news-heading">
            <div>
              <p className="eyebrow red-text">[ REPORTAJES &amp; INVESTIGACIÓN ]</p>
              <h2 id="news-title">NOTICIAS &amp; BLOG CRÍTICO</h2>
            </div>
            <a className="button button-light button-small" href="#feed">
              Ver el feed diario <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="news-layout" id="feed">
            <article className="lead-story card-offset">
              <div>
                <div className="story-meta">
                  <span className="label-red">{leadArticle.category}</span>
                  <span>{leadArticle.date}</span>
                  <span>· {leadArticle.readTime}</span>
                </div>
                {leadArticle.image && (
                  <div className="lead-image image-frame">
                    <img src={leadArticle.image} alt="Estudio de desarrollo de videojuegos durante una jornada nocturna" loading="lazy" />
                  </div>
                )}
                <h3>{leadArticle.title}</h3>
                <p>{leadArticle.summary}</p>
              </div>
              <div className="card-footer story-footer">
                <span>{leadArticle.author}</span>
                <a href="#reviews">LEER MÁS <span aria-hidden="true">→</span></a>
              </div>
            </article>
            <div className="article-list" aria-live="polite">
              {visibleArticles.length > 0 ? (
                visibleArticles.map((article) => <ArticleCard article={article} key={article.title} />)
              ) : (
                <p className="empty-search">No encontramos artículos para «{search}».</p>
              )}
            </div>
          </div>
        </section>

        <section className="merch section" id="merch" aria-labelledby="merch-title">
          <div className="page-width">
            <SectionHeading
              eyebrow="[ JGAMES SUPPLY CO. ]"
              title="OBJETOS DE COLECCIÓN & MERCH"
              headingId="merch-title"
              description="Tiradas pequeñas, serigrafía artesanal y materiales elegidos para durar."
            />
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card card-offset" key={product.name}>
                  <div className="product-image image-frame">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <p className="eyebrow red-text">{product.note}</p>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="card-footer">
                    <strong>{formatPrice(product.price)}</strong>
                    <button
                      className="button button-dark button-small"
                      type="button"
                      onClick={() => addToCart(product.name, product.price)}
                    >
                      Comprar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="club section page-width" id="club" aria-labelledby="club-title">
          <div className="club-panel card-offset-yellow">
            <span className="club-watermark" aria-hidden="true">CLUB</span>
            <div className="club-content">
              <span className="label-dark">SUSCRIPCIÓN ANUAL · 4 NÚMEROS</span>
              <h2 id="club-title">ÚNETE AL CLUB DE LECTORES DE JGAMES</h2>
              <p>
                Cada trimestre, la revista llega a tu buzón en un paquete protegido.
                La suscripción incluye acceso al archivo digital, descuento en la tienda
                y un póster de colección por número.
              </p>
              <form className="subscribe-form" onSubmit={subscribe}>
                <label className="sr-only" htmlFor="subscriber-email">Tu correo electrónico</label>
                <input
                  id="subscriber-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubscribed(false);
                  }}
                  placeholder="TU CORREO ELECTRÓNICO..."
                  required
                />
                <button className="button button-red button-large" type="submit">
                  Suscribirme · 44 € / año
                </button>
              </form>
              <p className="subscribe-message" aria-live="polite">
                {subscribed ? `¡Gracias! Hemos guardado ${email} para la suscripción.` : "Envío incluido · Cancela cuando quieras"}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid page-width">
          <div className="footer-brand">
            <a href="#inicio">JGAMES</a>
            <p>
              Publicación independiente consagrada al análisis crítico, estético e
              histórico del videojuego como forma de cultura contemporánea.
            </p>
            <span className="footer-stamp">IMPRESIÓN RESPONSABLE · TINTAS VEGETALES</span>
          </div>
          <div className="footer-links">
            <h2>EDICIONES &amp; TIENDA</h2>
            <a href="#club">Suscripción</a>
            <a href="#numero-actual">Número actual</a>
            <a href="#archivo">Archivo</a>
            <a href="#merch">Merchandising</a>
          </div>
          <div className="footer-links">
            <h2>LECTURA &amp; REDACCIÓN</h2>
            <a href="#reviews">Reviews</a>
            <a href="#noticias">Noticias y ensayos</a>
            <a href="mailto:redaccion@jgames-magazine.com">redaccion@jgames-magazine.com</a>
          </div>
        </div>
        <div className="footer-bottom page-width">
          <span>© 2026 JGAMES MAGAZINE · PAPEL PARA LEER SIN PRISA</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
      <p className="sr-only" aria-live="polite">{cartMessage}</p>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  headingId,
  description,
}: {
  eyebrow: string;
  title: string;
  headingId: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow red-text">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card card-offset">
      <div className="review-top">
        <div>
          <p className="eyebrow red-text">{review.verdict}</p>
          <h3>{review.title}</h3>
          <span className="review-studio">{review.studio}</span>
        </div>
        <span className={`score${review.score === "10/10" ? " score-red" : ""}`}>{review.score}</span>
      </div>
      <div className="review-image image-frame">
        <img src={review.image} alt={`Imagen editorial de ${review.title}`} loading="lazy" />
      </div>
      <p className="review-quote">“{review.quote}”</p>
      <ul className="review-points">
        <li><span aria-hidden="true">▲</span>{review.good}</li>
        <li><span aria-hidden="true">▼</span>{review.caveat}</li>
      </ul>
      <div className="card-footer review-footer">
        <span>POR {review.author}</span>
        <a href="#noticias">LEER ENSAYO <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <div className="story-meta">
        <span className="label-dark">{article.category}</span>
        <span>{article.date} · {article.readTime}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
    </article>
  );
}

export default App;
