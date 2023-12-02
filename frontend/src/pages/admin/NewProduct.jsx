import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
`;

const NewProductForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const NewProductItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const NewProductItemLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const NewProductItemInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewProductButton = styled.button`
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
  margin-right: 10px; /* Ajusta el margen según tus preferencias */
`;

const StyledButton = styled.button`
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px; /* Ajusta el margen según tus preferencias */
`;

const StyledItemList = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 5px; /* Ajusta el margen según tus preferencias */
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

const NewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    category: "",
    size: [],
    color: [],
    price: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [firebaseImageUrls, setFirebaseImageUrls] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const uploadPromises = acceptedFiles.map((file) => {
      const storageRef = ref(storage, `products/${id}/${file.name}`);
      return uploadBytes(storageRef, file);
    });

    try {
      const uploadedFiles = await Promise.all(uploadPromises);
      const fileUrls = uploadedFiles.map((file) => getDownloadURL(file.ref));
      const resolvedUrls = await Promise.all(fileUrls);

      setImages([...images, ...acceptedFiles]);
      setFirebaseImageUrls([...firebaseImageUrls, ...resolvedUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);

    const updatedUrls = [...firebaseImageUrls];
    updatedUrls.splice(index, 1);

    setImages(updatedImages);
    setFirebaseImageUrls(updatedUrls);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const lastProductResponse = await axios.get("http://localhost:5000/api/products");
      const lastProductId = lastProductResponse.data.length;
      let newProductId = lastProductId + 1;

      const productData = {
        id: newProductId,
        name: formData.name,
        desc: formData.desc,
        category: formData.category,
        size: sizes,
        color: colors,
        price: parseFloat(formData.price),
      };

      await axios.post("http://localhost:5000/api/products", productData);

      const imageUploadPromises = images.map((file, index) => {
        const storageRef = ref(storage, `products/${newProductId}/${index + 1}.jpg`);
        return uploadBytes(storageRef, file);
      });

      await Promise.all(imageUploadPromises);

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

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <h1>Producto</h1>
          <NewProductForm>
            <NewProductItem>
              <NewProductItemLabel>Nombre</NewProductItemLabel>
              <NewProductItemInput
                type="text"
                placeholder="Camisa"
                value={formData.name || ""}
                onChange={handleInputChange}
                name="name"
              />
            </NewProductItem>
            <NewProductItem>
              <NewProductItemLabel>Descripción</NewProductItemLabel>
              <NewProductItemInput
                type="text"
                placeholder="Buena calidad"
                value={formData.desc || ""}
                onChange={handleInputChange}
                name="desc"
              />
            </NewProductItem>
            <NewProductItem>
              <NewProductItemLabel>Categorías</NewProductItemLabel>
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
            </NewProductItem>
            <NewProductItem>
              <NewProductItemLabel>Color</NewProductItemLabel>
              <div>
                <StyledInput
                  type="text"
                  placeholder="Color"
                  value={formData.color}
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
            </NewProductItem>

            <NewProductItem>
              <NewProductItemLabel>Tamaño</NewProductItemLabel>
              <div>
                <StyledInput
                  type="text"
                  placeholder="Tamaño"
                  value={formData.size}
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
            </NewProductItem>

            <NewProductItem>
              <NewProductItemLabel>Precio</NewProductItemLabel>
              <NewProductItemInput
                type="text"
                placeholder="99.99"
                value={formData.price || ""}
                onChange={handleInputChange}
                name="price"
              />
            </NewProductItem>
            <NewProductItem>
              <NewProductItemLabel>Imágenes</NewProductItemLabel>
              <StyledDropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta imágenes aquí o haz clic para seleccionarlas</p>
              </StyledDropzone>
              <div>
                {images.map((image, index) => (
                  <StyledImageContainer key={index}>
                    <StyledImage src={URL.createObjectURL(image)} alt={`Imagen ${index}`} />
                    <StyledTrashIcon onClick={() => removeImage(index)} />
                  </StyledImageContainer>
                ))}
              </div>
            </NewProductItem>
          </NewProductForm>
          <NewProductButton className="newProductButton" onClick={handleCreateProduct}>
            Guardar
          </NewProductButton>
        </MainContent>
      </Container>
    </div>
  );
};

export default NewProduct;
