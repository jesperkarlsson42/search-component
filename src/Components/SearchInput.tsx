import React, { useEffect, useState } from "react";
import "./searchInput.css";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";

interface IData {
  name: string;
  id: number;
}

interface IProps {
  data: IData[];
  placeholder: string;
}

function SearchInput({ data, placeholder }: IProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [addedItems, setAddedItems] = useState<IData[]>([]);

  useEffect(() => {
    let newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }, [searchTerm, data, filteredData]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
  };

  const addItem = (value: IData) => {
    setAddedItems([...addedItems, value]);
    setSearchTerm("");
  };

  const removeItem = (value: IData) => {
    let newArray: IData[] = addedItems;
    for (let i = 0; i < addedItems.length; i++) {
      if (value.id === newArray[i].id) {
        newArray.splice(i, 1);
      }
    }
    setAddedItems(newArray);
  };

  const clearAllItems = () => {
    setAddedItems([]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {searchTerm.length >= 1 ? (
            <MdOutlineClear
              className="icon"
              id="clearBtn"
              onClick={clearInput}
            />
          ) : (
            <FaSearch className="icon" />
          )}
        </div>
      </div>

      {addedItems.length !== 0 && (
        <div className="addedItemsContainer">
          {addedItems.map((i) => {
            return (
              <div key={i.id} className="addedItem">
                <p>{i.name}</p>
                <MdOutlineClear
                  className="removeItem"
                  onClick={() => removeItem(i)}
                />
              </div>
            );
          })}
          <div className="clearContainer">
            <button className="clearAllItems" onClick={clearAllItems}>
              Clear all
            </button>
          </div>
        </div>
      )}

      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((value) => {
            return (
              <p
                className="dataItem"
                key={value.id}
                onClick={() => addItem(value)}
              >
                {value.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
