# Can-Do Robot

A free voice robot. Say its wake word, ask **"can you…?"**, and it answers yes or no out loud, then does it when you say "go ahead".

No API keys, no paid services.

## What it can do
Jokes, time and date, coin flip, dice, math, spelling, repeat after you, timers, **weather** (Open-Meteo), **Wikipedia** answers, **news headlines** (BBC / Google News RSS) and **web answers** (DuckDuckGo Instant Answer, falling back to Wikipedia). Anything else gets an honest "no".

## Settings (saved in your browser)
- **Wake word:** Computer, Cool Computer or Hey Robot. The robot's name follows it.
- **Language:** English, Hindi or Spanish (listening, speaking and answers).
- **Voice, speed and pitch.**
- **Custom abilities:** add your own "can you…?" answers, either something it can do (with a reply) or something it can't (with a reason).

## Using it
Open the site in **Chrome or Edge** (they have the speech recognition this needs), tap **Start listening**, allow the microphone, then say e.g. *"Computer, can you tell me a joke?"*. Tap the robot's head to talk without the wake word. You can also type.

Wake-word listening only works while the tab is open.

## Deploy on Vercel (free)
1. Import this repo at <https://vercel.com/new>. No build settings are needed.
2. Deploy. `index.html` is the site and `api/news.js` and `api/search.js` are serverless functions.

To run locally: `npx vercel dev`.

## Notes
- Web answers are short abstracts, not full search results.
- Hindi and Spanish wake words depend on how the browser transcribes them; common spellings are included in `WAKE` in `index.html`.
- Matching is keyword-based, so unusual phrasing may get "I'm not sure I can do that".
