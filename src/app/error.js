'use client';
export default function Error(params) {
  return (
    <div className="container">
      <h2>Sometings went wrong !</h2>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
