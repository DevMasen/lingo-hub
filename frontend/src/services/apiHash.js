const API_URL = import.meta.env.VITE_API_URL;

export async function hash(id) {
  try {
    const res = await fetch(`${API_URL}/hash/${id}`);
    if (!res.ok) throw new Error('Failed to fetch hash!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function createHash(hashData) {
  try {
    const res = await fetch(`${API_URL}/hash`, {
      method: 'POST',
      body: JSON.stringify(hashData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to create hash!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
