import React, { useState, useCallback, useMemo, useRef } from "react";
import numeral from "numeral";
import querystring from "querystring";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Campaign } from "./campaign";
import { usePagination } from "./usePagination";
import { dateInRange, parseDate, formatDate } from "./utils";
import dayjs from "dayjs";

import "!style-loader!css-loader!react-day-picker/lib/style.css";
import styles from "./app.css";

function CampaignPage(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("");
  const [dateRange, setRange] = useState({ start: undefined, end: undefined });
  const [page, setPage, paginator] = usePagination();
  const { start, end } = dateRange;

  window.AddCampaigns = useCallback(
    input => {
      const arr = input.map(
        cmp =>
          new Campaign(cmp.id, cmp.name, cmp.startDate, cmp.endDate, cmp.Budget)
      );
      setCampaigns(s => s.concat(arr));
    },
    [setCampaigns]
  );

  const handleSearch = useCallback(
    event => {
      setPage(1);
      setFilter(event.target.value);
    },
    [setPage, setFilter]
  );

  const filterResults = useMemo(() => {
    const dStart = dayjs(start);
    const dEnd = dayjs(end);
    return campaigns.filter(cmp => {
      let res = cmp.name.toLowerCase().includes(filter.toLowerCase());
      if (start && end) {
        res =
          res &&
          (dateInRange(dStart, dEnd, cmp.startDate) ||
            dateInRange(dStart, dEnd, cmp.endDate));
      }
      return res;
    });
  }, [campaigns, filter, dateRange]);

  const [pageItems, pages] = useMemo(() => {
    return paginator(filterResults);
  }, [filterResults, page]);

  const toRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.mt4}>
        <h1>Campaigns</h1>
      </div>
      <div className={styles.spaceBetween}>
        <div className={styles.bar}>
          <div className={styles.field}>
            <label>Start date</label>
            <DayPickerInput
              value={start}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [start, { start, end }],
                disabledDays: { after: end },
                toMonth: end,
                modifiers: dateRange,
                onDayClick: () => toRef.current.getInput().focus()
              }}
              onDayChange={date => setRange(s => ({ ...s, start: date }))}
            />
          </div>
          <div className={styles.field}>
            <label>End date</label>
            <DayPickerInput
              ref={toRef}
              value={end}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [start, { start, end }],
                disabledDays: { before: start },
                modifiers: dateRange,
                month: start,
                fromMonth: start
              }}
              onDayChange={date => setRange(s => ({ ...s, end: date }))}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>Filter</label>
          <input
            type="text"
            value={filter}
            placeholder="campaign name..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={styles.mt4}>
        <CampaignTable pageItems={pageItems} />
        <div className={styles.paginationBar}>
          <button onClick={() => setPage(p => (p <= 2 ? 1 : p - 1))}>
            Prev
          </button>
          <div>
            Page{" "}
            <input
              type="number"
              value={page}
              style={{ width: "2rem" }}
              min={1}
              max={pages}
              onChange={e => setPage(e.target.value)}
            />{" "}
            of {pages}
          </div>
          <button onClick={() => setPage(p => (p < pages ? p + 1 : pages))}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function Circle({ color, ...props }) {
  return (
    <svg height="1em" width="1em" {...props}>
      <circle cx="0.5em" cy="0.5em" r="0.4em" fill={color} />
    </svg>
  );
}

function CampaignTable(props) {
  const rows = props.pageItems.map((cmp, index) => (
    <tr key={index}>
      <td>{cmp.name}</td>
      <td>{cmp.startDate.format("DD/MM/YYYY")}</td>
      <td>{cmp.endDate.format("DD/MM/YYYY")}</td>
      <td>
        <Circle
          className={styles.mr1}
          color={cmp.isActive() ? "#07e600" : "red"}
        />
        {cmp.isActive() ? "Active" : "Inactive"}
      </td>
      <td>{numeral(cmp.budget).format("0.0a")}</td>
    </tr>
  ));

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Active</th>
          <th>Budget (USD)</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default CampaignPage;
