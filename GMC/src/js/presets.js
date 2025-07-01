// Save a preset object under a unique name in localStorage without overwriting existing presets
export function savePreset(presetName, preset) {
    if (!presetName || !preset) {
        alert("Please insert a valid preset name and preset data.");
        return;
    }

    // Check if a preset with this name already exists (to avoid overwriting)
    if (localStorage.getItem(presetName)) {
        alert(`Preset "${presetName}" already exists. Please choose a different name.`);
        return;
    }

    // Save the entire preset as a JSON string under the presetName key
    localStorage.setItem(presetName, JSON.stringify(preset));
    console.log(`Preset "${presetName}" saved.`);
}

// Load a preset from localStorage by its name
export function loadPreset(presetName) {
    if (!presetName) {
        alert("Please specify a preset name to load.");
        return null;
    }

    const presetStr = localStorage.getItem(presetName);
    if (!presetStr) {
        alert(`Preset "${presetName}" not found.`);
        return null;
    }

    // Parse the JSON string back into an object
    try {
        return JSON.parse(presetStr);
    } catch (e) {
        alert(`Failed to parse preset "${presetName}".`);
        return null;
    }
}

// Return an array of all preset names stored in localStorage
export function showPresets() {
    const presetNames = [];

    // Iterate all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);


        presetNames.push(key);
    }

    return presetNames;
}