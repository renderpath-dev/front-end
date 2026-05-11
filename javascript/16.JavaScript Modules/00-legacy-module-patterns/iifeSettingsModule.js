'use strict';

(() => {
  const runtimeSettings = {
    themeMode : "dark",
    pageSize : 20
  };

  function readSettingValue (settingName) {
    return runtimeSettings[settingName];
  }

  function updateSettingValue (settingName, settingValue) {
    runtimeSettings[settingName] = settingValue;
  }

  function createSettingsSummary () {
    return `${runtimeSettings.themeMode} : ${runtimeSettings.pageSize}`;
  }

  globalThis.runtimeSettingsModule = {
    readSettingValue : readSettingValue,
    updateSettingValue : updateSettingValue,
    createSettingsSummary : createSettingsSummary
  };
})();