const API_URL = 'http://localhost:8000';

export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error('Fetch Error : code01');
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed loading users');
  }
}

export async function createUser(newUser) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Fetch Error: code02');
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed creating user');
  }
}

export async function getUser(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw Error('Fetch Error: code09');
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed getting user');
  }
}

export async function updateUserReserveHistory(id, updatedUser) {
  try {
    const res = await fetch(`${API_URL}/users/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw Error();
  } catch {
    throw Error('Failed creating your order');
  }
}
