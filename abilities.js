// Extra abilities. Loaded after the core brain (T, INTENTS, brain, answer) and before the UI script.
// Everything here is free and keyless, except open-ended chat which uses a free Gemini key held on the server.

Object.assign(SPEECH, {
  fr: "fr-FR", de: "de-DE", it: "it-IT", pt: "pt-BR", ja: "ja-JP", zh: "zh-CN", ar: "ar-SA",
  ru: "ru-RU", ko: "ko-KR", ta: "ta-IN", bn: "bn-IN", gu: "gu-IN", mr: "mr-IN", te: "te-IN",
});

// ---------- Strings ----------
const plural = (n, one, many) => (n === 1 ? one : many);
const X = {
  en: {
    dur: { h: n => `${n} ${plural(n, "hour", "hours")}`, m: n => `${n} ${plural(n, "minute", "minutes")}`, s: n => `${n} ${plural(n, "second", "seconds")}` },
    swStarted: "Stopwatch started.", swRunning: d => `The stopwatch is at ${d}.`, swStopped: d => `Stopped at ${d}.`, swReset: "Stopwatch reset.",
    swNotRunning: "The stopwatch isn't running.", swAlready: d => `It's already running, at ${d}.`,
    cdOut: (n, l) => (n === 0 ? `${l} is today!` : `There ${plural(n, "is 1 day", `are ${n} days`)} until ${l}.`),
    cdNeed: "Until which date? Try “how many days until Christmas”.",
    remSet: (m, n, u) => `Okay, I'll remind you${m ? " to " + m : ""} in ${n} ${u}${n === 1 ? "" : "s"}. Keep this page open.`,
    remDone: m => (m ? `Reminder: ${m}.` : "Time's up! Here's your reminder."), remNeed: "Remind you when? Try “remind me to call mom in 10 minutes”.",
    noteSaved: "Okay, I've noted that.", noteEmpty: "What should I note?", notesNone: "You have no notes.",
    notesOut: (n, list) => `You have ${n} ${plural(n, "note", "notes")}. ${list}`, notesCleared: "All notes cleared.",
    todoAdded: i => `Added ${i} to your list.`, todoNone: "Your list is empty.", todoList: (n, items) => `You have ${n} ${plural(n, "item", "items")}: ${items}.`,
    todoCleared: "Your list is cleared.", todoRemoved: i => `Removed ${i}.`, todoNotFound: i => `I couldn't find ${i} on your list.`,
    sunOut: (k, c, t) => `${k === "rise" ? "Sunrise" : "Sunset"} in ${c} is at ${t} today.`, cityTime: (c, t) => `It's ${t} in ${c}.`,
    trNeed: "What should I translate? Try “translate good morning to Spanish”.", trLang: "Which language? Try “translate good morning to Spanish”.",
    trIn: n => `In ${n}`, trFail: "I couldn't translate that right now.",
    defNeed: "Which word? Try “define serendipity”.", defOut: (w, p, d) => `${w}${p ? ", " + p : ""}: ${d}`, defNone: w => `I couldn't find a definition for ${w}.`,
    cvOut: (a, ua, b, ub) => `${a} ${ua} is about ${b} ${ub}.`, cvFail: "I couldn't get that conversion right now.",
    factFail: "I couldn't think of a fact just now.", quoteFail: "I couldn't find a quote just now.",
    riddleAsk: q => `Here's a riddle. ${q}`, riddleRight: "Correct! Well done.", riddleWrong: "Not quite. Try again, or say give up.", riddleReveal: a => `The answer is ${a}.`,
    triAsk: (q, o) => `Trivia time! ${q} ${o}`, triRight: "Correct!", triWrong: a => `Not quite. The answer was ${a}.`, triRetry: "Say A, B, C or D.",
    pickOut: (n, lo, hi) => `I pick ${n}, between ${lo} and ${hi}.`,
    opening: n => `Opening ${n}.`, popup: "Your browser blocked the new tab. Tap the link to open it.",
    copied: "Copied to the clipboard.", copyFail: "I couldn't copy that. The browser blocked it.", copyNeed: "What should I copy?",
    help: l => `I can ${l}. Ask me “can you…?” about anything.`,
    labels: { stopwatch: "run a stopwatch", countdown: "count the days until a date", remind: "set reminders", notes: "take notes for you", todo: "keep a to-do list", sun: "tell you sunrise and sunset times", translate: "translate phrases", define: "define words", convert: "convert units and currencies", fact: "tell you a fun fact", quote: "share a quote", riddle: "ask you a riddle", trivia: "quiz you with trivia", pick: "pick a random number", web: "open websites and search Google or YouTube", copy: "copy text for you", help: "tell you what I can do" },
    chips: ["What can you do?", "Convert 10 miles to kilometers", "Translate good morning to Spanish", "Tell me a fun fact", "Start the stopwatch", "Open YouTube", "How many days until Christmas?", "What time is it in Tokyo?"],
  },
  hi: {
    dur: { h: n => `${n} घंटे`, m: n => `${n} मिनट`, s: n => `${n} सेकंड` },
    swStarted: "स्टॉपवॉच शुरू हो गई।", swRunning: d => `स्टॉपवॉच पर ${d} हुए हैं।`, swStopped: d => `${d} पर रोक दी।`, swReset: "स्टॉपवॉच रीसेट हो गई।",
    swNotRunning: "स्टॉपवॉच चल नहीं रही है।", swAlready: d => `यह पहले से चल रही है, ${d} हुए हैं।`,
    cdOut: (n, l) => (n === 0 ? `${l} आज ही है!` : `${l} में ${n} दिन बाकी हैं।`),
    cdNeed: "किस तारीख तक? कहिए “क्रिसमस में कितने दिन बाकी हैं”।",
    remSet: (m, n, u) => `ठीक है, ${n} ${u} में${m ? " " + m : ""} याद दिला दूँगा। यह पेज खुला रखिए।`,
    remDone: m => (m ? `याद दिलाना: ${m}।` : "समय पूरा हुआ! यह रहा आपका रिमाइंडर।"), remNeed: "कब याद दिलाऊँ? कहिए “10 मिनट में माँ को फ़ोन करना याद दिलाओ”।",
    noteSaved: "ठीक है, नोट कर लिया।", noteEmpty: "क्या नोट करूँ?", notesNone: "आपके कोई नोट नहीं हैं।",
    notesOut: (n, list) => `आपके ${n} नोट हैं। ${list}`, notesCleared: "सारे नोट मिटा दिए।",
    todoAdded: i => `${i} आपकी लिस्ट में जोड़ दिया।`, todoNone: "आपकी लिस्ट खाली है।", todoList: (n, items) => `आपकी लिस्ट में ${n} चीज़ें हैं: ${items}।`,
    todoCleared: "लिस्ट साफ़ कर दी।", todoRemoved: i => `${i} हटा दिया।`, todoNotFound: i => `${i} आपकी लिस्ट में नहीं मिला।`,
    sunOut: (k, c, t) => `${c} में आज ${k === "rise" ? "सूर्योदय" : "सूर्यास्त"} ${t} पर है।`, cityTime: (c, t) => `${c} में अभी ${t} हुए हैं।`,
    trNeed: "क्या अनुवाद करूँ? कहिए “good morning को स्पेनिश में अनुवाद करो”।", trLang: "किस भाषा में? कहिए “good morning को स्पेनिश में अनुवाद करो”।",
    trIn: n => `${n} में`, trFail: "अभी अनुवाद नहीं हो पाया।",
    defNeed: "कौन सा शब्द? कहिए “प्यार का मतलब”।", defOut: (w, p, d) => `${w}${p ? ", " + p : ""}: ${d}`, defNone: w => `${w} की परिभाषा नहीं मिली।`,
    cvOut: (a, ua, b, ub) => `${a} ${ua} लगभग ${b} ${ub} होता है।`, cvFail: "अभी यह बदलाव नहीं हो पाया।",
    factFail: "अभी कोई तथ्य याद नहीं आया।", quoteFail: "अभी कोई विचार नहीं मिला।",
    riddleAsk: q => `ये रही एक पहेली। ${q}`, riddleRight: "सही जवाब! शाबाश।", riddleWrong: "ठीक नहीं। फिर कोशिश कीजिए, या कहिए हार मान ली।", riddleReveal: a => `जवाब है ${a}।`,
    triAsk: (q, o) => `ट्रिविया का समय! ${q} ${o}`, triRight: "सही!", triWrong: a => `ठीक नहीं। जवाब था ${a}।`, triRetry: "ए, बी, सी या डी कहिए।",
    pickOut: (n, lo, hi) => `${lo} और ${hi} के बीच मैं ${n} चुनता हूँ।`,
    opening: n => `${n} खोल रहा हूँ।`, popup: "ब्राउज़र ने नया टैब रोक दिया। लिंक पर टैप कीजिए।",
    copied: "क्लिपबोर्ड पर कॉपी हो गया।", copyFail: "कॉपी नहीं हो पाया। ब्राउज़र ने रोक दिया।", copyNeed: "क्या कॉपी करूँ?",
    help: l => `मैं ${l} सकता हूँ। मुझसे “क्या तुम … सकते हो?” पूछिए।`,
    labels: { stopwatch: "स्टॉपवॉच चला", countdown: "तारीख तक के दिन गिन", remind: "याद दिला", notes: "नोट्स लिख", todo: "टू-डू लिस्ट रख", sun: "सूर्योदय और सूर्यास्त का समय बता", translate: "अनुवाद कर", define: "शब्दों का मतलब बता", convert: "यूनिट और करेंसी बदल", fact: "मज़ेदार तथ्य बता", quote: "प्रेरक विचार सुना", riddle: "पहेली पूछ", trivia: "क्विज़ खेल", pick: "कोई नंबर चुन", web: "वेबसाइट खोल", copy: "टेक्स्ट कॉपी कर", help: "बता कि मैं क्या-क्या कर" },
    chips: ["तुम क्या कर सकते हो?", "10 मील को किलोमीटर में बदलो", "एक मज़ेदार तथ्य बताओ", "स्टॉपवॉच शुरू करो", "यूट्यूब खोलो", "क्रिसमस में कितने दिन बाकी हैं?", "टोक्यो में कितने बजे हैं?"],
  },
  es: {
    dur: { h: n => `${n} ${plural(n, "hora", "horas")}`, m: n => `${n} ${plural(n, "minuto", "minutos")}`, s: n => `${n} ${plural(n, "segundo", "segundos")}` },
    swStarted: "Cronómetro iniciado.", swRunning: d => `El cronómetro va en ${d}.`, swStopped: d => `Detenido en ${d}.`, swReset: "Cronómetro reiniciado.",
    swNotRunning: "El cronómetro no está en marcha.", swAlready: d => `Ya está en marcha, va en ${d}.`,
    cdOut: (n, l) => (n === 0 ? `¡${l} es hoy!` : `${plural(n, "Falta 1 día", `Faltan ${n} días`)} para ${l}.`),
    cdNeed: "¿Hasta qué fecha? Prueba “cuántos días faltan para Navidad”.",
    remSet: (m, n, u) => `Listo, te lo recordaré${m ? " (" + m + ")" : ""} en ${n} ${u}. Mantén esta página abierta.`,
    remDone: m => (m ? `Recordatorio: ${m}.` : "¡Se acabó el tiempo! Aquí tienes tu recordatorio."), remNeed: "¿Cuándo te lo recuerdo? Prueba “recuérdame llamar a mamá en 10 minutos”.",
    noteSaved: "Listo, lo anoté.", noteEmpty: "¿Qué anoto?", notesNone: "No tienes notas.",
    notesOut: (n, list) => `Tienes ${n} ${plural(n, "nota", "notas")}. ${list}`, notesCleared: "Notas borradas.",
    todoAdded: i => `Añadí ${i} a tu lista.`, todoNone: "Tu lista está vacía.", todoList: (n, items) => `Tienes ${n} ${plural(n, "elemento", "elementos")}: ${items}.`,
    todoCleared: "Lista vaciada.", todoRemoved: i => `Quité ${i}.`, todoNotFound: i => `No encontré ${i} en tu lista.`,
    sunOut: (k, c, t) => `${k === "rise" ? "La salida" : "La puesta"} del sol en ${c} es hoy a las ${t}.`, cityTime: (c, t) => `En ${c} son las ${t}.`,
    trNeed: "¿Qué traduzco? Prueba “traduce buenos días al inglés”.", trLang: "¿A qué idioma? Prueba “traduce buenos días al inglés”.",
    trIn: n => `En ${n}`, trFail: "No pude traducir eso ahora.",
    defNeed: "¿Qué palabra? Prueba “qué significa serendipia”.", defOut: (w, p, d) => `${w}${p ? ", " + p : ""}: ${d}`, defNone: w => `No encontré una definición de ${w}.`,
    cvOut: (a, ua, b, ub) => `${a} ${ua} son aproximadamente ${b} ${ub}.`, cvFail: "No pude hacer esa conversión ahora.",
    factFail: "No se me ocurre un dato ahora.", quoteFail: "No encontré una frase ahora.",
    riddleAsk: q => `Aquí va una adivinanza. ${q}`, riddleRight: "¡Correcto! Bien hecho.", riddleWrong: "No exactamente. Intenta otra vez, o di me rindo.", riddleReveal: a => `La respuesta es ${a}.`,
    triAsk: (q, o) => `¡Hora de trivia! ${q} ${o}`, triRight: "¡Correcto!", triWrong: a => `No exactamente. La respuesta era ${a}.`, triRetry: "Di A, B, C o D.",
    pickOut: (n, lo, hi) => `Elijo el ${n}, entre ${lo} y ${hi}.`,
    opening: n => `Abriendo ${n}.`, popup: "Tu navegador bloqueó la pestaña nueva. Toca el enlace para abrirla.",
    copied: "Copiado al portapapeles.", copyFail: "No pude copiarlo. El navegador lo bloqueó.", copyNeed: "¿Qué copio?",
    help: l => `Puedo ${l}. Pregúntame “¿puedes…?” lo que quieras.`,
    labels: { stopwatch: "usar un cronómetro", countdown: "contar los días hasta una fecha", remind: "poner recordatorios", notes: "tomar notas", todo: "llevar tu lista de tareas", sun: "decirte la salida y puesta del sol", translate: "traducir frases", define: "definir palabras", convert: "convertir unidades y monedas", fact: "contarte un dato curioso", quote: "compartir una frase", riddle: "plantearte una adivinanza", trivia: "hacerte preguntas de cultura general", pick: "elegir un número al azar", web: "abrir sitios web y buscar en Google o YouTube", copy: "copiar texto", help: "decirte lo que puedo hacer" },
    chips: ["¿Qué puedes hacer?", "Convierte 10 millas a kilómetros", "Dime un dato curioso", "Inicia el cronómetro", "Abre YouTube", "¿Cuántos días faltan para Navidad?", "¿Qué hora es en Tokio?"],
  },
};
Object.assign(X.en, {
  moonNames: ["new moon", "waxing crescent", "first quarter", "waxing gibbous", "full moon", "waning gibbous", "last quarter", "waning crescent"],
  moonOut: (name, pct, when) => `${when} the moon is a ${name}, about ${pct} percent lit.`,
  moonNext: (kind, n, date) => `The next ${kind} is ${n === 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`}, on ${date}.`,
  today: "Today", tomorrow: "Tomorrow",
});
Object.assign(X.hi, {
  moonNames: ["अमावस्या", "बढ़ता हुआ अर्धचंद्र", "पहली तिमाही का चाँद", "बढ़ता हुआ गिब्बस चाँद", "पूर्णिमा", "घटता हुआ गिब्बस चाँद", "आखिरी तिमाही का चाँद", "घटता हुआ अर्धचंद्र"],
  moonOut: (name, pct, when) => `${when} चाँद की स्थिति है ${name}, लगभग ${pct} प्रतिशत रोशन।`,
  moonNext: (kind, n, date) => `अगली ${kind} ${n === 0 ? "आज" : n === 1 ? "कल" : `${n} दिन बाद`}, ${date} को है।`,
  today: "आज", tomorrow: "कल",
});
Object.assign(X.es, {
  moonNames: ["luna nueva", "luna creciente", "cuarto creciente", "luna gibosa creciente", "luna llena", "luna gibosa menguante", "cuarto menguante", "luna menguante"],
  moonOut: (name, pct, when) => `${when} la luna está en ${name}, iluminada al ${pct} por ciento.`,
  moonNext: (kind, n, date) => `La próxima ${kind} es ${n === 0 ? "hoy" : n === 1 ? "mañana" : `en ${n} días`}, el ${date}.`,
  today: "Hoy", tomorrow: "Mañana",
});
Object.assign(X.en, { welcome: n => `Welcome${n ? ", " + n : ""}!`, youAre: n => `You're ${n}.`, noName: "I don't know your name yet. Sign in and I will." });
Object.assign(X.hi, { welcome: n => `स्वागत है${n ? ", " + n : ""}!`, youAre: n => `आप ${n} हैं।`, noName: "मुझे अभी आपका नाम नहीं पता। साइन इन कीजिए।" });
Object.assign(X.es, { welcome: n => `¡Bienvenido${n ? ", " + n : ""}!`, youAre: n => `Eres ${n}.`, noName: "Aún no sé tu nombre. Inicia sesión y lo sabré." });
X.en.labels.whoami = "tell you who you are"; X.hi.labels.whoami = "आपका नाम बता"; X.es.labels.whoami = "decirte tu nombre";
for (const l of ["en", "hi", "es"]) T[l].greetUser = n => X[l].welcome(n);
X.en.labels.moon = "tell you the moon phase";
X.hi.labels.moon = "चाँद की स्थिति बता";
X.es.labels.moon = "decirte la fase de la luna";
X.en.chips.push("What's the moon phase?"); X.hi.chips.push("चाँद की क्या स्थिति है?"); X.es.chips.push("¿Qué fase de la luna es hoy?");

Object.assign(X.en, {
  stopOk: "Okay.", noLast: "I haven't said anything yet.",
  slower: "Okay, speaking slower.", faster: "Okay, speaking faster.", slowest: "That's as slow as I go.", fastest: "That's as fast as I go.",
  louder: "Okay, louder.", quieter: "Okay, quieter.", fullvol: "I'm already at full volume.", minvol: "I can't go any quieter.",
  langSet: "Okay, I'll speak English.", langNeed: "Which language? English, Hindi or Spanish.",
  todayOnly: "I can only tell you about today for that. Try asking with a city name.",
});
Object.assign(X.hi, {
  stopOk: "ठीक है।", noLast: "मैंने अभी तक कुछ नहीं कहा।",
  slower: "ठीक है, धीरे बोलूँगा।", faster: "ठीक है, तेज़ बोलूँगा।", slowest: "इससे धीमा नहीं बोल सकता।", fastest: "इससे तेज़ नहीं बोल सकता।",
  louder: "ठीक है, आवाज़ बढ़ा दी।", quieter: "ठीक है, आवाज़ कम कर दी।", fullvol: "आवाज़ पहले से पूरी है।", minvol: "इससे कम आवाज़ नहीं हो सकती।",
  langSet: "ठीक है, अब मैं हिन्दी में बोलूँगा।", langNeed: "कौन सी भाषा? अंग्रेज़ी, हिन्दी या स्पेनिश।",
  todayOnly: "इसके लिए मैं सिर्फ़ आज की जानकारी दे सकता हूँ। किसी शहर का नाम बोलकर पूछिए।",
});
Object.assign(X.es, {
  stopOk: "Vale.", noLast: "Todavía no he dicho nada.",
  slower: "Vale, hablaré más lento.", faster: "Vale, hablaré más rápido.", slowest: "No puedo hablar más lento.", fastest: "No puedo hablar más rápido.",
  louder: "Vale, más fuerte.", quieter: "Vale, más bajo.", fullvol: "Ya estoy a todo volumen.", minvol: "No puedo hablar más bajo.",
  langSet: "Vale, ahora hablo español.", langNeed: "¿Qué idioma? Inglés, hindi o español.",
  todayOnly: "Para eso solo puedo decirte lo de hoy. Prueba con el nombre de una ciudad.",
});
Object.assign(X.en.labels, { stop: "stop talking when you say stop", again: "repeat my last answer", followup: "answer follow-ups like “and tomorrow?”", speed: "speak slower, faster, louder or quieter", lang: "switch between English, Hindi and Spanish" });
Object.assign(X.hi.labels, { stop: "रुको कहने पर चुप", again: "पिछला जवाब दोहरा", followup: "“और कल?” जैसे सवालों का जवाब दे", speed: "धीरे या तेज़ बोल", lang: "अंग्रेज़ी, हिन्दी और स्पेनिश में बदल" });
Object.assign(X.es.labels, { stop: "callarme cuando digas para", again: "repetir mi última respuesta", followup: "responder preguntas como «¿y mañana?»", speed: "hablar más lento, rápido, fuerte o bajo", lang: "cambiar entre inglés, hindi y español" });

for (const l of ["en", "hi", "es"]) {
  Object.assign(T[l].labels, X[l].labels);
  T[l].chips.splice(2, 0, ...X[l].chips.slice(0, 1)); // "What can you do?" near the front
  T[l].chips.push(...X[l].chips.slice(1));
}

// Stop words so the city survives in "what time is it in Tokyo" / "sunrise in Pune".
STOP_CITY.en.push(..."time clock current sunrise sunset when does rise set up go down".split(" "));
STOP_CITY.hi.push(..."समय टाइम कितने बजे हैं सूर्योदय सूर्यास्त कब होता होगा हुआ".split(" "));
STOP_CITY.es.push(..."hora es son las amanecer atardecer puesta sol cuándo cuando sale se pone salida".split(" "));

// ---------- Helpers ----------
const unesc = s => { const e = document.createElement("textarea"); e.innerHTML = s; return e.value; };
const stripHtml = s => unesc(s.replace(/<[^>]+>/g, ""));
const dur = (sec, lang) => {
  sec = Math.round(sec); const u = X[lang].dur, p = [];
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  if (h) p.push(u.h(h)); if (m) p.push(u.m(m)); if (s || !p.length) p.push(u.s(s));
  return p.join(" ");
};
const store = (key, def) => { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } };
const keep = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage blocked */ } window.cloudSave && window.cloudSave(); };
const geo = async (city, lang) => {
  const g = await getJSON(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=${lang}`);
  return g.results && g.results[0];
};
async function tx(text, tgt, src = "en") { // MyMemory free translation; falls back to the original text
  if (src === tgt) return text;
  try {
    const j = await getJSON(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`);
    const out = j.responseData && j.responseData.translatedText;
    return out && !/MYMEMORY WARNING|INVALID/i.test(out) ? unesc(out) : text;
  } catch { return text; }
}
const any = fn => ({ en: { test: fn }, hi: { test: fn }, es: { test: fn } }); // same test function for every language

