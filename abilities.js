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

Object.assign(X.en, {
  goodMorning: n => `Good morning${n ? ", " + n : ""}!`, briefNoTodo: "Nothing on your to-do list.", briefNews: s => `In the news: ${s}.`,
  briefReminders: n => `You have ${n} ${plural(n, "reminder", "reminders")} coming up.`,
  askHome: "Which city should I use for your weather? I'll remember it.", homeSaved: c => `Okay, I'll use ${c} as your home city.`,
  pomoStart: (w, b, r) => `Focus timer started: ${r} rounds of ${w} minutes, with ${b}-minute breaks. Ready, set, focus!`,
  pomoBreak: b => `Great work! Take a ${b}-minute break.`, pomoBack: (n, r) => `Break's over. Round ${n} of ${r}. Focus!`, pomoDone: "All rounds finished. Well done!",
  pomoStopped: "Focus timer stopped.", pomoNone: "No focus timer is running.", pomoLeft: (what, d) => `${what}. About ${d} left.`, pomoWork: n => `Round ${n}: focus time`, pomoRest: "Break time",
  ambStart: (k, m) => `Playing ${k}${m ? ` for ${m} minutes` : ""}. Say “stop the sound” when you want it off.`, ambStop: "Sound off.", ambNone: "Nothing is playing.", ambMuted: "I'm muted. Tap the sound button first.",
  ambNames: { rain: "rain", ocean: "ocean waves", white: "white noise", brown: "brown noise", pink: "pink noise", fan: "a fan" },
  breathStart: "Okay, let's breathe together, three rounds. Breathe in.", breathHold: "Hold.", breathOut: "Breathe out slowly.", breathIn: "Breathe in.", breathDone: "Well done. You can open your eyes.", breathStopped: "Okay, stopping the breathing exercise.", breathNone: "No breathing exercise is running.",
});
Object.assign(X.hi, {
  goodMorning: n => `सुप्रभात${n ? ", " + n : ""}!`, briefNoTodo: "आपकी टू-डू लिस्ट में कुछ नहीं है।", briefNews: s => `खबरों में: ${s}।`,
  briefReminders: n => `आपके ${n} रिमाइंडर आने वाले हैं।`,
  askHome: "आपके मौसम के लिए कौन सा शहर इस्तेमाल करूँ? मैं याद रखूँगा।", homeSaved: c => `ठीक है, ${c} आपका घर का शहर रहेगा।`,
  pomoStart: (w, b, r) => `फ़ोकस टाइमर शुरू: ${w} मिनट के ${r} राउंड, ${b} मिनट के ब्रेक के साथ। तैयार, ध्यान लगाइए!`,
  pomoBreak: b => `बहुत बढ़िया! ${b} मिनट का ब्रेक लीजिए।`, pomoBack: (n, r) => `ब्रेक खत्म। राउंड ${n}, कुल ${r}। ध्यान लगाइए!`, pomoDone: "सारे राउंड पूरे हुए। शाबाश!",
  pomoStopped: "फ़ोकस टाइमर बंद कर दिया।", pomoNone: "कोई फ़ोकस टाइमर नहीं चल रहा।", pomoLeft: (what, d) => `${what}। लगभग ${d} बाकी हैं।`, pomoWork: n => `राउंड ${n}: ध्यान का समय`, pomoRest: "ब्रेक का समय",
  ambStart: (k, m) => `${k} चला रहा हूँ${m ? `, ${m} मिनट के लिए` : ""}। बंद करने के लिए “आवाज़ बंद करो” कहिए।`, ambStop: "आवाज़ बंद।", ambNone: "कुछ नहीं बज रहा।", ambMuted: "मैं म्यूट हूँ। पहले साउंड बटन दबाइए।",
  ambNames: { rain: "बारिश की आवाज़", ocean: "समुद्र की लहरें", white: "व्हाइट नॉइज़", brown: "ब्राउन नॉइज़", pink: "पिंक नॉइज़", fan: "पंखे की आवाज़" },
  breathStart: "ठीक है, साथ में साँस लेते हैं, तीन राउंड। साँस अंदर लीजिए।", breathHold: "रोकिए।", breathOut: "धीरे-धीरे साँस छोड़िए।", breathIn: "साँस अंदर लीजिए।", breathDone: "बहुत अच्छा। अब आँखें खोल सकते हैं।", breathStopped: "ठीक है, साँस का अभ्यास रोक दिया।", breathNone: "कोई साँस का अभ्यास नहीं चल रहा।",
});
Object.assign(X.es, {
  goodMorning: n => `¡Buenos días${n ? ", " + n : ""}!`, briefNoTodo: "No hay nada en tu lista de tareas.", briefNews: s => `En las noticias: ${s}.`,
  briefReminders: n => `Tienes ${n} ${plural(n, "recordatorio", "recordatorios")} próximos.`,
  askHome: "¿Qué ciudad uso para tu clima? La recordaré.", homeSaved: c => `Vale, usaré ${c} como tu ciudad.`,
  pomoStart: (w, b, r) => `Temporizador de enfoque: ${r} rondas de ${w} minutos, con descansos de ${b}. ¡A concentrarse!`,
  pomoBreak: b => `¡Buen trabajo! Descansa ${b} minutos.`, pomoBack: (n, r) => `Se acabó el descanso. Ronda ${n} de ${r}. ¡A concentrarse!`, pomoDone: "Todas las rondas terminadas. ¡Muy bien!",
  pomoStopped: "Temporizador de enfoque detenido.", pomoNone: "No hay ningún temporizador de enfoque.", pomoLeft: (what, d) => `${what}. Faltan unos ${d}.`, pomoWork: n => `Ronda ${n}: tiempo de enfoque`, pomoRest: "Tiempo de descanso",
  ambStart: (k, m) => `Reproduciendo ${k}${m ? ` durante ${m} minutos` : ""}. Di «apaga el sonido» cuando quieras.`, ambStop: "Sonido apagado.", ambNone: "No suena nada.", ambMuted: "Estoy en silencio. Toca primero el botón de sonido.",
  ambNames: { rain: "lluvia", ocean: "olas del mar", white: "ruido blanco", brown: "ruido marrón", pink: "ruido rosa", fan: "un ventilador" },
  breathStart: "Vale, respiremos juntos, tres rondas. Inhala.", breathHold: "Sostén.", breathOut: "Exhala despacio.", breathIn: "Inhala.", breathDone: "Muy bien. Ya puedes abrir los ojos.", breathStopped: "Vale, detengo el ejercicio de respiración.", breathNone: "No hay ningún ejercicio de respiración.",
});
Object.assign(X.en.labels, { briefing: "give you a morning briefing", homecity: "remember your home city", pomodoro: "run a focus timer", ambient: "play rain, ocean or white noise", breathing: "guide a breathing exercise" });
Object.assign(X.hi.labels, { briefing: "सुबह का ब्रीफ़िंग दे", homecity: "आपका घर का शहर याद रख", pomodoro: "फ़ोकस टाइमर चला", ambient: "बारिश या समुद्र की आवाज़ चला", breathing: "साँस का अभ्यास करा" });
Object.assign(X.es.labels, { briefing: "darte un resumen de la mañana", homecity: "recordar tu ciudad", pomodoro: "usar un temporizador de enfoque", ambient: "poner sonido de lluvia, mar o ruido blanco", breathing: "guiar un ejercicio de respiración" });

