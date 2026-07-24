"""
ClarityGuard Backend Configuration
Loads all environment variables with validation.
"""

import os
import json
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""

    def __init__(self):
        self.ENV = os.getenv("ENV", "development")

        # API Keys
        self.GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
        self.TAVILY_API_KEY = os.getenv("TAVILY_API_KEY", "")

        # Firebase
        self.FIREBASE_CREDENTIALS_JSON = os.getenv("FIREBASE_CREDENTIALS_JSON", "")

        # CORS
        self.FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

        # Rate Limiting
        self.RATE_LIMIT = os.getenv("RATE_LIMIT", "10/hour")

        # Input Constraints
        self.MAX_INPUT_LENGTH = 8000

        # Groq Model
        self.GROQ_MODEL = "llama-3.3-70b-versatile"
        self.GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

        # Tavily
        self.TAVILY_API_URL = "https://api.tavily.com/search"

    def validate(self):
        """Check that critical keys are set. Warns in dev, raises in production."""
        missing = []
        if not self.GROQ_API_KEY:
            missing.append("GROQ_API_KEY")
        if not self.TAVILY_API_KEY:
            missing.append("TAVILY_API_KEY")

        if missing:
            msg = f"Missing environment variables: {', '.join(missing)}"
            if self.ENV == "production":
                raise EnvironmentError(msg)
            else:
                print(f"[WARNING] {msg} - some features will not work.")

    def get_firebase_credentials(self) -> dict | None:
        """Parse Firebase credentials from JSON string."""
        if not self.FIREBASE_CREDENTIALS_JSON:
            return None
        try:
            return json.loads(self.FIREBASE_CREDENTIALS_JSON)
        except json.JSONDecodeError:
            # Might be a file path instead
            if os.path.exists(self.FIREBASE_CREDENTIALS_JSON):
                with open(self.FIREBASE_CREDENTIALS_JSON, "r") as f:
                    return json.load(f)
            return None


settings = Settings()
