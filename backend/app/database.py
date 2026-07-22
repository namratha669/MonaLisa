from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# The database URL tells SQLAlchemy what kind of database and where.
# sqlite:/// means "local file", followed by the file path.
# This file will be created automatically the first time we run the app.
SQLALCHEMY_DATABASE_URL = "sqlite:///./monalisa.db"

# The engine is the actual connection point to the database.
# connect_args is SQLite-specific: by default SQLite only allows one thread
# to talk to it at a time, but FastAPI can handle multiple requests concurrently.
# This setting relaxes that restriction safely for our use case.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal is a factory for creating database sessions.
# Every request will call SessionLocal() to get its own session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is the parent class every table model will inherit from.
# SQLAlchemy scans subclasses of Base to know what tables to create.
Base = declarative_base()


# This function provides a database session to any route that needs one.
# It's a "dependency" — FastAPI will call this automatically per-request.
def get_db():
    db = SessionLocal()
    try:
        yield db      # hand the session to the route
    finally:
        db.close()    # always close it afterward, even if an error occurred