// ---------- Stopwatch ----------
const SW = {
  start: { en: /\b(start|begin|go)\b/, hi: /शुरू|स्टार्ट/, es: /inicia|empieza|arranca|comienza/ },
  stop: { en: /\b(stop|pause|end)\b/, hi: /बंद|रोको|रुको/, es: /\b(para|detén|deten|pausa|termina)\b/ },
  reset: { en: /\b(reset|clear|restart)\b/, hi: /रीसेट|दोबारा|फिर से/, es: /reinicia|reset|pon a cero/ },
};
const stopwatch = {
  id: "stopwatch",
  test: { en: /stop ?watch/, hi: /स्टॉप ?वॉच|स्टॉपवाच/, es: /cron[oó]metro/ },
  run(t, lang) {
    const x = X[lang], sw = brain.sw || (brain.sw = { start: null, acc: 0 });
    const now = Date.now(), secs = () => (sw.acc + (sw.start ? now - sw.start : 0)) / 1000;
    if (SW.reset[lang].test(t)) { sw.start = null; sw.acc = 0; return { text: x.swReset, tone: "yes" }; }
    if (SW.stop[lang].test(t)) {
      if (!sw.start) return { text: x.swNotRunning, tone: "no" };
      const d = dur(secs(), lang); sw.acc += now - sw.start; sw.start = null;
      return { text: x.swStopped(d), tone: "yes" };
    }
    if (SW.start[lang].test(t)) {
      if (sw.start) return { text: x.swAlready(dur(secs(), lang)), tone: "yes" };
      sw.start = now; return { text: x.swStarted, tone: "yes" };
    }
    if (sw.start) return { text: x.swRunning(dur(secs(), lang)), tone: "yes" };
    sw.start = now; return { text: x.swStarted, tone: "yes" };
  },
};

