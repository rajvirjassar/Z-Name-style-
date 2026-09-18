/* =========================================================
   Z-NAME STYLE
   Full Working Script
   Stylish Name Generator
   ========================================================= */

"use strict";

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

let nameForm = null;
let nameInput = null;
let clearName = null;
let generateButton = null;

let previewSection = null;
let previewName = null;

let resultsSection = null;
let resultsContainer = null;
let resultsTitle = null;

let styleFilters = null;

let toast = null;
let toastMessage = null;

let mobileMenuButton = null;
let mobileMenu = null;

let bottomMenuButton = null;


/* =========================================================
   CURRENT STATE
   ========================================================= */

let currentName = "";
let currentFilter = "all";

let cachedStyles = [];
let toastTimer = null;

const copyResetTimers = new WeakMap();
const symbolResetTimers = new WeakMap();


/* =========================================================
   HELPER
   ========================================================= */

function cleanName(value) {

    return String(value ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 30);

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
    { category: "symbols", make: n => `༒ ${n} ༒` }

];


/* =========================================================
   FONT + SYMBOL COMBINATIONS
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

fontNames.forEach(fontName => {

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

            category,

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

styleTemplates.push(

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

);


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

    let category;

    if (index % 4 === 0) {
        category = "gaming";
    } else if (index % 4 === 1) {
        category = "symbols";
    } else if (index % 4 === 2) {
        category = "attitude";
    } else {
        category = "fancy";
    }

    styleTemplates.push({

        category,

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

    fontNames.forEach(fontName => {

        let category;

        if (index % 4 === 0) {
            category = "gaming";
        } else if (index % 4 === 1) {
            category = "attitude";
        } else if (index % 4 === 2) {
            category = "symbols";
        } else {
            category = "fancy";
        }

        styleTemplates.push({

            category,

            make: function(name) {

                const styledName =
                    convertFont(name, fontName);

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

            const cleanResult =
                String(result).trim();

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

            /*
             * A single bad template should never
             * break the complete generator.
             */

            return;

        }

    });

    return Array.from(unique.values());

}


/* =========================================================
   COPY FALLBACK
   ========================================================= */

function legacyCopy(text) {

    return new Promise(resolve => {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.setAttribute(
            "readonly",
            ""
        );

        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        let successful = false;

        try {

            successful =
                document.execCommand("copy");

        } catch (error) {

            successful = false;

        }

        textarea.remove();

        resolve(successful);

    });

}


/* =========================================================
   COPY FUNCTION
   ========================================================= */

async function copyText(text) {

    const value = String(text ?? "");

    if (!value) {
        showToast("Nothing to copy");
        return false;
    }

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(value);

            showToast("Copied!");

            return true;

        }

        const copied =
            await legacyCopy(value);

        if (copied) {

            showToast("Copied!");

            return true;

        }

        throw new Error("Copy command failed");

    } catch (error) {

        showToast("Copy failed");

        return false;

    }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent =
        String(message);

    toast.classList.add("show");

    if (toastTimer !== null) {

        clearTimeout(toastTimer);

    }

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

        toastTimer = null;

    }, 1800);

}


/* =========================================================
   COPY BUTTON UI
   ========================================================= */

