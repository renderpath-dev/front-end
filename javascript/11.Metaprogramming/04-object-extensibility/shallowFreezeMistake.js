// Goal:
// Verify that Object.freeze is shallow.

const dashboardConfig = {
  layout: {
    columns: 3,
  },
};

Object.freeze(dashboardConfig);
dashboardConfig.layout.columns = 4;

console.log(dashboardConfig.layout.columns);
