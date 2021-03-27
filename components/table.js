// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/

import React, { useState, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import TextField from '@material-ui/core/TextField';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page,
    gotoPage,
    setPageSize,

    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      // sortType: 'basic',
      sortTypes: {
        // https://github.com/tannerlinsley/react-table/issues/1469
        // 'basic' sort type doesn't work for negative numbers. Couldn't get
        // this to work using a function defined elsewhere for some reason.
        numeric: (a, b, id) => {
          if (a.original[id] < b.original[id]) return 1;
          if (a.original[id] > b.original[id]) return -1;
          return 0;
          // console.log(a, b, id);
        },
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const handleChangePage = (e, newPageNumber) => {
    // console.log(newPageNumber);
    // Material UI
    setPageNumber(newPageNumber);
    // React-Table
    gotoPage(newPageNumber);
  };

  const handleChangeRowsPerPage = (e) => {
    // Material UI
    setRowsPerPage(parseInt(e.target.value, 10));
    setPageNumber(0);
    // React-Table
    setPageSize(parseInt(e.target.value, 10));
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
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                // if (column.id == 'line') column.sortMethod = numberSort;
                if (['line', 'true', 'implied', 'edge'].includes(column.id))
                  column.sortType = 'numeric';
                return (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    >
                      {column.render('Header')}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={pageNumber}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
