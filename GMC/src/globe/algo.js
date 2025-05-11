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

}