//Import Input
//import { processInput } from './processInput.js';


/*
List of stuff i need:
1. The timezone
2. Amount of people. AKA weight
3. working hours. 




*/

// define vars.

let flawTotal = 0;


const people = [
    //example

    //should prob make it so work start is just 8, and then dynamicly * 60, easier for the user. 
    //Would be more computationally expensive.
    {timeZone: 'Europe/Copenhagen', weight: 2, workStart: 8 * 60, workEnd: 16 * 60} 
]


function getLocalTime(UTCTime, timeZone)
{
    const today = new Date(); //today
    //get todays time in utc
    const UTCDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, UTCTime));

    //format it correctly
    const localStr = UTCDate.toLocaleTimeString("en-US", {hour12: false, timeZone});

    //split up the str.
    const [hour, minute] = localStr.split(":").map(Number);

    //debugging
    console.log(hour,minute);
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

function totalflaw(people){

    for(let i = 0; i < people.length; i++){ 
        //inacurracy


        flawTotal += 0;

    }
    


}