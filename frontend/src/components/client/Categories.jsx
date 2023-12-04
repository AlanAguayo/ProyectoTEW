import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import { ip } from '../../constants.js';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

`;

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://"+ip+":5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
