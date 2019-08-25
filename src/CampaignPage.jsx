import React, { useState, useCallback, useMemo } from "react";
import numeral from "numeral";
import { Campaign } from "./campaign";
import styles from "./app.css";

const PAGE_SIZE = 10;

function CampaignPage(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  window.AddCampaigns = useCallback(
    input => {
      const arr = input.map(
        cmp =>
          new Campaign(cmp.id, cmp.name, cmp.startDate, cmp.endDate, cmp.Budget)
      );
      setCampaigns(x => x.concat(arr));
    },
    [setCampaigns]
  );

  const filterResults = useMemo(() => {
    setPage(1);
    return campaigns.filter(cmp =>
      cmp.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [campaigns, filter]);

  const pageItems = useMemo(() => {
    if (filterResults.length > PAGE_SIZE) {
      return filterResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    }
    return filterResults;
  }, [filterResults, page]);

  const pages = Math.ceil(filterResults.length / PAGE_SIZE);

  return (
    <div className={styles.container}>
      <div className={styles.mt4}>
        <div className={styles.spaceBetween}>
          <div className={styles.bar}>
            <div className={styles.field}>
              <label>Start date</label>
              <input type="date" />
            </div>
            <div className={styles.field}>
              <label>End date</label>
              <input type="date" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Filter</label>
            <input
              type="text"
              value={filter}
              placeholder="Campaign name..."
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.mt4}>
        <CampaignTable pageItems={pageItems} />
        <div className={styles.bar}>
          <button onClick={() => setPage(p => p - 1)}>Prev</button>
          <div>
            Page{" "}
            <input
              type="number"
              value={page}
              style={{ width: "2rem" }}
              onChange={e => setPage(e.target.value)}
            />{" "}
            of {pages}
          </div>
          <button onClick={() => setPage(p => p + 1)}>Next</button>
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