// ---------- Countdown to a date ----------
const MONTHS = {
  en: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
};
const HOLIDAYS = [
  { re: /christmas|क्रिसमस|navidad/, m: 12, d: 25, name: { en: "Christmas", hi: "क्रिसमस", es: "Navidad" } },
  { re: /new year|नया साल|नए साल|año nuevo|ano nuevo/, m: 1, d: 1, name: { en: "New Year's Day", hi: "नया साल", es: "Año Nuevo" } },
  { re: /halloween|हैलोवीन/, m: 10, d: 31, name: { en: "Halloween", hi: "हैलोवीन", es: "Halloween" } },
  { re: /valentine|वैलेंटाइन|san valentín|san valentin/, m: 2, d: 14, name: { en: "Valentine's Day", hi: "वैलेंटाइन डे", es: "San Valentín" } },
];
const monthOf = t => { for (const l of ["en", "es", "hi"]) { const i = MONTHS[l].findIndex(m => t.includes(m)); if (i >= 0) return i + 1; } return 0; };

function parseTarget(t, lang, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let m, d, y, label;
  const hol = HOLIDAYS.find(h => h.re.test(t));
  const iso = t.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (hol) { m = hol.m; d = hol.d; label = hol.name[lang]; }
  else if (iso) { y = +iso[1]; m = +iso[2]; d = +iso[3]; }
  else {
    m = monthOf(t);
    const nums = (t.match(/\d+/g) || []).map(Number);
    d = nums.find(n => n >= 1 && n <= 31); y = nums.find(n => n >= 2000);
    if (!m || !d) return null;
  }
  let target = new Date(y || today.getFullYear(), m - 1, d);
  if (!y && target < today) target = new Date(today.getFullYear() + 1, m - 1, d); // next occurrence
  label = label || target.toLocaleDateString(SPEECH[lang], { month: "long", day: "numeric", year: "numeric" });
  return { days: Math.round((target - today) / 864e5), label };
}
const countdown = {
  id: "countdown",
  test: { en: /\b(days? (until|till|to|left)|countdown to|how long (until|till))\b/, hi: /कितने दिन|दिन बाकी|दिन बचे/, es: /cuántos días|cuantos dias|faltan|falta para/ },
  run(t, lang) {
    const r = parseTarget(t, lang);
    return r ? { text: X[lang].cdOut(r.days, r.label), tone: "yes" } : { text: X[lang].cdNeed, tone: "yes" };
  },
};

