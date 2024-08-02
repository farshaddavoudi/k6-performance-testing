export const usersCapacityCalPhases = (scenario) => {
  let totalDuration = 0;
  let phases = [];
  let totalPhasesDuration = 0;

  for (let i = 0; i < scenario.length; i++) {
    totalDuration += parseDuration(scenario[i].duration);
    if (scenario[i].usersCapacityCalcRef) {
      let phaseStart = totalDuration - parseDuration(scenario[i].duration);
      let phaseEnd = totalDuration;
      let phaseTarget = scenario[i].target;
      phases.push({ phaseStart, phaseEnd, phaseTarget });
      totalPhasesDuration += parseDuration(scenario[i].duration);
    }
  }

  let isConfigured = phases.length > 0;

  let totalPhasesDurationInMinutes = totalPhasesDuration / 60;

  return { phases, isConfigured, totalPhasesDurationInMinutes };
};

export const logUsersCapacityPhases = (usersCapacityPhases) => {
    console.log("USERs CAPACITY CALCs CONFIGs:");
  
    if (usersCapacityPhases.isConfigured) {
      usersCapacityPhases.phases.forEach((phase, index) => {
        console.log(`Phase ${index + 1} starts at ${phase.phaseStart} seconds and ends at ${phase.phaseEnd} seconds with a target of ${phase.phaseTarget} VUs`);
      });
      console.log(`Total duration of users capacity phases is: ${usersCapacityPhases.totalPhasesDurationInMinutes} minutes`);
    } else {
      console.log("This scenario is not configured for user capacity calculation.");
    }
  };

const parseDuration = (duration) => {
  let time = parseInt(duration.slice(0, -1));
  let unit = duration.slice(-1);
  switch (unit) {
    case "s":
      return time;
    case "m":
      return time * 60;
    case "h":
      return time * 3600;
    default:
      return 0;
  }
};

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  