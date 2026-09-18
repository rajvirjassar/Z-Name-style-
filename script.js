/* =========================================================
   Z-NAME STYLE
   Full Working Script
   320+ Stylish Name Generator
   ========================================================= */

"use strict";

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const clearName = document.getElementById("clearName");
const generateButton = document.getElementById("generateButton");

const previewSection = document.getElementById("previewSection");
const previewName = document.getElementById("previewName");

const resultsSection = document.getElementById("resultsSection");
const resultsContainer = document.getElementById("resultsContainer");
const resultsTitle = document.getElementById("resultsTitle");

const styleFilters = document.getElementById("styleFilters");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

const bottomMenuButton = document.getElementById("bottomMenuButton");


/* =========================================================
   CURRENT STATE
   ========================================================= */

let currentName = "";
let currentFilter = "all";
let toastTimer = null;


/* =========================================================
   HELPER
   ========================================================= */

function cleanName(value) {
    return value
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 30);
}


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   UNICODE FANCY LETTER MAPS
   ========================================================= */

const fonts = {

    bold: {
        A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄",
        F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉",
        K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎",
        P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓",
        U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘",
        Z: "𝐙"
    },

    italic: {
        A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌",
        F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑",
        K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖",
        P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛",
        U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠",
        Z: "𝘡"
    },

    boldItalic: {
        A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬",
        F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱",
        K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶",
        P: "𝑷", Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻",
        U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀",
        Z: "𝒁"
    },

    script: {
        A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ",
        F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥",
        K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪",
        P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯",
        U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴",
        Z: "𝒵"
    },

    boldScript: {
        A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔",
        F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙",
        K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞",
        P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣",
        U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨",
        Z: "𝓩"
    },

    fraktur: {
        A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈",
        F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍",
        K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒",
        P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗",
        U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜",
        Z: "ℨ"
    },

    boldFraktur: {
        A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰",
        F: "𝕱", G: "𝕲", H: "𝕳", I: "𝕴", J: "𝕵",
        K: "𝕶", L: "𝕷", M: "𝕸", N: "𝕹", O: "𝕺",
        P: "𝕻", Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿",
        U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃", Y: "𝖄",
        Z: "𝖅"
    },

    double: {
        A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼",
        F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁",
        K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆",
        P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋",
        U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐",
        Z: "ℤ"
    },

    mono: {
        A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴",
        F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹",
        K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾",
        P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃",
        U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈",
        Z: "𝚉"
    },

    sans: {
        A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤",
        F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩",
        K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮",
        P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳",
        U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸",
        Z: "𝖹"
    },

    boldSans: {
        A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘",
        F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
        K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢",
        P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
        U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬",
        Z: "𝗭"
    },

    smallCaps: {
        A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ",
        F: "ғ", G: "ɢ", H: "ʜ", I: "ɪ", J: "ᴊ",
        K: "ᴋ", L: "ʟ", M: "ᴍ", N: "ɴ", O: "ᴏ",
        P: "ᴘ", Q: "ǫ", R: "ʀ", S: "s", T: "ᴛ",
        U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "x", Y: "ʏ",
        Z: "ᴢ"
    }

};


/* =========================================================
   FONT FUNCTION
   ========================================================= */

function convertFont(text, font) {

    const map = fonts[font];

    if (!map) {
        return text;
    }

    return [...text].map(char => {

        const upper = char.toUpperCase();

        if (map[upper]) {
            return map[upper];
        }

        return char;

    }).join("");
}


/* =========================================================
   EXTRA TEXT EFFECTS
   ========================================================= */

function spaced(text) {
    return [...text].join(" ");
}

function wide(text) {
    return [...text].join("  ");
}

function dotted(text) {
    return [...text].join("•");
}

function underlined(text) {
    return [...text].join("̲");
}

function strike(text) {
    return [...text].join("̶");
}

function slash(text) {
    return [...text].join("̷");
}

function doubleUnderline(text) {
    return [...text].join("̳");
}


