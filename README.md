# Can-Do Robot

A free voice robot. Say its wake word, ask **"can you…?"**, and it answers yes or no out loud, then does it when you say "go ahead".

No API keys, no paid services.

## What it can do
- **Basics:** jokes (and it laughs), time and date, coin flip, dice, math, spelling, repeat after you, timers.
- **Lookups:** weather (Open-Meteo), Wikipedia answers, news headlines (BBC / Google News RSS), web answers (DuckDuckGo, falling back to Wikipedia).
- **Convert and translate:** units (length, weight, volume, temperature, speed, time), currencies (frankfurter.dev), translation into ~17 languages (MyMemory), word definitions (Wiktionary).
- **Notes and reminders:** "remember that…", a to-do list ("add milk to my list"), timed reminders. Notes and lists are saved in your browser.
- **Fun:** random facts, quotes, riddles, a trivia quiz, "pick a number".
- **Clocks:** stopwatch, days until a date or holiday, time in another city, sunrise and sunset.
- **Control:** open websites, search Google or YouTube, copy text to the clipboard.
- **Chat about anything:** optional, needs a free Gemini key (see below).

Ask "what can you do?" for the list, or "can you…?" about anything. Unknown questions get an honest "no" unless chat is on.

## Settings (saved in your browser)
- **Wake word:** Computer, Cool Computer or Hey Robot. The robot's name follows it.
- **Language:** English, Hindi or Spanish (listening, speaking and answers).
- **Always listening:** on by default. It starts listening as soon as the page opens (the browser may ask for the microphone once, or need one click).
- **Voice, speed and pitch.**
- **Custom abilities:** add your own "can you…?" answers, either something it can do (with a reply) or something it can't (with a reason).

## Using it
Open the site in **Chrome or Edge** (they have the speech recognition this needs), tap **Start listening**, allow the microphone, then say e.g. *"Computer, can you tell me a joke?"*. Tap the robot's head to talk without the wake word. You can also type.

Wake-word listening only works while the tab is open.

## Deploy on Vercel (free)
1. Import this repo at <https://vercel.com/new>. No build settings are needed.
2. Deploy. `index.html` is the site and `api/news.js` and `api/search.js` are serverless functions.

### Optional: chat about anything (free)
1. Create a free key in [Google AI Studio](https://aistudio.google.com/apikey).
2. In Vercel, add the environment variable `GEMINI_API_KEY`, then redeploy. Optionally set `GEMINI_MODEL` (default `gemini-flash-latest`).

The key stays on the server in `api/chat.js`. Without it the robot works as before, just without open-ended chat. Google's free tier has rate limits, and prompts on the free tier may be used by Google to improve its products, so don't say anything private. Anyone with your site's link can use your free quota.

To run locally: `npx vercel dev` (put `GEMINI_API_KEY` in a `.env.local` file).

## Notes
- Web answers are short abstracts, not full search results.
- Opening a website from voice can be blocked by the browser's popup blocker; the reply then shows an "Open" link to tap.
- Translation, trivia and facts come from free public services, so they can be slow or occasionally unavailable. Trivia questions are English only.
- Hindi and Spanish wake words depend on how the browser transcribes them; common spellings are included in `WAKE` in `index.html`.
- Matching is keyword-based, so unusual phrasing may get "I'm not sure I can do that".
