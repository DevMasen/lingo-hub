export default function mapTime(timePart = 0) {
  const timeMap = new Map()
    .set(0, { startTime: '7:00', stopTime: '8:30' })
    .set(1, { startTime: '8:30', stopTime: '10:00' })
    .set(2, { startTime: '10:00', stopTime: '11:30' })
    .set(3, { startTime: '11:30', stopTime: '13:00' })
    .set(4, { startTime: '13:00', stopTime: '14:30' })
    .set(5, { startTime: '14:30', stopTime: '16:00' })
    .set(6, { startTime: '16:00', stopTime: '17:30' })
    .set(7, { startTime: '17:30', stopTime: '19:00' })
    .set(8, { startTime: '19:00', stopTime: '20:30' })
    .set(9, { startTime: '20:30', stopTime: '22:00' });
  return timeMap.get(timePart);
}