Object.assign(X.en, {
  histIntro: d => `On this day, ${d}:`, histEvent: (y, t) => `In ${y}, ${t}`, histFail: "I couldn't look up this day in history.",
  quakeOut: (n, list) => `${n} ${plural(n, "earthquake", "earthquakes")} of magnitude 4.5 or more in the last day. Biggest: ${list}.`, quakeNone: "No earthquakes of magnitude 4.5 or more in the last day.", quakeFail: "I couldn't get earthquake data right now.",
  quakeItem: (m, p) => `magnitude ${m} ${p}`,
  issOut: (where, km, alt) => `The International Space Station is over ${where} right now, moving at about ${km} kilometres per hour, ${alt} kilometres up.`, issFail: "I couldn't find the space station right now.",
  issOcean: (lat, lon) => `open water near ${Math.abs(lat)} degrees ${lat >= 0 ? "north" : "south"}, ${Math.abs(lon)} degrees ${lon >= 0 ? "east" : "west"}`,
  holOut: (c, list) => `Next public holidays in ${c}: ${list}.`, holNone: c => `I don't have public holiday data for ${c}. Try a country like the United States, Spain or Germany.`, holFail: "I couldn't get holiday data right now.",
  holItem: (n, d) => `${n} on ${d}`,
  ctyOut: (n, cap, region, pop, income) => `${n}: the capital is ${cap || "unknown"}, in ${region}. ${pop ? " Population about " + pop + "." : ""}${income ? " Income level: " + income + "." : ""}`, ctyFail: "I couldn't look up that country right now.",
  millions: n => `${n} million`, billions: n => `${n} billion`, thousands: n => `${n} thousand`,
});
Object.assign(X.hi, {
  histIntro: d => `आज के दिन, ${d}:`, histEvent: (y, t) => `${y} में, ${t}`, histFail: "आज के दिन का इतिहास नहीं मिल पाया।",
  quakeOut: (n, list) => `पिछले एक दिन में 4.5 या उससे ज़्यादा तीव्रता के ${n} भूकंप आए। सबसे बड़ा: ${list}।`, quakeNone: "पिछले एक दिन में 4.5 या उससे ज़्यादा तीव्रता का कोई भूकंप नहीं आया।", quakeFail: "अभी भूकंप की जानकारी नहीं मिल पाई।",
  quakeItem: (m, p) => `तीव्रता ${m}, ${p}`,
  issOut: (where, km, alt) => `अंतर्राष्ट्रीय अंतरिक्ष स्टेशन अभी ${where} के ऊपर है, लगभग ${km} किलोमीटर प्रति घंटे की रफ़्तार से, ${alt} किलोमीटर की ऊँचाई पर।`, issFail: "अभी अंतरिक्ष स्टेशन नहीं मिल पाया।",
  issOcean: (lat, lon) => `खुले समुद्र में ${Math.abs(lat)} अंश ${lat >= 0 ? "उत्तर" : "दक्षिण"}, ${Math.abs(lon)} अंश ${lon >= 0 ? "पूर्व" : "पश्चिम"} के पास`,
  holOut: (c, list) => `${c} की अगली सार्वजनिक छुट्टियाँ: ${list}।`, holNone: c => `${c} की सार्वजनिक छुट्टियों की जानकारी मेरे पास नहीं है। अमेरिका, स्पेन या जर्मनी जैसा कोई देश आज़माइए।`, holFail: "अभी छुट्टियों की जानकारी नहीं मिल पाई।",
  holItem: (n, d) => `${d} को ${n}`,
  ctyOut: (n, cap, region, pop, income) => `${n}: राजधानी ${cap || "अज्ञात"} है, क्षेत्र ${region}। ${pop ? " आबादी लगभग " + pop + "।" : ""}${income ? " आय स्तर: " + income + "।" : ""}`, ctyFail: "अभी उस देश की जानकारी नहीं मिल पाई।",
  millions: n => `${n} मिलियन`, billions: n => `${n} अरब`, thousands: n => `${n} हज़ार`,
});
Object.assign(X.es, {
  histIntro: d => `Un día como hoy, ${d}:`, histEvent: (y, t) => `En ${y}, ${t}`, histFail: "No pude buscar este día en la historia.",
  quakeOut: (n, list) => `${n} ${plural(n, "terremoto", "terremotos")} de magnitud 4,5 o más en el último día. El mayor: ${list}.`, quakeNone: "Ningún terremoto de magnitud 4,5 o más en el último día.", quakeFail: "No pude obtener datos de terremotos ahora.",
  quakeItem: (m, p) => `magnitud ${m} ${p}`,
  issOut: (where, km, alt) => `La Estación Espacial Internacional está sobre ${where} ahora mismo, a unos ${km} kilómetros por hora y ${alt} kilómetros de altura.`, issFail: "No pude encontrar la estación espacial ahora.",
  issOcean: (lat, lon) => `aguas abiertas cerca de ${Math.abs(lat)} grados ${lat >= 0 ? "norte" : "sur"}, ${Math.abs(lon)} grados ${lon >= 0 ? "este" : "oeste"}`,
  holOut: (c, list) => `Próximos festivos en ${c}: ${list}.`, holNone: c => `No tengo datos de festivos de ${c}. Prueba con un país como Estados Unidos, España o Alemania.`, holFail: "No pude obtener los festivos ahora.",
  holItem: (n, d) => `${n} el ${d}`,
  ctyOut: (n, cap, region, pop, income) => `${n}: la capital es ${cap || "desconocida"}, en ${region}. ${pop ? " Población de unos " + pop + "." : ""}${income ? " Nivel de ingresos: " + income + "." : ""}`, ctyFail: "No pude buscar ese país ahora.",
  millions: n => `${n} millones`, billions: n => `${n} mil millones`, thousands: n => `${n} mil`,
});
Object.assign(X.en.labels, { history: "tell you what happened on this day in history", quake: "tell you about recent earthquakes", iss: "tell you where the space station is", holidays: "tell you the next public holidays", country: "give you the capital and population of a country" });
Object.assign(X.hi.labels, { history: "इतिहास में आज के दिन की घटनाएँ बता", quake: "हाल के भूकंपों की जानकारी दे", iss: "अंतरिक्ष स्टेशन कहाँ है बता", holidays: "अगली सार्वजनिक छुट्टियाँ बता", country: "किसी देश की राजधानी और आबादी बता" });
Object.assign(X.es.labels, { history: "contarte qué pasó un día como hoy", quake: "informarte de terremotos recientes", iss: "decirte dónde está la estación espacial", holidays: "decirte los próximos festivos", country: "darte la capital y la población de un país" });

