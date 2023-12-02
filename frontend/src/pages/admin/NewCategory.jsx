import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../firebase"
import { ref, uploadBytes } from 'firebase/storage';
import { FaCamera } from "react-icons/fa";

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 4;
`;

const NewCategoryForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const NewCategoryItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const NewCategoryItemImage = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-right: 20px;
`;

const NewCategoryItemLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const NewCategoryItemInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewCategoryButton = styled.button`
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

const CategoryListImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const InputFile = styled.input`
display:none
`;

const NewCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [image, setImage] = useState("");
  
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview("");
    }

    setImage(selectedImage);
  };

  useEffect(() => {
    if(id!=="new"){
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    if (id!=="new") {
      fetchCategoryData();
    }
  }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCategory = async () => {
    try {
      let categoryId = id;
      if (id!=="new") {
        await axios.put(`http://localhost:5000/api/categories/${id}`, formData);
      } else {
        const response = await axios.post(`http://localhost:5000/api/categories`, formData);
        categoryId = response.data._id;
      }
      navigate("/admin/categories");
    
      if(image==null){
        
      }else{
        const imageRef = ref(storage, `categories/${categoryId}.jpg`)
        uploadBytes(imageRef, image);
      }
    } catch (error) {
      console.error("Error al crear/editar categoría:", error);
    }
  };

  return (
    <div>
      <Topbar />
      <Container>
        <Sidebar />
        <MainContent>
          <h1>Categoria</h1>
          <NewCategoryForm>
                    <NewCategoryItemImage>
          <InputFile
            id="fileInput"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput">
            {imagePreview ? (
              <CategoryListImg src={imagePreview} alt="Preview" />
            ) : (
              <>
                <FaCamera style={{width:30, height:30}}/>
              </>
            )}
          </label>
        </NewCategoryItemImage>
        <NewCategoryItem>
          <NewCategoryItemLabel>Nombre</NewCategoryItemLabel>
          <NewCategoryItemInput
            type="text"
            placeholder="Ropa"
            value={formData.name || ""}
            onChange={handleInputChange}
            name="name"
          />
        </NewCategoryItem>
      </NewCategoryForm>
      <NewCategoryButton className="newCategoryButton" onClick={handleCreateCategory}>
            Guardar
          </NewCategoryButton>
        </MainContent>
      </Container>
    </div>
  );
};

export default NewCategory;
