(() => {
  "use strict";

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canAnimate = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !reduceMotion;
  const EMAIL = "heinern14@gmail.com";

  /* ------------------------------------------------------------------ i18n */
  // English text is read from the markup itself; only Spanish is listed here.
  const ES = {
    skip: "Saltar al contenido",
    nav_about: "Sobre mí", nav_stack: "Tecnologías", nav_work: "Proyectos", nav_exp: "Experiencia", nav_contact: "Contacto",
    status: "Disponible de inmediato · Costa Rica (UTC-6)",
    hero_1: "Desarrollador junior",
    hero_2: "que mantiene los sistemas <em>funcionando.</em>",
    lead: "Construyo aplicaciones web y trabajo con bases de datos, y entiendo la infraestructura porque la he soportado, en sitio y de forma remota. Estudio Ingeniería en Sistemas y busco un equipo donde seguir aprendiendo en proyectos reales.",
    btn_cv: "Descargar CV", btn_contact: "Escríbeme", scroll: "bajar",
    k_about: "Sobre mí", about_h: "Del soporte técnico al editor de código.",
    about_1: "Voy por la mitad de Ingeniería en Sistemas en la Universidad Americana y trabajo en tecnología desde 2017: mantenimiento de equipos, soporte en sitio para empresas, virtualización de servidores y, más recientemente, una plataforma web corporativa con inventario y gestión de ventas.",
    about_2: "Antes pasé seis años en Align Technology hablando a diario con doctores de todo el mundo para convertir sus requisitos en planes de tratamiento 3D precisos, y automaticé partes del flujo para reducir el tiempo de fabricación. Eso me enseñó a escuchar al cliente, hacer las preguntas correctas y entregar justo lo acordado.",
    s1: "trabajando en TI desde", s2: "años de comunicación diaria con clientes", s3: "nota EF SET de inglés (C2)", s4: "proyectos con pruebas, públicos en GitHub",
    k_stack: "Tecnologías", stack_h: "Las herramientas con las que trabajo.",
    stack_note: "Niveles honestos: soy junior, así que casi todo es básico a intermedio, y lo sigo mejorando con proyectos reales.",
    st1: "Desarrollo", st2: "Datos", st3: "Sistemas", st4: "Redes y soporte",
    lv_bi: "básico – intermedio", c_int: "Integridad de datos", c_basic: "(básico)", c_ts: "Diagnóstico de fallas", c_onsite: "Soporte en sitio y remoto",
    k_work: "Proyectos", work_h: "Proyectos pequeños, bien hechos.",
    work_note: "Solo datos de ejemplo. Cada uno tiene pruebas, README y código público.",
    p1_d: "Aplicación web para gestionar el inventario de productos y armar cotizaciones. El servidor valida el stock y calcula subtotal, impuesto y total, así que el cliente nunca puede enviar números incorrectos.",
    p2_d: "Herramientas de línea de comandos en Python: un organizador de archivos seguro por defecto (simulación, nunca sobrescribe) y un reporte que resume una exportación CSV de tickets de soporte. Solo biblioteca estándar.",
    p3_d: "Las guías paso a paso que uso en el trabajo, escritas: diagnóstico de redes, lista para reinstalar Windows, básicos de Linux y laboratorios de virtualización.",
    view_code: "Ver código", view_notes: "Ver notas",
    ck1: "¿Es solo este usuario?", ck2: "Cable, luz de enlace, Wi-Fi", ck3: "Configuración IP: ¿169.254.x.x?", ck4: "Ping a puerta de enlace, 8.8.8.8, nombre", ck5: "DNS: nslookup, limpiar caché", ck6: "Rastrear dónde se detiene el tráfico",
    k_exp: "Experiencia", exp_h: "Dónde he trabajado.", present: "actualidad",
    j1_t: "Administrador de sistemas y desarrollador",
    j1_1: "Construí una plataforma web corporativa con inventario y gestión comercial integrados.",
    j1_2: "Desarrollé módulos de pedidos y cotizaciones con procesamiento de datos en tiempo real y protocolos de seguridad.",
    j1_3: "Administro servidores y bases de datos relacionales y mantengo los servicios funcionando ante fallas críticas.",
    j2_t: "Diseñador CAD",
    j2_1: "Trabajé a diario con doctores de todo el mundo para convertir sus requisitos en planes de tratamiento 3D.",
    j2_2: "Optimicé y automaticé flujos en software especializado para reducir el tiempo de fabricación.",
    j2_3: "Capacité e incorporé a nuevos compañeros.",
    j3_t: "Desarrollador y soporte técnico",
    j3_1: "Desarrollé en Java y construí interfaces web con HTML/CSS.",
    j3_2: "Soporte en sitio a empresas clientes: armé, di mantenimiento y virtualicé servidores y resolví incidentes de red.",
    j4_t: "Técnico de mantenimiento informático",
    j4_1: "Mantenimiento preventivo y correctivo, diagnóstico de hardware y software, y actualización de bases de datos.",
    k_edu: "Educación", e1: "Bachillerato en Ingeniería en Sistemas", e1b: "(en curso, previsto 2028), Universidad Americana",
    e2: "Bachiller técnico en Soporte Técnico Informático, CTP Fernando Volio Jiménez", e3: "Cisco IT Essentials y Cisco CCNA 1",
    k_contact: "Contacto", contact_h: "Trabajemos juntos.",
    contact_note: "La forma más rápida de contactarme es el correo. Respondo pronto.",
    copy: "clic para copiar", copied: "¡copiado!", btn_mail: "Enviar un correo",
    built: "Hecho a mano con HTML, CSS, JavaScript, GSAP y WebGL.",
    t_whoami: "heiner — desarrollador junior, base en soporte TI",
    t_stack: "python · javascript · sql · linux · redes",
    t_status: "disponible: de inmediato · remoto"
  };
  const EN_TERM = {
    t_whoami: "heiner — junior developer, IT support background",
    t_stack: "python · javascript · sql · linux · networking",
    t_status: "available: immediately · remote ok"
  };

  const EN = { ...EN_TERM };
  $$("[data-i18n]").forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  $$("[data-i18n-split]").forEach(el => { EN[el.dataset.i18nSplit] = el.innerHTML; });
  EN.copied = "copied!";
  const dict = { en: EN, es: ES };
  let lang = "en";

  /* ------------------------------------------------------------ word split */
  function splitInto(node) {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "w";
          const i = document.createElement("span"); i.className = "wi"; i.textContent = part;
          w.appendChild(i); frag.appendChild(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) {
        splitInto(child);
      }
    });
  }

  function applyText(el, html) {
    el.innerHTML = html;
    if (el.hasAttribute("data-i18n-split") && canAnimate) {
      splitInto(el);
      gsap.set($$(".wi", el), { yPercent: el.dataset.done ? 0 : 110 });
    }
  }

  function setLang(next) {
    lang = next;
    root.lang = next;
    const d = dict[next];
    $$("[data-i18n], [data-i18n-split]").forEach(el => {
      const key = el.dataset.i18n || el.dataset.i18nSplit;
      if (d[key] !== undefined) applyText(el, d[key]);
    });
    $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === next)));
    const h1 = $("#hero-title");
    if (h1) h1.setAttribute("aria-label", h1.textContent.replace(/\s+/g, " ").trim());
    renderTerm(false);
    try { localStorage.setItem("lang", next); } catch (e) { /* storage may be blocked */ }
    if (canAnimate) ScrollTrigger.refresh();
  }

  /* ------------------------------------------------------- hero terminal */
  let termRun = 0;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function renderTerm(animate) {
    const pre = $("#term");
    if (!pre) return;
    const d = dict[lang];
    const rows = [
      { cmd: "whoami", out: d.t_whoami },
      { cmd: "cat stack.txt", out: d.t_stack },
      { cmd: "status --now", out: d.t_status }
    ];
    const run = ++termRun;
    pre.textContent = "";
    const caret = document.createElement("span"); caret.className = "caret";
    if (!animate) {
      rows.forEach(r => {
        pre.insertAdjacentHTML("beforeend", `<span class="g">$</span> ${r.cmd}\n<span class="m">${r.out}</span>\n`);
      });
      pre.appendChild(caret);
      return;
    }
    for (const r of rows) {
      if (run !== termRun) return;
      const line = document.createElement("span");
      line.innerHTML = '<span class="g">$</span> ';
      pre.appendChild(line);
      pre.appendChild(caret);
      for (const ch of r.cmd) {
        if (run !== termRun) return;
        line.append(ch); await sleep(38 + Math.random() * 40);
      }
      pre.insertBefore(document.createTextNode("\n"), caret);
      await sleep(180);
      const out = document.createElement("span"); out.className = "m";
      pre.insertBefore(out, caret);
      for (const ch of r.out) {
        if (run !== termRun) return;
        out.append(ch); await sleep(10);
      }
      pre.insertBefore(document.createTextNode("\n"), caret);
      await sleep(260);
    }
  }

  /* -------------------------------------------------------------- WebGL */
  function startShader() {
    const canvas = $("#bg");
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const fs = `
      precision highp float;
      uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
      float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
        return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
      }
      float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 7.3; a *= .5; } return v; }
      void main(){
        vec2 p = (gl_FragCoord.xy - .5 * u_res) / u_res.y;
        vec2 m = (u_mouse - .5 * u_res) / u_res.y;
        float t = u_time * .05;
        vec2 q = vec2(fbm(p * 2. + t), fbm(p * 2. + vec2(5.2, 1.3) - t));
        vec2 r = vec2(fbm(p * 2. + 4. * q + vec2(1.7, 9.2) + .15 * t), fbm(p * 2. + 4. * q + vec2(8.3, 2.8) + .126 * t));
        float f = fbm(p * 2. + 4. * r);
        f += .32 * exp(-length(p - m) * 3.2);
        vec3 base = vec3(.035, .035, .04);
        vec3 mid  = vec3(.075, .085, .06);
        vec3 glow = vec3(.79, 1., .24);
        vec3 col = mix(base, mid, smoothstep(.2, .8, f));
        col += glow * smoothstep(.62, 1.15, f) * .34;
        col *= 1. - .55 * length(p * vec2(.8, 1.1));
        col += (hash(gl_FragCoord.xy + u_time) - .5) * .018;
        gl_FragColor = vec4(col, 1.);
      }`;

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const scale = 0.55;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * scale;
      const w = Math.max(2, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(2, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      mouse.x = mouse.tx = w * 0.72; mouse.y = mouse.ty = h * 0.62;
    }
    resize();
    addEventListener("resize", resize);

    const hero = $(".hero");
    hero.addEventListener("pointermove", e => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width * canvas.width;
      mouse.ty = (1 - (e.clientY - r.top) / r.height) * canvas.height;
    });

    let visible = true, last = 0;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(frame); }, { threshold: 0 }).observe(hero);

    function draw(t) {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function frame(t) {
      if (!visible || document.hidden) return;
      if (t - last > 30) { draw(t); last = t; }
      requestAnimationFrame(frame);
    }
    document.addEventListener("visibilitychange", () => { if (!document.hidden) requestAnimationFrame(frame); });
    if (reduceMotion) draw(8000); else requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------ cursor */
  function setupCursor() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const c = $("#cursor"), dot = $(".cursor-dot", c), ring = $(".cursor-ring", c);
    const dx = gsap.quickTo(dot, "x", { duration: 0.08 }), dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" }), ry = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });
    addEventListener("pointermove", e => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); }, { passive: true });
    document.addEventListener("pointerover", e => { c.classList.toggle("is-hover", !!e.target.closest("a, button, [data-magnetic]")); });
  }

  function setupMagnetic() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$("[data-magnetic]").forEach(el => {
      const strength = 0.28;
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength, duration: 0.4, ease: "power3.out" });
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" }));
    });
  }

  function setupTilt() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$("[data-tilt]").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
        gsap.to(el, { rotationY: (px - 0.5) * 7, rotationX: (0.5 - py) * 7, transformPerspective: 900, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" }));
    });
  }

  /* ---------------------------------------------------- scroll behaviour */
  function setupScroll() {
    let lenis = null;
    if (typeof Lenis !== "undefined") {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const target = $(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: a.getAttribute("href") === "#top" ? 0 : -40, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
    }));

    const header = $("#header"), bar = $("#progress");
    let lastY = 0;
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: self => {
        const y = self.scroll();
        header.classList.toggle("scrolled", y > 30);
        header.classList.toggle("hide", y > 400 && y > lastY + 4);
        if (y < lastY - 4) header.classList.remove("hide");
        lastY = y;
        bar.style.transform = `scaleX(${self.progress})`;
      }
    });

    $$("main > section[id]").forEach(sec => {
      const link = $(`.nav a[href="#${sec.id}"]`);
      if (!link) return;
      ScrollTrigger.create({ trigger: sec, start: "top 55%", end: "bottom 55%", onToggle: s => link.classList.toggle("active", s.isActive) });
    });
  }

  function setupReveals() {
    // headings: words slide up from a mask
    $$("[data-i18n-split]").forEach(el => {
      if (el.closest(".hero")) return;
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => {
          el.dataset.done = "1";
          gsap.to($$(".wi", el), { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.06 });
        }
      });
    });

    ScrollTrigger.batch($$("[data-reveal]").filter(el => !el.closest(".hero")), {
      start: "top 90%", once: true,
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09, overwrite: "auto" })
    });

    // counters
    $$("[data-count]").forEach(el => {
      const target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10);
      const o = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: () => gsap.to(o, {
          v: target, duration: 1.8, ease: "power2.out",
          onUpdate: () => { el.textContent = dec ? o.v.toFixed(dec) : String(Math.round(o.v)); }
        })
      });
    });

    // typed terminal inside the project card
    $$("[data-type]").forEach(pre => {
      const full = pre.textContent;
      pre.textContent = "";
      const state = { n: 0 };
      ScrollTrigger.create({
        trigger: pre, start: "top 80%", once: true,
        onEnter: () => gsap.to(state, {
          n: full.length, duration: 2.6, ease: "none",
          onUpdate: () => { pre.textContent = full.slice(0, Math.round(state.n)); }
        })
      });
    });

    // checklist ticks one by one
    $$(".check").forEach(list => {
      ScrollTrigger.create({
        trigger: list, start: "top 78%", once: true,
        onEnter: () => $$("li", list).forEach((li, i) => gsap.delayedCall(0.35 + i * 0.5, () => li.classList.add("done")))
      });
    });

    // timeline line + dots
    const fill = $("#tl-fill");
    if (fill) {
      gsap.to(fill, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#timeline", start: "top 65%", end: "bottom 75%", scrub: 0.4 } });
      $$(".job").forEach(job => ScrollTrigger.create({ trigger: job, start: "top 66%", onToggle: s => job.classList.toggle("on", s.isActive || s.progress === 1), onEnter: () => job.classList.add("on") }));
    }

    // stacked project cards (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 961px)", () => {
      const cards = $$("[data-card]");
      cards.forEach((card, i) => {
        card.style.setProperty("--i", i);
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.94, filter: "brightness(0.55)", ease: "none",
          scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true }
        });
      });
      return () => cards.forEach(c => gsap.set(c, { clearProps: "transform,filter" }));
    });
  }

  /* -------------------------------------------------------------- intro */
  function intro() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    const heroWords = $$(".hero-title .wi");
    const heroReveal = $$(".hero [data-reveal]");
    tl.to(heroReveal[0], { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(heroWords, { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.1)
      .to(heroReveal.slice(1), { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.7)
      .add(() => { $(".hero-title").dataset.done = "1"; renderTerm(true); }, 1.0)
      .from(".site-header .bar", { y: -30, opacity: 0, duration: 1 }, 0.4);
  }

  function runLoader(done) {
    const loader = $("#loader");
    if (!loader) { done(); return; }
    const num = $("#loader-num"), fill = $("#loader-fill");
    const o = { v: 0 };
    document.body.style.overflow = "hidden";
    const finish = () => {
      document.body.style.overflow = "";
      loader.remove();
    };
    gsap.timeline()
      .to(o, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => { num.textContent = Math.round(o.v); fill.style.transform = `scaleX(${o.v / 100})`; } })
      .to(loader, { yPercent: -100, duration: 0.95, ease: "power4.inOut", delay: 0.15, onStart: done, onComplete: finish });
  }

  /* --------------------------------------------------------------- init */
  function copyMail() {
    const btn = $("#copy-mail"), hint = $("#copy-hint");
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(EMAIL); }
      catch (e) {
        const t = document.createElement("textarea"); t.value = EMAIL; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); } catch (err) { /* ignore */ }
        t.remove();
      }
      btn.classList.add("copied");
      hint.textContent = dict[lang].copied;
      setTimeout(() => { btn.classList.remove("copied"); hint.textContent = dict[lang].copy || "click to copy"; }, 2000);
    });
  }

  function init() {
    $("#year").textContent = new Date().getFullYear();
    $$(".lang button").forEach(b => b.addEventListener("click", () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }));
    copyMail();

    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) { /* ignore */ }
    const initial = saved || ((navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en");

    if (!canAnimate) {
      // no animation library, or reduced motion: static page, all content visible
      $("#loader") && $("#loader").remove();
      root.classList.remove("js");
      if (initial === "es") setLang("es"); else renderTerm(false);
      $$("[data-type]").forEach(() => {});
      startShader();
      $$("[data-count]").forEach(el => {
        const t = parseFloat(el.dataset.count), d = parseInt(el.dataset.dec || "0", 10);
        el.textContent = d ? t.toFixed(d) : String(Math.round(t));
      });
      $$(".check li").forEach(li => li.classList.add("done"));
      $$(".job").forEach(j => j.classList.add("on"));
      $("#tl-fill") && ($("#tl-fill").style.transform = "scaleY(1)");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("anim");
    gsap.set($$("[data-reveal]"), { opacity: 0, y: 28 });
    if (initial === "es") setLang("es"); else { setLang("en"); }
    setupCursor();
    setupMagnetic();
    setupTilt();
    startShader();
    setupScroll();
    setupReveals();
    runLoader(intro);
  }

  // Never leave the visitor stuck behind the loader if something goes wrong.
  setTimeout(() => { const l = $("#loader"); if (l) { l.remove(); document.body.style.overflow = ""; $$("[data-reveal], .wi").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; }); } }, 7000);

  const ready = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, sleep(1200)]) : Promise.resolve();
  ready.then(init);
})();
