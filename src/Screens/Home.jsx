import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setSearch] = useState([]);
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0]);
    setfoodCategory(response[1]);

  }

  //For calling it once, we need to use empty array
  useEffect(() => {
    loadData()
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      {/* Caraousel */}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="container-fluid">
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                  {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>
              </div>
            </div>

            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/300×300/?burger" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?sweet" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?pizza" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container rounded">
        {
          foodCategory !== []
            ? foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr></hr>
                  {
                    foodItem !== []
                      ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toString().toLowerCase().includes(search.toString().toLowerCase())) 
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 m-2">
                              <Card
                                foodItem = {filterItems}
                                //foodName={filterItems.name}
                                options={filterItems.options[0]}
                                //imgSrc={filterItems.img}

                              />
                            </div>
                          )
                        })
                      :<div>"No such data found"</div>
                  }
                </div>
              )
            })
            : ""
        }

      </div>
      <div><Footer /></div>
    </div>
  );
}