// ---------- Reminders ----------
const TIME_RE = /(\d+)\s*(second|sec|minute|min|hour|सेकंड|सेकण्ड|मिनट|घंटे|घंटा|segundo|minuto|hora)\w*/;
// Reminders are saved, so they survive a reload (and follow a signed-in user). They only ring while a tab is open.
const armed = new Set();
function armReminder(r) {
  if (armed.has(r.id)) return;
  armed.add(r.id);
  startTimer(Math.max(0, (r.at - Date.now()) / 1000), r.text, () => {
    keep("voicebot-reminders", store("voicebot-reminders", []).filter(x => x.id !== r.id));
  });
}
window.rearmReminders = () => {
  const now = Date.now(), all = store("voicebot-reminders", []), keepers = [];
  for (const r of all) {
    if (r.at > now) { keepers.push(r); armReminder(r); }
    else addMsg("Missed while you were away: " + r.text, "bot no"); // it came due while no tab was open
  }
  if (keepers.length !== all.length) keep("voicebot-reminders", keepers);
};
const remind = {
  id: "remind",
  test: { en: /\bremind me\b/, hi: /याद दिला/, es: /recuérdame|recuerdame|recordarme/ },
  run(t, lang) {
    const m = t.match(TIME_RE);
    if (!m) return { text: X[lang].remNeed, tone: "yes" };
    const n = +m[1], [k, mult] = unitSec(m[2]);
    let msg = t.replace(m[0], " ").replace(/\bremind me\b|याद दिला(?:ओ|ना|देना|दो|ना)?|recuérdame|recuerdame|recordarme/g, " ").replace(/\s+/g, " ").trim();
    for (let i = 0; i < 2; i++) {
      msg = msg.replace(/^(to|about|that|que|de|in|after|en|dentro de)\s+/, "").replace(/\s+(in|after|en|dentro de|में|बाद)$/, "").trim();
    }
    const r = { id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), at: Date.now() + n * mult * 1000, text: X[lang].remDone(msg) };
    const all = store("voicebot-reminders", []); all.push(r); keep("voicebot-reminders", all);
    armReminder(r);
    return { text: X[lang].remSet(msg, n, T[lang].units[k]), tone: "yes" };
  },
};

// ---------- Notes ----------
const NOTE = {
  add: {
    en: /(?:remember that|note that|take a note(?: that| to)?|make a note(?: that| to)?|write down|save a note(?: that)?|note down)\s*(.*)/,
    hi: /(.+?)\s*(?:नोट कर(?:ो|ना)?|याद रखो|लिख लो)/, es: /(?:recuerda que|anota|toma nota de|toma nota|apunta)\s*(.*)/,
  },
  read: { en: /\b(my notes|read (?:back )?(?:my )?notes|what do you remember|what did i ask you to remember)\b/, hi: /मेरे नोट|नोट्स (?:सुनाओ|बताओ|पढ़ो)/, es: /mis notas|lee mis notas/ },
  clear: { en: /\b(?:clear|delete|erase) (?:all )?(?:my )?notes\b/, hi: /नोट्स? (?:मिटाओ|हटाओ|साफ़)/, es: /(?:borra|elimina) (?:todas )?mis notas/ },
};
const notes = {
  id: "notes",
  test: { en: tst(NOTE, "en"), hi: tst(NOTE, "hi"), es: tst(NOTE, "es") },
  run(t, lang) {
    const x = X[lang];
    if (NOTE.clear[lang].test(t)) { keep("voicebot-notes", []); return { text: x.notesCleared, tone: "yes" }; }
    if (NOTE.read[lang].test(t)) {
      const all = store("voicebot-notes", []);
      return all.length ? { text: x.notesOut(all.length, all.map((n, i) => `${i + 1}. ${n}.`).join(" ")), tone: "yes" } : { text: x.notesNone, tone: "yes" };
    }
    const m = t.match(NOTE.add[lang]);
    const text = m && m[1].trim();
    if (!text) return { text: x.noteEmpty, tone: "yes" };
    const all = store("voicebot-notes", []); all.push(text); keep("voicebot-notes", all);
    return { text: x.noteSaved, tone: "yes" };
  },
};
function tst(obj, lang) { return { test: t => Object.values(obj).some(r => r[lang].test(t)) }; }

// ---------- To-do list ----------
const LIST_EN = "(?:to[- ]?do|task|shopping|grocery)";
const TODO = {
  add: {
    en: new RegExp(`\\badd (.+?) to (?:my |the )?${LIST_EN}? ?list\\b`), hi: /(.+?)\s*(?:को\s*)?(?:मेरी\s*)?(?:टू ?डू|कार्य|काम की|शॉपिंग)\s*(?:लिस्ट|सूची)\s*में\s*(?:जोड़ो|जोड़ें|जोड़|डालो|डाल दो)/,
    es: /(?:añade|agrega|anade|pon)\s+(.+?)\s+(?:a|en)\s+(?:mi |la )?lista/,
  },
  remove: { en: new RegExp(`\\b(?:remove|delete|cross off|check off|done with)\\s+(.+?)\\s+(?:from|off)\\s+(?:my |the )?${LIST_EN}? ?list`), hi: /(?!x)x/, es: /(?:quita|elimina|borra)\s+(.+?)\s+de\s+(?:mi |la )?lista/ },
  clear: { en: new RegExp(`\\b(?:clear|empty|delete) (?:my |the )?${LIST_EN}? ?list`), hi: /(?:लिस्ट|सूची)\s*(?:साफ़|खाली|मिटा)/, es: /(?:borra|vacía|vacia|limpia)\s+(?:mi |la )?lista/ },
  read: {
    en: new RegExp(`\\b(?:my |the )?${LIST_EN} list\\b|what'?s on my list|read my list`), hi: /(?:टू ?डू|कार्य|काम की|शॉपिंग)\s*(?:लिस्ट|सूची)|मेरी लिस्ट/,
    es: /mi lista|qué hay en mi lista|lee mi lista/,
  },
};
const todo = {
  id: "todo",
  test: { en: tst(TODO, "en"), hi: tst(TODO, "hi"), es: tst(TODO, "es") },
  run(t, lang) {
    const x = X[lang], list = store("voicebot-todo", []);
    if (TODO.clear[lang].test(t)) { keep("voicebot-todo", []); return { text: x.todoCleared, tone: "yes" }; }
    let m = t.match(TODO.add[lang]);
    if (m) { list.push(m[1].trim()); keep("voicebot-todo", list); return { text: x.todoAdded(m[1].trim()), tone: "yes" }; }
    m = t.match(TODO.remove[lang]);
    if (m) {
      const i = list.findIndex(it => it.toLowerCase().includes(m[1].trim()));
      if (i < 0) return { text: x.todoNotFound(m[1].trim()), tone: "no" };
      const [gone] = list.splice(i, 1); keep("voicebot-todo", list); return { text: x.todoRemoved(gone), tone: "yes" };
    }
    return list.length ? { text: x.todoList(list.length, list.join(", ")), tone: "yes" } : { text: x.todoNone, tone: "yes" };
  },
};

