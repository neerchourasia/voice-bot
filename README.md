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

## Logins (optional, free with Supabase)
Sign in with **email and password**, an **emailed login link**, **Google** or **GitHub**. A signed-in user gets their **notes, to-do list, reminders and settings saved to their account** (so they follow them across devices), and the robot greets them by name ("Welcome, Priya!", "who am I?"). By default the robot is **locked until you sign in**.

Until you do the setup below, `config.js` is empty and the robot is open to everyone with no login, as before.

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor:** paste and run [`supabase/schema.sql`](supabase/schema.sql). It creates one row per user, locked down so people only see their own data.
3. **Project Settings > API:** copy the **Project URL** and the **anon public** key into [`config.js`](config.js). The anon key is meant to be public. Set `REQUIRE_LOGIN` to `false` if you want login to be optional.
4. **Authentication > URL Configuration:** set **Site URL** to your Vercel URL, and add it plus `http://localhost:5173` under **Redirect URLs**.
5. **Authentication > Providers:** email is on by default (turn off "Confirm email" if you don't want confirmation emails). To use Google or GitHub, enable them and paste in the client ID and secret from a Google Cloud OAuth client or a GitHub OAuth app. Their callback URL is `https://<your-project>.supabase.co/auth/v1/callback`, which Supabase shows you.
6. **Vercel environment variables:** add `SUPABASE_URL` and `SUPABASE_ANON_KEY` (the same two values). With them set, the chat endpoint only answers signed-in users, so strangers can't use up your free Gemini quota.

Notes on how it behaves:
- The login screen is English only, and the lock on the page is a convenience, not security: the free public services (weather, news, quotes) are still reachable by anyone who calls them directly. Only your data (protected by the database rules) and chat (checked on the server) are truly protected.
- Signing out clears that person's notes, to-dos and reminders from the browser. They stay in their account.
- Reminders ring only while a tab is open. One that came due while no tab was open is shown as "Missed while you were away" the next time it loads.
- Free Supabase projects pause after a week without activity, so the first login afterwards can be slow or fail until you resume the project.

## What it remembers about you
"My favorite color is blue", "my birthday is June 3", "my name is Priya", "I live in Pune", "mom's birthday is March 5", then "what's my favorite color", "when is my birthday", "what do you know about me", "forget my favorite color". Your name is used in greetings, your city in the morning briefing, and flashcards are saved here too. It lives in your browser and, once signed in, in your account (so it follows you across devices). Signing out clears it from the browser.

If you set up Supabase before this feature existed, run this once in the SQL Editor so memory can sync (everything else keeps working without it):

```sql
alter table public.user_data add column if not exists memory jsonb not null default '{}'::jsonb;
```

## Admins
Admins get a **🛡 Admin** button that lists every user with their sign-in method and last sign-in, and lets them **Block** (stops a person signing in, reversible) or **Delete** an account (permanent, removes their saved notes). Admins can't change themselves or each other.

Admin rights are decided on the server (`api/admin.js`), matched against the sign-in email, so editing the page in the browser can't grant them. Add these in Vercel under **Settings > Environment Variables**, then redeploy:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | `https://<your-project>.supabase.co` |
| `SUPABASE_ANON_KEY` | the public `sb_publishable_…` key |
| `ADMIN_EMAILS` | comma-separated admin emails, e.g. `me@gmail.com,other@gmail.com` |
| `SUPABASE_SERVICE_ROLE_KEY` | the **secret** key (Supabase > Project Settings > API Keys > Secret keys). Never put this in `config.js` or the repo. |

Because "Confirm email" is off, only list emails you control as admins: a new sign-up can't take over an email that already has an account, but an address nobody has registered yet could be claimed by anyone.

## Notes
- Web answers are short abstracts, not full search results.
- Opening a website from voice can be blocked by the browser's popup blocker; the reply then shows an "Open" link to tap.
- Translation, trivia and facts come from free public services, so they can be slow or occasionally unavailable. Trivia questions are English only.
- Hindi and Spanish wake words depend on how the browser transcribes them; common spellings are included in `WAKE` in `index.html`.
- Matching is keyword-based, so unusual phrasing may get "I'm not sure I can do that".
