const API_URL = 'http://localhost:8000';
export async function getRooms() {
  const res = await fetch(`${API_URL}/rooms`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Fetch Error: code06');

  const data = await res.json();
  return data;
}

export async function updateTimeLines(roomId, updatedRoom) {
  try {
    const res = await fetch(`${API_URL}/rooms/${roomId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedRoom),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw Error();
  } catch {
    throw Error('Failed updating room');
  }
}
