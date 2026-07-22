from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt, JWTError

import os
from dotenv import load_dotenv

# CryptContext manages the hashing algorithm for us — bcrypt is the industry
# standard for password hashing (slow by design, which makes brute-forcing hard).
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In a real production app, this comes from an environment variable, never
# hardcoded. We'll move this to .env shortly — for now, understand what it's for:
# it's the secret key used to sign tokens, so only OUR server can create
# valid tokens, and we can detect if someone tampers with one.
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Compares a plain-text password attempt against the stored hash.
    # Passlib handles the comparison securely (constant-time, avoids timing attacks).
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    # jwt.encode signs the data with our SECRET_KEY, producing a token string
    # that looks like "eyJhbGciOi...". Anyone can read what's inside it
    # (JWTs aren't encrypted, just signed) — so never put passwords inside.
    # But nobody can FORGE one without knowing SECRET_KEY.
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None