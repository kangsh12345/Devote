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
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
