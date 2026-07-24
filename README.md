# 🛡️ ClarityGuard

### "We built the someone who explains the fine print."

**ClarityGuard** is a tool that breaks down contracts, leases, and suspicious messages in plain English — exposing manipulation tricks, verifying real-world entities, and telling you exactly what to do next.

---

## ✨ Features

- **🔍 Manipulation X-ray** — Names the exact rhetorical/legal trick being used (from a fixed taxonomy), not just "risky"
- **🌐 Real-World Entity Check** — Live web search verifies whether the sender/company is a known scam or a real, registered entity
- **⚖️ Fair-Baseline Comparator** — Side-by-side comparison of unfair clauses vs. standard market versions
- **🎯 Action Layer** — Auto-drafted pushback messages for contracts, scam report drafts for fraudulent messages
- **🧠 Personal Blind-Spot Memory** — Tracks which manipulation types you keep falling for and warns you earlier next time

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Vite, Tailwind CSS, Framer Motion |
| **Backend** | Python, FastAPI, Pydantic |
| **Auth & Database** | Firebase Authentication, Firestore |
| **LLM** | Groq (LLaMA 3.3 70B) |
| **Search** | Tavily API |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
ClarityGuard/
├── frontend/          # React + Vite frontend
├── backend/           # Python + FastAPI backend
├── README.md
└── Project_Spec_ClarityGuard.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Firebase project with Auth + Firestore enabled
- API keys: Groq, Tavily

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📄 License

MIT License

---

> ⚠️ *ClarityGuard is not a substitute for legal or financial advice. For binding agreements, consult a licensed professional.*
