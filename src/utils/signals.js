import Signal from "mini-signals";

const refreshTravels = new Signal();
const refreshMemories = new Signal();
const refreshPlanning = new Signal();

export { refreshTravels, refreshMemories, refreshPlanning };