Object.assign(X.en, {
  blank: "blank", hmNoLang: "Hangman works in English and Spanish. Switch language and ask again.",
  hmStart: (w, l) => `Let's play hangman! The word: ${w}. You have ${l} lives. Say a letter.`, hmTry: l => `You've already tried ${l}.`, hmAsk: "Say one letter, or try the whole word.",
  hmHit: (w, l) => `Yes! ${w}. ${l} lives left.`, hmMiss: (w, l) => `No. ${w}. ${l} ${plural(l, "life", "lives")} left.`, hmWin: w => `You got it! The word was ${w}. Well done!`, hmLose: w => `Out of lives. The word was ${w}. Better luck next time!`,
  rpsStart: "Rock, paper, scissors! Say your move.", rpsAsk: "Say rock, paper or scissors.", rpsNames: ["rock", "paper", "scissors"],
  rpsOut: (y, m, r, a, b) => `You chose ${y}, I chose ${m}. ${r === 1 ? "You win!" : r === 0 ? "It's a tie." : "I win!"} Score: you ${a}, me ${b}. Another round?`,
  gsStart: "I'm thinking of a number between 1 and 100. Take a guess!", gsAsk: "Say a number between 1 and 100.", gsHigher: "Higher.", gsLower: "Lower.", gsWin: n => `Got it in ${n} ${plural(n, "try", "tries")}!`,
  mqStart: "Math quiz time! Five questions.", mqQ: (n, a, op, b) => `Question ${n}: what is ${a} ${op} ${b}?`, mqOps: ["plus", "minus", "times"],
  mqRight: "Correct!", mqWrong: a => `Not quite, it's ${a}.`, mqAsk: "Say a number.", mqEnd: s => `Quiz finished. You got ${s} out of 5.`,
  twisters: ["She sells seashells by the seashore.", "Peter Piper picked a peck of pickled peppers.", "How much wood would a woodchuck chuck if a woodchuck could chuck wood?", "Red lorry, yellow lorry.", "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair."],
  wotdIntro: "Word of the day:", wotdFail: "I couldn't fetch the word of the day.",
  fcAdded: (f, b) => `Saved flashcard: ${f} means ${b}.`, fcNeed: "Say it like “add flashcard bonjour means hello”.", fcNone: "You have no flashcards yet. Add one: “add flashcard bonjour means hello”.",
  fcList: (n, s) => `You have ${n} ${plural(n, "flashcard", "flashcards")}: ${s}.`, fcCleared: "Flashcards cleared.", fcItem: (f, b) => `${f} means ${b}`,
  fcAsk: (n, f) => `Card ${n}: what does ${f} mean?`, fcRight: "Correct!", fcWrong: b => `Not quite. It means ${b}.`, fcEnd: (s, n) => `Done. You got ${s} out of ${n}.`,
});
Object.assign(X.hi, {
  blank: "खाली", hmNoLang: "हैंगमैन अंग्रेज़ी और स्पेनिश में चलता है। भाषा बदलकर फिर पूछिए।",
  hmStart: (w, l) => `चलो हैंगमैन खेलते हैं! शब्द: ${w}। आपके पास ${l} जानें हैं। कोई अक्षर बोलिए।`, hmTry: l => `आप ${l} पहले आज़मा चुके हैं।`, hmAsk: "एक अक्षर बोलिए, या पूरा शब्द बताइए।",
  hmHit: (w, l) => `सही! ${w}। ${l} जानें बाकी हैं।`, hmMiss: (w, l) => `नहीं। ${w}। ${l} जानें बाकी हैं।`, hmWin: w => `आपने पकड़ लिया! शब्द था ${w}। शाबाश!`, hmLose: w => `जानें खत्म। शब्द था ${w}। अगली बार किस्मत साथ दे!`,
  rpsStart: "पत्थर, कागज़, कैंची! अपनी चाल बोलिए।", rpsAsk: "पत्थर, कागज़ या कैंची बोलिए।", rpsNames: ["पत्थर", "कागज़", "कैंची"],
  rpsOut: (y, m, r, a, b) => `आपने ${y} चुना, मैंने ${m}। ${r === 1 ? "आप जीते!" : r === 0 ? "बराबरी रही।" : "मैं जीता!"} स्कोर: आप ${a}, मैं ${b}। एक और राउंड?`,
  gsStart: "मैंने 1 से 100 के बीच एक संख्या सोची है। अंदाज़ा लगाइए!", gsAsk: "1 से 100 के बीच कोई संख्या बोलिए।", gsHigher: "और बड़ी।", gsLower: "और छोटी।", gsWin: n => `${n} कोशिश में सही!`,
  mqStart: "गणित क्विज़ का समय! पाँच सवाल।", mqQ: (n, a, op, b) => `सवाल ${n}: ${a} ${op} ${b} कितना होता है?`, mqOps: ["जमा", "घटा", "गुणा"],
  mqRight: "सही!", mqWrong: a => `ठीक नहीं, जवाब ${a} है।`, mqAsk: "कोई संख्या बोलिए।", mqEnd: s => `क्विज़ खत्म। आपके पाँच में से ${s} सही रहे।`,
  twisters: ["कच्चा पापड़, पक्का पापड़।", "चंदू के चाचा ने चंदू की चाची को चाँदनी चौक में चाँदी की चम्मच से चटनी चटाई।", "छह छोटे छुपे छछूंदर।", "सात सुन्दर सूरज सरोवर सजाते।"],
  wotdIntro: "आज का शब्द:", wotdFail: "आज का शब्द नहीं मिल पाया।",
  fcAdded: (f, b) => `फ्लैशकार्ड सेव हुआ: ${f} का मतलब ${b}।`, fcNeed: "ऐसे कहिए “फ्लैशकार्ड जोड़ो bonjour का मतलब hello”।", fcNone: "अभी आपके पास कोई फ्लैशकार्ड नहीं है।",
  fcList: (n, s) => `आपके ${n} फ्लैशकार्ड हैं: ${s}।`, fcCleared: "फ्लैशकार्ड मिटा दिए।", fcItem: (f, b) => `${f} का मतलब ${b}`,
  fcAsk: (n, f) => `कार्ड ${n}: ${f} का मतलब क्या है?`, fcRight: "सही!", fcWrong: b => `ठीक नहीं। मतलब है ${b}।`, fcEnd: (s, n) => `खत्म। ${n} में से ${s} सही।`,
});
Object.assign(X.es, {
  blank: "hueco", hmNoLang: "El ahorcado funciona en inglés y español. Cambia de idioma y vuelve a pedirlo.",
  hmStart: (w, l) => `¡Juguemos al ahorcado! La palabra: ${w}. Tienes ${l} vidas. Di una letra.`, hmTry: l => `Ya probaste ${l}.`, hmAsk: "Di una letra, o intenta la palabra completa.",
  hmHit: (w, l) => `¡Sí! ${w}. Te quedan ${l} vidas.`, hmMiss: (w, l) => `No. ${w}. Te quedan ${l} ${plural(l, "vida", "vidas")}.`, hmWin: w => `¡Lo lograste! La palabra era ${w}. ¡Muy bien!`, hmLose: w => `Sin vidas. La palabra era ${w}. ¡Suerte la próxima!`,
  rpsStart: "¡Piedra, papel o tijera! Di tu jugada.", rpsAsk: "Di piedra, papel o tijera.", rpsNames: ["piedra", "papel", "tijera"],
  rpsOut: (y, m, r, a, b) => `Elegiste ${y}, yo elegí ${m}. ${r === 1 ? "¡Ganas!" : r === 0 ? "Empate." : "¡Gano yo!"} Marcador: tú ${a}, yo ${b}. ¿Otra ronda?`,
  gsStart: "Pienso en un número del 1 al 100. ¡Adivina!", gsAsk: "Di un número del 1 al 100.", gsHigher: "Más alto.", gsLower: "Más bajo.", gsWin: n => `¡Lo adivinaste en ${n} ${plural(n, "intento", "intentos")}!`,
  mqStart: "¡Hora del quiz de matemáticas! Cinco preguntas.", mqQ: (n, a, op, b) => `Pregunta ${n}: ¿cuánto es ${a} ${op} ${b}?`, mqOps: ["más", "menos", "por"],
  mqRight: "¡Correcto!", mqWrong: a => `No exactamente, es ${a}.`, mqAsk: "Di un número.", mqEnd: s => `Quiz terminado. Acertaste ${s} de 5.`,
  twisters: ["Tres tristes tigres tragaban trigo en un trigal.", "Pablito clavó un clavito en la calva de un calvito.", "El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha robado.", "Pedro Pérez pintor pinta paisajes por poco precio."],
  wotdIntro: "Palabra del día:", wotdFail: "No pude obtener la palabra del día.",
  fcAdded: (f, b) => `Tarjeta guardada: ${f} significa ${b}.`, fcNeed: "Dilo así: «añade tarjeta bonjour significa hola».", fcNone: "Todavía no tienes tarjetas.",
  fcList: (n, s) => `Tienes ${n} ${plural(n, "tarjeta", "tarjetas")}: ${s}.`, fcCleared: "Tarjetas borradas.", fcItem: (f, b) => `${f} significa ${b}`,
  fcAsk: (n, f) => `Tarjeta ${n}: ¿qué significa ${f}?`, fcRight: "¡Correcto!", fcWrong: b => `No exactamente. Significa ${b}.`, fcEnd: (s, n) => `Terminado. Acertaste ${s} de ${n}.`,
});
Object.assign(X.en.labels, { hangman: "play hangman", rps: "play rock paper scissors", guess: "play a number guessing game", mathquiz: "give you a math quiz", twister: "say a tongue twister", wotd: "tell you the word of the day", flashcards: "run flashcards" });
Object.assign(X.hi.labels, { hangman: "हैंगमैन खेल", rps: "पत्थर कागज़ कैंची खेल", guess: "संख्या का अंदाज़ा लगाने का खेल खेल", mathquiz: "गणित क्विज़ करा", twister: "जीभ मरोड़ वाली पंक्ति बोल", wotd: "आज का शब्द बता", flashcards: "फ्लैशकार्ड चला" });
Object.assign(X.es.labels, { hangman: "jugar al ahorcado", rps: "jugar a piedra, papel o tijera", guess: "jugar a adivinar un número", mathquiz: "hacerte un quiz de matemáticas", twister: "decir un trabalenguas", wotd: "decirte la palabra del día", flashcards: "usar tarjetas de estudio" });