// ---------- Sunrise / sunset, and the time in another city ----------
async function sunFor(city, which, lang) {
  const x = X[lang], p = await geo(city, lang);
  if (!p) return { text: T[lang].cityNotFound(city), tone: "no" };
  const w = await getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&daily=sunrise,sunset&timezone=auto&forecast_days=1`);
  const [h, m] = w.daily[which === "rise" ? "sunrise" : "sunset"][0].split("T")[1].split(":").map(Number);
  const time = new Date(2000, 0, 1, h, m).toLocaleTimeString(SPEECH[lang], { hour: "numeric", minute: "2-digit" });
  return { text: x.sunOut(which, p.name, time), tone: "yes" };
}
const sun = {
  id: "sun",
  test: { en: /\b(sunrise|sunset)\b/, hi: /सूर्योदय|सूर्यास्त/, es: /amanecer|atardecer|puesta de sol|salida del sol/ },
  async run(t, lang, ctx) {
    const which = /sunset|सूर्यास्त|atardecer|puesta/.test(t) ? "set" : "rise";
    const city = cityOf(t, lang);
    if (!city) { ctx.awaiting = { id: "sun", which }; return { text: T[lang].askCity, tone: "yes" }; }
    return sunFor(city, which, lang);
  },
};
AWAIT.sun = (t, lang, st) => sunFor(cityOf(t, lang) || t, st.which, lang);

const localTime = INTENTS.find(i => i.id === "time").run; // keep the plain "what time is it" behaviour
INTENTS.find(i => i.id === "time").run = async (t, lang, ctx) => {
  const city = cityOf(t, lang);
  if (!city) return localTime(t, lang, ctx);
  const p = await geo(city, lang);
  if (!p) return { text: T[lang].cityNotFound(city), tone: "no" };
  const time = new Date().toLocaleTimeString(SPEECH[lang], { timeZone: p.timezone, hour: "numeric", minute: "2-digit" });
  return { text: X[lang].cityTime(p.name, time), tone: "yes" };
};

// ---------- Translate ----------
// code: [English, Hindi, Spanish display names, ...aliases the speech recogniser might write]
const LANGS = {
  en: ["English", "अंग्रेज़ी", "inglés", "english", "अंग्रेजी", "इंग्लिश", "ingles"], hi: ["Hindi", "हिन्दी", "hindi", "हिंदी", "हिन्दी"],
  es: ["Spanish", "स्पेनिश", "español", "spanish", "espanol"], fr: ["French", "फ्रेंच", "francés", "french", "frances", "français"],
  de: ["German", "जर्मन", "alemán", "german", "aleman"], it: ["Italian", "इटैलियन", "italiano", "italian"], pt: ["Portuguese", "पुर्तगाली", "portugués", "portuguese", "portugues"],
  ja: ["Japanese", "जापानी", "japonés", "japanese", "japones"], zh: ["Chinese", "चीनी", "chino", "chinese"], ar: ["Arabic", "अरबी", "árabe", "arabic", "arabe"],
  ru: ["Russian", "रूसी", "ruso", "russian"], ko: ["Korean", "कोरियाई", "coreano", "korean"], ta: ["Tamil", "तमिल", "tamil"], bn: ["Bengali", "बंगाली", "bengalí", "bengali"],
  gu: ["Gujarati", "गुजराती", "gujarati"], mr: ["Marathi", "मराठी", "marathi"], te: ["Telugu", "तेलुगु", "telugu"],
};
function findLang(t) {
  let best = null;
  for (const [code, names] of Object.entries(LANGS)) {
    for (const n of names.slice(0).map(s => s.toLowerCase())) {
      if (t.includes(n) && (!best || n.length > best.n.length)) best = { code, n };
    }
  }
  return best;
}
const TR_PREFIX = { en: /^(?:please )?(?:translate|how (?:do|would|can) (?:you|i) say)\s+/, hi: /(?:अनुवाद|ट्रांसलेट)/g, es: /^(?:por favor )?(?:traduce|traducir|tradúceme|traduceme|cómo se dice|como se dice)\s+/ };
const HI_STOP = new Set("को में का की से करो कीजिए कर दो बताओ बोलो कैसे कहते हैं".split(" "));
const translate = {
  id: "translate",
  test: { en: /\b(translate|how (?:do|would|can) (?:you|i) say)\b/, hi: /अनुवाद|ट्रांसलेट/, es: /traduc|tradúc|cómo se dice|como se dice/ },
  async run(t, lang) {
    const x = X[lang], tgt = findLang(t);
    let s = t.replace(TR_PREFIX[lang], " ");
    if (tgt) s = s.replace(tgt.n, " ");
    s = s.replace(/\s+/g, " ").trim();
    if (lang === "en") s = s.replace(/^(?:the (?:word|phrase|sentence) )/, "").replace(/\s+(?:to|into|in)$/, "");
    if (lang === "es") s = s.replace(/\s+(?:al|a|en|a la)$/, "");
    if (lang === "hi") s = s.split(" ").filter(w => !HI_STOP.has(w)).join(" ");
    s = s.trim();
    if (!s) return { text: x.trNeed, tone: "yes" };
    if (!tgt) return { text: x.trLang, tone: "yes" };
    const src = lang === "hi" && /^[\x00-\x7F]+$/.test(s) ? "en" : lang; // English phrase said in Hindi mode
    const out = await tx(s, tgt.code, src);
    if (out === s && tgt.code !== src) return { text: x.trFail, tone: "no" };
    const intro = x.trIn(LANGS[tgt.code][["en", "hi", "es"].indexOf(lang)]);
    return { text: `${intro}: ${out}`, tone: "yes", segments: [{ text: intro + ":", lang }, { text: out, lang: tgt.code }] };
  },
};

// ---------- Define a word (Wiktionary) ----------
const define = {
  id: "define",
  test: { en: /\b(define|definition of|meaning of|what does .+ mean|what'?s the meaning)\b/, hi: /का मतलब|मतलब क्या|का अर्थ|अर्थ क्या/, es: /qué significa|que significa|definición de|definicion de|significado de/ },
  async run(t, lang) {
    const x = X[lang];
    const m = lang === "en" ? t.match(/(?:define|definition of|meaning of|what does)\s+(?:the word\s+)?([\p{L}\p{M}'-]+)/u)
      : lang === "hi" ? t.match(/([\p{L}\p{M}]+)\s+(?:का मतलब|का अर्थ|मतलब क्या|अर्थ क्या)/u)
      : t.match(/(?:qué significa|que significa|definición de|definicion de|significado de)\s+(?:la palabra\s+)?([\p{L}\p{M}'-]+)/u);
    const word = m && m[1];
    if (!word) return { text: x.defNeed, tone: "yes" };
    try {
      const j = await getJSON(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}?origin=*`);
      const entries = j[lang] || Object.values(j)[0] || [];
      const e = entries[0], d = e && e.definitions && e.definitions[0] && stripHtml(e.definitions[0].definition);
      if (!d) throw new Error("none");
      return { text: x.defOut(word, (e.partOfSpeech || "").toLowerCase(), firstSentences(d, 2)), tone: "yes" };
    } catch { return { text: x.defNone(word), tone: "no" }; }
  },
};

// ---------- Unit and currency conversion ----------
const U = Object.create(null); // alias -> [definitions] (null prototype so "constructor" etc. are not units)
const addU = (cat, id, factor, aliases) => aliases.forEach(a => (U[a] = U[a] || []).push({ cat, id, factor }));
[ // length, base metre
  ["m", 1, "meter meters metre metres m मीटर metro metros"], ["km", 1000, "kilometer kilometers kilometre kilometres km किलोमीटर kilómetro kilómetros kilometro kilometros"],
  ["cm", 0.01, "centimeter centimeters centimetre centimetres cm सेंटीमीटर centímetro centímetros"], ["mm", 0.001, "millimeter millimeters mm"],
  ["mile", 1609.344, "mile miles मील milla millas"], ["yard", 0.9144, "yard yards yd"], ["foot", 0.3048, "foot feet ft फुट pie pies"], ["inch", 0.0254, "inch inches इंच pulgada pulgadas"],
].forEach(([id, f, a]) => addU("length", id, f, a.split(" ")));
[ // mass, base kg
  ["kg", 1, "kilogram kilograms kg kgs kilo kilos किलो किलोग्राम kilogramo kilogramos"], ["g", 0.001, "gram grams g ग्राम gramo gramos"], ["mg", 1e-6, "milligram milligrams mg"],
  ["pound", 0.45359237, "pound pounds lb lbs पाउंड libra libras"], ["ounce", 0.0283495, "ounce ounces oz औंस onza onzas"], ["tonne", 1000, "tonne tonnes ton tons टन tonelada toneladas"],
].forEach(([id, f, a]) => addU("mass", id, f, a.split(" ")));
[ // volume, base litre
  ["l", 1, "liter liters litre litres l लीटर litro litros"], ["ml", 0.001, "milliliter milliliters millilitre millilitres ml मिलीलीटर mililitro mililitros"],
  ["gallon", 3.78541, "gallon gallons gal गैलन galón galon galones"], ["cup", 0.236588, "cup cups कप taza tazas"],
].forEach(([id, f, a]) => addU("volume", id, f, a.split(" ")));
[ // speed, base m/s
  ["kmh", 0.277778, "kmh kph"], ["mph", 0.44704, "mph"],
].forEach(([id, f, a]) => addU("speed", id, f, a.split(" ")));
[ // time, base second
  ["s", 1, "second seconds sec सेकंड segundo segundos"], ["min", 60, "minute minutes min मिनट minuto minutos"], ["hr", 3600, "hour hours hr घंटा घंटे hora horas"],
  ["day", 86400, "day days दिन día días dia dias"], ["week", 604800, "week weeks सप्ताह semana semanas"],
].forEach(([id, f, a]) => addU("time", id, f, a.split(" ")));
[ // temperature handled separately
  ["c", 0, "celsius centigrade c सेल्सियस celsio °c"], ["f", 0, "fahrenheit f फारेनहाइट फॉरेनहाइट °f"], ["k", 0, "kelvin k केल्विन"],
].forEach(([id, f, a]) => addU("temp", id, f, a.split(" ")));
[ // currencies (ECB rates via frankfurter.dev)
  ["USD", "usd dollar dollars डॉलर dólar dólares dolares"], ["INR", "inr rupee rupees rs रुपये रुपया रुपए rupia rupias"], ["EUR", "eur euro euros यूरो"],
  ["GBP", "gbp sterling pound pounds पाउंड libra libras"], ["JPY", "jpy yen येन"], ["CNY", "cny yuan rmb युआन"], ["CAD", "cad"], ["AUD", "aud"], ["CHF", "chf franc francs"],
  ["BRL", "brl real reais"], ["MXN", "mxn peso pesos"], ["KRW", "krw won"], ["SGD", "sgd"], ["ZAR", "zar rand"],
].forEach(([id, a]) => addU("money", id, 0, a.split(" ")));

