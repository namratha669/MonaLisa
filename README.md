# 🎨 MonaLisa

**Monopoly List Assistant** — the sponsorship brain your college fest never had.

---

## The problem that started it all

I was the Head of Sponsorship for my college fest. On paper, that sounds glamorous. In practice, it meant 40-50 of us fanning out across the city, cold-calling and cold-visiting companies, armed with nothing but WhatsApp groups and a shared Excel sheet that three different people were editing at once.

Here's what actually happened, more than once:

- Two team members would independently spend a week chasing the same bakery, neither knowing the other was already three calls deep.
- We'd sign Domino's for pizza *and* Pizza Hut for pizza, because nobody had visibility into who was already selling what.
- Someone would confirm a sponsor at ₹10,000 without knowing a teammate had a ₹15,000 offer sitting in their inbox from a competing company for the *same item category*.
- Follow-ups vanished into the void of forwarded chat screenshots.
- Meeting the treasurer to explain "why do we have 4 pizza stalls and 0 dessert stalls" was, uh, a conversation.

We needed something that behaved like **Excel + Notion + a KPI dashboard** had a very organized baby. Something that felt as familiar as a spreadsheet (because that's the muscle memory every team member already has), but that quietly did the conflict math nobody had time to do by hand.

So I built it. MonaLisa is that system.

---

## What it actually does

🧾 **The Spreadsheet, but smarter** — Every company lives as a row: person in charge, offer amount, status, comments — inline-editable like a real spreadsheet, no "click into a form" friction.

🍕 **Live monopoly conflict detection** — Add "Pizza" under Domino's, then add "Pizza" under Pizza Hut, and both pills light up red *instantly*. Hover over one and a little card pops up (yes, very intentionally Wikipedia-hover-card-coded) showing exactly who else is selling it and for how much — before you even leave the row.

⚖️ **The Conflicts page** — The full showdown view. Every contested item, every company in the ring, their offers side by side, a recommendation on who should get exclusivity, and the ₹ difference that makes the decision easy.

📅 **Meetings, tracked** — No more "wait, did we already meet them?" scattered across five phones.

📊 **Analytics that actually mean something** — Total sponsorship value, confirmed vs. pending, status distribution — the numbers you need in the treasury meeting, rendered instead of recited from memory.

🔐 **Real auth, real roles** — JWT-based login, because "who edited this row and deleted my ₹80k offer" should have an actual answer.

---

## The stack

Built to be genuinely production-shaped, not hackathon-glued-together:

**Backend**
- FastAPI (Python) — chosen for the free auto-generated Swagger docs and how naturally it maps to clean, testable business logic
- SQLAlchemy ORM over SQLite (Postgres-migration-ready by design)
- JWT auth with bcrypt password hashing, role-based access control (Admin / Team Lead / Member)
- Conflict detection is pure SQL — `GROUP BY` + `HAVING COUNT(*) > 1`. No AI, no fuzzy matching gimmicks. Just a database doing what databases are good at.

**Frontend**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (theme tokens via `@theme`, not a JS config)
- Recharts for analytics visualizations
- A dark, glassmorphic, gradient-accented design system inspired by Linear, Notion, and Stripe's dashboard — built explicitly to *not* look like a student CRUD project

**Deployment**
- Backend → Azure App Service (Azure for Students)
- Frontend → Vercel

---

## Architecture, roughly

```
┌─────────────────┐         REST / JSON          ┌──────────────────┐
│   Next.js App    │ ────────────────────────────▶ │   FastAPI Server  │
│  (Vercel)        │ ◀──────────────────────────── │   (Azure)          │
│                   │         JWT in headers         │                    │
└─────────────────┘                                 └─────────┬──────────┘
                                                                 │
                                                        SQLAlchemy ORM
                                                                 │
                                                       ┌─────────▼──────────┐
                                                       │   SQLite / Postgres │
                                                       └─────────────────────┘
```

Companies → Items (one-to-many) is the relationship that makes conflict detection possible: items live in their own table instead of a comma-separated string field, so "who else sells Pizza" is a single indexed query instead of fragile string matching.

---

## Running it locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

# create backend/.env with:
# SECRET_KEY=<generate with: python -c "import secrets; print(secrets.token_hex(32))">

uvicorn app.main:app --reload
```

Visit `http://127.0.0.1:8000/docs` for the interactive API explorer.

### Frontend

```bash
cd frontend
npm install

# create frontend/.env.local with:
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

npm run dev
```

Visit `http://localhost:3000`.

---

## Deploying it yourself

### Backend → Azure App Service

1. Sign up for [Azure for Students](https://azure.microsoft.com/en-us/free/students) with your college email — no credit card required.
2. Create a **Web App** resource: Runtime stack → Python 3.x, Region → closest to you, Pricing plan → **F1 (Free)**.
3. Set your `SECRET_KEY` as an Application Setting (Environment Variable) in the Azure portal — never commit it to the repo.
4. Deploy via GitHub Actions (Azure auto-generates a workflow when you connect your repo under Deployment Center) or the Azure CLI:
   ```bash
   az webapp up --name <your-app-name> --resource-group <your-rg> --runtime "PYTHON:3.11"
   ```
5. Add a CORS rule in `main.py` allowing your Vercel frontend's domain.

### Frontend → Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Set the root directory to `frontend/`.
3. Add environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed Azure backend URL.
4. Deploy. Vercel handles the build pipeline automatically on every push to `main`.

---

## Why this exists

Every fest team reinvents this wheel badly, every single year, with a spreadsheet that gets more chaotic with every added row. MonaLisa is my attempt at building the tool I wish existed when I was the one fielding "wait, didn't someone already contact them?" messages at 1 AM before a sponsorship deadline.

If you're running a fest team and this is useful to you — genuinely, take it, fork it, break it, make it yours.

---

*Built with a lot of coffee, one very opinionated dark theme, and zero patience for duplicate pizza sponsors.*
