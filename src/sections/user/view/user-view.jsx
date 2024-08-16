import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { debounce } from 'lodash';

import { users } from './../../../_mock/user';
import Scrollbar from './../../../components/scrollbar';

import TableNoData from './../table-no-data';
import UserTableRow from './../user-table-row';
import UserTableHead from './../user-table-head';
import TableEmptyRows from './../table-empty-rows';
import UserTableToolbar from './../user-table-toolbar';
import { emptyRows, applyFilter } from './../utils';
import Spinner from '../../../components/Spinner';

// ----------------------------------------------------------------------

const timeOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'Asia/Riyadh',
};

const convertIntoDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString('en-US', timeOptions);
};

export default function UserPage() {
  const { users: usersRedux, isLoading } = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const formattedUsers = useMemo(() => {
    return Array.isArray(usersRedux)
      ? usersRedux
        .map((user) => ({
          ...user,
          id: user?._id,
          grade:
            (user?.result?.correctAnswers / user?.result?.totalQuestions) *
            100,
          exam: user?.result?.levelName,
          date: convertIntoDate(user[`createdAt`]),
          status:
            user?.result?.correctAnswers / user?.result?.totalQuestions > 0.5
              ? `Passed`
              : `Failed`,
        }))
        .sort((a, b) => {
          if (!order) return a + b;
          if (orderBy == `date` && !!a?.createdAt && !!b?.createdAt) {          
            if (order == `asc`) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            }
            if (order == `desc`) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
          }
          const valueA =
            !!a[orderBy] && `${a[orderBy]}`?.includes(`+`)
              ? a[orderBy]?.slice(1)
              : a[orderBy];
          const valueB =
            !!b[orderBy] && `${b[orderBy]}`?.includes(`+`)
              ? b[orderBy]?.slice(1)
              : b[orderBy];

          if (
            typeof +valueA === 'number' &&
            typeof +valueB === 'number' &&
            !isNaN(+valueA) &&
            !isNaN(+valueB)
          ) {
            return order === 'asc' ? valueA - valueB : valueB - valueA;
          } else {
            if (order === 'asc') {
              return valueA < valueB ? -1 : 1;
            } else {
              return valueA > valueB ? -1 : 1;
            }
          }
        })
      : [];
  }, [usersRedux, order, orderBy]);

  const handleSort = useCallback(
    (id) => {
      console.log({ order, orderBy })
      const isAsc = orderBy === id && order === 'asc';
      if (!!id) {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelecteds = users.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    [users]
  );

  const handleClick = useCallback(
    (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const handleFilterByName = useCallback((value) => {
    setPage(0);
    setFilterName(value);
  }, []);

  // useMemo(
  const dataFiltered = (() => {
    return applyFilter({
      inputData: formattedUsers,
      comparator: [],
      //  getComparator(order, orderBy),
      filterName,
    });
  })();
  // , [formattedUsers, order, orderBy, filterName]);

  const notFound = !dataFiltered.length && !!filterName;

  return isLoading ? (
    <Spinner className="h-full" />
  ) : (
    <Container>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'exam', label: 'Exam' },
                  { id: 'grade', label: 'Grade' },
                  { id: 'date', label: 'Date' },
                  { id: 'education', label: 'Education' },
                  // { id: "experience", label: "Experience" },
                  { id: 'result', label: 'Result' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <UserTableRow
                        user={row}
                        key={row.id}
                        id={row?.id}
                        name={row.name}
                        email={row.email}
                        phone={row.phone}
                        grade={row.grade}
                        exam={row.exam}
                        age={row.age}
                        education={row.education}
                        experience={row.experience}
                        date={row.date}
                        result={row.result}
                        status={row.status}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    );
                  })}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 400, 800, 1600, 3200]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
