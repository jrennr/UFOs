// Static sightings explorer. All filters use exact, case-insensitive matches.
const tableData = data;
const tbody = d3.select("tbody");
const filters = {};
const fieldById = {
  datetime: "datetime",
  "city-filter": "city",
  "state-filter": "state",
  "country-filter": "country",
  "shape-filter": "shape"
};

function buildTable(rows) {
  tbody.html("");
  rows.forEach((item) => {
    const row = tbody.append("tr");
    Object.values(item).forEach((value) => row.append("td").text(value));
  });
}

function updateFilters() {
  const input = d3.select(this);
  const field = fieldById[input.attr("id")];
  if (!field) return;
  const value = String(input.property("value")).trim().toLowerCase();
  if (value) filters[field] = value;
  else delete filters[field];
  const rows = tableData.filter((item) =>
    Object.entries(filters).every(([key, expected]) =>
      String(item[key]).toLowerCase() === expected
    )
  );
  buildTable(rows);
}

d3.selectAll("input").on("change", updateFilters);
buildTable(tableData);