/* =========================================================
   STYLE DATABASE
   ========================================================= */

const styleTemplates = [

    /* ---------------- FANCY ---------------- */

    { category: "fancy", make: n => convertFont(n, "bold") },
    { category: "fancy", make: n => convertFont(n, "italic") },
    { category: "fancy", make: n => convertFont(n, "boldItalic") },
    { category: "fancy", make: n => convertFont(n, "script") },
    { category: "fancy", make: n => convertFont(n, "boldScript") },
    { category: "fancy", make: n => convertFont(n, "fraktur") },
    { category: "fancy", make: n => convertFont(n, "boldFraktur") },
    { category: "fancy", make: n => convertFont(n, "double") },
    { category: "fancy", make: n => convertFont(n, "mono") },
    { category: "fancy", make: n => convertFont(n, "sans") },
    { category: "fancy", make: n => convertFont(n, "boldSans") },
    { category: "fancy", make: n => convertFont(n, "smallCaps") },

    { category: "fancy", make: n => `『${n}』` },
    { category: "fancy", make: n => `【${n}】` },
    { category: "fancy", make: n => `〖${n}〗` },
    { category: "fancy", make: n => `〔${n}〕` },
    { category: "fancy", make: n => `〈${n}〉` },
    { category: "fancy", make: n => `《${n}》` },
    { category: "fancy", make: n => `「${n}」` },
    { category: "fancy", make: n => `【★ ${n} ★】` },
    { category: "fancy", make: n => `✧ ${n} ✧` },
    { category: "fancy", make: n => `✦ ${n} ✦` },
    { category: "fancy", make: n => `✧･ﾟ: ${n} :ﾟ･✧` },
    { category: "fancy", make: n => `｡･ﾟ･ ${n} ･ﾟ･｡` },
    { category: "fancy", make: n => `°˖✧ ${n} ✧˖°` },
    { category: "fancy", make: n => `⋆｡°✩ ${n} ✩°｡⋆` },
    { category: "fancy", make: n => `༺ ${n} ༻` },
    { category: "fancy", make: n => `༒ ${n} ༒` },
    { category: "fancy", make: n => `꧁ ${n} ꧂` },
    { category: "fancy", make: n => `꧁༺ ${n} ༻꧂` },
    { category: "fancy", make: n => `꧁༒ ${n} ༒꧂` },

    /* ---------------- GAMING ---------------- */

    { category: "gaming", make: n => `亗 ${n} 亗` },
    { category: "gaming", make: n => `亗『${n}』亗` },
    { category: "gaming", make: n => `亗〆${n}〆亗` },
    { category: "gaming", make: n => `乂 ${n} 乂` },
    { category: "gaming", make: n => `乂『${n}』乂` },
    { category: "gaming", make: n => `乂 ${n} 乂` },
    { category: "gaming", make: n => `〆 ${n} 〆` },
    { category: "gaming", make: n => `メ ${n} メ` },
    { category: "gaming", make: n => `彡 ${n} 彡` },
    { category: "gaming", make: n => `ツ ${n} ツ` },
    { category: "gaming", make: n => `々 ${n} 々` },
    { category: "gaming", make: n => `乄 ${n} 乄` },
    { category: "gaming", make: n => `シ ${n} シ` },
    { category: "gaming", make: n => `ミ ${n} ミ` },
    { category: "gaming", make: n => `⚡${n}⚡` },
    { category: "gaming", make: n => `☠ ${n} ☠` },
    { category: "gaming", make: n => `☠︎ ${n} ☠︎` },
    { category: "gaming", make: n => `♛ ${n} ♛` },
    { category: "gaming", make: n => `♕ ${n} ♕` },
    { category: "gaming", make: n => `♚ ${n} ♚` },
    { category: "gaming", make: n => `★ ${n} ★` },
    { category: "gaming", make: n => `★彡 ${n} 彡★` },
    { category: "gaming", make: n => `★彡[${n}]彡★` },
    { category: "gaming", make: n => `乂★ ${n} ★乂` },
    { category: "gaming", make: n => `亗★ ${n} ★亗` },
    { category: "gaming", make: n => `『★』${n}『★』` },
    { category: "gaming", make: n => `⚔ ${n} ⚔` },
    { category: "gaming", make: n => `⚔︎『${n}』⚔︎` },
    { category: "gaming", make: n => `☯ ${n} ☯` },
    { category: "gaming", make: n => `☬ ${n} ☬` },

    /* ---------------- ATTITUDE ---------------- */

    { category: "attitude", make: n => `😎 ${n} 😎` },
    { category: "attitude", make: n => `😈 ${n} 😈` },
    { category: "attitude", make: n => `🔥 ${n} 🔥` },
    { category: "attitude", make: n => `💀 ${n} 💀` },
    { category: "attitude", make: n => `👑 ${n} 👑` },
    { category: "attitude", make: n => `🖤 ${n} 🖤` },
    { category: "attitude", make: n => `⚡ ${n} ⚡` },
    { category: "attitude", make: n => `💥 ${n} 💥` },
    { category: "attitude", make: n => `🚬 ${n} 🚬` },
    { category: "attitude", make: n => `😏 ${n} 😏` },
    { category: "attitude", make: n => `🗿 ${n} 🗿` },
    { category: "attitude", make: n => `👿 ${n} 👿` },
    { category: "attitude", make: n => `☠️ ${n} ☠️` },
    { category: "attitude", make: n => `♠ ${n} ♠` },
    { category: "attitude", make: n => `♠️ ${n} ♠️` },
    { category: "attitude", make: n => `♣ ${n} ♣` },
    { category: "attitude", make: n => `♦ ${n} ♦` },
    { category: "attitude", make: n => `♥ ${n} ♥` },
    { category: "attitude", make: n => `⚡〆${n}〆⚡` },
    { category: "attitude", make: n => `😈〆${n}〆😈` },
    { category: "attitude", make: n => `🔥〆${n}〆🔥` },
    { category: "attitude", make: n => `☠︎〆${n}〆☠︎` },
    { category: "attitude", make: n => `♛〆${n}〆♛` },
    { category: "attitude", make: n => `👑〆${n}〆👑` },
    { category: "attitude", make: n => `『😎 ${n} 😎』` },
    { category: "attitude", make: n => `『🔥 ${n} 🔥』` },
    { category: "attitude", make: n => `『😈 ${n} 😈』` },
    { category: "attitude", make: n => `『👑 ${n} 👑』` },
    { category: "attitude", make: n => `『☠ ${n} ☠』` },
    { category: "attitude", make: n => `『💀 ${n} 💀』` },

    /* ---------------- SYMBOLS ---------------- */

    { category: "symbols", make: n => `♡ ${n} ♡` },
    { category: "symbols", make: n => `♥ ${n} ♥` },
    { category: "symbols", make: n => `❤ ${n} ❤` },
    { category: "symbols", make: n => `❥ ${n} ❥` },
    { category: "symbols", make: n => `ღ ${n} ღ` },
    { category: "symbols", make: n => `❣ ${n} ❣` },
    { category: "symbols", make: n => `❦ ${n} ❦` },
    { category: "symbols", make: n => `☾ ${n} ☽` },
    { category: "symbols", make: n => `☽ ${n} ☾` },
    { category: "symbols", make: n => `☀ ${n} ☀` },
    { category: "symbols", make: n => `☁ ${n} ☁` },
    { category: "symbols", make: n => `☘ ${n} ☘` },
    { category: "symbols", make: n => `✿ ${n} ✿` },
    { category: "symbols", make: n => `❀ ${n} ❀` },
    { category: "symbols", make: n => `✾ ${n} ✾` },
    { category: "symbols", make: n => `✺ ${n} ✺` },
    { category: "symbols", make: n => `✹ ${n} ✹` },
    { category: "symbols", make: n => `✧ ${n} ✧` },
    { category: "symbols", make: n => `✦ ${n} ✦` },
    { category: "symbols", make: n => `✪ ${n} ✪` },
    { category: "symbols", make: n => `✯ ${n} ✯` },
    { category: "symbols", make: n => `✰ ${n} ✰` },
    { category: "symbols", make: n => `★ ${n} ★` },
    { category: "symbols", make: n => `☆ ${n} ☆` },
    { category: "symbols", make: n => `☯ ${n} ☯` },
    { category: "symbols", make: n => `☮ ${n} ☮` },
    { category: "symbols", make: n => `☬ ${n} ☬` },
    { category: "symbols", make: n => `࿐ ${n} ࿐` },
    { category: "symbols", make: n => `༺ ${n} ༻` },
    { category: "symbols", make: n => `༒ ${n} ༒` },

];


