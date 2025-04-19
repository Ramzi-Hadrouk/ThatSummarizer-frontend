// utils/logout.ts
export default async function logout(): Promise<void> {
    await fetch('/api/logout', {
      method: 'POST',
    });
  }
  