const people = [
    { timeZone: 'America/New_York', weight: 1, workStart: 8 * 60, workEnd: 16 * 60 },
    { timeZone: 'Europe/London', weight: 2, workStart: 8 * 60, workEnd: 16 * 60 },
    { timeZone: 'Asia/Tokyo', weight: 1.5, workStart: 8 * 60, workEnd: 16 * 60 },
  ];
  
  function getLocalMinutes(utcMinutes, timeZone) {
    const utcDate = new Date(Date.UTC(2024, 0, 1, 0, utcMinutes)); // Jan 1, 2024
    const localStr = utcDate.toLocaleTimeString('en-US', { hour12: false, timeZone });
    const [hour, minute] = localStr.split(':').map(Number);
    return hour * 60 + minute;
  }
  
  function inaccuracy(localMin, startMin, endMin) {
    if (localMin >= startMin && localMin <= endMin) return 0;
    return localMin < startMin
      ? startMin - localMin
      : localMin - endMin;
  }
  
  function evaluateFlaw(utcMinutes) {
    let totalFlaw = 0;
    for (const { timeZone, weight, workStart, workEnd } of people) {
      const localMin = getLocalMinutes(utcMinutes, timeZone);
      const i = inaccuracy(localMin, workStart, workEnd);
      totalFlaw += (i ** 2) * weight;
    }
    return totalFlaw;
  }
  
  // Try all 288 five-minute intervals in a day
  let bestFlaw = Infinity;
  let bestMinute = 0;
  
  for (let t = 0; t < 1440; t += 5) {
    const flaw = evaluateFlaw(t);
    if (flaw < bestFlaw) {
      bestFlaw = flaw;
      bestMinute = t;
    }
  }
  
  const bestHour = Math.floor(bestMinute / 60);
  const bestMin = bestMinute % 60;
  console.log(`Best UTC time: ${String(bestHour).padStart(2, '0')}:${String(bestMin).padStart(2, '0')}, Flaw Score: ${bestFlaw.toFixed(2)}`);
  