/* =========================================================
   ADD MANY FONT + SYMBOL COMBINATIONS
   ========================================================= */

const fontNames = [
    "bold",
    "italic",
    "boldItalic",
    "script",
    "boldScript",
    "fraktur",
    "boldFraktur",
    "double",
    "mono",
    "sans",
    "boldSans",
    "smallCaps"
];

const wrappers = [

    ["꧁", "꧂"],
    ["༺", "༻"],
    ["༒", "༒"],
    ["亗", "亗"],
    ["乂", "乂"],
    ["〆", "〆"],
    ["メ", "メ"],
    ["彡", "彡"],
    ["ツ", "ツ"],
    ["『", "』"],
    ["【", "】"],
    ["〖", "〗"],
    ["〔", "〕"],
    ["〈", "〉"],
    ["《", "》"],
    ["「", "」"],
    ["★", "★"],
    ["☆", "☆"],
    ["✦", "✦"],
    ["✧", "✧"],
    ["♛", "♛"],
    ["♕", "♕"],
    ["☠", "☠"],
    ["⚡", "⚡"],
    ["☯", "☯"],
    ["♡", "♡"],
    ["♥", "♥"],
    ["ღ", "ღ"],
    ["❥", "❥"]
];


/* =========================================================
   GENERATE FONT COMBINATIONS
   ========================================================= */

