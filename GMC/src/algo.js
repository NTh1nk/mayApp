//Import Input
import { processInput } from './processInput.js';


const people = [
    //example
    {timeZone: 'Europe/Copenhagen', weight: 2, workStart: 8 * 60, workEnd: 16 * 60} 
]


function getLocalTime(UTCTime, timeZone)
{
    const today = new Date(); //today
    //get todays time in utc
    const UTCDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, UTCTime));
    const localStr = UTCDate.toLocaleTimeString("en-US", {hour12: false, timeZone});

    const [hour, minute] = localStr.split(":").map(Number);
    console.log(hour,minute);
    return hour * 60 + minute;
}


function inaccuracy(localMin, startMin, endMin) {
    if(localMin >= startMin && localMin <= endMin)   return 0;

    return localMin < startMin



}