function setCopyButtonState(button, copied) {

    if (!button) {
        return;
    }

    if (copied) {

        button.classList.add("copied");

        button.setAttribute(
            "aria-label",
            "Copied"
        );

        button.innerHTML = "";

        const icon =
            document.createElement("span");

        icon.className = "copy-icon";
        icon.textContent = "✓";

        const text =
            document.createElement("span");

        text.textContent = "Copied!";

        button.appendChild(icon);
        button.appendChild(text);

        return;

    }

    button.classList.remove("copied");

    button.setAttribute(
        "aria-label",
        "Copy name"
    );

    button.innerHTML = "";

    const icon =
        document.createElement("span");

    icon.className = "copy-icon";
    icon.textContent = "📋";

    const text =
        document.createElement("span");

    text.textContent = "Copy";

    button.appendChild(icon);
    button.appendChild(text);

}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults(styles) {

    if (!resultsContainer) {
        return;
    }

    resultsContainer.replaceChildren();

    if (!Array.isArray(styles) || !styles.length) {

        const card =
            document.createElement("article");

        card.className = "result-card";

        const nameDiv =
            document.createElement("div");

        nameDiv.className = "result-name";
        nameDiv.textContent = "No styles found";

        card.appendChild(nameDiv);

        resultsContainer.appendChild(card);

        return;

    }

    const fragment =
        document.createDocumentFragment();

    styles.forEach((style, index) => {

        if (!style || !style.text) {
            return;
        }

        const card =
            document.createElement("article");

        card.className = "result-card";

        card.style.animationDelay =
            `${Math.min(index * 0.018, 0.35)}s`;

        const nameDiv =
            document.createElement("div");

        nameDiv.className = "result-name";
        nameDiv.textContent = style.text;

        const copyButton =
            document.createElement("button");

        copyButton.type = "button";
        copyButton.className =
            "copy-result-button";

        copyButton.setAttribute(
            "aria-label",
            "Copy name"
        );

        setCopyButtonState(
            copyButton,
            false
        );

        copyButton.addEventListener(
            "click",
            async () => {

                const copied =
                    await copyText(style.text);

                if (!copied) {
                    return;
                }

                setCopyButtonState(
                    copyButton,
                    true
                );

                const existingTimer =
                    copyResetTimers.get(copyButton);

                if (existingTimer) {

                    clearTimeout(existingTimer);

                }

                const timer =
                    setTimeout(() => {

                        if (
                            copyButton.isConnected
                        ) {

                            setCopyButtonState(
                                copyButton,
                                false
                            );

                        }

                        copyResetTimers.delete(
                            copyButton
                        );

                    }, 1400);

                copyResetTimers.set(
                    copyButton,
                    timer
                );

            }
        );

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

    /*
     * Use cached styles instead of rebuilding
     * every time the user changes a filter.
     */

    const allStyles =
        cachedStyles.length
            ? cachedStyles
            : buildStyles(currentName);

    let filteredStyles = allStyles;

    if (currentFilter !== "all") {

        filteredStyles =
            allStyles.filter(style => {

                return (
                    style.category ===
                    currentFilter
                );

            });

    }

    renderResults(filteredStyles);

    updateResultsTitle(
        filteredStyles.length
    );

}


/* =========================================================
   RESULTS TITLE
   ========================================================= */

function updateResultsTitle(count) {

    if (!resultsTitle) {
        return;
    }

    const safeCount =
        Number.isFinite(count)
            ? count
            : 0;

    resultsTitle.textContent =
        `Stylish Names (${safeCount})`;

}


/* =========================================================
   UPDATE FILTER UI
   ========================================================= */

function updateFilterButtons() {

    if (!styleFilters) {
        return;
    }

    const buttons =
        styleFilters.querySelectorAll(
            ".filter-button"
        );

    buttons.forEach(button => {

        const isActive =
            (button.dataset.filter || "all") ===
            currentFilter;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );

    });

}


/* =========================================================
   GENERATE
   ========================================================= */

function generateNames(options = {}) {

    if (!nameInput) {
        return;
    }

    const value =
        cleanName(nameInput.value);

    if (!value) {

        if (
            document.activeElement !==
            nameInput
        ) {

            nameInput.focus();

        }

        showToast(
            "Please enter your name"
        );

        return;

    }

    currentName = value;
    currentFilter = "all";

    /*
     * Build styles only once for this name.
     */

    cachedStyles =
        buildStyles(value);

    /* -----------------------------------------
       Update input
       ----------------------------------------- */

    if (nameInput.value !== value) {

        nameInput.value = value;

    }

    /* -----------------------------------------
       Update clear button
       ----------------------------------------- */

    if (clearName) {

        clearName.hidden = false;

    }

    /* -----------------------------------------
       Update preview
       ----------------------------------------- */

    if (previewName) {

        previewName.textContent =
            value;

    }

    if (previewSection) {

        previewSection.hidden = false;

    }

    /* -----------------------------------------
       Show results
       ----------------------------------------- */

    if (resultsSection) {

        resultsSection.hidden = false;

    }

    /* -----------------------------------------
       Reset filter buttons
       ----------------------------------------- */

    updateFilterButtons();

    /* -----------------------------------------
       Render results
       ----------------------------------------- */

    renderResults(cachedStyles);

    updateResultsTitle(
        cachedStyles.length
    );

    /*
     * Scroll only when requested.
     *
     * This keeps the generator reusable
     * from trending styles without forcing
     * unwanted scrolling in every situation.
     */

    if (options.scroll !== false) {

        window.setTimeout(() => {

            if (!resultsSection) {
                return;
            }

            const behavior =
                window.matchMedia &&
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth";

            resultsSection.scrollIntoView({

                behavior,
                block: "start"

            });

        }, 80);

    }

}


/* =========================================================
   CLEAR NAME
   ========================================================= */

function clearCurrentName() {

    if (!nameInput) {
        return;
    }

    nameInput.value = "";

    currentName = "";
    currentFilter = "all";
    cachedStyles = [];

    if (clearName) {

        clearName.hidden = true;

    }

    if (previewName) {

        previewName.textContent =
            "Your Name";

    }

    if (previewSection) {

        previewSection.hidden = true;

    }

    if (resultsSection) {

        resultsSection.hidden = true;

    }

    if (resultsContainer) {

        resultsContainer.replaceChildren();

    }

    updateResultsTitle(0);
    updateFilterButtons();

    nameInput.focus();

}


/* =========================================================
   SYMBOL COPY
   ========================================================= */

async function handleSymbolCopy(card) {

    if (!card) {
        return;
    }

    const symbol =
        card.dataset.symbol;

    if (!symbol) {
        return;
    }

    const copied =
        await copyText(symbol);

    if (!copied) {
        return;
    }

    card.classList.add("copied");

    const small =
        card.querySelector("small");

    if (small) {

        small.dataset.originalText =
            small.dataset.originalText ||
            small.textContent;

        small.textContent =
            "Copied!";

    }

    const existingTimer =
        symbolResetTimers.get(card);

    if (existingTimer) {

        clearTimeout(existingTimer);

    }

    const timer =
        setTimeout(() => {

            if (!card.isConnected) {
                return;
            }

            card.classList.remove(
                "copied"
            );

            if (small) {

                small.textContent =
                    small.dataset.originalText ||
                    "Copy";

            }

            symbolResetTimers.delete(
                card
            );

        }, 1200);

    symbolResetTimers.set(
        card,
        timer
    );

}


/* =========================================================
   TRENDING STYLE BUTTON
   ========================================================= */

function useTrendingStyle(button) {

    if (!button || !nameInput) {
        return;
    }

    const template =
        button.dataset.template;

    if (!template) {
        return;
    }

    const entered =
        cleanName(nameInput.value) ||
        currentName ||
        "Your Name";

    const styled =
        template.replace(
            /\{name\}/gi,
            entered
        );

    /*
     * Copy the selected trending style.
     */

    copyText(styled);

    /*
     * Put the name into generator.
     */

    nameInput.value =
        entered;

    if (clearName) {

        clearName.hidden = false;

    }

    currentName =
        entered;

    /*
     * Generate the full list.
     * Do not force an additional scroll
     * because the button is already near
     * the generator/results area.
     */

    generateNames({
        scroll: true
    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }

    mobileMenu.classList.remove(
        "open"
    );

    mobileMenuButton.classList.remove(
        "open"
    );

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
        !mobileMenu.classList.contains(
            "open"
        );

    if (isOpen) {

        mobileMenu.classList.add(
            "open"
        );

        mobileMenuButton.classList.add(
            "open"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    } else {

        closeMobileMenu();

    }

}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

function updateActiveNavigation() {

    const hash =
        window.location.hash;

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    const bottomNavItems =
        document.querySelectorAll(
            ".bottom-nav-item"
        );

    /*
     * If there is no hash, keep the first
     * normal navigation item active only
     * when explicitly marked in HTML.
     */

    if (!hash) {
        return;
    }

    navLinks.forEach(link => {

        const href =
            link.getAttribute("href") || "";

        link.classList.toggle(
            "active",
            href === hash
        );

    });

    bottomNavItems.forEach(item => {

        if (
            item.tagName.toLowerCase() ===
            "button"
        ) {
            return;
        }

        const href =
            item.getAttribute("href") || "";

        item.classList.toggle(
            "active",
            href === hash
        );

    });

}


/* =========================================================
   FAQ
   ========================================================= */

function setupFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {
                    return;
                }

                faqItems.forEach(other => {

                    if (other !== item) {

                        other.removeAttribute(
                            "open"
                        );

                    }

                });

            }
        );

    });

}


