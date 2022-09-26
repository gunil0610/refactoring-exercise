export function temperatureAlerts(room, plan) {
  const alerts = [];
  if (!plan.withinRange(room.daysTempRange)) {
    alerts.push("room temperature went outside range");
  }

  return alerts;
}

export class HeatingPlan {
  constructor(temperatureRange) {
    this._temperatureRange = temperatureRange;
  }

  withinRange(range) {
    return (
      range.low >= this._temperatureRange.low &&
      range.high <= this._temperatureRange.high
    );
  }
}
