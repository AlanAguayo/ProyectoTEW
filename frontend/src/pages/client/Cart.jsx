import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../../components/client/Announcement";
import Footer from "../../components/client/Footer";
import Navbar from "../../components/client/Navbar";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useNavigate } from 'react-router-dom';
import { checkAuth, getToken } from "../../authUtils";
import axios from "axios";

const KEY = "pk_test_51OCoZuDUnbodT6MUcaAYA4vkMIDwLCZglQXOMke3TVs4XNgBSwlorUlX9jOdBP20reowO3kEqYmJ2cTQWc1YsLAM00G7vneRLS";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top:10px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100px;
  height: auto;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CouponInput = styled.input`
  border: none;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const CouponButton = styled.button`
  background-color: black;
  color: white;
  font-weight: 600;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 6 0vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  margin-right: 10px;
  margin-top: 50px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const token = getToken();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    checkAuth(navigate);
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/carts/${id}`, { headers });
        setCart(response.data);
        const productDetailsPromises = response.data.products.map(async (product) => {
          const productResponse = await axios.get(`http://localhost:5000/api/products/${product.productId}`, { headers });
          return productResponse.data;
        });

        const productDetails = await Promise.all(productDetailsPromises);
        setProductsDetails(productDetails);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [id, navigate]);

  const subtotal = productsDetails.reduce((acc, productDetail, index) => {
    const productPrice = productDetail.price;
    const productQuantity = cart.products[index].quantity;
    return acc + productPrice * productQuantity;
  }, 0);

  const applyCoupon = async () => {
    try {
      const couponResponse = await axios.get("http://localhost:5000/api/coupons", { headers });
      const foundCoupon = couponResponse.data.find(c => c.code === coupon);

      if (foundCoupon) {
        setDiscount(foundCoupon.discount);
      } else {
        console.error("Cupón no válido");
      }
    } catch (error) {
      console.error("Error al obtener cupones:", error);
    }
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const total = (subtotal-(subtotal * discount) + 59.99);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Carrito</Title>
        <Top />
        <Bottom>
          <Info>
            {productsDetails.map((productDetail, index) => (
              <Product key={cart.products[index].idProducto}>
                <ProductDetail>
                  <Image src={"https://firebasestorage.googleapis.com/v0/b/proyectotew-d69b0.appspot.com/o/products%2F" + productDetail._id + "%2F1.jpg?alt=media&token=5494075e-addc-4a20-9845-5506773a520c"} />
                  <Details>
                    <ProductName>
                      <b>Producto:</b> {productDetail.name}
                    </ProductName>
                    <ProductName>
                      <b>Descripcion:</b> {productDetail.desc}
                    </ProductName>
                    <ProductName>
                      <b>Precio:</b> {productDetail.price}
                    </ProductName>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>
                    $ {productDetail.price * cart.products[index].quantity}
                  </ProductPrice>
                  <ProductAmountContainer>
                    <FaPlus />
                    <ProductAmount>{cart.products[index].quantity}</ProductAmount>
                    <FaMinus />
                  </ProductAmountContainer>
                </PriceDetail>
                <DeleteIcon />
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Orden</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {subtotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Envio</SummaryItemText>
              <SummaryItemPrice>$ 59.99</SummaryItemPrice>
            </SummaryItem>
            {discount !== 0 && (

              <SummaryItem>
                <SummaryItemText>Descuento</SummaryItemText>
                <SummaryItemPrice>{discount * 100} %</SummaryItemPrice>
              </SummaryItem>
            )}
            <SummaryItem>
              <SummaryItemText style={{ marginTop: '10px' }}>Cupon</SummaryItemText>
              <CouponInput
                type="text"
                placeholder="Ingresa tu cupon"
                value={coupon}
                onChange={handleCouponChange}
              />
              <CouponButton onClick={applyCoupon}>Aplicar</CouponButton>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Lincestore"
              billingAddress
              shippingAddress
              description={`Total a pagar: $${total.toFixed(2)}`}
              amount={(total * 100).toFixed(0)}
              stripeKey={KEY}
            >
              <Button>Comprar ahora</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
