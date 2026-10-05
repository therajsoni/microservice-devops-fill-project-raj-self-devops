# Modern Microservices App

Stack:
- Client: Next.js
- API Gateway: Node.js + Express
- Auth Service: Node.js
- User Service: Node.js + PostgreSQL
- Content Service: Node.js + MongoDB
- Notification Service: Node.js
- Analytics/Fraud Service: FastAPI
- Redis: caching / session / rate-limit support
- Docker Compose: local development

## Run

```bash
docker compose up --build
```

Client: http://localhost:3000
API Gateway: http://localhost:4000
FastAPI service: http://localhost:8000/docs

The Node.js backend is split into independent services.
