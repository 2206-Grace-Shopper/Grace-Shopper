import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPlants } from "../api/index";


const RenderPots = () => {
    const [allPlants, setAllPlants] = useState([]);
  useEffect(() => {
    getAllPlants().then((results) => {
      setAllPlants(results);
    });
  }, []);


  return (
    <div id="AllPlantsPage">
      <h1 className="PageHeader" id="ProfileHeader">
        PLANT HOMES
      </h1>

      <div>
        <div>
          {allPlants.length ? (
            allPlants.map((element) => {
              const { id, name, price, categoryId, image_url } = element;
              const image = element.image_url
              if (element.categoryId === 4) {
                return (
                  <div id="PotNames" key={element.id} className="EachProduct">
                    <h3 id="name">{element.name}</h3>
                    <p id="price">${element.price}</p>
                    <img src={image} alt={element.name} width={200}/>
                    <NavLink to={`/RenderPots/${id}`}>View Product</NavLink>
                  </div>
                );
              }
            })
          ) : (
            <div> Loading your Pots... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderPots;