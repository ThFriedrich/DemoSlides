// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/

// Define the URL of the image you want to add to the slides
const imageURL = './imgs/Logo_lang_RGB_farbig.svg';

// Function to add the image to each slide
function addImageToSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        const image = document.createElement('img');
        image.src = imageURL;
        image.style.position = 'absolute';
        image.style.bottom = '-0.3em';
        image.style.left = '0.3em';
        image.style.transformOrigin = '0'
        image.style.width = '15%'
        slide.appendChild(image);
    });
}

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
    embedded: true,
    dependencies: [{
        src: 'plugin/external/external.js',
        condition: function() {
            return !!document.querySelector('[data-external],[data-external-replace]');
        }
    }],
    // Learn about plugins: https://revealjs.com/plugins/
    plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight, FsFx, Simplemenu, RevealMenu, RevealChalkboard, RevealMath.KaTeX], // Online
    simplemenu: {
        barhtml: {
            footer: "",
            header: "<div class='menubar'><ul class='menu'></ul></div>"
        },
        selectby: 'data-name',
        auto: true,
        csspath: 'css/reveal-override.css'
    },
    katex: {
        version: 'latest',
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        extensions: ["mhchem"]
    },
    chalkboard: {
        boardmarkerWidth: 3,
        chalkWidth: 7,
        chalkEffect: 0.3,
        storage: null,
        src: null,
        readOnly: false,
        messageType: 'broadcast',
        toggleChalkboardButton: {
            left: " auto ",
            bottom: "  0.3em  ",
            top: " auto",
            right: " 3.5em "
        },
        toggleNotesButton: {
            left: " auto ",
            bottom: "0.3em  ",
            top: " auto ",
            right: " 5em "
        },
        colorButtons: true,
        boardHandle: true,
        transition: 800,
        theme: " chalkboard ",
        background: ['rgba(127,127,127,.1)', path + 'img/blackboard.png'],
        grid: {
            color: 'rgb(50,50,10,0.5)',
            distance: 80,
            width: 2
        },
        eraser: {
            src: path + 'img/sponge.png',
            radius: 40
        },
        boardmarkers: [{
            color: 'rgba(100,100,100,1)',
            cursor: 'url(' + path + 'img/boardmarker-black.png), auto'
        }, {
            color: 'rgba(30,144,255, 1)',
            cursor: 'url(' + path + 'img/boardmarker-blue.png), auto'
        }, {
            color: 'rgba(220,20,60,1)',
            cursor: 'url(' + path + 'img/boardmarker-red.png), auto'
        }, {
            color: 'rgba(50,205,50,1)',
            cursor: 'url(' + path + 'img/boardmarker-green.png), auto'
        }, {
            color: 'rgba(255,140,0,1)',
            cursor: 'url(' + path + 'img/boardmarker-orange.png), auto'
        }, {
            color: 'rgba(150,0,20150,1)',
            cursor: 'url(' + path + 'img/boardmarker-purple.png), auto'
        }, {
            color: 'rgba(255,220,0,1)',
            cursor: 'url(' + path + 'img/boardmarker-yellow.png), auto'
        }],
        chalks: [{
            color: 'rgba(255,255,255,0.5)',
            cursor: 'url(' + path + 'img/chalk-white.png), auto'
        }, {
            color: 'rgba(96, 154, 244, 0.5)',
            cursor: 'url(' + path + 'img/chalk-blue.png), auto'
        }, {
            color: 'rgba(237, 20, 28, 0.5)',
            cursor: 'url(' + path + 'img/chalk-red.png), auto'
        }, {
            color: 'rgba(20, 237, 28, 0.5)',
            cursor: 'url(' + path + 'img/chalk-green.png), auto'
        }, {
            color: 'rgba(220, 133, 41, 0.5)',
            cursor: 'url(' + path + 'img/chalk-orange.png), auto'
        }, {
            color: 'rgba(220,0,220,0.5)',
            cursor: 'url(' + path + 'img/chalk-purple.png), auto'
        }, {
            color: 'rgba(255,220,0,0.5)',
            cursor: 'url(' + path + 'img/chalk-yellow.png), auto'
        }]
    },
    menu: {
        // Specifies which side of the presentation the menu will
        // be shown. Use 'left' or 'right'.
        side: 'left',

        // Specifies the width of the menu.
        // Can be one of the following:
        // 'normal', 'wide', 'third', 'half', 'full', or
        // any valid css length value
        width: 'normal',

        // Add slide numbers to the titles in the slide list.
        // Use 'true' or format string (same as reveal.js slide numbers)
        numbers: true,

        // Specifies which slide elements will be used for generating
        // the slide titles in the menu. The default selects the first
        // heading element found in the slide, but you can specify any
        // valid css selector and the text from the first matching
        // element will be used.
        // Note: that a section data-menu-title attribute or an element
        // with a menu-title class will take precedence over this option
        titleSelector: 'h2',

        // If slides do not have a matching title, attempt to use the
        // start of the text content as the title instead
        useTextContentForMissingTitles: false,

        // Hide slides from the menu that do not have a title.
        // Set to 'true' to only list slides with titles.
        hideMissingTitles: false,

        // Adds markers to the slide titles to indicate the
        // progress through the presentation. Set to 'false'
        // to hide the markers.
        markers: true,

        // Specify custom panels to be included in the menu, by
        // providing an array of objects with 'title', 'icon'
        // properties, and either a 'src' or 'content' property.
        custom: false,

        // Specifies the themes that will be available in the themes
        // menu panel. Set to 'true' to show the themes menu panel
        // with the default themes list. Alternatively, provide an
        // array to specify the themes to make available in the
        // themes menu panel, for example...
        //
        // [
        //     { name: 'Black', theme: 'dist/theme/black.css' },
        //     { name: 'White', theme: 'dist/theme/white.css' },
        //     { name: 'League', theme: 'dist/theme/league.css' },
        //     {
        //       name: 'Dark',
        //       theme: 'lib/reveal.js/dist/theme/black.css',
        //       highlightTheme: 'lib/reveal.js//plugin/highlight/monokai.css'
        //     },
        //     {
        //       name: 'Code: Zenburn',
        //       highlightTheme: 'lib/reveal.js//plugin/highlight/zenburn.css'
        //     }
        // ]
        //
        // Note: specifying highlightTheme without a theme will
        // change the code highlight theme while leaving the
        // presentation theme unchanged.
        themes: true,

        // Specifies the path to the default theme files. If your
        // presentation uses a different path to the standard reveal
        // layout then you need to provide this option, but only
        // when 'themes' is set to 'true'. If you provide your own
        // list of themes or 'themes' is set to 'false' the
        // 'themesPath' option is ignored.
        themesPath: 'dist/theme/',

        // Specifies if the transitions menu panel will be shown.
        // Set to 'true' to show the transitions menu pbbanel with
        // the default transitions list. Alternatively, provide an
        // array to specify the transitions to make available in
        // the transitions panel, for example...
        // ['None', 'Fade', 'Slide']
        transitions: true,

        // Adds a menu button to the slides to open the menu panel.
        // Set to 'false' to hide the button.
        openButton: false,

        // If 'true' allows the slide number in the presentation to
        // open the menu panel. The reveal.js slideNumber option must
        // be displayed for this to take effect
        openSlideNumber: true,

        // If true allows the user to open and navigate the menu using
        // the keyboard. Standard keyboard interaction with reveal
        // will be disabled while the menu is open.
        keyboard: true,

        // Normally the menu will close on user actions such as
        // selecting a menu item, or clicking the presentation area.
        // If 'true', the sticky option will leave the menu open
        // until it is explicitly closed, that is, using the close
        // button or pressing the ESC or m key (when the keyboard
        // interaction option is enabled).
        sticky: false,

        // If 'true' standard menu items will be automatically opened
        // when navigating using the keyboard. Note: this only takes
        // effect when both the 'keyboard' and 'sticky' options are enabled.
        autoOpen: true,

        // If 'true' the menu will not be created until it is explicitly
        // requested by calling RevealMenu.init(). Note this will delay
        // the creation of all menu panels, including custom panels, and
        // the menu button.
        delayInit: false,

        // If 'true' the menu will be shown when the menu is initialised.
        openOnInit: false,

        // By default the menu will load it's own font-awesome library
        // icons. If your presentation needs to load a different
        // font-awesome library the 'loadIcons' option can be set to false
        // and the menu will not attempt to load the font-awesome library.
        loadIcons: true
    },
    fsfx: {
        baseclass: 'fsbutton',
        hideifnofs: true,
        nofsfxCss: 'display: none;',
        compatibility: true,
        auto: {
            generate: true,
            color: 'var(--r-heading-color)',
            oppositecolor: 'var(--r-heading-color)',
            position: {
                right: '10px',
                top: '10px'
            }
        },
        debugfsdisabled: false
    },
}).then(() => { addImageToSlides(); });
