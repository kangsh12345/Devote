'use client';

type ErrorUIProps = {
  error: unknown;
  reset: () => void;
};

export default function ErrorUI({ error, reset }: ErrorUIProps) {
  console.log({ error, reset });

  return (
    <html>
      <body>
        <h2>{(error as Error).message}</h2>
        <button onClick={() => reset()}>새로고침</button>
      </body>
    </html>
  );
}