const CONN = new Set(["to", "into", "in", "equals", "equal", "as", "को", "में", "से", "a", "al", "en", "="]);
function parseConvert(t) {
  const tok = t.replace(/(\d)([a-zA-Z°])/g, "$1 $2").split(" ");
  const i = tok.findIndex(w => /^-?[\d,]*\.?\d+$/.test(w));
  if (i < 0 || i >= tok.length - 1) return null;
  const ua = tok[i + 1], da = U[ua];
  if (!da) return null;
  const pair = (w) => { const db = U[w]; if (db) for (const a of da) for (const b of db) if (a.cat === b.cat && a.id !== b.id) return { a, b }; return null; };
  const after = tok.slice(i + 2);
  const ci = after.findIndex(w => CONN.has(w));
  for (let j = ci < 0 ? after.length : ci + 1; j < after.length; j++) { const p = pair(after[j]); if (p) return { n: +tok[i].replace(/,/g, ""), ua, ub: after[j], ...p }; }
  if (/\b(how many|how much|cuántos|cuántas|cuantos|cuantas|कितने|कितना)\b/.test(t)) {
    for (const w of tok.slice(0, i).reverse()) { const p = pair(w); if (p) return { n: +tok[i].replace(/,/g, ""), ua, ub: w, ...p }; }
  }
  return null;
}
const nice = v => (Math.abs(v) >= 100 ? Math.round(v * 100) / 100 : Number(v.toPrecision(4)));
const convert = {
  id: "convert", test: any(t => !!parseConvert(t)),
  async run(t, lang) {
    const x = X[lang], c = parseConvert(t);
    if (!c) return { text: x.cvFail, tone: "no" };
    let out;
    if (c.a.cat === "temp") {
      const k = c.a.id === "c" ? c.n + 273.15 : c.a.id === "f" ? (c.n - 32) * 5 / 9 + 273.15 : c.n;
      out = c.b.id === "c" ? k - 273.15 : c.b.id === "f" ? (k - 273.15) * 9 / 5 + 32 : k;
    } else if (c.a.cat === "money") {
      try {
        const j = await getJSON(`https://api.frankfurter.dev/v1/latest?amount=${c.n}&from=${c.a.id}&to=${c.b.id}`);
        out = j.rates[c.b.id];
      } catch { return { text: x.cvFail, tone: "no" }; }
    } else out = (c.n * c.a.factor) / c.b.factor;
    return { text: x.cvOut(nice(c.n), c.ua, nice(out), c.ub), tone: "yes" };
  },
};

