export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the... tapping game</h1>
      <button
        onClick={(event) => {
          event.target.innerHTML = "tap :o";
        }}
      >
        ?
      </button>
    </div>
  );
}