for (const l of ["en", "hi", "es"]) {
  Object.assign(T[l].labels, X[l].labels);
  T[l].chips.splice(2, 0, ...X[l].chips.slice(0, 1)); // "What can you do?" near the front
  T[l].chips.push(...X[l].chips.slice(1));
}

// Stop words so the city survives in "what time is it in Tokyo" / "sunrise in Pune".
STOP_CITY.en.push(..."time clock current sunrise sunset when does rise set up go down will be going to there do expect cold hot warm sunny snow snowing raining windy umbrella outside need i an a my you should bring take wear are".split(" "));
STOP_CITY.hi.push(..."समय टाइम कितने बजे हैं सूर्योदय सूर्यास्त कब होता होगा होगी हुआ आज".split(" "));
STOP_CITY.es.push(..."hora es son las amanecer atardecer puesta sol cuándo cuando sale se pone salida va llover lloverá nevar frío calor".split(" "));

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

// ---------- Daily helper: briefing, focus timer, ambient sounds, breathing ----------
const memory = () => store("voicebot-memory", {});
const saveMemory = m => keep("voicebot-memory", m);

async function briefingFor(lang, prefix) {
  const x = X[lang], m = memory(), parts = [];
  if (prefix) parts.push(prefix);
  parts.push(x.goodMorning(brain.user));
  parts.push(T[lang].date(new Date().toLocaleDateString(SPEECH[lang], { weekday: "long", month: "long", day: "numeric" })));
  try { const w = await weatherFor(m.city, lang); if (w.tone === "yes") parts.push(w.text); } catch { /* skip the weather */ }
  const todos = store("voicebot-todo", []);
  parts.push(todos.length ? x.todoList(todos.length, todos.slice(0, 5).join(", ")) : x.briefNoTodo);
  const soon = store("voicebot-reminders", []).filter(r => r.at > Date.now() && r.at < Date.now() + 864e5).length;
  if (soon) parts.push(x.briefReminders(soon));
  try {
    const j = await getJSON(`/api/news?lang=${lang}`);
    if (j.items && j.items.length) parts.push(x.briefNews(j.items.slice(0, 2).join(". ")));
  } catch { /* skip the news */ }
  return { text: parts.join(" "), tone: "yes" };
}
const briefing = {
  id: "briefing",
  test: {
    en: /^(?:hey |hi |ok |okay )?(?:good morning|morning)\b|\b(?:daily|morning) (?:briefing|brief|update)\b|\bbrief me\b|\bstart my day\b|\bwhat'?s my day\b/,
    hi: /^(?:सुप्रभात|गुड मॉर्निंग)|मेरा दिन|आज का ब्रीफ|सुबह का ब्रीफ/, es: /^(?:buenos días|buenos dias)|resumen del día|resumen del dia|dame el resumen|mi día de hoy/,
  },
  async run(t, lang, ctx) {
    if (!memory().city) { ctx.awaiting = { id: "homecity", then: "briefing" }; return { text: X[lang].askHome, tone: "yes" }; }
    return briefingFor(lang);
  },
};
const homecity = {
  id: "homecity",
  test: { en: /\b(?:change|set|update|save)\s+my\s+(?:home\s+)?city\b|\bmy home city\b/, hi: /मेरा (?:घर का )?शहर (?:बदलो|सेट)|घर का शहर/, es: /cambia mi ciudad|mi ciudad de casa|guarda mi ciudad/ },
  async run(t, lang, ctx) {
    const named = (t.match(/\b(?:to|a|en|को)\s+([\p{L}\p{M} .'-]+)$/u) || [])[1];
    if (!named) { ctx.awaiting = { id: "homecity" }; return { text: X[lang].askHome, tone: "yes" }; }
    return saveHome(named, lang);
  },
};
async function saveHome(city, lang) {
  const p = await geo(city, lang);
  if (!p) return { text: T[lang].cityNotFound(city), tone: "no" };
  const m = memory(); m.city = p.name; saveMemory(m);
  return { text: X[lang].homeSaved(p.name), tone: "yes" };
}
AWAIT.homecity = async (t, lang, st) => {
  const saved = await saveHome(cityOf(t, lang) || t, lang);
  if (saved.tone !== "yes" || st.then !== "briefing") return saved;
  return briefingFor(lang, saved.text);
};

// Focus timer ("pomodoro"): work rounds with breaks, announced aloud. Rings only while the page is open.
const pomo = { ids: [], events: [] };
function pomoStop() { pomo.ids.forEach(clearTimeout); pomo.ids = []; pomo.events = []; }
function pomoAt(sec, text, phase, n) {
  pomo.events.push({ at: Date.now() + sec * 1000, phase, n });
  pomo.ids.push(startTimer(sec, text));
}
const pomodoro = {
  id: "pomodoro",
  test: { en: /\bpomodoro\b|\bfocus (?:timer|session|mode)\b|\bstart (?:a )?focus\b/, hi: /पोमोडोरो|फ़ोकस टाइमर|फोकस टाइमर/, es: /pomodoro|sesión de enfoque|sesion de enfoque|temporizador de enfoque/ },
  run(t, lang) {
    const x = X[lang];
    if (/\b(?:stop|cancel|end|quit)\b|बंद|रोको|detén|deten|cancela|para\b/.test(t)) {
      const was = pomo.ids.length > 0; pomoStop();
      return { text: was ? x.pomoStopped : x.pomoNone, tone: was ? "yes" : "no" };
    }
    if (/\b(?:left|remaining|status|how long|where am i)\b|कितना|बाकी|cuánto|cuanto|queda|falta/.test(t) && pomo.events.length) {
      const next = pomo.events.find(e => e.at > Date.now());
      if (!next) return { text: x.pomoNone, tone: "no" };
      const working = next.phase === "work-end";
      return { text: x.pomoLeft(working ? x.pomoWork(next.n) : x.pomoRest, dur((next.at - Date.now()) / 1000, lang)), tone: "yes" };
    }
    const minutes = +((t.match(/(\d+)\s*(?:minute|min|मिनट|minuto)/) || [])[1] || 25);
    const work = Math.min(120, Math.max(5, minutes)), rest = Math.max(3, Math.round(work / 5)), rounds = 4;
    pomoStop();
    let at = 0;
    for (let r = 1; r <= rounds; r++) {
      at += work * 60;
      if (r === rounds) pomoAt(at, x.pomoDone, "done", r);
      else { pomoAt(at, x.pomoBreak(rest), "work-end", r); at += rest * 60; pomoAt(at, x.pomoBack(r + 1, rounds), "rest-end", r + 1); }
    }
    return { text: x.pomoStart(work, rest, rounds), tone: "yes" };
  },
};

// Ambient sounds, synthesised from noise with Web Audio (no downloads).
let amb = null;
function noiseBuffer(ctx, kind) {
  const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  let last = 0, b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === "brown" || kind === "ocean" || kind === "fan") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    else if (kind === "pink") { b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2; }
    else d[i] = w;
  }
  return buf;
}
function ambientStart(kind, minutes) {
  ambientStop(true);
  const AC = window.AudioContext || window.webkitAudioContext, ctx = new AC();
  ctx.resume();
  const src = ctx.createBufferSource(); src.buffer = noiseBuffer(ctx, kind); src.loop = true;
  const out = ctx.createGain(); out.gain.value = 0;
  let node = src;
  const chain = (type, freq, q = 0.7) => { const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; node.connect(f); node = f; };
  if (kind === "rain") { chain("highpass", 900); chain("lowpass", 7000); }
  if (kind === "ocean") { chain("lowpass", 800); }
  if (kind === "fan") { chain("lowpass", 500); }
  node.connect(out); out.connect(ctx.destination);
  const level = { rain: 0.16, ocean: 0.35, white: 0.1, brown: 0.3, pink: 0.18, fan: 0.3 }[kind];
  out.gain.linearRampToValueAtTime(level, ctx.currentTime + 1.5);
  let lfo = null;
  if (kind === "ocean") { // slow swell, like waves coming in and out
    lfo = ctx.createOscillator(); lfo.frequency.value = 0.11;
    const depth = ctx.createGain(); depth.gain.value = level * 0.8; lfo.connect(depth); depth.connect(out.gain); lfo.start();
  }
  src.start();
  amb = { ctx, out, src, lfo, timer: minutes ? setTimeout(() => ambientStop(), minutes * 60000) : null };
}
function ambientStop(instant) {
  if (!amb) return false;
  const a = amb; amb = null; clearTimeout(a.timer);
  try {
    a.out.gain.cancelScheduledValues(a.ctx.currentTime);
    a.out.gain.setValueAtTime(a.out.gain.value, a.ctx.currentTime);
    a.out.gain.linearRampToValueAtTime(0, a.ctx.currentTime + (instant ? 0.05 : 1));
    setTimeout(() => { try { a.src.stop(); a.lfo && a.lfo.stop(); a.ctx.close(); } catch { /* already closed */ } }, instant ? 100 : 1200);
  } catch { /* ignore */ }
  return true;
}
const AMBIENT_WORDS = {
  rain: /rain|बारिश|lluvia/, ocean: /ocean|waves|sea|समुद्र|लहर|olas|mar\b/, white: /white noise|व्हाइट|ruido blanco/, brown: /brown noise|ब्राउन|ruido marrón|ruido marron/,
  pink: /pink noise|पिंक|ruido rosa/, fan: /\bfan\b|पंखे|ventilador/,
};
const ambient = {
  id: "ambient",
  test: {
    en: /\b(?:play|start|put on|turn on)\s+(?:some\s+|the\s+)?(?:rain|ocean|waves|white noise|brown noise|pink noise|fan|ambient|nature)\b|\b(?:stop|turn off|switch off)\s+(?:the\s+)?(?:sound|noise|rain|ocean|waves)\b/,
    hi: /(?:बारिश|समुद्र|लहरों?|व्हाइट नॉइज़|ब्राउन नॉइज़|पंखे)\s*(?:की आवाज़)?\s*(?:चलाओ|बजाओ)|आवाज़ बंद|आवाज बंद/,
    es: /pon\s+(?:el\s+)?(?:sonido de\s+)?(?:la\s+)?(?:lluvia|olas|ruido blanco|ruido marrón|ruido rosa|ventilador)|apaga el sonido|para el sonido/,
  },
  run(t, lang) {
    const x = X[lang];
    if (/\b(?:stop|turn off|switch off)\b|बंद|apaga|para el/.test(t)) return ambientStop() ? { text: x.ambStop, tone: "yes" } : { text: x.ambNone, tone: "no" };
    if (!cfg.speakReplies) return { text: x.ambMuted, tone: "no" };
    const kind = Object.keys(AMBIENT_WORDS).find(k => AMBIENT_WORDS[k].test(t)) || "rain";
    const mins = +((t.match(/(\d+)\s*(?:minute|min|मिनट|minuto)/) || [])[1] || 0) || 0;
    try { ambientStart(kind, mins); } catch { return { text: x.ambNone, tone: "no" }; }
    return { text: x.ambStart(x.ambNames[kind], mins), tone: "yes" };
  },
};

// Guided breathing: 4-7-8, three rounds, spoken at the right moments.
let breath = [];
const breathing = {
  id: "breathing",
  test: {
    en: /\b(?:breathing exercise|breathe with me|guide me to breathe|help me (?:relax|breathe|calm down)|calm me down|take a deep breath)\b|\bstop (?:the )?breathing\b/,
    hi: /साँस का अभ्यास|सांस का अभ्यास|गहरी साँस|गहरी सांस|साथ में साँस|साथ में सांस/, es: /ejercicio de respiración|ejercicio de respiracion|respira conmigo|ayúdame a relajarme|ayudame a relajarme/,
  },
  run(t, lang) {
    const x = X[lang];
    if (/\b(?:stop|cancel|done|enough)\b|बंद|रोको|detén|deten/.test(t)) {
      const was = breath.length > 0; breath.forEach(clearTimeout); breath = [];
      return { text: was ? x.breathStopped : x.breathNone, tone: was ? "yes" : "no" };
    }
    breath.forEach(clearTimeout); breath = [];
    for (let r = 0; r < 3; r++) { // round length 19s: in 4, hold 7, out 8; the first "in" is this reply
      const start = 3 + r * 19;
      if (r > 0) breath.push(startTimer(start, x.breathIn, null, true));
      breath.push(startTimer(start + 4, x.breathHold, null, true));
      breath.push(startTimer(start + 11, x.breathOut, null, true));
    }
    breath.push(startTimer(3 + 3 * 19, x.breathDone, () => { breath = []; }, true));
    return { text: x.breathStart, tone: "yes" };
  },
};

// ---------- More lookups: this day in history, earthquakes, space station, public holidays, countries ----------
const WIKI_FEED = { en: "en", es: "es" }; // Wikipedia has "on this day" in these; Hindi falls back to English and is translated

async function historyFor(t, lang) {
  const x = X[lang], now = new Date();
  let m = monthOf(t), d = (t.match(/\b(\d{1,2})\b/) || [])[1];
  if (!m || !d) { m = now.getMonth() + 1; d = now.getDate(); }
  const wl = WIKI_FEED[lang] || "en";
  try {
    const j = await getJSON(`https://${wl}.wikipedia.org/api/rest_v1/feed/onthisday/events/${pad(m)}/${pad(+d)}`);
    const events = (j.events || []).filter(e => e.year !== undefined && e.text);
    if (!events.length) throw new Error("none");
    const picks = [], used = new Set();
    while (picks.length < Math.min(3, events.length)) { const i = Math.floor(Math.random() * events.length); if (!used.has(i)) { used.add(i); picks.push(events[i]); } }
    picks.sort((a, b) => a.year - b.year);
    let items = picks.map(e => x.histEvent(e.year, e.text.replace(/\.$/, "")));
    if (lang === "hi") items = await Promise.all(items.map(s => tx(s, "hi")));
    const label = new Date(2000, m - 1, +d).toLocaleDateString(SPEECH[lang], { month: "long", day: "numeric" });
    return { text: `${x.histIntro(label)} ${items.join(". ")}.`, tone: "yes" };
  } catch { return { text: x.histFail, tone: "no" }; }
}
const history = {
  id: "history",
  test: {
    en: /\bon this day\b|\bthis day in history\b|\bwhat happened (?:on|today)\b|\btoday in history\b/,
    hi: /इतिहास में आज|आज के दिन का इतिहास|आज के दिन क्या हुआ/, es: /un día como hoy|un dia como hoy|qué pasó hoy|que paso hoy|hoy en la historia/,
  },
  run: (t, lang) => historyFor(t, lang),
};

const quake = {
  id: "quake",
  test: { en: /\b(?:earthquakes?|quakes?|tremors?)\b/, hi: /भूकंप|भूकम्प/, es: /terremoto|sismo|temblor/ },
  async run(t, lang) {
    const x = X[lang];
    try {
      const j = await getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson");
      const f = (j.features || []).slice().sort((a, b) => b.properties.mag - a.properties.mag);
      if (!f.length) return { text: x.quakeNone, tone: "yes" };
      const top = f.slice(0, 3).map(q => x.quakeItem(q.properties.mag.toFixed(1), q.properties.place || "").trim());
      return { text: x.quakeOut(f.length, top.join("; ")), tone: "yes" };
    } catch { return { text: x.quakeFail, tone: "no" }; }
  },
};

const iss = {
  id: "iss",
  test: { en: /\b(?:iss|space station)\b/, hi: /अंतरिक्ष स्टेशन|आईएसएस/, es: /estación espacial|estacion espacial|\biss\b/ },
  async run(t, lang) {
    const x = X[lang];
    try {
      const s = await getJSON("https://api.wheretheiss.at/v1/satellites/25544");
      const lat = Math.round(s.latitude), lon = Math.round(s.longitude);
      let where = x.issOcean(lat, lon);
      try {
        const g = await getJSON(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${s.latitude}&longitude=${s.longitude}&localityLanguage=${lang}`);
        const place = [g.locality || g.city, g.countryName].filter(Boolean).join(", ");
        if (place) where = place;
      } catch { /* keep the coordinates */ }
      return { text: x.issOut(where, Math.round(s.velocity / 100) * 100, Math.round(s.altitude)), tone: "yes" };
    } catch { return { text: x.issFail, tone: "no" }; }
  },
};

// Country list from the World Bank (keyless, browser-friendly), fetched once per visit.
let countryList = null;
async function countries() {
  if (countryList) return countryList;
  const j = await getJSON("https://api.worldbank.org/v2/country?format=json&per_page=400");
  countryList = (j[1] || []).filter(c => c.region && c.region.value !== "Aggregates");
  return countryList;
}
const COUNTRY_ALIASES = {
  usa: "united states", america: "united states", "the us": "united states", us: "united states", uk: "united kingdom", britain: "united kingdom", england: "united kingdom",
  russia: "russian federation", "south korea": "korea, rep.", "north korea": "korea, dem. people's rep.", iran: "iran, islamic rep.", egypt: "egypt, arab rep.",
  turkey: "turkiye", syria: "syrian arab republic", venezuela: "venezuela, rb", vietnam: "viet nam", laos: "lao pdr", uae: "united arab emirates", czechia: "czechia",
  "ivory coast": "cote d'ivoire", gambia: "gambia, the", bahamas: "bahamas, the", yemen: "yemen, rep.", "hong kong": "hong kong sar, china", congo: "congo, dem. rep.",
};
async function findCountry(name, lang) {
  let n = name.toLowerCase().replace(/^the\s+/, "").trim();
  if (lang !== "en" && !/^[\x00-\x7F]+$/.test(n)) n = (await tx(n, "en", lang)).toLowerCase(); // Hindi names to English
  else if (lang === "es") n = (await tx(n, "en", "es")).toLowerCase();
  n = COUNTRY_ALIASES[n] || n;
  const list = await countries();
  return list.find(c => c.name.toLowerCase() === n) || list.find(c => c.name.toLowerCase().startsWith(n)) || list.find(c => c.name.toLowerCase().includes(n)) || null;
}
const COUNTRY_NAMES = {
  "Korea, Rep.": "South Korea", "Korea, Dem. People's Rep.": "North Korea", "Iran, Islamic Rep.": "Iran", "Egypt, Arab Rep.": "Egypt", "Russian Federation": "Russia", Turkiye: "Turkey",
  "Venezuela, RB": "Venezuela", "Yemen, Rep.": "Yemen", "Syrian Arab Republic": "Syria", "Viet Nam": "Vietnam", "Lao PDR": "Laos", "Congo, Dem. Rep.": "Democratic Republic of the Congo",
  "Congo, Rep.": "Republic of the Congo", "Gambia, The": "Gambia", "Bahamas, The": "Bahamas", "Hong Kong SAR, China": "Hong Kong",
};
const niceCountry = n => COUNTRY_NAMES[n] || n.replace(/,.*$/, "");
const dateOf = (s, lang) => new Date(s + "T12:00:00").toLocaleDateString(SPEECH[lang], { weekday: "long", month: "long", day: "numeric" });
const holidays = {
  id: "holidays",
  test: {
    en: /\b(?:public|bank|national)\s+holidays?\b|\b(?:next|upcoming)\s+holidays?\b|\bholidays? in\b/,
    hi: /सार्वजनिक छुट्टी|अगली छुट्टी|छुट्टियाँ|छुट्टियां/, es: /días festivos|dias festivos|próximo festivo|proximo festivo|festivos en/,
  },
  async run(t, lang) {
    const x = X[lang];
    try {
      let code = ((navigator.language || "en-US").split("-")[1] || "US").toUpperCase(), name = null;
      const named = lang === "es" ? (t.match(/\ben\s+([\p{L}\p{M} .'-]+)$/u) || [])[1]
        : lang === "hi" ? (t.match(/([\p{L}\p{M} ]+?)\s+(?:में|की)\s+(?:सार्वजनिक|अगली|छुट्टी)/u) || [])[1]
        : (t.match(/\b(?:in|for|of)\s+([\p{L}\p{M} .'-]+)$/u) || [])[1];
      if (named && !/^(?:the )?(?:year|world|week|month)$/.test(named.trim())) {
        const c = await findCountry(named.trim(), lang);
        if (!c) return { text: x.holNone(named.trim()), tone: "no" };
        code = c.iso2Code; name = niceCountry(c.name);
      }
      const r = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${code}`);
      if (r.status === 204 || !r.ok) return { text: x.holNone(name || code), tone: "no" };
      const list = (await r.json()).slice(0, 3).map(hol => x.holItem(lang === "es" ? hol.localName || hol.name : hol.name, dateOf(hol.date, lang)));
      const shown = name || (await countries().then(l => (l.find(c => c.iso2Code === code) || {}).name).catch(() => null)) || code;
      return { text: x.holOut(niceCountry(shown), list.join("; ")), tone: "yes" };
    } catch { return { text: x.holFail, tone: "no" }; }
  },
};

const prettyPop = (n, lang) => { const x = X[lang]; const r = v => (Math.round(v * 10) / 10).toString(); return n >= 1e9 ? x.billions(r(n / 1e9)) : n >= 1e6 ? x.millions(r(n / 1e6)) : x.thousands(Math.round(n / 1e3)); };
const country = {
  id: "country",
  test: {
    en: /\b(?:capital|population) of\s+\S|\bcountry facts?\b|\bfacts? about (?:the )?(?:country|nation)\b/, hi: /की राजधानी|की आबादी|की जनसंख्या/, es: /capital de\s+\S|población de\s+\S|poblacion de\s+\S/,
  },
  async run(t, lang) {
    const x = X[lang];
    const name = lang === "en" ? (t.match(/(?:capital|population) of (?:the )?([\p{L}\p{M} .'-]+)|(?:country facts?|facts? about (?:the )?(?:country|nation))\s+(?:of |about )?([\p{L}\p{M} .'-]+)/u) || []).slice(1).find(Boolean)
      : lang === "hi" ? (t.match(/([\p{L}\p{M} ]+?)\s+की\s+(?:राजधानी|आबादी|जनसंख्या)/u) || [])[1]
      : (t.match(/(?:capital|población|poblacion) de (?:la |el |los )?([\p{L}\p{M} .'-]+)/u) || [])[1];
    if (!name) return { text: x.ctyFail, tone: "no" };
    try {
      const c = await findCountry(name.trim(), lang);
      if (!c) return wikiFor(name.trim(), lang);
      let pop = null; // the population service is flaky for some countries; answer without it rather than fail
      try {
        const pj = await getJSON(`https://api.worldbank.org/v2/country/${c.iso2Code}/indicator/SP.POP.TOTL?format=json&mrv=1`);
        pop = pj[1] && pj[1][0] && pj[1][0].value;
      } catch { /* leave it out */ }
      return { text: x.ctyOut(niceCountry(c.name), c.capitalCity, c.region.value.trim(), pop ? prettyPop(pop, lang) : "", (c.incomeLevel && c.incomeLevel.value) || "").replace(/\s+/g, " "), tone: "yes" };
    } catch { return { text: x.ctyFail, tone: "no" }; }
  },
};

// ---------- Games and learning ----------
const ri = n => Math.floor(Math.random() * n);
const stripAccents = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Hangman
const HANG_WORDS = {
  en: "planet garden rocket castle bridge pencil guitar window butter monkey jungle puzzle silver turtle wizard dragon pirate button candle island forest magnet pepper rabbit school spider thunder whistle balloon blanket".split(" "),
  es: "gato perro casa libro playa queso tigre luna mesa cielo fuego nube flor isla bosque puente cohete castillo dragon zapato ventana jardin pelota arbol raton camino montana".split(" "),
};
const LETTER_NAMES = {
  en: { ay: "a", be: "b", bee: "b", see: "c", sea: "c", dee: "d", gee: "g", jay: "j", kay: "k", oh: "o", pee: "p", queue: "q", cue: "q", are: "r", tea: "t", you: "u", why: "y", zee: "z", ex: "x", eye: "i" },
  es: { be: "b", ce: "c", de: "d", efe: "f", ge: "g", hache: "h", jota: "j", ka: "k", ele: "l", eme: "m", ene: "n", pe: "p", cu: "q", erre: "r", ese: "s", te: "t", uve: "v", equis: "x", ye: "y", zeta: "z" },
};
const hangShow = (st, x) => st.word.split("").map(c => (st.guessed.includes(c) ? c : x.blank)).join(", ");
const hangman = {
  id: "hangman", test: { en: /\bhangman\b/, hi: /हैंगमैन|हैंग मैन/, es: /ahorcado/ },
  run(t, lang, ctx) {
    const x = X[lang], list = HANG_WORDS[lang];
    if (!list) return { text: x.hmNoLang, tone: "no" };
    const st = { id: "hangman", word: list[ri(list.length)], guessed: [], lives: 6 };
    ctx.awaiting = st;
    return { text: x.hmStart(hangShow(st, x), st.lives), tone: "yes" };
  },
};
AWAIT.hangman = (t, lang, st) => {
  const x = X[lang], tokens = stripAccents(t).split(" ").filter(Boolean);
  let letter = null, whole = null;
  if (tokens.length === 1 && tokens[0].length === 1) letter = tokens[0];
  else if (tokens.length === 1 && (LETTER_NAMES[lang] || {})[tokens[0]]) letter = LETTER_NAMES[lang][tokens[0]];
  else if (tokens.length === 2 && /^(?:letter|the|la|letra)$/.test(tokens[0]) && tokens[1].length === 1) letter = tokens[1];
  else if (tokens.length === 1) whole = tokens[0];
  if (!letter && !whole) { brain.awaiting = st; return { text: x.hmAsk, tone: "yes" }; }
  const next = { ...st, guessed: [...st.guessed] };
  if (whole) {
    if (whole === st.word) return { text: x.hmWin(st.word), tone: "yes", laugh: true };
    next.lives--;
    if (next.lives <= 0) return { text: x.hmLose(st.word), tone: "no" };
    brain.awaiting = next; return { text: x.hmMiss(hangShow(next, x), next.lives), tone: "no" };
  }
  if (st.guessed.includes(letter)) { brain.awaiting = st; return { text: x.hmTry(letter), tone: "yes" }; }
  next.guessed.push(letter);
  if (st.word.includes(letter)) {
    if (st.word.split("").every(c => next.guessed.includes(c))) return { text: x.hmWin(st.word), tone: "yes", laugh: true };
    brain.awaiting = next; return { text: x.hmHit(hangShow(next, x), next.lives), tone: "yes" };
  }
  next.lives--;
  if (next.lives <= 0) return { text: x.hmLose(st.word), tone: "no" };
  brain.awaiting = next; return { text: x.hmMiss(hangShow(next, x), next.lives), tone: "no" };
};

// Rock, paper, scissors (keeps score until you stop)
const RPS_WORDS = { en: [/rock/, /paper/, /scissor/], hi: [/पत्थर|पत्थर/, /कागज़|कागज/, /कैंची|कैची/], es: [/piedra/, /papel/, /tijera/] };
const rps = {
  id: "rps", test: { en: /\brock,? paper,? scissors\b|\brps\b/, hi: /पत्थर,? कागज़?,? कैंची/, es: /piedra,? papel,? (?:o |y )?tijeras?/ },
  run(t, lang, ctx) { ctx.awaiting = { id: "rps", you: 0, me: 0 }; return { text: X[lang].rpsStart, tone: "yes" }; },
};
AWAIT.rps = (t, lang, st) => {
  const x = X[lang], mine = RPS_WORDS[lang].findIndex(re => re.test(t));
  if (mine < 0) { brain.awaiting = st; return { text: x.rpsAsk, tone: "yes" }; }
  const robot = ri(3), result = (mine - robot + 3) % 3 === 0 ? 0 : (mine - robot + 3) % 3 === 1 ? 1 : -1;
  const next = { ...st, you: st.you + (result === 1 ? 1 : 0), me: st.me + (result === -1 ? 1 : 0) };
  brain.awaiting = next;
  return { text: x.rpsOut(x.rpsNames[mine], x.rpsNames[robot], result, next.you, next.me), tone: "yes" };
};

// Number guessing
const guessGame = {
  id: "guess", test: { en: /\bguess(?:ing)? (?:the |a )?number\b|\bnumber guessing\b/, hi: /संख्या का अंदाज़ा|नंबर का अंदाज़ा|नंबर गेस/, es: /adivina(?:r)? (?:el |un )?número|adivinar un numero/ },
  run(t, lang, ctx) { ctx.awaiting = { id: "guess", secret: 1 + ri(100), tries: 0 }; return { text: X[lang].gsStart, tone: "yes" }; },
};
AWAIT.guess = (t, lang, st) => {
  const x = X[lang], m = t.match(/\d+/);
  if (!m) { brain.awaiting = st; return { text: x.gsAsk, tone: "yes" }; }
  const n = +m[0], tries = st.tries + 1;
  if (n === st.secret) return { text: x.gsWin(tries), tone: "yes", laugh: true };
  brain.awaiting = { ...st, tries };
  return { text: n < st.secret ? x.gsHigher : x.gsLower, tone: "yes" };
};

// Math quiz (5 questions)
function mathQuestion() {
  const op = ri(3);
  if (op === 0) { const a = 2 + ri(49), b = 2 + ri(49); return { a, b, op, ans: a + b }; }
  if (op === 1) { const a = 10 + ri(51), b = 2 + ri(a - 2); return { a, b, op, ans: a - b }; }
  const a = 2 + ri(11), b = 2 + ri(11); return { a, b, op, ans: a * b };
}
const askMath = (n, q, x) => x.mqQ(n, q.a, x.mqOps[q.op], q.b);
const mathQuiz = {
  id: "mathquiz", test: { en: /\bmath (?:quiz|test|game|practice|problems?)\b|\bquiz me on math\b/, hi: /गणित क्विज़|गणित का क्विज़|गणित क्विज|गणित का खेल/, es: /quiz de matem[aá]ticas|prueba de matem[aá]ticas|juego de matem[aá]ticas/ },
  run(t, lang, ctx) {
    const q = mathQuestion(); ctx.awaiting = { id: "mathquiz", n: 1, score: 0, q };
    return { text: `${X[lang].mqStart} ${askMath(1, q, X[lang])}`, tone: "yes" };
  },
};
AWAIT.mathquiz = (t, lang, st) => {
  const x = X[lang], m = t.match(/-?\d+/);
  if (!m) { brain.awaiting = st; return { text: x.mqAsk, tone: "yes" }; }
  const right = +m[0] === st.q.ans, score = st.score + (right ? 1 : 0), verdict = right ? x.mqRight : x.mqWrong(st.q.ans);
  if (st.n >= 5) return { text: `${verdict} ${x.mqEnd(score)}`, tone: "yes", laugh: score >= 4 };
  const q = mathQuestion(); brain.awaiting = { id: "mathquiz", n: st.n + 1, score, q };
  return { text: `${verdict} ${askMath(st.n + 1, q, x)}`, tone: right ? "yes" : "no" };
};

// Tongue twisters
const twister = {
  id: "twister", test: { en: /\btongue twisters?\b/, hi: /टंग ट्विस्टर|जीभ मरोड़|ज़ुबान तोड़|जुबान तोड़/, es: /trabalenguas/ },
  run: (t, lang) => ({ text: pick(X[lang].twisters), tone: "yes" }),
};

// Word of the day (Wiktionary, via /api/wotd), defined with the same lookup as "define"
const wotd = {
  id: "wotd", test: { en: /\bword of the day\b/, hi: /आज का शब्द/, es: /palabra del d[ií]a/ },
  async run(t, lang) {
    const x = X[lang], wl = "en"; // only the English Wiktionary publishes a word of the day
    try {
      const w = (await getJSON("/api/wotd")).word;
      if (!w) throw new Error("no word");
      const j = await getJSON(`https://${wl}.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(w)}?origin=*`);
      const e = (j[wl] || Object.values(j)[0] || [])[0], d = e && e.definitions && e.definitions[0] && stripHtml(e.definitions[0].definition);
      const body = d ? x.defOut(w, (e.partOfSpeech || "").toLowerCase(), firstSentences(d, 2)) : w;
      const text = `${x.wotdIntro} ${body}`;
      return lang !== "en" ? { text, tone: "yes", segments: [{ text: x.wotdIntro, lang }, { text: body, lang: "en" }] } : { text, tone: "yes" };
    } catch { return { text: x.wotdFail, tone: "no" }; }
  },
};

// Flashcards (saved in your memory, so they follow your account once signed in)
const FC = {
  add: { en: /flash ?cards? (.+?) (?:means|is|equals|as) (.+)/, hi: /(?:फ्लैशकार्ड|फ्लैश कार्ड)(?: जोड़ो)? (.+?) (?:का मतलब|मतलब) (.+)/, es: /(?:tarjeta|tarjetas de estudio) (.+?) (?:significa|es|quiere decir) (.+)/ },
  quiz: { en: /\b(?:quiz|test) me\b|\bpractice (?:my )?(?:flash ?cards|vocabulary)\b/, hi: /मुझसे पूछो|मेरी परीक्षा|क्विज़ करो/, es: /pregúntame|preguntame|ponme a prueba|practica/ },
  clear: { en: /\b(?:clear|delete|erase) (?:all )?(?:my )?flash ?cards\b/, hi: /फ्लैशकार्ड (?:मिटाओ|हटाओ|साफ़)/, es: /(?:borra|elimina) (?:todas )?mis tarjetas/ },
};
const flashcards = {
  id: "flashcards",
  test: { en: /\bflash ?cards?\b|\b(?:vocabulary|vocab) (?:quiz|cards?)\b/, hi: /फ्लैशकार्ड|फ्लैश कार्ड/, es: /tarjetas de estudio|mis tarjetas|\btarjeta\b/ },
  run(t, lang, ctx) {
    const x = X[lang], m = memory(), cards = m.cards || [];
    if (FC.clear[lang].test(t)) { m.cards = []; saveMemory(m); return { text: x.fcCleared, tone: "yes" }; }
    const add = t.match(FC.add[lang]);
    if (add) { m.cards = [...cards, { f: add[1].trim(), b: add[2].trim() }]; saveMemory(m); return { text: x.fcAdded(add[1].trim(), add[2].trim()), tone: "yes" }; }
    if (!cards.length) return { text: /add|जोड़ो|añade|agrega/.test(t) ? x.fcNeed : x.fcNone, tone: /add|जोड़ो|añade|agrega/.test(t) ? "yes" : "no" };
    if (FC.quiz[lang].test(t)) {
      const order = cards.map((c, i) => i).sort(() => Math.random() - 0.5).slice(0, 5);
      ctx.awaiting = { id: "cards", order, at: 0, score: 0 };
      return { text: x.fcAsk(1, cards[order[0]].f), tone: "yes" };
    }
    return { text: x.fcList(cards.length, cards.slice(0, 5).map(c => x.fcItem(c.f, c.b)).join("; ")), tone: "yes" };
  },
};
AWAIT.cards = (t, lang, st) => {
  const x = X[lang], cards = memory().cards || [], card = cards[st.order[st.at]];
  if (!card) return { text: x.fcNone, tone: "no" };
  const right = stripAccents(t).includes(stripAccents(card.b.toLowerCase())) || stripAccents(card.b.toLowerCase()).includes(stripAccents(t));
  const score = st.score + (right ? 1 : 0), verdict = right ? x.fcRight : x.fcWrong(card.b);
  if (st.at + 1 >= st.order.length) return { text: `${verdict} ${x.fcEnd(score, st.order.length)}`, tone: "yes" };
  const nextCard = cards[st.order[st.at + 1]];
  brain.awaiting = { ...st, at: st.at + 1, score };
  return { text: `${verdict} ${x.fcAsk(st.at + 2, nextCard.f)}`, tone: right ? "yes" : "no" };
};

// ---------- Help ----------
const help = {
  id: "help",
  test: { en: /what can you do|what do you do|your abilities|what are you able|^help$/, hi: /तुम क्या कर सकते|आप क्या कर सकते|क्या-क्या कर सकते|मदद/, es: /qué puedes hacer|que puedes hacer|qué sabes hacer|ayuda/ },
  run: (t, lang) => ({ text: X[lang].help(Object.values(T[lang].labels).join(", ")), tone: "yes" }),
};

// More ways to ask about the weather ("do I need an umbrella in Tokyo", "is it sunny in Madrid").
INTENTS.find(i => i.id === "weather").test.en = /\b(weather|forecast|temperature|rain|raining|umbrella|sunny|snowing|windy)/;

// "google" now opens a Google search tab instead of asking DuckDuckGo.
INTENTS.find(i => i.id === "search").test.en = /\b(search|look up|find out)\b/;

// New abilities go first so e.g. "remind me" wins over the plain timer and "translate" over "say".
INTENTS.unshift(hangman, rps, guessGame, mathQuiz, twister, wotd, flashcards, history, quake, iss, holidays, country, briefing, homecity, pomodoro, ambient, breathing, stop, again, followup, speed, switchLang, whoami, moon, stopwatch, countdown, remind, notes, todo, sun, translate, define, convert, help, fact, quote, riddle, trivia, pickNum, web, copy);

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