fontNames.forEach((fontName, fontIndex) => {

    wrappers.forEach((wrapper, wrapperIndex) => {

        let category = "fancy";

        if (
            wrapperIndex % 5 === 0 ||
            wrapperIndex % 5 === 1 ||
            wrapperIndex % 5 === 2
        ) {
            category = "gaming";
        }

        if (wrapperIndex >= 20 && wrapperIndex <= 29) {
            category = "symbols";
        }

        styleTemplates.push({
            category: category,
            make: function(name) {

                const styled = convertFont(name, fontName);

                return `${wrapper[0]}${styled}${wrapper[1]}`;

            }
        });

    });

});


/* =========================================================
   SPECIAL SPACING STYLES
   ========================================================= */

const specialStyles = [

    {
        category: "fancy",
        make: n => spaced(n)
    },

    {
        category: "fancy",
        make: n => wide(n)
    },

    {
        category: "fancy",
        make: n => dotted(n)
    },

    {
        category: "fancy",
        make: n => underlined(n)
    },

    {
        category: "fancy",
        make: n => doubleUnderline(n)
    },

    {
        category: "fancy",
        make: n => strike(n)
    },

    {
        category: "fancy",
        make: n => slash(n)
    },

    {
        category: "fancy",
        make: n => `• ${spaced(n)} •`
    },

    {
        category: "fancy",
        make: n => `· ${spaced(n)} ·`
    },

    {
        category: "fancy",
        make: n => `⋆ ${spaced(n)} ⋆`
    },

    {
        category: "symbols",
        make: n => `✿ ${spaced(n)} ✿`
    },

    {
        category: "symbols",
        make: n => `♡ ${spaced(n)} ♡`
    },

    {
        category: "gaming",
        make: n => `亗 ${spaced(n)} 亗`
    },

    {
        category: "gaming",
        make: n => `乂 ${spaced(n)} 乂`
    },

    {
        category: "attitude",
        make: n => `😈 ${spaced(n)} 😈`
    },

    {
        category: "attitude",
        make: n => `🔥 ${spaced(n)} 🔥`
    }

];

