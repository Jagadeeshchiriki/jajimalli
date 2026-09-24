export function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}
export function PetalIcon() {
  return <svg className="petal-icon" viewBox="0 0 28 28" aria-hidden="true"><path d="M14 14C7 13 4 9 5 4c5-1 9 2 9 10Zm0 0c7-1 10-5 9-10-5-1-9 2-9 10Zm0 0c-1 7-5 10-10 9-1-5 2-9 10-9Zm0 0c1 7 5 10 10 9 1-5-2-9-10-9Z" /></svg>;
}
export function SparkIcon() {
  return <svg className="spark-icon" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2c1 11 7 17 18 18-11 1-17 7-18 18-1-11-7-17-18-18 11-1 17-7 18-18Z" /></svg>;
}
export function FloralMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 420 560" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M208 545c-5-134 13-254 3-371M210 307c-40-54-84-77-125-94M211 367c56-49 99-80 137-122M211 253c38-47 48-93 53-135M173 273c-18-48-15-91-3-129" strokeWidth="3" />
        <path d="M84 213c17-23 46-24 64-8-13 24-40 33-64 8ZM347 244c-27-5-47 13-51 37 25 9 49-3 51-37ZM264 118c-18 13-25 35-18 55 22-4 34-26 18-55ZM170 144c-22 12-29 37-20 57 23-6 35-30 20-57Z" fill="currentColor" strokeWidth="2" />
        <Flower transform="translate(204 122)" />
        <Flower transform="translate(92 190) scale(.72)" />
        <Flower transform="translate(350 223) scale(.82)" />
      </g>
    </svg>
  );
}
function Flower({ transform }) {
  return <g transform={transform}><path d="M0 42C-48 38-64 10-45-18-16-18-3 1 0 42Z" fill="currentColor" /><path d="M0 42C48 38 64 10 45-18 16-18 3 1 0 42Z" fill="currentColor" /><path d="M0 42C-34 6-26-26 5-34 26-14 20 14 0 42Z" fill="currentColor" /><path d="M0 42C34 6 26-26-5-34-26-14-20 14 0 42Z" fill="currentColor" /><circle cy="35" r="13" fill="var(--cream)" /></g>;
}
