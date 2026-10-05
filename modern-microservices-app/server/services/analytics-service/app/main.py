from fastapi import FastAPI

app = FastAPI(title="Analytics Service")

@app.get("/health")
def health():
    return {"service": "analytics-service", "status": "ok"}

@app.get("/stats")
def stats():
    return {"users": 0, "events": 0, "message": "Analytics service is ready"}
