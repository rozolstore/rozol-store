
export default function Home() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <iframe
        src="/eishq/index.html"
        title="EISHQ Perfumes"
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          border: "none",
        }}
      />
    </main>
  );
}