const API_URL = import.meta.env.VITE_API_URL;

async function updateUser(userId, updatedUser, errorMessage = '') {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(errorMessage);
  } catch (err) {
    console.error(err.message);
  }
}

export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
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

    if (!res.ok) throw new Error('Failed to create user!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getUser(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function updateUserReserveHistory(id, newHistory) {
  updateUser(id, newHistory, 'Failed to update user history!');
}

export async function updateBalance(id, newBalance) {
  updateUser(id, newBalance, 'Failed to update user balance!');
}

export async function updateName(id, newNames) {
  updateUser(id, newNames, 'Failed to update user names!');
}
