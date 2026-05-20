// Goal:
// Wrap a lower-level JSON parse error with a high-level Error

function loadSettingsRecord (settingsText) {
    try {
        return JSON.parse(settingsText);
    } catch (settingParseError) {
        throw new Error ('Settings data Could not be parsed correctly',{
            cause:settingParseError,
        });
    }
}

try {
    loadSettingsRecord('broken-json');
} catch (settingsLoadError) {
    console.error(settingsLoadError.message);
    console.error(settingsLoadError.cause instanceof SyntaxError);
}