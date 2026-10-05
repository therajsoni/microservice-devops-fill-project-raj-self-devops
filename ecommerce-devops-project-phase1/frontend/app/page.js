export default async function Home() {
  let products = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products`,
      { cache: "no-store" }
    );
    if (res.ok) products = await res.json();
  } catch {}

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>DevOps E-Commerce Platform</h1>
      <p>Next.js + Node.js + Docker + Kubernetes project</p>

      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>{p.name} - ₹{p.price}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
