const BASE_URL = 'http://localhost:8000';

export async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error('Network Error : code01');
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed loading users');
  }
}
export async function createUser(newUser) {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed creating user');
  }
}
