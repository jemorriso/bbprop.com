import React, { useState } from 'react';
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

    // rows,
    page,
    prepareRow,

    setGlobalFilter,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
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
                </TableCell>
              ))}
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
