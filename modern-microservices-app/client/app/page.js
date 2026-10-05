const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <span className="badge">MICROSERVICES PLATFORM</span>
        <h1>Modern Application</h1>
        <p>Next.js client with Node.js microservices, FastAPI, PostgreSQL, MongoDB and Redis.</p>
        <div className="grid">
          {[
            ["API Gateway", "Node.js", "/api/health"],
            ["Users", "PostgreSQL", "/api/users"],
            ["Content", "MongoDB", "/api/content"],
            ["Analytics", "FastAPI", "/api/analytics/health"]
          ].map(([title, db, path]) => (
            <article className="card" key={title}>
              <h2>{title}</h2>
              <p>{db}</p>
              <code>{API}{path}</code>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
