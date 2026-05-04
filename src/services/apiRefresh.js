import persianDate from 'persian-date/dist/persian-date';
/////////////////////////////////////////////////////////
import { getDate } from './apiDate';
////////////////////////////////////
const API_URL = 'http://localhost:8000';

export async function refreshTableData() {
  const date = await getDate();
  const tommarrow = new persianDate(new Date().getTime() + 86400000)
    .format()
    .split(' ')
    .at(0)
    .split('-')
    .join('');

  if (date[0].reserveDate === tommarrow) return;
  const newDate = {
    reserveDate: tommarrow,
  };
  try {
    const res = await fetch(`${API_URL}/date/0`, {
      method: 'PATCH',
      body: JSON.stringify(newDate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error('Fetch Error: code04');
  } catch {
    throw Error('Failed Updating Date');
  }
  const initialRoomState = {
    timeLines: Array.from({ length: 10 }, () => null),
  };
  for (let i = 0; i < 5; i++) {
    try {
      const res = await fetch(`${API_URL}/rooms/${i}`, {
        method: 'PATCH',
        body: JSON.stringify(initialRoomState),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw Error('Fetch Error: code05');
    } catch {
      throw Error('Failed Reset Rooms');
    }
  }
}
