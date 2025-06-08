// calculate optimal meeting time
//import { getTimeZone } from "../public/js/tzDB.js";

import { loadChart } from "./loadChart.js";

//COMT - Calculate Optimal Meeting Time
export async function cOMT(people) {
    let flawTotal = Infinity;
    let bestTime = 0;

    for (let i = 0; i < 24 * 60; i += 5) {
        // Create a UTC Date object at midnight plus i minutes
        const today = new Date();
        const dateUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, i));
        let flaw = 0;
        for (let j = 0; j < people.length; j++) {
            //fixed now
            //could prob remove the async, but i think it works for now
            const timeZone = people[j].timezone;
            //console.log("Time zone:", timeZone);
            const localMin = getLocalTime(dateUTC, timeZone);
            //if workstart is undefined, set it to 8:00
            const workStart = people[j].workStart ?? 480;
            //if workend is undefined, set it to 20:00
            const workEnd = people[j].workEnd ?? 1200;
            let localFlaw = inaccuracy(localMin, workStart, workEnd) ** 2;
            flaw += localFlaw
           
            //console.log("Local flaw for person", j, "at time", i, ":", localFlaw);
        }
        if( i % 60 === 0) {
            localStorage.setItem(i/60 + "time",flaw/ (people.length + 1));
            console.log("Flaw for time div people", i/60, ":", flaw/ (people.length + 1));
            console.log("Flaw for time", i/60, ":", flaw);
        }   
        if (flaw < flawTotal) {
            flawTotal = flaw;
            bestTime = i;
        }
    }

    // Return the best time in minutes since midnight UTC

    //for some reason it returns 0 rn.
    console.log("Best time:", bestTime);
    console.log("Flaw total:", flawTotal);
    console.log("Best time in hours:", Math.floor(bestTime / 60), "minutes:", bestTime % 60);
    loadChart();
    return bestTime;
}







//Dont actually need UTCTime?
function getLocalTime(dateUTC, timeZone)
{
    // Format the UTC date to the local time in the specified time zone
    const localStr = dateUTC.toLocaleTimeString("en-US", {hour12: false, timeZone});
    const [hour, minute] = localStr.split(":").map(Number);
    return hour * 60 + minute;
}


function inaccuracy(localMin, startMin, endMin) {
    if(localMin >= startMin && localMin <= endMin)   return 0;


    //js magic to get the difference between the working hours and meeting time.
    return localMin < startMin
    ? startMin - localMin
    : localMin - endMin

}



/*
function evaluate(UTCTime, timeZone){
    

}
*/


