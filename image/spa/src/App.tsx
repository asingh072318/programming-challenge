import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './components/ProTip';
import ButtonAppBar from './components/ButtonAppBar';
import CollapsibleTable from './components/Introduction';
import get_information from './services/api_calls';

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
  useEffect(() => {
    get_information();
  }, []);
  
  return (
    <Container maxWidth={false}>
      <Box sx={{display: 'flex', flexDirection: 'column',height:'95vh', my: 2}}>
        <Box sx={{ height:'15%',p:2,border: 1 }}>
          <ButtonAppBar />
        </Box>
        <Box sx={{ border: 1,display: 'flex', flexDirection: 'row', justifyContent:'space-between', px:2,height:'70%' }}>
          <Box sx={{width: '60%',border:1,overflow:'auto'}}>
            <CollapsibleTable />
          </Box>
          <Box sx={{border:1,display: 'flex', flexDirection:'column',width:'35%',mx:2}}>
            <h1>Bar Chart</h1>
          </Box>
        </Box>
        <Box sx={{ height:'10%',border: 1 }}>
          <ProTip />
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
}
