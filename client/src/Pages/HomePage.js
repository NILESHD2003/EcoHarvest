import React from "react";
import { useDispatch } from "react-redux";
import Card from "../Components/Card";
import { Feautres } from "../Utils/Navlinks";
const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <div className="home">
      <div className="home-slidebar">
        <div className="home-slidebar-img">
          <img
            src="https://aginvestcanada.com/wp-content/uploads/2020/04/Agriculture-01.jpeg"
            alt=""
          />
        </div>
        <div className="home-slidebar-text">
          <h2>Welcome to EcoHarvest</h2>
          <p>Your ont-step solution for all farm management needs</p>
          <div className="home-search">
            <input
              type="text"
              className="home-search-text"
              placeholder="Enter Your Farm Name"
            />
            <button className="home-search-search btn--green">Search</button>
          </div>
        </div>
      </div>
      <div className="home__ourServices">
        <h2>Our Services</h2>
        <h4>
          we Offer a wide range of AI-powered services to help you improve your
          farm operations
        </h4>
        <div className="row">
          {Feautres.map((item, index) => {
            return (
              <Card
                key={index}
                link={item.link}
                img={item.img}
                Heading={item.Heading}
                amount={item.amount}
                recommended={item.recommended}
              ></Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
