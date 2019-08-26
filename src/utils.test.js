import { dateInRange, parseDate, formatDate, __RewireAPI__ } from "./utils";
import dayjs from "dayjs";

describe("dateInRange", () => {
  const tests = [
    {
      a: dayjs(new Date(2019, 7, 25)),
      b: dayjs(new Date(2019, 7, 27)),
      c: dayjs(new Date(2019, 7, 26)),
      desc: "In range",
      expected: true
    },
    {
      a: dayjs(new Date(2019, 7, 25)),
      b: dayjs(new Date(2019, 7, 27)),
      c: dayjs(new Date(2019, 7, 25)),
      desc: "Same as start",
      expected: true
    },
    {
      a: dayjs(new Date(2019, 7, 25)),
      b: dayjs(new Date(2019, 7, 27)),
      c: dayjs(new Date(2019, 7, 27)),
      desc: "Same as end",
      expected: true
    },
    {
      a: dayjs(new Date(2019, 7, 25)),
      b: dayjs(new Date(2019, 7, 27)),
      c: dayjs(new Date(2019, 7, 24)),
      desc: "Before start",
      expected: false
    },
    {
      a: dayjs(new Date(2019, 7, 25)),
      b: dayjs(new Date(2019, 7, 27)),
      c: dayjs(new Date(2019, 7, 29)),
      desc: "After end",
      expected: false
    }
  ];
  tests.forEach(t => {
    test(t.desc, () => {
      expect(dateInRange(t.a, t.b, t.c)).toBe(t.expected);
    });
  });
});

describe("parseDate", () => {
  const tests = [
    {
      a: "25/08/2019",
      b: "DD/MM/YYYY",
      desc: "Valid date",
      expected: new Date(2019, 7, 25)
    },
    {
      a: "25/aa/2019",
      b: "DD/MM/YYYY",
      desc: "Invalid date",
      expected: undefined
    }
  ];
  tests.forEach(t => {
    test(t.desc, () => {
      expect(parseDate(t.a, t.b)).toEqual(t.expected);
    });
  });
});

describe("formatDate", () => {
  const tests = [
    {
      a: new Date("08/25/2019"),
      b: "DD/MM/YYYY",
      desc: "Format DD/MM/YYYY",
      expected: "25/08/2019"
    }
  ];
  tests.forEach(t => {
    test(t.desc, () => {
      expect(formatDate(t.a, t.b)).toBe(t.expected);
    });
  });
});