styleTemplates.push(...specialStyles);


/* =========================================================
   EXTRA PREFIX / SUFFIX COMBINATIONS
   ========================================================= */

const extraPrefixes = [
    "★",
    "☆",
    "✦",
    "✧",
    "✪",
    "✯",
    "♛",
    "♕",
    "♚",
    "⚡",
    "☠",
    "☯",
    "☬",
    "亗",
    "乂",
    "〆",
    "メ",
    "彡",
    "ツ",
    "༒",
    "꧁",
    "♡",
    "♥",
    "ღ",
    "❥",
    "❦",
    "✿",
    "❀",
    "🔥",
    "😈",
    "👑",
    "💀"
];

extraPrefixes.forEach((symbol, index) => {

    styleTemplates.push({
        category:
            index % 4 === 0
                ? "gaming"
                : index % 4 === 1
                    ? "symbols"
                    : index % 4 === 2
                        ? "attitude"
                        : "fancy",

        make: n => `${symbol} ${n} ${symbol}`
    });

});


/* =========================================================
   MORE COMBINATIONS
   ========================================================= */

const combinations = [

    ["★彡", "彡★"],
    ["꧁༺", "༻꧂"],
    ["꧁༒", "༒꧂"],
    ["亗『", "』亗"],
    ["乂『", "』乂"],
    ["〆『", "』〆"],
    ["メ『", "』メ"],
    ["彡『", "』彡"],
    ["ツ『", "』ツ"],
    ["♛『", "』♛"],
    ["♕『", "』♕"],
    ["☠『", "』☠"],
    ["⚡『", "』⚡"],
    ["☯『", "』☯"],
    ["♡『", "』♡"],
    ["♥『", "』♥"],
    ["ღ『", "』ღ"],
    ["✦『", "』✦"],
    ["✧『", "』✧"],
    ["✿『", "』✿"],
    ["🔥『", "』🔥"],
    ["😈『", "』😈"],
    ["👑『", "』👑"],
    ["💀『", "』💀"]
];

combinations.forEach((combo, index) => {

    fontNames.forEach((fontName) => {

        styleTemplates.push({

            category:
                index % 4 === 0
                    ? "gaming"
                    : index % 4 === 1
                        ? "attitude"
                        : index % 4 === 2
                            ? "symbols"
                            : "fancy",

            make: function(name) {

                const styledName = convertFont(name, fontName);

                return `${combo[0]}${styledName}${combo[1]}`;

            }

        });

    });

});


/* =========================================================
   CREATE UNIQUE STYLE LIST
   ========================================================= */

function buildStyles(name) {

    const unique = new Map();

    styleTemplates.forEach(style => {

        try {

            const result = style.make(name);

            if (!result) {
                return;
            }

            const cleanResult = String(result).trim();

            if (!cleanResult) {
                return;
            }

            if (!unique.has(cleanResult)) {

                unique.set(cleanResult, {
                    text: cleanResult,
                    category: style.category
                });

            }

        } catch (error) {

            console.warn("Style error:", error);

        }

    });

    return Array.from(unique.values());
}


/* =========================================================
   COPY FUNCTION
   ========================================================= */

