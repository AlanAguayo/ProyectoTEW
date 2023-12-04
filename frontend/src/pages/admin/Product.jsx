import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
import { list, getDownloadURL, deleteObject } from 'firebase/storage';
import { checkAdmin, getToken } from "../../authUtils";
import { ip } from '../../constants.js';


const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
`;

const ProductForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const ProductItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const ProductItemLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const ProductItemInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const ProductButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-right: 10px;
`;

const StyledButton = styled.button`
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const StyledItemList = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledDropzone = styled.div`
  border: 2px dashed gray;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
`;

const StyledTrashIcon = styled(FaTrash)`
  cursor: pointer;
  color: red;
`;

const ChartContainer = styled.div`
  width: 1000px;
  height: 300px;
  margin-bottom: 20px;
`;

const Product = () => {
  const navigate = useNavigate();

  const token = getToken();

  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
  };
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    category: "",
    size: [],
    color: [],
    price: "",
  });
  const [orders, setOrders] = useState([]);

  const onDrop = async (acceptedFiles) => {
    try {
      const imagesRef = ref(storage, `products/${id}`);
      const imageList = await list(imagesRef);
  
      const existingImageNumbers = imageList.items.map((item) => {
        const [, number] = item.name.match(/(\d+)\.jpg/);
        return parseInt(number);
      });
  
      const nextImageNumber = existingImageNumbers.length > 0 ? Math.max(...existingImageNumbers) + 1 : 1;
  
      const uploadPromises = acceptedFiles.map(async (file) => {
        const storageRef = ref(storage, `products/${id}/${nextImageNumber}.jpg`);
        await uploadBytes(storageRef, file);
      });
  
      await Promise.all(uploadPromises);
  
      const newImages = await Promise.all(
        Array.from({ length: acceptedFiles.length }, (_, index) =>
          getDownloadURL(ref(storage, `products/${id}/${nextImageNumber + index}.jpg`))
        )
      );
  
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error("Error al subir nuevas imágenes:", error);
    }
  };

  const removeImage = async (index) => {
    try {
      const storageRef = ref(storage, `products/${id}/${index + 1}.jpg`);
      await deleteObject(storageRef);
  
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  useEffect(() => {
    checkAdmin(navigate);
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/api/products/${id}`,{headers});
        const productData = response.data;

        setFormData({
          name: productData.name,
          desc: productData.desc,
          category: productData.category,
          size: productData.size,
          color: productData.color,
          price: productData.price,
        });

        setColors(productData.color);
        setSizes(productData.size);


        const category = await axios.get(`http://${ip}:5000/api/categories/${productData.category}`,{headers});
        const selectedCategoryOption = { value: category.data._id, label: category.data.name };
        setSelectedCategory(selectedCategoryOption);

        const imagesRef = ref(storage, `products/${id}`);
        const imageList = await list(imagesRef);

        const imageDownloadURLs = await Promise.all(
          imageList.items.map(async (imageRef) => getDownloadURL(imageRef))
        );

        setImages(imageDownloadURLs);

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://"+ip+":5000/api/categories",{headers});
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://"+ip+":5000/api/orders",{headers});
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    fetchProductData();

    fetchOrders();
  }, [id],[navigate]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const productData = {
        name: formData.name,
        desc: formData.desc,
        category: formData.category,
        size: sizes,
        color: colors,
        price: parseFloat(formData.price),
      };

      await axios.put("http://"+ip+":5000/api/products/"+id, productData,{headers});

      navigate("/admin/products");
    } catch (error) {
      console.error("Error al crear/editar producto:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const addColor = () => {
    setColors((prevColors) => [...prevColors, formData.color]);
    setFormData((prevData) => ({ ...prevData, color: "" }));
  };

  const removeColor = (index) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors.splice(index, 1);
      return updatedColors;
    });
  };

  const addSize = () => {
    setSizes((prevSizes) => [...prevSizes, formData.size]);
    setFormData((prevData) => ({ ...prevData, size: "" }));
  };

  const removeSize = (index) => {
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes.splice(index, 1);
      return updatedSizes;
    });
  };

  const salesData = orders
  .filter((order) => order.products.some((product) => product.productId === id))
  .map((order) => {
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const quantitySold = order.products
      .filter((product) => product.productId === id)
      .reduce((total, product) => total + product.quantity, 0);
    return { month, year, quantitySold };
  });

  const groupedData = salesData.reduce((acc, data) => {
    const key = `${data.year}-${data.month}`;
    if (!acc[key]) {
      acc[key] = { month: data.month, year: data.year, quantitySold: 0 };
    }
    acc[key].quantitySold += data.quantitySold;
    return acc;
  }, {});

  const monthlySalesData = Object.values(groupedData);

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <h1>Producto</h1>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantitySold" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <ProductForm>
            <ProductItem>
              <ProductItemLabel>Nombre</ProductItemLabel>
              <ProductItemInput
                type="text"
                placeholder="Camisa"
                value={formData.name || ""}
                onChange={handleInputChange}
                name="name"
              />
            </ProductItem>
            <ProductItem>
              <ProductItemLabel>Descripción</ProductItemLabel>
              <ProductItemInput
                type="text"
                placeholder="Buena calidad"
                value={formData.desc || ""}
                onChange={handleInputChange}
                name="desc"
              />
            </ProductItem>
            <ProductItem>
              <ProductItemLabel>Categorías</ProductItemLabel>
              <Select
                options={categories.map((category) => ({ value: category._id, label: category.name }))}
                value={selectedCategory}
                onChange={(selectedOption) => {
                  setSelectedCategory(selectedOption);
                  setFormData((prevData) => ({
                    ...prevData,
                    category: selectedOption ? selectedOption.value : null,
                  }));
                }}
              />

            </ProductItem>
            <ProductItem>
              <ProductItemLabel>Color</ProductItemLabel>
              <div>
                <StyledInput
                  type="text"
                  placeholder="Color"
                  onChange={(e) => setFormData((prevData) => ({ ...prevData, color: e.target.value }))}
                />
                <StyledButton type="button" onClick={addColor}>
                  Agregar Color
                </StyledButton>
              </div>
              <StyledItemList>
                {colors.map((color, index) => (
                  <div key={index}>
                    {color}
                    <StyledButton type="button" onClick={() => removeColor(index)}>
                      Eliminar
                    </StyledButton>
                  </div>
                ))}
              </StyledItemList>
            </ProductItem>

            <ProductItem>
              <ProductItemLabel>Tamaño</ProductItemLabel>
              <div>
                <StyledInput
                  type="text"
                  placeholder="Tamaño"
                  onChange={(e) => setFormData((prevData) => ({ ...prevData, size: e.target.value }))}
                />
                <StyledButton type="button" onClick={addSize}>
                  Agregar Tamaño
                </StyledButton>
              </div>
              <StyledItemList>
                {sizes.map((size, index) => (
                  <div key={index}>
                    {size}
                    <StyledButton type="button" onClick={() => removeSize(index)}>
                      Eliminar
                    </StyledButton>
                  </div>
                ))}
              </StyledItemList>
            </ProductItem>

            <ProductItem>
              <ProductItemLabel>Precio</ProductItemLabel>
              <ProductItemInput
                type="text"
                placeholder="99.99"
                value={formData.price || ""}
                onChange={handleInputChange}
                name="price"
              />
            </ProductItem>
            <ProductItem>
              <ProductItemLabel>Imágenes</ProductItemLabel>
              <StyledDropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta imágenes aquí o haz clic para seleccionarlas</p>
              </StyledDropzone>
              <div>
                {images.map((image, index) => (
                  <StyledImageContainer key={index}>
                    <StyledImage src={image} alt={`Imagen ${index}`} />
                    <StyledTrashIcon onClick={() => removeImage(index)} />
                  </StyledImageContainer>
                ))}
              </div>
            </ProductItem>
          </ProductForm>
          <ProductButton className="productButton" onClick={handleCreateProduct}>
            Guardar
          </ProductButton>
        </MainContent>
      </Container>
    </div>
  );
};

export default Product;
