import styled from "styled-components";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

const NewCategoryGenderInput = styled.input`
  margin-top: 15px;
`;

const NewCategoryGenderLabel = styled.label`
  margin: 10px;
  font-size: 18px;
  color: #555;
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

const NewCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });

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
      if (id!=="new") {
        await axios.put(`http://localhost:5000/api/categories/${id}`, formData);
      } else {
        await axios.post(`http://localhost:5000/api/categories`, formData);
      }
      navigate("/admin/categories");
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
