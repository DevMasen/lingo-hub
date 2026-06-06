const API_URL = import.meta.env.VITE_API_URL;
export async function getRooms() {
  try {
    const res = await fetch(`${API_URL}/rooms`);
    if (!res.ok) throw new Error('Failed to fetch rooms!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
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
    if (!res.ok) throw new Error('Failed to update rooms!');
  } catch (err) {
    console.error(err.message);
  }
}
