import React, { useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
    },
    useGlobalFilter,
    useSortBy
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <>
      <TextField
        // id="standard-full-width"
        // label="Label"
        style={{ margin: 8 }}
        placeholder="Search"
        // helperText="Full width!"
        fullWidth
        margin="normal"
        // InputLabelProps={{
        //   shrink: true,
        // }}
        value={filterInput}
        onChange={handleFilterChange}
      />
      {/* <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={'Search name'}
      /> */}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'asc' : 'desc'}
                  >
                    {column.render('Header')}
                  </TableSortLabel>
                  {/* <span>foo</span> */}
                  {/* {column.render('Header')} */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </>
  );
}
