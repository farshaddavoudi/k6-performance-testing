// ########## Set `usersCapacityCalcRef: true` for phases that you want to calculate the users capacity based on
// ########## No `usersCapacityCalcRef`: true` means no calculation for users capacity.
// ########## Multiple phases can be set by `usersCapacityCalcRef`: true`

export let scenario_1min = [
  // Unreliable scenario. Just for quick test
  { duration: "30s", target: 10 },
  { duration: "3s", target: 0 },
];

export let scenario_15min = [
  { duration: "30s", target: 100 }, // warm-up (below normal load)
  { duration: `10s`, target: 100 },
  { duration: "20s", target: 500 }, // normal load
  { duration: "20s", target: 500 },
  { duration: "50s", target: 1000 },
  { duration: "20s", target: 1300 }, // high load (below the breaking point)
  { duration: "90s", target: 2000 },
  { duration: "10m", target: 2000, usersCapacityCalcRef: true }, // Stress load (around the breaking point)
  { duration: "60s", target: 0 }, // scale down (recovery stage)
];

export let scenario_36min = [
  { duration: "2m", target: 100 }, // Warm-up
  { duration: "2m", target: 500 }, // Increase to normal load
  { duration: "2m", target: 1000 }, // Increase to high load
  { duration: "2m", target: 1500 }, // Gradual increase
  { duration: "2m", target: 2000 }, // Gradual increase to peak load
  { duration: "20m", target: 2000, usersCapacityCalcRef: true }, // Steady-state peak load (Stress Load)
  { duration: "2m", target: 1000 }, // Gradual decrease
  { duration: "2m", target: 500 }, // Decrease to normal load
  { duration: "2m", target: 0 }, // Cool-down and recovery
];

export let scenario_65min = [
  { duration: "2m", target: 100 }, // Warm-up
  { duration: "5m", target: 100 }, // Steady-state below normal load

  { duration: "2m", target: 500 }, // Increase to normal load
  { duration: "5m", target: 500 }, // Steady-state normal load

  { duration: "2m", target: 1000 }, // Increase to high load
  { duration: "10m", target: 1000 }, // Steady-state high load

  { duration: "2m", target: 1500 }, // Gradual increase
  { duration: "10m", target: 1500 }, // Steady-state

  { duration: "2m", target: 2000 }, // Peak load
  { duration: "20m", target: 2000, usersCapacityCalcRef: true }, // Steady-state peak load

  { duration: "5m", target: 0 }, // Cool-down and recovery
];