async function copyText(text) {

    try {

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(text);

        } else {

            const textarea = document.createElement("textarea");

            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();

            document.execCommand("copy");

            textarea.remove();

        }

        showToast("Copied!");

        return true;

    } catch (error) {

        console.error("Copy failed:", error);

        showToast("Copy failed");

        return false;

    }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    if (!toast) {
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults(styles) {

    if (!resultsContainer) {
        return;
    }

    resultsContainer.innerHTML = "";

    if (!styles.length) {

        resultsContainer.innerHTML = `
            <div class="result-card">
                <div class="result-name">
                    No styles found
                </div>
            </div>
        `;

        return;
    }

    const fragment = document.createDocumentFragment();

    styles.forEach((style, index) => {

        const card = document.createElement("article");

        card.className = "result-card";

        card.style.animationDelay = `${Math.min(index * 0.018, 0.35)}s`;

        const nameDiv = document.createElement("div");

        nameDiv.className = "result-name";

        nameDiv.textContent = style.text;

        const copyButton = document.createElement("button");

        copyButton.type = "button";

        copyButton.className = "copy-result-button";

        copyButton.innerHTML = `
            <span class="copy-icon">📋</span>
            <span>Copy</span>
        `;

        copyButton.addEventListener("click", async () => {

            const copied = await copyText(style.text);

            if (copied) {

                copyButton.classList.add("copied");

                copyButton.innerHTML = `
                    <span class="copy-icon">✓</span>
                    <span>Copied!</span>
                `;

                setTimeout(() => {

                    copyButton.classList.remove("copied");

                    copyButton.innerHTML = `
                        <span class="copy-icon">📋</span>
                        <span>Copy</span>
                    `;

                }, 1400);

            }

        });

        card.appendChild(nameDiv);
        card.appendChild(copyButton);

        fragment.appendChild(card);

    });

    resultsContainer.appendChild(fragment);

}


/* =========================================================
   FILTER RESULTS
   ========================================================= */

function applyFilter() {

    if (!currentName) {
        return;
    }

    const allStyles = buildStyles(currentName);

    let filteredStyles = allStyles;

    if (currentFilter !== "all") {

        filteredStyles = allStyles.filter(style => {

            return style.category === currentFilter;

        });

    }

    renderResults(filteredStyles);

    updateResultsTitle(filteredStyles.length);

}


/* =========================================================
   RESULTS TITLE
   ========================================================= */

function updateResultsTitle(count) {

    if (!resultsTitle) {
        return;
    }

    resultsTitle.textContent = `Stylish Names (${count})`;

}


/* =========================================================
   GENERATE
   ========================================================= */

function generateNames() {

    const value = cleanName(nameInput.value);

    if (!value) {

        nameInput.focus();

        showToast("Please enter your name");

        return;

    }

    currentName = value;

    currentFilter = "all";

    /* Update preview */

    if (previewName) {
        previewName.textContent = value;
    }

    if (previewSection) {
        previewSection.hidden = false;
    }

    /* Build all styles */

    const styles = buildStyles(value);

    /* Show results */

    if (resultsSection) {
        resultsSection.hidden = false;
    }

    /* Reset filter buttons */

    if (styleFilters) {

        const buttons = styleFilters.querySelectorAll(".filter-button");

        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === "all"
            );

        });

    }

    renderResults(styles);

    updateResultsTitle(styles.length);

    /* Scroll to results */

    setTimeout(() => {

        if (resultsSection) {

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 80);

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

if (nameForm) {

    nameForm.addEventListener("submit", event => {

        event.preventDefault();

        generateNames();

    });

}


/* =========================================================
   LIVE INPUT
   ========================================================= */

if (nameInput) {

    nameInput.addEventListener("input", () => {

        nameInput.value = nameInput.value.slice(0, 30);

        if (clearName) {

            clearName.hidden = nameInput.value.length === 0;

        }

        /*
         * Live preview while typing.
         * Results are generated only when user presses Generate.
         */

        if (previewName && nameInput.value.trim()) {

            previewName.textContent =
                cleanName(nameInput.value);

        }

    });


    /*
     * Press Enter to generate
     */

    nameInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            generateNames();

        }

    });

}


/* =========================================================
   CLEAR NAME
   ========================================================= */

