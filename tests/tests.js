const fetch = require('node-fetch');
const fs = require('fs');
const { get } = require('http');

// import React from 'react';

async function apiConnection() {
  const res = await fetch(
    'https://5cog4ixp8g.execute-api.us-west-2.amazonaws.com/api/nextjs'
  );
  const data = await res.json();

  console.log(data);

  fs.writeFileSync('test-bet-values.json', JSON.stringify(data));
}

function getHeadersFromRecords(data) {
  return Object.keys(data[0]);
}

function zip(a, b) {
  c = a.map((x, i) => [x, b[i]]);
  return c;
}

function buildTableColumns(columnElements) {
  columns = columnElements.map((c) => {
    return { Header: c[0], Accessor: c[1] };
  });
  return columns;
}

function buildTableData(data) {
  return data;
}

// function memoize(data) {
//   memoized = React.useMemo(() => data, []);
//   return memoized;
// }

function cleanTableData(data) {
  const headers = getHeadersFromRecords(data);
  const table_columns = buildTableColumns(zip(headers, [...headers]));
  const table_data = buildTableData(data);

  return {
    columns: table_columns,
    data: table_data,
  };
}

async function testGetStaticProps() {
  // For some reason this is not working when I pull fetch outside of getStaticProps
  const res = await fetch(
    'https://5cog4ixp8g.execute-api.us-west-2.amazonaws.com/api/nextjs'
  );
  const betValues = await res.json();
  const props = cleanTableData(betValues);
  console.log(props);
  return {
    props,
  };
}

// apiConnection();

// const raw = fs.readFileSync('tests/test-bet-values.json');
// const bet_values = JSON.parse(raw);
// headers = getHeadersFromRecords(bet_values);
// console.log(headers);

// zipped_headers = zip(headers, [...headers]);
// console.log(buildTableColumns(zipped_headers));

// console.log(buildTableData(bet_values));

const props = testGetStaticProps();
