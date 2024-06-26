import React, { createContext, useState, useEffect } from 'react';
import Api from '../api/api.source';
export const CategoryContext = createContext();
const apiInstance = Api.instance;

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();

    useEffect(() => {
        const fetchCategories = async () => {
            apiInstance.getAxios().get('/categories')
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
        fetchCategories();
    }, []);

    const changeCategory = (category) => {
        setCategory(category);
    };

    return <CategoryContext.Provider value={{
        categories,
        category,
        changeCategory,
    }}>
        {children}
    </CategoryContext.Provider>;
};

export default CategoryProvider;
