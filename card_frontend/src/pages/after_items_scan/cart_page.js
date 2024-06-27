import React, { useContext, useEffect, useState} from "react";
import '../after_items_scan/cart_page.css'
import { RiAddBoxFill } from "react-icons/ri";
import { TbSquareMinusFilled } from "react-icons/tb";
import { TrolleyContext } from "../../TrolleyContext";
import goodDay from '../../image/products/goodday.webp'
import milkbikis from '../../image/products/milkbikis.jpg'
import dairymilk from '../../image/products/dairyMilk.jpg'
import shoe from '../../image/products/shoe.webp'
import { useNavigate} from 'react-router-dom'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const CartPage = () => {
    const {subTotal,setAmount} = useContext(TrolleyContext)
    const {updatedData,setSubtotal} = useContext(TrolleyContext)
    
    const [products, setProducts] = useState()
    const navigate = useNavigate()

    const taxRate = 0.05

    const handleAdd = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        ));
    };

    const handleMinus = (id) => {
        setProducts(products.map(product =>
            product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        ));
    };

    const handleCheckout = () =>{
        navigate('/payment')
    }

    const calculateTax = () => {
        return subTotal * taxRate;
    };

    const calculateTotalPrice = () => {
        const totalamount = subTotal + calculateTax()
        setAmount(totalamount.toFixed(2))
        return totalamount.toFixed(2);
    };

    useEffect(()=>{
        setProducts(updatedData?.map(product => ({ ...product, quantity: 1 })))
    },[updatedData])

    useEffect(() => {
        if(products?.length > 0){
        }
        const calculateSubtotal = () => {
            return products?.reduce((acc, product) => acc + product.ProductPrice * product.quantity, 0);
        };
        const newSubtotal = calculateSubtotal();
        setSubtotal(newSubtotal);
        
    }, [products]);

console.log("product datA IS ");
console.log(products);
    return (
        <>
            <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#066c34de" fill-opacity="1" d="M0,224L24,197.3C48,171,96,117,144,106.7C192,96,240,128,288,117.3C336,107,384,53,432,69.3C480,85,528,171,576,192C624,213,672,171,720,154.7C768,139,816,149,864,176C912,203,960,245,1008,245.3C1056,245,1104,203,1152,192C1200,181,1248,203,1296,181.3C1344,160,1392,96,1416,64L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
            <div className="mainlayout_cart_page">
                <p className="Heading">Welcome !</p>
                <div className="card_section">
                {products?.length > 0 && (
                    <div className="card_section">
                    {products?.map((data)=>{
                        {console.log("card data ProductName ")}
                        {console.log(data)}
                        return (
                            <div className="card" key={data.id}>
                                <div className="SubContainer">
                                    <div className="ImageContainer">
                                        {data?.ProductName === 'Milk Bikis'  && <img alt='cart image' src= {milkbikis}/>}
                                        {data?.ProductName === 'Good Day' && <img alt='cart image' src= {goodDay}/>}
                                        {data?.ProductName ==='Dairy Milk' && <img alt='cart image' src={dairymilk}/>}
                                        {data?.ProductName ==='Shoe' && <img alt='cart image' src={shoe}/>}
                                    </div>
                                    {console.log(data.ProductName)}
                                    <div className="ContentContainer">
                                        <p className="ProductName">{data.ProductName}</p>
                                        <p className="Pricetag">Rs.{data.ProductPrice}</p>
                                        <p className="Description">{data.Description}</p>
                                    </div>
                                    <div className="ButtonContainer">
                                        <RiAddBoxFill style={{scale:'1',color:'#c1c1c1', flex:'1',width:'60%',height:'100%',cursor:'pointer'}} onClick={() => handleAdd(data.id)}/>
                                        <p style={{fontSize:'18px',flex:'0.6'}}>{data.quantity}</p>
                                        <TbSquareMinusFilled style={{scale:'1',color:'#c1c1c1',flex:'1',width:'60%',height:'100%',cursor:'pointer'}} onClick={() => handleMinus(data.id)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                    </div> 
                )} 
                </div>
                <div className="footer"> 
                        <div className="PriceContainer">
                            <p><span className="bold_text" onClick={handleCheckout}>Tax</span> : 5%</p>
                            <p><span className="bold_text">Total Price </span> : Rs {calculateTotalPrice()}</p>
                        </div>
                        <div className='checkoutButton' onClick={handleCheckout}>
                            Check Out
                            <ExpandCircleDownIcon className="arrow-circle"/>
                        </div>                   
                    </div>          
            </div>
        </>
    )
}

export default CartPage;