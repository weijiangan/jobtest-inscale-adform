import dayjs from "dayjs";
import { dateInRange } from "./utils";
import Ajv from "ajv";
const ajv = Ajv({ allErrors: true });

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

Campaign.validate = ajv.compile({
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      startDate: { type: "string", pattern: "1?\\d/[1-3]?\\d/\\d{4}" },
      endDate: { type: "string", pattern: "1?\\d/[1-3]?\\d/\\d{4}" },
      Budget: { type: "integer" }
    },
    required: ["id", "name", "startDate", "endDate", "Budget"]
  }
});

export { Campaign };