// ---------- Fun: facts, quotes, riddles, trivia, random numbers ----------
const fact = {
  id: "fact", test: { en: /\bfacts?\b|something interesting/, hi: /तथ्य|फैक्ट|मज़ेदार बात|मजेदार बात/, es: /dato curioso|dato divertido|un dato/ },
  async run(t, lang) {
    try {
      const j = await getJSON("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
      return { text: await tx(j.text, lang), tone: "yes" };
    } catch { return { text: X[lang].factFail, tone: "no" }; }
  },
};
const quote = {
  id: "quote", test: { en: /\bquotes?\b|inspire me|motivat/, hi: /विचार|उद्धरण|प्रेरणा|कोट/, es: /\bcita\b|frase|inspírame|inspirame/ },
  async run(t, lang) {
    try {
      const j = await getJSON("/api/quote");
      if (!j.quote) throw new Error("empty");
      return { text: `“${await tx(j.quote, lang)}” — ${j.author}`, tone: "yes" };
    } catch { return { text: X[lang].quoteFail, tone: "no" }; }
  },
};
const RIDDLES = {
  en: [{ q: "What has keys but can't open locks?", a: ["piano", "keyboard"] }, { q: "What gets wetter the more it dries?", a: ["towel"] }, { q: "What has hands but can't clap?", a: ["clock", "watch"] }, { q: "I speak without a mouth and hear without ears. What am I?", a: ["echo"] }],
  hi: [{ q: "ऐसी कौन सी चीज़ है जो जितनी सुखाओ उतनी गीली होती है?", a: ["तौलिया", "टॉवल"] }, { q: "हाथ हैं पर ताली नहीं बजा सकती, बताओ क्या है?", a: ["घड़ी"] }, { q: "चार पैर हैं पर चल नहीं सकती, क्या है?", a: ["कुर्सी", "मेज"] }],
  es: [{ q: "¿Qué tiene manos pero no puede aplaudir?", a: ["reloj"] }, { q: "¿Qué se moja mientras seca?", a: ["toalla"] }, { q: "Tengo ciudades pero no casas, montañas pero no árboles. ¿Qué soy?", a: ["mapa"] }],
};
const GIVE_UP = { en: /give up|don'?t know|skip|tell me|i surrender/, hi: /हार मान|नहीं पता|बताओ|छोड़ो/, es: /me rindo|no sé|no se|dime|salta/ };
const riddle = {
  id: "riddle", test: { en: /\briddles?\b/, hi: /पहेली/, es: /adivinanza|acertijo/ },
  run(t, lang, ctx) {
    const item = pick(RIDDLES[lang]);
    ctx.awaiting = { id: "riddle", item, tries: 0 };
    return { text: X[lang].riddleAsk(item.q), tone: "yes" };
  },
};
AWAIT.riddle = (t, lang, st) => {
  const x = X[lang];
  if (GIVE_UP[lang].test(t)) return { text: x.riddleReveal(st.item.a[0]), tone: "yes" };
  if (st.item.a.some(a => t.includes(a))) return { text: x.riddleRight, tone: "yes", laugh: true };
  if (st.tries >= 1) return { text: x.riddleWrong.split(".")[0] + ". " + x.riddleReveal(st.item.a[0]), tone: "no" };
  brain.awaiting = { ...st, tries: st.tries + 1 };
  return { text: x.riddleWrong, tone: "no" };
};

const ORD = Object.assign(Object.create(null), { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3, one: 0, two: 1, three: 2, four: 3, first: 0, second: 1, third: 2, fourth: 3, ए: 0, बी: 1, सी: 2, डी: 3 });
const trivia = {
  id: "trivia", test: { en: /\b(trivia|quiz)\b/, hi: /क्विज़|क्विज|ट्रिविया/, es: /trivia|cuestionario|cultura general/ },
  async run(t, lang, ctx) {
    try {
      const j = await getJSON("https://opentdb.com/api.php?amount=1&type=multiple");
      const r = j.results[0];
      const opts = [r.correct_answer, ...r.incorrect_answers].map(unesc).sort(() => Math.random() - 0.5);
      const correct = opts.indexOf(unesc(r.correct_answer)), q = unesc(r.question);
      ctx.awaiting = { id: "trivia", opts, correct, tries: 0 };
      const list = opts.map((o, i) => `${"ABCD"[i]}, ${o}.`).join(" ");
      const text = X[lang].triAsk(q, list);
      // Questions come in English, so speak them with an English voice.
      return { text, tone: "yes", segments: lang === "en" ? undefined : [{ text: X[lang].triAsk("", "").trim(), lang }, { text: `${q} ${list}`, lang: "en" }] };
    } catch { return { text: X[lang].factFail, tone: "no" }; }
  },
};
AWAIT.trivia = (t, lang, st) => {
  const x = X[lang];
  let idx = st.opts.findIndex(o => t.includes(o.toLowerCase()));
  if (idx < 0 && t.split(" ").length <= 4) { // "b", "option c", "the second one"
    const w = t.split(" ").find(w => w in ORD);
    if (w !== undefined) idx = ORD[w];
  }
  if (idx < 0) {
    if (st.tries >= 1) return { text: x.triWrong(st.opts[st.correct]), tone: "no" };
    brain.awaiting = { ...st, tries: st.tries + 1 };
    return { text: x.triRetry, tone: "yes" };
  }
  return idx === st.correct ? { text: x.triRight, tone: "yes", laugh: true } : { text: x.triWrong(st.opts[st.correct]), tone: "no" };
};

const pickNum = {
  id: "pick",
  test: { en: /\b(pick|choose|give me|random|say) (a |any )?(random )?number\b/, hi: /रैंडम नंबर|कोई नंबर|कोई संख्या|नंबर चुनो/, es: /número al azar|número aleatorio|elige un número|dime un número|escoge un número/ },
  run(t, lang) {
    const n = (t.match(/\d+/g) || []).map(Number);
    let lo = 1, hi = 10;
    if (n.length >= 2) [lo, hi] = [Math.min(n[0], n[1]), Math.max(n[0], n[1])];
    else if (n.length === 1) hi = n[0];
    return { text: X[lang].pickOut(lo + Math.floor(Math.random() * (hi - lo + 1)), lo, hi), tone: "yes" };
  },
};

// ---------- Open websites, search Google/YouTube, copy ----------
const SITES = {
  youtube: ["YouTube", "https://www.youtube.com", "youtube यूट्यूब"], google: ["Google", "https://www.google.com", "google गूगल"], gmail: ["Gmail", "https://mail.google.com", "gmail जीमेल"],
  maps: ["Google Maps", "https://maps.google.com", "maps मैप्स mapas"], wikipedia: ["Wikipedia", "https://www.wikipedia.org", "wikipedia विकिपीडिया"], github: ["GitHub", "https://github.com", "github गिटहब"],
  facebook: ["Facebook", "https://www.facebook.com", "facebook फेसबुक"], instagram: ["Instagram", "https://www.instagram.com", "instagram इंस्टाग्राम"], twitter: ["X", "https://x.com", "twitter ट्विटर"],
  reddit: ["Reddit", "https://www.reddit.com", "reddit रेडिट"], amazon: ["Amazon", "https://www.amazon.com", "amazon अमेज़न अमेजन"], netflix: ["Netflix", "https://www.netflix.com", "netflix नेटफ्लिक्स"],
  whatsapp: ["WhatsApp", "https://web.whatsapp.com", "whatsapp व्हाट्सएप व्हाट्सऐप"], linkedin: ["LinkedIn", "https://www.linkedin.com", "linkedin लिंक्डइन"], spotify: ["Spotify", "https://open.spotify.com", "spotify स्पॉटिफाई"],
};
const OPEN = { en: /^(?:please )?(?:open|go to|launch|take me to|visit)\s+(.+)/, hi: /(.+?)\s*(?:खोलो|खोलिए|खोल दो|पर जाओ)/, es: /^(?:abre|abrir|ve a|ir a)\s+(.+)/ };
const SEARCH_SITE = {
  en: [/^(?:search|look up|find|play|show)\s+(?:for\s+)?(.+?)\s+(?:on|in)\s+(google|youtube)/, /^(?:search\s+)?(google|youtube)\s+(?:for\s+)?(.+)/],
  hi: [/(.+?)\s+(यूट्यूब|गूगल|youtube|google)\s*(?:पर|में)\s*(?:खोजो|सर्च करो|चलाओ|दिखाओ)/],
  es: [/^busca\s+(.+?)\s+en\s+(google|youtube)/, /^(?:busca en\s+)?(google|youtube)\s+(.+)/],
};
const siteKey = w => Object.keys(SITES).find(k => SITES[k][2].split(" ").includes(w));
function resolveWeb(t, lang) {
  for (const re of SEARCH_SITE[lang]) {
    const m = t.match(re); if (!m) continue;
    const [a, b] = [m[1], m[2]]; const site = siteKey(a) ? a : b, q = siteKey(a) ? b : a; const k = siteKey(site);
    if (k === "google" || k === "youtube") {
      const url = k === "google" ? `https://www.google.com/search?q=${encodeURIComponent(q)}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
      return { name: `${SITES[k][0]}: ${q}`, url };
    }
  }
  const m = t.match(OPEN[lang]); if (!m) return null;
  const target = m[1].replace(/\b(the )?(website|site|app)\b|\bdot\b/g, " ").replace(/\s+/g, " ").trim();
  const k = siteKey(target.split(" ")[0]) || siteKey(target);
  if (k) return { name: SITES[k][0], url: SITES[k][1] };
  const d = target.match(/^([a-z0-9-]+)\s*\.?\s*(com|org|net|in|io|co|dev|app|edu|gov)$/);
  return d ? { name: `${d[1]}.${d[2]}`, url: `https://${d[1]}.${d[2]}` } : null;
}
const web = {
  id: "web", test: { en: { test: t => !!resolveWeb(t, "en") }, hi: { test: t => !!resolveWeb(t, "hi") }, es: { test: t => !!resolveWeb(t, "es") } },
  run(t, lang) {
    const r = resolveWeb(t, lang);
    return r ? { text: X[lang].opening(r.name), tone: "yes", link: r.url, openUrl: r.url } : { text: T[lang].unknown, tone: "no" };
  },
};

const COPY = { en: /^copy\s+(?:this\s+)?(.+)/, hi: /(.+?)\s*कॉपी करो/, es: /^copia\s+(.+)/ };
const copy = {
  id: "copy", test: { en: COPY.en, hi: COPY.hi, es: COPY.es },
  async run(t, lang) {
    const m = t.match(COPY[lang]);
    if (!m) return { text: X[lang].copyNeed, tone: "yes" };
    try { await navigator.clipboard.writeText(m[1]); return { text: X[lang].copied, tone: "yes" }; }
    catch { return { text: X[lang].copyFail, tone: "no" }; }
  },
};

// ---------- Moon phase (computed locally from the average lunar cycle, good to about a day) ----------
const SYNODIC = 29.530588853, NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14); // a known new moon
const moonAge = ms => ((((ms - NEW_MOON_REF) / 864e5) % SYNODIC) + SYNODIC) % SYNODIC;
const moonPhaseIndex = age => Math.floor(((age + SYNODIC / 16) % SYNODIC) / (SYNODIC / 8)); // 0 new … 4 full … 7 waning crescent
const moon = {
  id: "moon",
  test: { en: /\b(moon|lunar)\b/, hi: /चाँद|चांद|चंद्रमा|पूर्णिमा|अमावस्या/, es: /\bluna\b|lunar/ },
  run(t, lang) {
    const x = X[lang], now = new Date(), noon = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12);
    const wantFull = /full moon|पूर्णिमा|luna llena/.test(t), wantNew = /new moon|अमावस्या|luna nueva/.test(t);
    if (wantFull || wantNew) {
      const goal = wantFull ? SYNODIC / 2 : 0;
      let days = ((goal - moonAge(noon)) % SYNODIC + SYNODIC) % SYNODIC;
      const n = Math.round(days), date = new Date(noon + n * 864e5).toLocaleDateString(SPEECH[lang], { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
      return { text: x.moonNext(x.moonNames[wantFull ? 4 : 0], n, date), tone: "yes" };
    }
    const tomorrow = /tomorrow|mañana/.test(t), at = noon + (tomorrow ? 864e5 : 0), age = moonAge(at);
    const pct = Math.round(((1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2) * 100);
    return { text: x.moonOut(x.moonNames[moonPhaseIndex(age)], pct, tomorrow ? x.tomorrow : x.today), tone: "yes" };
  },
};

// ---------- Who am I (the signed-in name) ----------
const whoami = {
  id: "whoami",
  test: { en: /\b(who am i|what'?s my name|what is my name|do you know my name)\b/, hi: /मेरा नाम क्या|मैं कौन हूँ|मेरा नाम बताओ/, es: /cómo me llamo|como me llamo|quién soy|quien soy/ },
  run: (t, lang) => (brain.user ? { text: X[lang].youAre(brain.user), tone: "yes" } : { text: X[lang].noName, tone: "no" }),
};

// ---------- Voice smarts: stop, say that again, follow-ups, speed and volume, switch language ----------
const STOP_RE = {
  en: /^(?:please |ok |okay )?(?:stop|quiet|enough|cancel|stop it|stop talking|be quiet|shut up|that's enough)$/,
  hi: /^(?:रुको|चुप|चुप हो जाओ|बस|बस करो|बंद करो|स्टॉप)$/,
  es: /^(?:para|basta|silencio|cállate|callate|detente|ya basta|ya)$/,
};
// Used by the UI while the robot is talking: a bare "stop" (optionally after the wake word) interrupts it.
function isStopPhrase(text, lang, wakeId) {
  let t = norm(text);
  const afterWake = findWake(t, wakeId, lang);
  if (afterWake !== null) t = afterWake;
  return STOP_RE[lang].test(t);
}
const stop = {
  id: "stop",
  test: { en: /^(?:please |ok |okay )?(?:stop|quiet|enough|cancel|never ?mind|forget it|stop it)$/, hi: STOP_RE.hi, es: /^(?:para|basta|silencio|cállate|callate|detente|déjalo|dejalo|olvídalo|olvidalo)$/ },
  run: (t, lang, ctx) => { ctx.pending = null; ctx.awaiting = null; return { text: X[lang].stopOk, tone: "yes" }; },
};

const again = {
  id: "again",
  test: { en: /^(?:please )?(?:say that again|say it again|repeat that|repeat it|what did you say|come again|pardon)$/, hi: /फिर से बोलो|दोबारा बोलो|क्या कहा|फिर से कहो/, es: /repite eso|otra vez|qué dijiste|que dijiste|repítelo|repitelo/ },
  run: (t, lang) => (brain.last ? { ...brain.last, tone: "yes", replay: true } : { text: X[lang].noLast, tone: "no" }),
};

// "and tomorrow?", "what about Tokyo?", "and another one?": re-run the last ability with the new bit.
const FOLLOW_RE = { en: /^(?:and what about|and|what about|how about)\s+(.+)/, hi: /^(?:और|तो|फिर)\s+(.+)/, es: /^(?:y qué tal|y|qué tal|que tal)\s+(.+)/ };
const FOLLOW_REPEAT = new Set(["joke", "fact", "quote", "coin", "dice", "pick", "riddle", "trivia"]); // "and another one?"
const FOLLOW_BUILD = { // ability id -> language -> (rest, previousText) => text for the same ability
  weather: { en: r => `weather in ${r}`, hi: r => `${r} मौसम`, es: r => `clima en ${r}` },
  time: { en: r => `time in ${r}`, hi: r => `${r} समय`, es: r => `hora en ${r}` },
  sun: {
    en: (r, p) => `${/sunset/.test(p) ? "sunset" : "sunrise"} in ${r}`, hi: (r, p) => `${r} ${/सूर्यास्त/.test(p) ? "सूर्यास्त" : "सूर्योदय"}`,
    es: (r, p) => `${/atardecer|puesta/.test(p) ? "atardecer" : "amanecer"} en ${r}`,
  },
  moon: { en: r => `moon phase ${r}`, hi: r => `चाँद की स्थिति ${r}`, es: r => `fase de la luna ${r}` },
  countdown: { en: r => `days until ${r}`, hi: r => `${r} कितने दिन बाकी`, es: r => `cuántos días faltan para ${r}` },
  wiki: { en: r => `who is ${r}`, hi: r => `${r} कौन है`, es: r => `quién es ${r}` },
  define: { en: r => `define ${r}`, hi: r => `${r} का मतलब`, es: r => `definición de ${r}` },
  news: { en: r => `news about ${r}`, hi: r => `${r} की खबर`, es: r => `noticias de ${r}` },
  convert: { en: (r, p) => swapNumber(p, r), hi: (r, p) => swapNumber(p, r), es: (r, p) => swapNumber(p, r) }, // "and 20 km?"
};
function swapNumber(previous, rest) {
  const n = rest.match(/-?[\d,]*\.?\d+/);
  return n ? previous.replace(/-?[\d,]*\.?\d+/, n[0]) : null;
}
const followFresh = () => brain.ctx && Date.now() - brain.ctx.at < 3 * 60 * 1000;
const followup = {
  id: "followup",
  test: any(t => {
    if (!followFresh()) return false;
    const lang = ["en", "hi", "es"].find(l => FOLLOW_RE[l].test(t));
    return Boolean(lang && (FOLLOW_REPEAT.has(brain.ctx.id) || FOLLOW_BUILD[brain.ctx.id]));
  }),
  async run(t, lang, ctx) {
    const m = t.match(FOLLOW_RE[lang]);
    const rest = m ? m[1].replace(/^(?:in|for|at|on|the)\s+/, "").trim() : "";
    const prev = brain.ctx, target = INTENTS.find(i => i.id === prev.id);
    // Weather, time and sun are about a city, and only for today: "and tomorrow?" can't be answered.
    if (["weather", "time", "sun"].includes(prev.id) && /^(?:tomorrow|today|tonight|now|yesterday|कल|आज|अभी|mañana|hoy|ahora|ayer)$/.test(rest)) return { text: X[lang].todayOnly, tone: "no" };
    const text = FOLLOW_REPEAT.has(prev.id) ? prev.text : FOLLOW_BUILD[prev.id][lang](rest, prev.text);
    if (!text || !target) return { text: T[lang].unknown, tone: "no" };
    return target.run(text, lang, ctx);
  },
};

const speed = {
  id: "speed",
  test: {
    en: /\b(?:speak|talk)\s+(?:a bit |a little |much )?(?:slower|faster|slowly|quickly|louder|quieter|softer)\b|\b(?:slow down|speed up|louder|quieter|softer|turn it up|turn it down|speak up)\b/,
    hi: /धीरे बोलो|धीमे बोलो|तेज़ बोलो|तेज बोलो|ज़ोर से बोलो|धीमी आवाज़/, es: /habla (?:más )?(?:lento|despacio|rápido|fuerte|bajo)|más (?:lento|rápido|fuerte|bajo)/,
  },
  run(t, lang) {
    const x = X[lang], clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, Math.round(v * 100) / 100));
    const louder = /louder|turn it up|speak up|ज़ोर|fuerte/.test(t), quieter = /quieter|softer|turn it down|धीमी आवाज़|\bbajo\b/.test(t);
    if (louder || quieter) {
      const v = clamp(+cfg.volume + (louder ? 0.25 : -0.25), 0.25, 1);
      if (v === +cfg.volume) return { text: louder ? x.fullvol : x.minvol, tone: "yes" };
      cfg.volume = v; save();
      return { text: louder ? x.louder : x.quieter, tone: "yes" };
    }
    const slower = /slower|slowly|slow down|धीरे|धीमे|lento|despacio/.test(t);
    const r = clamp(+cfg.rate + (slower ? -0.2 : 0.2), 0.6, 1.6);
    if (r === +cfg.rate) return { text: slower ? x.slowest : x.fastest, tone: "yes" };
    cfg.rate = r; save(); $("rate").value = r;
    return { text: slower ? x.slower : x.faster, tone: "yes" };
  },
};

const switchLang = {
  id: "lang",
  test: {
    en: /\b(?:speak|talk|switch to|reply in|change (?:the )?language to)\s+(?:in\s+)?(?:hindi|english|spanish)\b/,
    hi: /(?:हिंदी|हिन्दी|अंग्रेज़ी|अंग्रेजी|इंग्लिश|स्पेनिश)\s+में\s+(?:बोलो|बात करो)|भाषा बदलो/,
    es: /(?:habla|hablemos|cambia(?: el idioma)? a)\s+(?:en\s+)?(?:español|espanol|inglés|ingles|hindi)/,
  },
  run(t, lang) {
    const target = findLang(t);
    if (!target || !["en", "hi", "es"].includes(target.code)) return { text: X[lang].langNeed, tone: "yes" };
    const code = target.code;
    cfg.lang = code; cfg.voice = ""; save();
    $("lang").value = code; loadVoices(); renderChips(); renderHeader();
    if (listening) spawn(); // recognise the new language
    return { text: X[code].langSet, tone: "yes" };
  },
};

// ---------- Help ----------
const help = {
  id: "help",
  test: { en: /what can you do|what do you do|your abilities|what are you able|^help$/, hi: /तुम क्या कर सकते|आप क्या कर सकते|क्या-क्या कर सकते|मदद/, es: /qué puedes hacer|que puedes hacer|qué sabes hacer|ayuda/ },
  run: (t, lang) => ({ text: X[lang].help(Object.values(T[lang].labels).join(", ")), tone: "yes" }),
};

// "google" now opens a Google search tab instead of asking DuckDuckGo.
INTENTS.find(i => i.id === "search").test.en = /\b(search|look up|find out)\b/;

// New abilities go first so e.g. "remind me" wins over the plain timer and "translate" over "say".
INTENTS.unshift(stop, again, followup, speed, switchLang, whoami, moon, stopwatch, countdown, remind, notes, todo, sun, translate, define, convert, help, fact, quote, riddle, trivia, pickNum, web, copy);

// ---------- Open-ended chat (Gemini free tier) as the last resort ----------
let chatOn = null; // unknown until we ask the server once
async function chatEnabled() {
  if (chatOn !== null) return chatOn;
  try { chatOn = !!(await getJSON("/api/chat")).enabled; } catch { chatOn = false; }
  return chatOn;
}
brain.history = [];
brain.fallback = async (raw, lang) => {
  if (!(await chatEnabled())) return null;
  try {
    const r = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json", ...(window.authToken && window.authToken() ? { Authorization: "Bearer " + window.authToken() } : {}) },
      body: JSON.stringify({ lang, messages: [...brain.history.slice(-8), { role: "user", text: raw }] }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j.text) return null;
    brain.history.push({ role: "user", text: raw }, { role: "model", text: j.text });
    brain.history = brain.history.slice(-12);
    return { text: j.text, tone: "yes" };
  } catch { return null; }
};
