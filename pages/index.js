import Head from 'next/head';
import React from 'react';

import Button from '@material-ui/core/Button';

import Table from '../components/table';
import Header from '../components/header';

function getHeadersFromRecords(data) {
  return Object.keys(data[0]);
}

function zip(a, b) {
  const c = a.map((x, i) => [x, b[i]]);
  return c;
}

function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildTableColumns(columnElements) {
  const columns = columnElements.map((c) => {
    return { Header: c[0], accessor: c[1] };
  });
  return columns;
}

function customSortKeys(sortedKeys, data) {
  const newData = [];

  data.forEach((el) => {
    const newEl = {};
    sortedKeys.forEach((k) => {
      newEl[k] = el[k];
    });
    newData.push(newEl);
  });
  // console.log(newData);
  return newData;
}

function buildTableData(data) {
  const roundedKeys = ['avg', 'std', 'true', 'implied', 'edge'];
  data.forEach((el) => {
    el['market'] = el['market'].replace(/\]|\[/g, '');
    el['market'] = el['market'].replace(/\'/g, '');
    roundedKeys.forEach((k) => {
      el[k] = Number(Number(el[k]).toFixed(3));
    });
    el['line'] = Number(el['line']);
  });
  return data;
  // return data.slice(0, 100);
}

function cleanTableData(data) {
  const sortedKeys = [
    'home',
    'away',
    'name',
    'option',
    'points',
    'market',
    'line',
    'sportsbook',
    'range',
    'avg',
    'std',
    'true',
    'implied',
    'edge',
  ];
  //******************************************************************************
  // Instead of resorting the data I should define the headers in a different order...
  data = customSortKeys(sortedKeys, data);
  const headers = getHeadersFromRecords(data);
  //******************************************************************************

  const tableColumns = buildTableColumns(
    zip(
      headers.map((s) => capitalize(s)),
      [...headers]
    )
  );
  const tableData = buildTableData(data);
  return {
    columns: tableColumns,
    data: tableData,
  };
}

export async function getStaticProps(context) {
  // For some reason this is not working when I pull fetch outside of getStaticProps
  const res = await fetch(
    'https://5cog4ixp8g.execute-api.us-west-2.amazonaws.com/api/nextjs'
  );
  const betValues = await res.json();
  cleanTableData(betValues);
  // console.log(betValues);
  return {
    props: cleanTableData(betValues),
  };
}

export default function Home({ columns, data }) {
  const memoColumns = React.useMemo(() => columns, []);
  const memoData = React.useMemo(() => data, []);
  return (
    // <div className={styles.container}>
    <div>
      <Head>
        <title>Props</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* <Button variant="contained" color="primary">
        Hello World
      </Button> */}
      {/* <Header /> */}
      <Table columns={memoColumns} data={memoData} />
    </div>
  );
}