/* =========================================================
   INITIALIZE DOM ELEMENTS
   ========================================================= */

function cacheDOMElements() {

    nameForm =
        document.getElementById(
            "nameForm"
        );

    nameInput =
        document.getElementById(
            "nameInput"
        );

    clearName =
        document.getElementById(
            "clearName"
        );

    generateButton =
        document.getElementById(
            "generateButton"
        );

    previewSection =
        document.getElementById(
            "previewSection"
        );

    previewName =
        document.getElementById(
            "previewName"
        );

    resultsSection =
        document.getElementById(
            "resultsSection"
        );

    resultsContainer =
        document.getElementById(
            "resultsContainer"
        );

    resultsTitle =
        document.getElementById(
            "resultsTitle"
        );

    styleFilters =
        document.getElementById(
            "styleFilters"
        );

    toast =
        document.getElementById(
            "toast"
        );

    toastMessage =
        document.getElementById(
            "toastMessage"
        );

    mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    bottomMenuButton =
        document.getElementById(
            "bottomMenuButton"
        );

}


/* =========================================================
   FORM EVENTS
   ========================================================= */

function setupFormEvents() {

    if (nameForm) {

        nameForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                generateNames();

            }
        );

    }


    if (generateButton) {

        generateButton.addEventListener(
            "click",
            event => {

                /*
                 * If the button is already inside
                 * the form, the submit event handles
                 * generation. This listener exists
                 * only as a safe fallback for buttons
                 * outside the form.
                 */

                if (
                    !nameForm ||
                    generateButton.form !== nameForm
                ) {

                    event.preventDefault();

                    generateNames();

                }

            }
        );

    }


    if (nameInput) {

        nameInput.addEventListener(
            "input",
            () => {

                const cleaned =
                    nameInput.value.slice(
                        0,
                        30
                    );

                if (
                    nameInput.value !==
                    cleaned
                ) {

                    nameInput.value =
                        cleaned;

                }

                if (clearName) {

                    clearName.hidden =
                        nameInput.value.length === 0;

                }

                if (
                    previewName &&
                    nameInput.value.trim()
                ) {

                    previewName.textContent =
                        cleanName(
                            nameInput.value
                        );

                }

            }
        );


        nameInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    generateNames();

                }

            }
        );

    }


    if (clearName) {

        clearName.addEventListener(
            "click",
            clearCurrentName
        );

    }

}


