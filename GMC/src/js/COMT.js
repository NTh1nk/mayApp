// calculate optimal meeting time
//import { getTimeZone } from "../public/js/tzDB.js";

import { loadChart } from "./loadChart.js";

//COMT - Calculate Optimal Meeting Time
export async function cOMT(people) {
    let flawTotal = Infinity;
    let bestTime = 0;
    const workStart = parseInt(localStorage.getItem('workStart')) || 480; // 08:00
    const workEnd = parseInt(localStorage.getItem('workEnd')) || 1200;   // 20:00

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
            //if workstart is undefined, set it to 9:00
            //const workstart = availability.workStart ?? 540; // 9:00 AM
            //const workStart = people[j].workStart ?? 540;
            //if workend is undefined, set it to 21:00
            //const workEnd = availability.workEnd ?? 1260;
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
    console.log("updated chart");
    return bestTime;
}







//Dont actually need UTCTime?
function getLocalTime(dateUTC, timeZone) {
    // Fallback to UTC if timeZone is invalid or missing
    if (!timeZone || typeof timeZone !== "string" || timeZone.trim() === "") {
        // Optionally log a warning
        console.warn("Invalid or missing timeZone, defaulting to UTC:", timeZone);
        return dateUTC.getUTCHours() * 60 + dateUTC.getUTCMinutes();
    }
    try {
        const localStr = dateUTC.toLocaleTimeString("en-US", {hour12: false, timeZone});
        const [hour, minute] = localStr.split(":").map(Number);
        return hour * 60 + minute;
    } catch (e) {
        console.warn("Invalid timeZone, defaulting to UTC:", timeZone, e);
        return dateUTC.getUTCHours() * 60 + dateUTC.getUTCMinutes();
    }
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


