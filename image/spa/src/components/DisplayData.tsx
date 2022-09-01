import { Box } from '@mui/system';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface DisplayProps{
    move_data: any
}
export default function DisplayData({move_data={response:[],status:0}}:DisplayProps) {
    console.log(move_data)
    if(move_data.status == 200){
        const to_show = move_data.response[0]
        return (
            <Card sx={{display:'flex',flexDirection:'column',height:'100%',width:'100%'}}>
                <Box sx={{display:'flex',flexDirection:'row',backgroundColor:'#28282B',color:'#F8F0E3',justifyContent:'center',alignItems:'center',height:'30%'}}>
                    <CardHeader
                        title={to_show.new_origincity}
                        subheader={<Typography sx={{color: '#F8F0E3'}}>{to_show.new_shipmentsstartdate}</Typography>}
                    />
                </Box>
                <Box sx={{display:'flex',flexDirection:'row',height:'55%',width:'100%'}}>
                    <Box sx={{display:'flex',width:'50%',justifyContent:'center',p:2}}>
                        <CardContent sx={{display:'flex',flexDirection:'column'}}>
                            <Typography sx={{m:-1,fontWeight:'600',fontSize:'15'}}>Origin:</Typography>
                            <Typography sx={{fontWeight:'450',mt:4}} variant="body2" color="text.secondary">
                            Name: {to_show.new_originname}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            Address: {to_show.new_originaddress}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            City: {to_show.new_origincity}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            ZipCode: {to_show.new_originpostalcode}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            State: {to_show.new_originstate}
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'column',width:'50%',p:2}}>
                        <CardContent sx={{display:'flex',flexDirection:'column'}}>
                            <Typography sx={{m:-1,fontWeight:'600',fontSize:'15'}}>Destination:</Typography>
                            <Typography sx={{fontWeight:'450',mt:4}} variant="body2" color="text.secondary">
                            Name: {to_show.new_destinationname}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            Address: {to_show.new_destinationaddress}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            City: {to_show.new_destinationcity}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            ZipCode: {to_show.new_destinationpostalcode}
                            </Typography>
                            <Typography sx={{fontWeight:'450'}} variant="body2" color="text.secondary">
                            State: {to_show.new_destinationstate}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-even',height:'15%',width:'100%',color:'#F8F0E3'}}>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:'20%',color:'white',backgroundColor:'#28282B'}}>Details:</Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:'80%',color:'black',backgroundColor:'white'}}>
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:'40%'}}>
                                {to_show.accountcompany}         
                        </Box>
                        <Divider orientation='vertical' />
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:'30%'}}>
                                {to_show.new_species}                
                        </Box>
                        <Divider orientation='vertical' />
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:'30%'}}>
                                #: {to_show.new_numitemsmoved}               
                        </Box>
                        <Divider orientation='vertical' />
                    </Box>
                </Box>
            </Card>
          );
    }
    return(
        <Box sx={{m:'auto', display:'flex', bgcolor:'#28282B', height:'100%', width:'100%', 
        alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{fontWeight:'bold', fontSize: 'h4.fontSize'}}>Welcome to MTracker</Typography></Box>
    )
}
