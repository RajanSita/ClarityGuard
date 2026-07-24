"""
ClarityGuard — FastAPI Application Entry Point

Sets up CORS, rate limiting, and routes.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from config import settings
from routes.scan import router as scan_router

# ─── App Setup ────────────────────────────────────────────────────────────────

app = FastAPI(
    title="ClarityGuard API",
    description="Analyze contracts and messages for manipulation tactics.",
    version="1.0.0",
)

# ─── Rate Limiting ────────────────────────────────────────────────────────────

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─── CORS ─────────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routes ───────────────────────────────────────────────────────────────────

app.include_router(scan_router)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "ok",
        "app": "ClarityGuard API",
        "version": "1.0.0",
    }


@app.get("/api/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "groq_configured": bool(settings.GROQ_API_KEY),
        "tavily_configured": bool(settings.TAVILY_API_KEY),
        "firebase_configured": bool(settings.FIREBASE_CREDENTIALS_JSON),
    }


# ─── Startup Event ────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup_event():
    """Validate configuration on startup."""
    settings.validate()
    print("[INIT] ClarityGuard API starting up...")
    print(f"       Environment: {settings.ENV}")
    print(f"       Groq API: {'OK' if settings.GROQ_API_KEY else 'MISSING'}")
    print(f"       Tavily API: {'OK' if settings.TAVILY_API_KEY else 'MISSING'}")
    print(f"       Firebase: {'OK' if settings.FIREBASE_CREDENTIALS_JSON else 'MISSING'}")
