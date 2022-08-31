import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ButtonAppBar from './components/ButtonAppBar';
import CollapsibleTable from './components/Introduction';
import { useQuery } from "react-query";
import DisplayData from './components/DisplayData';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://machado-lab.github.io">
        machado-lab
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  
  const fetchInformation = async () => {
    const res = await fetch("http://localhost:3010/movements/information", {
      headers: {
        origin: 'http://localhost',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  };

  const {data: movements} = useQuery("fetch_info", fetchInformation);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [selectedData, setSelectedData] = React.useState({"response":[],"status":0});
  // const {data: move_data} = useQuery(["fetch_move_data"],fetchMoveData,{
  //   enabled: !!selectedRow,
  //   refetchInterval: false
  // });


  console.log("selected data: ", selectedData);
  return (
    <Container maxWidth={false}>
      <Box sx={{display: 'flex', flexDirection: 'column',height:'95vh', my: 2}}>
        <Box sx={{ height:'15%',p:2 }}>
          <ButtonAppBar />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', px:2,height:'70%' }}>
          <Box sx={{width: '60%',boxShadow:4}}>
            <CollapsibleTable selectedRow={selectedRow} setSelectedRow={setSelectedRow} selectedData={selectedData} setSelectedData={setSelectedData} info={movements}/>
          </Box>
          <Box sx={{display: 'flex', flexDirection:'column',width:'35%',mx:2, boxShadow: 4}}>
            <DisplayData move_data={selectedData} />
          </Box>
        </Box>
        <Box sx={{ height:'10%',py:5 }}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
}
