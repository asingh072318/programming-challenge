import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function createData(
  city_name: string,
  premise_id: string,
  total_animals: number,
) {
  return {
    city_name,
    premise_id,
    total_animals,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

interface RowProps{
  row: ReturnType<typeof createData>,
  setSelectedRow: React.Dispatch<React.SetStateAction<string>>,
  selectedData: any,
  setSelectedData: React.Dispatch<React.SetStateAction<any>>,
  selectedRow: string,
}

const fetchMoveData = async (premise_id:any) => {
  const res = await fetch("http://0.0.0.0:8000/movements/"+premise_id, {
    headers: {
      origin: 'http://localhost',
      'Content-Type': 'application/json'
    }
  });
  return res.json();
};

function Row({row,setSelectedRow,selectedRow,setSelectedData}:RowProps) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row" align="center">
          {row.city_name}
        </TableCell>
        <TableCell align="center">{row.premise_id}</TableCell>
        <TableCell align="center">{row.total_animals}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => { console.log(row.premise_id); setSelectedRow(row.premise_id); fetchMoveData(row.premise_id).then(response => {
              console.log('response is ', response);
              setSelectedData(response);
            })} }
          >
            {selectedRow==row.premise_id ? <CheckCircleIcon color="success"/> :  <CheckCircleOutlineIcon/>}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface TableProps{
  info: any,
  setSelectedRow: React.Dispatch<React.SetStateAction<string>>,
  selectedRow: string,
  selectedData: any,
  setSelectedData: React.Dispatch<React.SetStateAction<any>>,
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CollapsibleTable({info={response:[],status:0},selectedRow,setSelectedRow,selectedData,setSelectedData}:TableProps) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">City Name</StyledTableCell>
            <StyledTableCell align="center">Premise Id</StyledTableCell>
            <StyledTableCell align="center">Total Animals</StyledTableCell>
            <StyledTableCell align="center"> Select for more details </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.response.map((each_item:any) => (
            <Row key={each_item.premise_id} selectedRow={selectedRow} setSelectedRow={setSelectedRow} setSelectedData={setSelectedData} selectedData={selectedData} row={createData(each_item.city_name,each_item.premise_id,parseInt(each_item.total_animals))} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
