(function () {
  "use strict";

  var STORAGE = {
    mode: "portfolio-mode",
    debugger: "portfolio-debugger"
  };

  var NAME_TITLES = [
    "Matthew Bodenstein",
    "Lead AI Software Developer",
    "Unity + VR Builder",
    "Full-Stack Product Engineer",
    "Graph API Nerd"
  ];

  var HERO_WORDS = [
    "AI systems",
    "VR experiences",
    "automation workflows",
    "practical products"
  ];

  var ASK_ANSWERS = {
    stack: "React, TypeScript, Node.js, OpenAI APIs, Supabase, PostgreSQL, Unity/C#, and cloud deployment (AWS, Azure).",
    ai: "Multi-agent workflows, LLM integrations, human-in-the-loop review, and production-minded AI ops tooling.",
    vr: "Unity VR for research and shipped Quest titles — physics, networking (Fusion), and Meta Quest SDK.",
    contact: "Email m.bodenstein@outlook.com or use LinkedIn / GitHub links in the contact section.",
    hire: "Open to collaborations on AI systems, full-stack product work, and immersive experiences. Reach out via email."
  };

  var CMD_ITEMS = [
    { id: "home", label: "Go to Home", run: function () { location.hash = "#home"; } },
    { id: "experience", label: "Go to Experience", run: function () { location.hash = "#experience"; } },
    { id: "projects", label: "Go to Projects", run: function () { location.hash = "#projects"; } },
    { id: "impact", label: "Go to Impact", run: function () { location.hash = "#impact"; } },
    { id: "talents", label: "Go to Talents", run: function () { location.hash = "#talents"; } },
    { id: "contact", label: "Go to Contact", run: function () { location.hash = "#contact"; } },
    { id: "email", label: "Copy email address", run: copyEmail },
    { id: "cv", label: "Open CV / Resume", run: function () { window.open("Matthew Bodenstein CV_Resume.pdf", "_blank", "noopener,noreferrer"); } },
    { id: "github", label: "Open GitHub", run: function () { window.open("https://github.com/MatthewBoden", "_blank", "noopener,noreferrer"); } },
    { id: "mode-recruiter", label: "Switch to Recruiter mode", run: function () { setAudienceMode("recruiter"); } },
    { id: "mode-builder", label: "Switch to Builder mode", run: function () { setAudienceMode("builder"); } },
    { id: "mode-technical", label: "Switch to Technical mode", run: function () { setAudienceMode("technical"); } },
    { id: "ask", label: "Ask the portfolio: What stack?", run: function () { showAskAnswer("stack"); } },
    { id: "case-deepseeker", label: "Open case study: DeepSeeker", run: function () { openCase("deepseeker"); } },
    { id: "case-classroom", label: "Open case study: Classroom Agent", run: function () { openCase("classroom-agent"); } },
    { id: "case-mount", label: "Open case study: Mount & Mail", run: function () { openCase("mount-mail"); } },
    { id: "thanks", label: "Hidden: Thanks page", run: function () { window.location.href = "thanks.html"; } }
  ];

  var spellBuffer = "";
  var nameClickCount = 0;
  var nameClickTimer = null;
  var footerClickCount = 0;
  var footerClickTimer = null;
  var reducedMotion = false;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function toast(message, duration) {
    var host = $("#toastHost");
    if (!host) return;
    var node = document.createElement("div");
    node.className = "portfolio-toast";
    node.textContent = message;
    host.appendChild(node);
    requestAnimationFrame(function () {
      node.classList.add("is-visible");
    });
    setTimeout(function () {
      node.classList.remove("is-visible");
      setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 320);
    }, duration || 2800);
  }

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  }

  function copyEmail() {
    var email = "m.bodenstein@outlook.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        toast("Email copied to clipboard.");
      });
    } else {
      window.location.href = "mailto:" + email;
    }
  }

  function openCase(id) {
    var btn = document.querySelector('.case-open[data-case="' + id + '"]');
    if (btn) btn.click();
    else toast("Case study not found.");
  }

  function showAskAnswer(key) {
    var panel = $("#askPanel");
    var answer = $("#askAnswer");
    if (!panel || !answer) return;
    answer.textContent = ASK_ANSWERS[key] || "Try: stack, ai, vr, contact, or hire.";
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function setAudienceMode(mode, silent) {
    localStorage.setItem(STORAGE.mode, mode);
    if (window.portfolioApplyAudienceMode) {
      window.portfolioApplyAudienceMode(mode);
    }
    $all(".mode-chip").forEach(function (chip) {
      chip.classList.toggle("is-active", chip.getAttribute("data-mode") === mode);
    });
    if (!silent) toast("Audience mode: " + mode + ".");
  }

  function initConsoleEasterEgg() {
    if (!window.console || !console.log) return;
    console.log(
      "%c👋 Curious engineer?%c Try spell codes (deepseeker, bacon, mount), ?egg=kevin|vr|agent, or Ctrl+K.",
      "color:#44d9ff;font-size:14px;font-weight:700;",
      "color:#9aa7c3;font-size:12px;"
    );
    if (localStorage.getItem(STORAGE.debugger) === "1") {
      console.log("%cWelcome back, debugger.%c Konami mode remembered.", "color:#8b7cff;font-weight:600;", "color:#9aa7c3;");
    }
  }

  function initKonami() {
    var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
    var pos = 0;
    document.addEventListener("keydown", function (e) {
      if (isTypingTarget(e.target)) return;
      if (e.key === seq[pos]) {
        pos += 1;
        if (pos === seq.length) {
          pos = 0;
          localStorage.setItem(STORAGE.debugger, "1");
          document.body.classList.add("debug-mode");
          var three = window.__portfolioThree;
          if (three) three.debugMode = true;
          var fps = $("#fpsCounter");
          if (fps) fps.hidden = false;
          toast("Debug mode unlocked. Wireframe boosted.");
        }
      } else {
        pos = e.key === seq[0] ? 1 : 0;
      }
    });
  }

  function applyUrlEggs() {
    var params = new URLSearchParams(window.location.search);
    var egg = params.get("egg");
    if (egg === "kevin") highlightProject("kevin-bacon", "egg-kevin");
    if (egg === "vr") {
      document.body.classList.add("egg-vr");
      highlightProject("mount-mail", "egg-vr-glow");
    }
    if (egg === "agent") highlightProject("classroom-agent", "egg-agent-shimmer");
    if (params.get("debug") === "1") {
      document.body.classList.add("debug-mode");
      var term = $("#debugTerminal");
      if (term) term.classList.add("is-open");
      var three = window.__portfolioThree;
      if (three) three.debugMode = true;
    }
    if (params.get("xr") === "1") triggerXrJoke();
  }

  function highlightProject(slug, className) {
    var card = document.querySelector('.project[data-project="' + slug + '"]');
    if (card) card.classList.add(className);
    if (slug === "kevin-bacon") {
      var badge = document.createElement("span");
      badge.className = "bacon-badge";
      badge.textContent = "∞ degrees of Matthew";
      card.querySelector(".project-body").appendChild(badge);
    }
  }

  function triggerXrJoke() {
    var overlay = $("#xrOverlay");
    if (!overlay) return;
    overlay.classList.add("is-active");
    setTimeout(function () {
      overlay.classList.remove("is-active");
    }, 3200);
  }

  function initSpellCodes() {
    var codes = {
      deepseeker: function () {
        document.body.classList.add("egg-underwater");
        highlightProject("deepseeker", "egg-pulse");
        toast("DeepSeeker detected. Dive in.");
        setTimeout(function () { document.body.classList.remove("egg-underwater"); }, 4000);
      },
      mount: function () {
        wobbleProject("mount-mail");
        toast("Mount & Mail — climb on.");
      },
      mail: function () {
        wobbleProject("mount-mail");
      },
      bacon: function () {
        highlightProject("kevin-bacon", "egg-kevin");
        toast("Six degrees of Matthew Bodenstein.");
      }
    };
    document.addEventListener("keydown", function (e) {
      if (isTypingTarget(e.target)) return;
      if (e.key.length !== 1) return;
      spellBuffer = (spellBuffer + e.key.toLowerCase()).slice(-12);
      Object.keys(codes).forEach(function (code) {
        if (spellBuffer.endsWith(code)) {
          codes[code]();
          spellBuffer = "";
        }
      });
    });
  }

  function wobbleProject(slug) {
    var card = document.querySelector('.project[data-project="' + slug + '"]');
    if (!card) return;
    card.classList.add("egg-wobble");
    setTimeout(function () { card.classList.remove("egg-wobble"); }, 900);
  }

  function initNameClicks() {
    var heading = $(".hero-name");
    if (!heading) return;
    var titleIndex = 0;
    heading.addEventListener("click", function () {
      nameClickCount += 1;
      clearTimeout(nameClickTimer);
      nameClickTimer = setTimeout(function () { nameClickCount = 0; }, 1400);
      if (nameClickCount >= 5) {
        nameClickCount = 0;
        titleIndex = (titleIndex + 1) % NAME_TITLES.length;
        heading.textContent = NAME_TITLES[titleIndex];
        burstConfetti();
        toast("Title unlocked: " + NAME_TITLES[titleIndex]);
      }
    });
  }

  function burstConfetti() {
    if (reducedMotion) return;
    var host = $("#confettiHost");
    if (!host) return;
    for (var i = 0; i < 28; i += 1) {
      var p = document.createElement("span");
      p.className = "confetti-piece";
      p.style.left = 40 + Math.random() * 20 + "%";
      p.style.background = i % 2 ? "#44d9ff" : "#8b7cff";
      p.style.animationDelay = Math.random() * 0.3 + "s";
      host.appendChild(p);
      setTimeout(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 1600, p);
    }
  }

  function initShiftScroll() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Shift" && window.__portfolioThree) window.__portfolioThree.boost = 2.2;
    });
    document.addEventListener("keyup", function (e) {
      if (e.key === "Shift" && window.__portfolioThree) window.__portfolioThree.boost = 1;
    });
  }

  function initClassroomGKey() {
    document.addEventListener("keydown", function (e) {
      if (isTypingTarget(e.target)) return;
      if (e.key.toLowerCase() !== "g") return;
      if (window.portfolioActiveCase !== "classroom-agent") return;
      toast("Agent 3/3: Looks good. ✓");
    });
  }

  function initFooterTripleClick() {
    var year = $("#year");
    if (!year) return;
    year.style.cursor = "pointer";
    year.addEventListener("click", function () {
      footerClickCount += 1;
      clearTimeout(footerClickTimer);
      footerClickTimer = setTimeout(function () { footerClickCount = 0; }, 900);
      if (footerClickCount >= 3) {
        footerClickCount = 0;
        toast("Built with curiosity — opening thanks page in 2s…", 2200);
        setTimeout(function () {
          window.location.href = "thanks.html";
        }, 2000);
        var link = document.createElement("a");
        link.href = "thanks.html";
        link.className = "footer-thanks-link";
        link.textContent = "You found the secret — thanks for exploring.";
        var footer = year.closest("footer");
        if (footer && !footer.querySelector(".footer-thanks-link")) {
          footer.appendChild(link);
        }
      }
    });
  }

  function initCommandPalette() {
    var palette = $("#cmdPalette");
    var input = $("#cmdInput");
    var list = $("#cmdList");
    if (!palette || !input || !list) return;

    function render(filter) {
      var q = (filter || "").trim().toLowerCase();
      var items = CMD_ITEMS.filter(function (item) {
        return !q || item.label.toLowerCase().indexOf(q) >= 0;
      });
      list.innerHTML = items.map(function (item, i) {
        return '<li><button type="button" class="cmd-item" data-cmd="' + item.id + '" tabindex="' + (i === 0 ? "0" : "-1") + '">' + item.label + "</button></li>";
      }).join("");
    }

    function open() {
      palette.classList.add("is-open");
      palette.setAttribute("aria-hidden", "false");
      input.value = "";
      render("");
      input.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      palette.classList.remove("is-open");
      palette.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function runCommand(id) {
      var item = CMD_ITEMS.filter(function (c) { return c.id === id; })[0];
      if (item) item.run();
      close();
    }

    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (palette.classList.contains("is-open")) close();
        else open();
      }
      if (e.key === "Escape" && palette.classList.contains("is-open")) close();
    });

    var cmdOpen = $("#cmdOpen");
    if (cmdOpen) cmdOpen.addEventListener("click", open);
    palette.addEventListener("click", function (e) {
      if (e.target === palette) close();
    });
    input.addEventListener("input", function () {
      render(input.value);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = list.querySelector(".cmd-item");
        if (first) runCommand(first.getAttribute("data-cmd"));
      }
    });
    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".cmd-item");
      if (btn) runCommand(btn.getAttribute("data-cmd"));
    });

    render("");
  }

  function initAudienceMode() {
    var mode = localStorage.getItem(STORAGE.mode) || "recruiter";
    setAudienceMode(mode, true);
    $all(".mode-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        setAudienceMode(chip.getAttribute("data-mode"));
      });
    });
  }

  function initProjectFilters() {
    var chips = $all(".filter-chip");
    var projects = $all(".project[data-category]");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var filter = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.classList.toggle("is-active", c === chip); });
        projects.forEach(function (p) {
          var cat = p.getAttribute("data-category");
          var show = filter === "all" || cat === filter;
          p.classList.toggle("is-filtered-out", !show);
        });
      });
    });
  }

  function initHeroTyping() {
    var el = $("#heroTyped");
    if (!el || reducedMotion) {
      if (el) el.textContent = "practical products.";
      return;
    }
    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var word = HERO_WORDS[wordIndex];
      if (!deleting) {
        charIndex += 1;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
        setTimeout(tick, 55);
      } else {
        charIndex -= 1;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % HERO_WORDS.length;
          setTimeout(tick, 280);
          return;
        }
        setTimeout(tick, 32);
      }
    }
    tick();
  }

  function initAskPortfolio() {
    var panel = $("#askPanel");
    var close = $("#askClose");
    var open = $("#askOpen");
    if (!panel) return;
    $all(".ask-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        showAskAnswer(chip.getAttribute("data-ask"));
      });
    });
    if (open) open.addEventListener("click", function () {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
    });
    if (close) close.addEventListener("click", function () {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target === panel) {
        panel.classList.remove("is-open");
        panel.setAttribute("aria-hidden", "true");
      }
    });
  }

  function initDebugTerminal() {
    var term = $("#debugTerminal");
    var input = $("#debugInput");
    var out = $("#debugOutput");
    if (!term || !input || !out) return;

    function println(text, cls) {
      var line = document.createElement("div");
      line.className = "debug-line" + (cls ? " " + cls : "");
      line.textContent = text;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    }

    println("portfolio debug shell — type help");
    input.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var cmd = input.value.trim().toLowerCase();
      input.value = "";
      println("> " + cmd, "debug-cmd");
      if (cmd === "help") {
        ["projects", "contact", "cv", "stack", "clear", "eggs"].forEach(function (c) {
          println("  " + c);
        });
      } else if (cmd === "projects") location.hash = "#projects";
      else if (cmd === "contact") location.hash = "#contact";
      else if (cmd === "cv") window.open("Matthew Bodenstein CV_Resume.pdf", "_blank");
      else if (cmd === "stack") println(ASK_ANSWERS.stack);
      else if (cmd === "clear") out.innerHTML = "";
      else if (cmd === "eggs") println("Try: deepseeker, bacon, mount, ?egg=kevin, Konami code");
      else println("unknown command. type help");
    });
  }

  function initDeviceOrientation() {
    if (reducedMotion) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    window.addEventListener("deviceorientation", function (e) {
      var three = window.__portfolioThree;
      if (!three) return;
      var beta = e.beta || 0;
      var gamma = e.gamma || 0;
      three.tiltX = Math.max(-0.35, Math.min(0.35, (beta - 45) * 0.004));
      three.tiltY = Math.max(-0.35, Math.min(0.35, gamma * 0.006));
    });
  }

  function initNowBuilding() {
    var el = $("#nowBuilding");
    if (!el) return;
    var full = "Now building: Maxim internal AI-integrated operations platform · VUNO client products";
    var short = "Now building: Maxim AI platform · VUNO client work";
    el.textContent = window.matchMedia("(max-width: 640px)").matches ? short : full;
    window.addEventListener("resize", function () {
      el.textContent = window.matchMedia("(max-width: 640px)").matches ? short : full;
    });
  }

  function initMobileNav() {
    var topbar = $("#siteTopbar");
    var toggle = $("#navToggle");
    var nav = $("#siteNav");
    if (!topbar || !toggle || !nav) return;

    function setOpen(open) {
      topbar.classList.toggle("is-nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(!topbar.classList.contains("is-nav-open"));
    });

    nav.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 901px)").matches) setOpen(false);
    });
  }

  window.portfolioTriggerXr = triggerXrJoke;

  window.portfolioInitExtras = function () {
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    initConsoleEasterEgg();
    initKonami();
    applyUrlEggs();
    initSpellCodes();
    initNameClicks();
    initShiftScroll();
    initClassroomGKey();
    initFooterTripleClick();
    initCommandPalette();
    initAudienceMode();
    initProjectFilters();
    initHeroTyping();
    initAskPortfolio();
    initDebugTerminal();
    initDeviceOrientation();
    initNowBuilding();
    initMobileNav();
  };
})();
