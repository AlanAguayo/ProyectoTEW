import { FaPlus , FaMinus } from "react-icons/fa";
import styled from "styled-components";
import Footer from "../../components/client/Footer";
import Navbar from "../../components/client/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Announcement from "../../components/client/Announcement";
import axios from 'axios';
import { getToken } from "../../authUtils";
import { useNavigate } from 'react-router-dom';
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const FilterSizeButton = styled.button`
  margin-left: 10px;
  padding: 5px;
  cursor: pointer;
`;



const Product = () => {
  const token = getToken();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  const idProducto = location.pathname.split("/")[2];
  const idUser = localStorage.getItem('id');

  useEffect(() => {
    getData();
  }, [navigate]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${idProducto}`
      );
      setData(response.data); 
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  }

  const postData = async () => {
    if (color != '' && size != '') {
      setError('');
      try {
        const response = await axios.post(`http://localhost:5000/api/carts`,
          {
            userId: idUser,
            products: [
              {
                productId: idProducto,
                name: data.name,
                quantity: quantity,
                color: color,
                size: size, 
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Producto agregado al carrito:', response.data);
        dispatch(
          addProduct({ ...data, quantity, color, size })
        );
      } catch (error) {
        console.error("Error:", error);
    
        if (error.response) {
          console.error("Response data:", error.response.data);

          if (error.response.status === 409) {
            navigate("/login");
          }
        }
      }
    }else{
      setError("Seleccione un tamaño y color");
    }
  }

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleColorChange = (selectedColor) => {
    setError('');
    setColor(selectedColor);
  };

  const handleSizeChange = (selectedSize) => {
    setError('');
    setSize(selectedSize);
  };

  return (
    <Container>
      <Announcement/>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={"https://firebasestorage.googleapis.com/v0/b/proyectotew-d69b0.appspot.com/o/products%2F" + data?._id + "%2F1.jpg?alt=media&token=5494075e-addc-4a20-9845-5506773a520c"} alt="Producto" />
        </ImgContainer>
        <InfoContainer>
          <Title>{data?.name}.</Title>
          <Desc>{data?.desc}.</Desc>
          <Price>$ {data?.price}.</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {data.color?.map((s) => (
                <FilterSizeButton key={s} onClick={() => handleColorChange(s)}>
                  {s}
                </FilterSizeButton>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Tamaño</FilterTitle>
              {data.size?.map((s) => (
                <FilterSizeButton key={s} onClick={() => handleSizeChange(s)}>
                  {s}
                </FilterSizeButton>
              ))}
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <FaMinus onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <FaPlus onClick={() => handleQuantity("inc")} />
            </AmountContainer>            
            <Button onClick={postData}>AGREGAR AL CARRITO</Button>
          </AddContainer>
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;