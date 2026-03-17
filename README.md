# 1v1 Codeforces Battle

> ⚔️ Turn competitive programming into a duel — two coders, same problems, one scoreboard.

![demo](assets/demo.gif)

**Live demo:** [https://errorbattle.vercel.app/](https://errorbattle.vercel.app/)
**Repo:** [https://github.com/Ishan-cod/1v1cfbattle](https://github.com/Ishan-cod/1v1cfbattle)

---

## What is this?

A tiny MVP web app that pairs two coders into a head-to-head match using Codeforces problems. Both players receive the same problem set, a countdown timer runs, and a live scoreboard (powered by simple HTTP polling in v1) shows who solved what first.

This project is built as a fast-to-ship prototype so I could validate the idea and get real users testing the core flow.

---

## Highlights

* 1v1 match lobby (create / join by room code)
* Same problem set for both players
* Countdown timer for each match
* Live scoreboard and per-problem solve status
* Automatic submission tracking (via Codeforces public API / polling)

---

## Tech stack

* **Frontend:** Next - client UI, lobby, scoreboard
* **Backend:** NextJS — match lifecycle, problem selection
* **Database:** MongoDB (for rooms, match history, users)
* **Realtime (v1):** HTTP polling (simple, reliable)
* **Future:** Socket.io / WebSockets for true realtime

---

## How it works (high level)

1. A player creates a room or joins an existing one with a room code.
2. When two players are present, the server picks a set of Codeforces problems (based on rating/tags or a random pack).
3. The match starts: a countdown timer begins and both players see identical problems.
4. Players submit solutions using their Codeforces account — the server polls the Codeforces API for each player's submissions and updates the scoreboard.
5. The match ends when time expires or all problems are solved; the server calculates scores/winner and stores match stats.

---

## Why HTTP polling for v1?

* Fast to implement and easy to reason about while building the MVP.
* Keeps hosting simple (no sticky sessions or socket support needed).
* Good enough to validate the core idea.

Tradeoff: more requests and higher latency vs. better UX. Plan is to migrate to WebSockets (Socket.io) for v2.

---

## Roadmap (v2+)

* ✅ MVP: Lobby, same problems, polling-based scoreboard
* 🔜 Replace polling with Socket.io WebSockets for low-latency updates
* 🔜 Add authentication + profile pages and ELO-like rating
* 🔜 Spectator mode + match replay
* 🔜 Tournaments (round-robin / bracket)
* 🔜 Deployment automation + prettier OG images for link previews



## Contact / Want to duel?

* Live demo: [https://errorbattle.vercel.app/](https://errorbattle.vercel.app/)
* Repo: [https://github.com/Ishan-cod/1v1cfbattle](https://github.com/Ishan-cod/1v1cfbattle)

Drop a comment or open an issue titled **"1v1 challenge"** — I’ll hop in for a match. ⚔️

---

*Made with ❤️ — MVP-first, iterate fast, ship often.*
