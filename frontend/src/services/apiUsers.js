const API_URL = 'http://localhost:8000';

async function updateUser(userId, updatedUser, errorMessage = '') {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw Error();
  } catch {
    throw Error(errorMessage);
  }
}

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

export async function updateUserReserveHistory(id, newHistory) {
  updateUser(id, newHistory, 'Failed updating user history!');
}

export async function updateBalace(id, newBalance) {
  updateUser(id, newBalance, 'Failed updating user balance!');
}

export async function updateName(id, newNames) {
  updateUser(id, newNames, 'Failed updating user names!');
}