/* =========================================================
   FILTER EVENTS
   ========================================================= */

function setupFilterEvents() {

    if (!styleFilters) {
        return;
    }

    styleFilters.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".filter-button"
                );

            if (!button) {
                return;
            }

            currentFilter =
                button.dataset.filter ||
                "all";

            updateFilterButtons();

            applyFilter();

        }
    );

}


/* =========================================================
   SYMBOL EVENTS
   ========================================================= */

function setupSymbolEvents() {

    const symbolCards =
        document.querySelectorAll(
            ".symbol-card"
        );

    symbolCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                handleSymbolCopy(card);

            }
        );

    });

}


/* =========================================================
   TRENDING STYLE EVENTS
   ========================================================= */

function setupTrendingEvents() {

    const useStyleButtons =
        document.querySelectorAll(
            ".use-style-button"
        );

    useStyleButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                useTrendingStyle(
                    button
                );

            }
        );

    });

}


/* =========================================================
   MOBILE MENU EVENTS
   ========================================================= */

function setupMobileMenuEvents() {

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleMobileMenu();

            }
        );

    }


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            event => {

                const link =
                    event.target.closest(
                        ".mobile-nav-link"
                    );

                if (link) {

                    closeMobileMenu();

                }

            }
        );

    }


    /*
     * Close when clicking outside.
     */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileMenu ||
                !mobileMenuButton
            ) {
                return;
            }

            if (
                !mobileMenu.contains(
                    event.target
                ) &&
                !mobileMenuButton.contains(
                    event.target
                )
            ) {

                closeMobileMenu();

            }

        }
    );


    /*
     * Escape key closes the menu.
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /*
     * Keep the menu closed when moving
     * between desktop and mobile layouts.
     */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 700
            ) {

                closeMobileMenu();

            }

        }
    );


    /*
     * Bottom More button opens the same
     * mobile menu.
     */

    if (bottomMenuButton) {

        bottomMenuButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                toggleMobileMenu();

            }
        );

    }

}


/* =========================================================
   NAV EVENTS
   ========================================================= */

function setupNavigationEvents() {

    const bottomNavItems =
        document.querySelectorAll(
            ".bottom-nav-item"
        );

    bottomNavItems.forEach(item => {

        /*
         * More button is controlled separately.
         */

        if (
            item.tagName.toLowerCase() ===
            "button"
        ) {
            return;
        }

        item.addEventListener(
            "click",
            () => {

                bottomNavItems.forEach(
                    nav => {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );

                item.classList.add(
                    "active"
                );

            }
        );

    });


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach(
                    nav => {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );

                link.classList.add(
                    "active"
                );

            }
        );

    });


    window.addEventListener(
        "hashchange",
        () => {

            closeMobileMenu();

            updateActiveNavigation();

        }
    );

}


/* =========================================================
   INITIAL PAGE STATE
   ========================================================= */

function setupInitialState() {

    if (clearName && nameInput) {

        clearName.hidden =
            nameInput.value.trim().length === 0;

    }


    /*
     * Results stay hidden until generation.
     */

    if (previewSection) {

        previewSection.hidden = true;

    }

    if (resultsSection) {

        resultsSection.hidden = true;

    }


    /*
     * Make sure no stale result data
     * exists when page initially loads.
     */

    currentName = "";
    currentFilter = "all";
    cachedStyles = [];

    updateFilterButtons();
    updateActiveNavigation();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function init() {

    cacheDOMElements();

    setupInitialState();

    setupFormEvents();

    setupFilterEvents();

    setupSymbolEvents();

    setupTrendingEvents();

    setupMobileMenuEvents();

    setupNavigationEvents();

    setupFAQ();

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init,
        { once: true }
    );

} else {

    init();

}


/* =========================================================
   END
   ========================================================= */
