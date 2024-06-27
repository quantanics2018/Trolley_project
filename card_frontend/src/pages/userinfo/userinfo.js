import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext} from 'react'
import { TrolleyContext } from "../../TrolleyContext";
import { v4 as uuidv4 } from 'uuid'

const defaultTheme = createTheme();

const UserInfo = () =>{

    const {amount,updatedData} = useContext(TrolleyContext)
    const [name, setName] = useState("");
    const [email,setEmail] = useState('');
    const [phonenumber,setPhonenumber] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            const userData = {
                name : name,
                email : email,
                phonenumber: phonenumber
            }
            console.log(userData)
            try {

              const totalAmount = amount;

                const response = await fetch('http://localhost:3002/session/create-razorpay-order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body:JSON.stringify({
                    amount: totalAmount * 100, 
                    currency: 'INR', 
                  }),
                });
          
                const orderData = await response.json();

                console.log(orderData)
                console.log('orderData.amount',orderData.amount)
          
                const options = {
                  key: 'rzp_test_0MsloSAqW3knPj',
                  key_secret:'ePKlU8Hq8PUqSGHAvHNO0iir',
                  amount: orderData.amount,
                  currency: orderData.currency,
                  name: 'Your Product Name',
                  description: 'Payment for your product',
                  image: 'https://example.com/logo.png',
                  handler: async(response) => {
                    console.log('response')
                    console.log('Payment ID:', response.razorpay_payment_id);
                    setName('')
                    setEmail('')
                    setPhonenumber('')
                    const result = await fetch('http://localhost:3002/session', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({                      
                        status:"Payment Done",
                        payment_id: response.razorpay_payment_id,
                        session_id: uuidv4(),
                        user: userData,                  
                        products: updatedData.map((data,index)=>{
                          return {
                            product_name : data.ProductName,
                            product_price : data.ProductPrice
                          }
                        })
                      }),
                    });
                    console.log('result',result)
                  },
                  prefill: {
                    name: userData.name, 
                    email: userData.email, 
                    contact: userData.phonenumber, 
                  },
                  notes: {
                    'order_id': orderData.id
                  },
                  theme: {
                    color: '#3399cc'
                  },
                };
          
                const razorpayInstance = new window.Razorpay(options);
          
                razorpayInstance.open();
          
              } catch (error) {
                console.error('Error creating Razorpay order:', error);
              }


        } else {
          alert("Form is invalid! Please check the fields...");
        }
      };

    return (
        <>
            <svg className="wavy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#066c34de" fill-opacity="1" d="M0,224L24,197.3C48,171,96,117,144,106.7C192,96,240,128,288,117.3C336,107,384,53,432,69.3C480,85,528,171,576,192C624,213,672,171,720,154.7C768,139,816,149,864,176C912,203,960,245,1008,245.3C1056,245,1104,203,1152,192C1200,181,1248,203,1296,181.3C1344,160,1392,96,1416,64L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: '#68cf96de' }}>
                    <AccountCircleIcon sx={{scale:'1.2'}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Customer Details
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%',alignItems:'center'}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phonenumber"
                        label="Phone Number"
                        type="string"
                        id="password"
                        autoComplete="phone-number"
                        value={phonenumber}
                        onChange={(e)=>setPhonenumber(e.target.value)}
                    />
                    <Button
                    type="submit"
                    variant="contained"
                    sx={
                        { 
                            mt: 3,
                             mb: 2 ,
                             bgcolor:'#68cf96de',
                             color:'black',
                             fontWeight:'500',
                             fontSize:'18px',
                             borderRadius:'18px',
                             ':hover': {
                                bgcolor: '#066c34de',
                                color: 'white',
                            },
                        }
                    }
                    style={{
                        width:'200px', 
                    }}
                    >
                        Next
                    </Button>
                </Box>
                </Box>
            </Container>
            </ThemeProvider>
        </>
      );
}

export default UserInfo;