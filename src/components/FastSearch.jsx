import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const FastSearch = () => {
  const { changeSearch,searchDialogOpen,setSearchDialogOpen } = useContext(SearchContext);
  const [searchText, setSearchText] = useState();
  const navigate = useNavigate();
  return (
    <div className={`w-full h-screen justify-center items-center ${searchDialogOpen ? 'flex' : 'hidden'}`}>
      <div className="w-full h-screen bg-black fixed z-50 top-0 opacity-70 flex justify-center items-center"
      onClick={()=>setSearchDialogOpen(false)}
      >
        <input
          onChange={(event) =>
            setSearchText(
              event.target.value.length === 0 ? undefined : event.target.value
            )
          }
          className="bg-white p-2 flex items-center justify-between ml-2
        text-l focus:border-transparent focus:ring-0 outline-none rounded-lg w-[500px]"
          type="text"
        ></input>
        <CiSearch
          className="mx-2 text-white border h-10 w-10 p-1 rounded-lg cursor-pointer"
          onClick={() => {
            navigate('/products');
            changeSearch(searchText);
            setSearchDialogOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default FastSearch;
