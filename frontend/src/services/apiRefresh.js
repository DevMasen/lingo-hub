import persianDate from 'persian-date/dist/persian-date';

import { getDate } from './apiDate';
//---

const API_URL = import.meta.env.VITE_API_URL;

export async function refreshTableData() {
  const date = await getDate();
  const tomorrow = new persianDate(new Date().getTime() + 86400000)
    .format()
    .split(' ')
    .at(0)
    .split('-')
    .join('');

  if (date.reserveDate === tomorrow) return;
  const newDate = {
    reserveDate: tomorrow,
  };
  try {
    const res = await fetch(`${API_URL}/date`, {
      method: 'PATCH',
      body: JSON.stringify(newDate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to update date!');
  } catch (err) {
    console.error(err.message);
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
      if (!res.ok) throw new Error('Failed to update rooms!');
    } catch (err) {
      console.error(err.message);
    }
  }
}

export async function refreshOTP() {
  const digit1 = Math.floor(Math.random() * 10);
  const digit2 = Math.floor(Math.random() * 10);
  const digit3 = Math.floor(Math.random() * 10);
  const digit4 = Math.floor(Math.random() * 10);
  const generatedRandomCode = `${digit1}${digit2}${digit3}${digit4}`;
  const updatedCode = {
    code: generatedRandomCode,
  };
  try {
    const res = await fetch(`${API_URL}/otp`, {
      method: 'PATCH',
      body: JSON.stringify(updatedCode),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to update OTP code!');
  } catch (err) {
    console.error(err.message);
  }
}
