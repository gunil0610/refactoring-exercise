import { acquireReading } from "./6-9.js";

const reading = acquireReading();

const baseCharge = reading.baseRate;
console.log(baseCharge);
