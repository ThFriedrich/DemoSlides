// ======================
// Logos
// ======================
const logoLight = './imgs/Logo_lang_RGB_farbig.svg';
const logoDark = './imgs/Logo_lang_RGB_weiß.svg';

// ======================
// Helper functions
// ======================
function loadScript(src, callback,) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    if (callback) script.onload = callback;
    document.head.appendChild(script);
}

function loadStyle(href, id) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    if (id) link.id = id;
    document.head.appendChild(link);
}

function addMetaTags() {
    const metas = [
        { charset: "utf-8" },
        { name: "author", content: "Thomas Friedrich" },
        { name: "description", content: document.title || "Presentation" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ];

    metas.forEach(attrs => {
        const meta = document.createElement("meta");
        for (const key in attrs) {
            meta.setAttribute(key, attrs[key]);
        }
        document.head.appendChild(meta);
    });
}

addMetaTags();

// ======================
// Stylesheets
// ======================
function addStyleSheets() {
    const links = [
        { href: "dist/reset.css" },
        { href: "dist/reveal.css" },
        { href: "dist/theme/eah_light.css", id: "theme" },
        { href: "dist/theme/fonts/Roboto_Condensed/roboto-condensed.css" },
        { href: "plugin/chalkboard/style.css" },
        { href: "plugin/customcontrols/style.css" },
        { href: "plugin/menu/font-awesome/css/fontawesome.css" },
        { href: "plugin/highlight/zenburn.css", id: "highlight-theme" },
        { href: "plugin/pointer/pointer.css" },
        { href: "plugin/chemDoodle/ChemDoodleWeb.css" },
        { href: "dist/reveal-override.css" }
    ];
    links.forEach(s => loadStyle(s.href, s.id));
}

function updateThemeElements() {
    const themeLink = document.querySelector('link#theme');
    if (!themeLink) return;

    const href = themeLink.getAttribute('href') || '';
    const isDark = href.includes('eah_dark.css');

    // Update logos on slides
    document.querySelectorAll('.slide').forEach(slide => {
        // Create logo if it doesn't exist
        let logoImg = slide.querySelector('.slide-logo');
        if (!logoImg) {
            logoImg = document.createElement('img');
            logoImg.classList.add('slide-logo');
            logoImg.style.position = 'absolute';
            logoImg.style.bottom = '-0.3em';
            logoImg.style.left = '0.3em';
            logoImg.style.transformOrigin = '0';
            logoImg.style.width = '15%';
            slide.appendChild(logoImg);
        }
        logoImg.src = isDark ? logoDark : logoLight;
    });

    // Update other theme-switchable images
    document.querySelectorAll('.theme-switchable').forEach(img => {
        const lightSrc = img.dataset.light;
        const darkSrc = img.dataset.dark;
        if (lightSrc && darkSrc) {
            img.src = isDark ? darkSrc : lightSrc;
        }
    });
}

// ======================
// Load Reveal + Plugins
// ======================

addStyleSheets();

loadScript("dist/reveal.js", () => {

    const pluginScripts = [
        "plugin/zoom/zoom.js",
        "plugin/notes/notes.js",
        "plugin/search/search.js",
        "plugin/markdown/markdown.js",
        "plugin/highlight/highlight.js",
        "plugin/menu/menu.js",
        "plugin/chalkboard/plugin.js",
        "plugin/customcontrols/plugin.js",
        "plugin/math/math.js",
        "plugin/simplemenu/simplemenu.js",
        "plugin/fsfx/fsfx.js",
        "plugin/pointer/pointer.js",
        "plugin/quiz/js/quiz.js",
        "plugin/babylonviewer/babylonviewer.js"
    ];

    let loaded = 0;
    pluginScripts.forEach(src => {
        loadScript(src, () => {
            loaded++;
            if (loaded === pluginScripts.length) {
                // ======================
                // Reveal initialization
                // ======================
                Reveal.initialize({
                    hash: true,
                    controls: true,
                    progress: true,
                    history: false,
                    center: true,
                    touch: true,
                    pdfSeparateFragments: false,
                    pdfMaxPagesPerSlide: 1,
                    slideNumber: " c/ ",
                    margin: 0.05,
                    height: 1080,
                    width: 1920,
                    preloadIframes: true,
                    autoPlayMedia: true,
                    dependencies: [
                        {
                            src: "plugin/quiz/js/quiz.js",
                            async: true,
                            callback: function () {
                                prepareQuizzes({
                                    preventUnanswered: false,
                                    checkAnswerText: "Antwort überprüfen",
                                    nextQuestionText: "Nächste Frage",
                                    completeQuizText: "Quiz abschließen",
                                    backButtonText: "Zurück",
                                    tryAgainText: "Erneut versuchen",
                                    questionCountText: "Frage %current von %total",
                                    questionTemplateText: "Frage %count: %text",
                                    scoreTemplateText: "Ergebnis: %score",
                                    scoreAsPercentage: true,
                                    nextSlideText: "Präsentation fortsetzen",
                                    skipStartButton: true
                                });
                            }
                        }
                    ],
                    plugins: [
                        RevealZoom,
                        RevealNotes,
                        RevealSearch,
                        RevealMarkdown,
                        RevealHighlight,
                        FsFx,
                        Simplemenu,
                        RevealMenu,
                        RevealChalkboard,
                        RevealCustomControls,
                        RevealMath.KaTeX,
                        RevealPointer
                    ],
                    simplemenu: {
                        barhtml: {
                            footer: "",
                            header: "<div class='menubar'><ul class='menu'></ul></div>"
                        },
                        selectby: "data-name",
                        auto: true,
                        csspath: "dist/reveal-override.css"
                    },

                    pointer: {
                        key: "p",
                        color: "red",
                        opacity: 0.6,
                        pointerSize: 12,
                        alwaysVisible: false,
                        tailLength: 10
                    },

                    katex: {
                        version: "latest",
                        delimiters: [
                            { left: "$$", right: "$$", display: true },
                            { left: "$", right: "$", display: false },
                            { left: "\\(", right: "\\)", display: false },
                            { left: "\\[", right: "\\]", display: true }
                        ],
                        ignoredTags: ["script", "noscript", "style", "textarea", "pre"],
                        extensions: ["mhchem"]
                    },

                    customcontrols: {
                        controls: [
                            {
                                icon: '<i class="fa fa-pen-square"></i>',
                                title: "Toggle chalkboard (B)",
                                action: "RevealChalkboard.toggleChalkboard();"
                            },
                            {
                                icon: '<i class="fa fa-pen"></i>',
                                title: "Toggle notes canvas (C)",
                                action: "RevealChalkboard.toggleNotesCanvas();"
                            }
                        ]
                    },

                    chalkboard: {
                        boardmarkerWidth: 3,
                        chalkWidth: 7,
                        chalkEffect: 1.0,
                        storage: null,
                        src: null,
                        readOnly: undefined,
                        transition: 800,
                        theme: "chalkboard",
                        background: [
                            "rgba(127,127,127,.1)",
                            path + "img/blackboard.png"
                        ],
                        grid: {
                            color: "rgb(50,50,10,0.5)",
                            distance: 80,
                            width: 2
                        },
                        eraser: {
                            src: path + "img/sponge.png",
                            radius: 40
                        },
                        boardmarkers: [
                            {
                                color: "rgba(100,100,100,1)",
                                cursor: "url(" + path + "img/boardmarker-black.png), auto"
                            },
                            {
                                color: "rgba(30,144,255, 1)",
                                cursor: "url(" + path + "img/boardmarker-blue.png), auto"
                            },
                            {
                                color: "rgba(220,20,60,1)",
                                cursor: "url(" + path + "img/boardmarker-red.png), auto"
                            },
                            {
                                color: "rgba(50,205,50,1)",
                                cursor: "url(" + path + "img/boardmarker-green.png), auto"
                            },
                            {
                                color: "rgba(255,140,0,1)",
                                cursor: "url(" + path + "img/boardmarker-orange.png), auto"
                            },
                            {
                                color: "rgba(150,0,20150,1)",
                                cursor: "url(" + path + "img/boardmarker-purple.png), auto"
                            },
                            {
                                color: "rgba(255,220,0,1)",
                                cursor: "url(" + path + "img/boardmarker-yellow.png), auto"
                            }
                        ],
                        chalks: [
                            {
                                color: "rgba(255,255,255,0.5)",
                                cursor: "url(" + path + "img/chalk-white.png), auto"
                            },
                            {
                                color: "rgba(96, 154, 244, 0.5)",
                                cursor: "url(" + path + "img/chalk-blue.png), auto"
                            },
                            {
                                color: "rgba(237, 20, 28, 0.5)",
                                cursor: "url(" + path + "img/chalk-red.png), auto"
                            },
                            {
                                color: "rgba(20, 237, 28, 0.5)",
                                cursor: "url(" + path + "img/chalk-green.png), auto"
                            },
                            {
                                color: "rgba(220, 133, 41, 0.5)",
                                cursor: "url(" + path + "img/chalk-orange.png), auto"
                            },
                            {
                                color: "rgba(220,0,220,0.5)",
                                cursor: "url(" + path + "img/chalk-purple.png), auto"
                            },
                            {
                                color: "rgba(255,220,0,0.5)",
                                cursor: "url(" + path + "img/chalk-yellow.png), auto"
                            }
                        ]
                    },

                    menu: {
                        side: "left",
                        width: "normal",
                        numbers: true,
                        titleSelector: "h2",
                        useTextContentForMissingTitles: false,
                        hideMissingTitles: false,
                        markers: true,
                        custom: false,
                        themes: true,
                        themesPath: "dist/theme/",
                        transitions: true,
                        openButton: false,
                        openSlideNumber: true,
                        keyboard: true,
                        sticky: false,
                        autoOpen: true,
                        delayInit: false,
                        openOnInit: false,
                        loadIcons: true
                    },

                    fsfx: {
                        baseclass: "fsbutton",
                        hideifnofs: true,
                        nofsfxCss: "display: none;",
                        compatibility: true,
                        auto: {
                            generate: true,
                            color: "var(--r-heading-color)",
                            oppositecolor: "var(--r-heading-color)",
                            position: { right: "10px", top: "10px" }
                        },
                        debugfsdisabled: false
                    }


                }).then(() => {
                    updateThemeElements();
                });
            };
        });
    });
});

// Observe <head> for new theme links
const headObserver = new MutationObserver(updateThemeElements);
headObserver.observe(document.head, { childList: true, subtree: true });
window.addEventListener('load', updateThemeElements);



