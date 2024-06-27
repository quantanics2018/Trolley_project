import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import MainLayout from './pages/main_layout/main_layout';
import InitialPage from './pages/after_QR_scan/initial_page';
import CartPage from './pages/after_items_scan/cart_page';
import {TrolleyContext} from '../src/TrolleyContext';
import { useState,useEffect} from 'react';
import mqtt from 'mqtt';
// import Payment from './pages/PaymentComponent';
import UserInfo from './pages/userinfo/userinfo';


const string_to_json = (data) =>{
  const lines = data.split('\n');
  const result = [];
  let currentItem = {};
  console.log('currentitems',currentItem)
  
  lines.forEach(line => {
      if (line.trim().length === 0) return;

      const [key, value] = line.split(':').map(part => part.trim());
      // if (key === 'Serial Number' && Object.keys(currentItem).length > 0) {
      //     result.push(currentItem);
      //     currentItem = {};
      // }
      const mappedkey = mapKey(key);
      currentItem[mappedkey] = isNaN(value) ? value : Number(value);
  });

  // if (Object.keys(currentItem).length > 0) {
  //     result.push(currentItem);
  // }

  const updatedItems = {...currentItem, Description: "Makes Your Day Bright"}
  return updatedItems;
}

const  mapKey = (key)=>{
  const keyMap = {
      'Serial Number': 'id',
      'Product Name': 'ProductName',
      'Quantity': 'quantity',
      'Price': 'ProductPrice',
  };

  return keyMap[key] || key;
}


function App() {

  const [mqttClient, setMqttClient] = useState(null);
  const [data,setData] = useState()
  const [updatedData,setUpdatedData] = useState([])
  const [subTotal,setSubtotal] = useState()
  const [amount,setAmount] = useState()

  useEffect(() => {
    const mqttUrl = 'ws://quantanics.in:8083/mqtt';
    const client = mqtt.connect(mqttUrl,{username:'quantanics',password:'quantanics123'});
    setMqttClient(client);
    client.on('connect', () => {
      client.subscribe('purchase/info');
    });
    client.on('message', (topic, message) => {
      console.log('message',message)
      const receivedData = message.toString();
      const jsonData = string_to_json(receivedData);
      setData(jsonData); 
      try {
        setUpdatedData(prevData => [...prevData, jsonData]); 
      }  catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
    return () => {
      client.end();
    };
  }, []);

  return (
    <TrolleyContext.Provider value={{updatedData,setUpdatedData,setSubtotal,subTotal,amount,setAmount}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
              <Route path='/' element={<InitialPage/>} />
              <Route path='cart' element ={<CartPage/>} />
              <Route path='payment' element={<UserInfo/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrolleyContext.Provider>
  );
}

export default App;