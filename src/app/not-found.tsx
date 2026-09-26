import { COPY } from "./copy";

export default function NotFound() {
  return (
    <div className="cloth">
      <div className="cloth-body">
        <header className="selvedge">
          <span className="selvedge-mark">{COPY.wordmark}</span>
        </header>

        <main>
          <h1 className="title">{COPY.notFoundTitle}</h1>
          <p className="prose" style={{ paddingBlock: 12 }}>
            {COPY.notFoundBody}
          </p>
        </main>
      </div>
    </div>
  );
}
