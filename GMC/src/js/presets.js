export function loadPresets(){

    //this should load a preset from localstorage


}

export function savePreset(presetName, preset){

    let lSName = "";
    if(!presetName||!preset) {
        alert("insert a name")
    }    


    for(let i = 0; i < preset.length; i++){ 

        lSName = presetName + preset[i];
        localStorage.setItem(lSName, preset[i]);
        console.log("saved", lSName, preset[i])

    }
    //this should save the preset to localstorage
    //the presets should be a list of first:
    /*

    1: the preset  should be saved to localstorage. Do not overiwrite itself, or other copies this script makes
    
    2.: that s its

    */
}

export function showPresets(){

    //this should return the names of all the preset    
    

}