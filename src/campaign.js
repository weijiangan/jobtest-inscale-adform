import dayjs from "dayjs";
import { dateInRange } from "./utils";

function Campaign(id, name, startDate, endDate, budget) {
  this.id = id;
  this.name = name;
  this.startDate = dayjs(startDate);
  this.endDate = dayjs(endDate);
  this.budget = budget;
}

Campaign.prototype.isActive = function() {
  return dateInRange(this.startDate, this.endDate);
};

export { Campaign };