if (clearName) {

    clearName.addEventListener("click", () => {

        nameInput.value = "";

        currentName = "";

        clearName.hidden = true;

        nameInput.focus();

        if (previewName) {
            previewName.textContent = "Your Name";
        }

    });

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

if (styleFilters) {

    styleFilters.addEventListener("click", event => {

        const button = event.target.closest(".filter-button");

        if (!button) {
            return;
        }

        currentFilter = button.dataset.filter || "all";

        const buttons =
            styleFilters.querySelectorAll(".filter-button");

        buttons.forEach(btn => {

            btn.classList.toggle(
                "active",
                btn === button
            );

        });

        applyFilter();

    });

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

const symbolCards =
    document.querySelectorAll(".symbol-card");

symbolCards.forEach(card => {

    card.addEventListener("click", async () => {

        const symbol = card.dataset.symbol;

        if (!symbol) {
            return;
        }

        const copied = await copyText(symbol);

        if (copied) {

            card.classList.add("copied");

            const small = card.querySelector("small");

            if (small) {
                small.textContent = "Copied!";
            }

            setTimeout(() => {

                card.classList.remove("copied");

                if (small) {
                    small.textContent = "Copy";
                }

            }, 1200);

        }

    });

});


/* =========================================================
   TRENDING STYLE BUTTONS
   ========================================================= */

const useStyleButtons =
    document.querySelectorAll(".use-style-button");

useStyleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const template = button.dataset.template;

        if (!template) {
            return;
        }

        /*
         * If user has already entered a name,
         * use that name.
         *
         * Otherwise use the current input.
         */

        const entered =
            cleanName(nameInput.value) ||
            currentName ||
            "Your Name";

        const styled =
            template.replace(/\{name\}/gi, entered);

        copyText(styled);

        /* Put template name into input */

        if (nameInput) {

            nameInput.value = entered;

            if (clearName) {
                clearName.hidden = false;
            }

        }

        currentName = entered;

        /*
         * Generate complete results also.
         */

        generateNames();

    });

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    mobileMenu.classList.remove("open");

    mobileMenuButton.classList.remove("open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


function toggleMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    const isOpen =
        mobileMenu.classList.toggle("open");

    mobileMenuButton.classList.toggle(
        "open",
        isOpen
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Close mobile menu after navigation */

document
    .querySelectorAll(".mobile-nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


/* Close menu when clicking outside */

document.addEventListener("click", event => {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
    ) {

        closeMobileMenu();

    }

});


/* =========================================================
   BOTTOM MORE BUTTON
   ========================================================= */

if (bottomMenuButton) {

    bottomMenuButton.addEventListener("click", () => {

        toggleMobileMenu();

    });

}


/* =========================================================
   BOTTOM NAV ACTIVE STATE
   ========================================================= */

const bottomNavItems =
    document.querySelectorAll(".bottom-nav-item");

bottomNavItems.forEach(item => {

    if (item.tagName.toLowerCase() === "button") {
        return;
    }

    item.addEventListener("click", () => {

        bottomNavItems.forEach(nav => {

            nav.classList.remove("active");

        });

        item.classList.add("active");

    });

});


/* =========================================================
   DESKTOP NAV ACTIVE STATE
   ========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(nav => {

            nav.classList.remove("active");

        });

        link.classList.add("active");

    });

});


/* =========================================================
   FAQ
   ========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

        if (!item.open) {
            return;
        }

        faqItems.forEach(other => {

            if (other !== item) {

                other.removeAttribute("open");

            }

        });

    });

});


/* =========================================================
   HASH NAVIGATION
   ========================================================= */

window.addEventListener("hashchange", () => {

    closeMobileMenu();

});


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (clearName && nameInput) {

        clearName.hidden =
            nameInput.value.trim().length === 0;

    }

    /*
     * Make sure result sections remain hidden
     * until the user generates a name.
     */

    if (previewSection) {
        previewSection.hidden = true;
    }

    if (resultsSection) {
        resultsSection.hidden = true;
    }

});


/* =========================================================
   DEBUG / STYLE COUNT
   ========================================================= */

console.log(
    "Z-Name Style loaded successfully."
);

console.log(
    "Available style templates:",
    styleTemplates.length
);


/* =========================================================
   END
   ========================================================= */
