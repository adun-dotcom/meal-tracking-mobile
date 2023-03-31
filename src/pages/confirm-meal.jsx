import React, { useState } from "react";
import Amala from "../assets/amala-ewedu.png";
import BackArrow from "../assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/button";

const ConfirmMenuPage = () => {
  const navigate = useNavigate();
  const [selectedMeal, setSelectedMeal] = useState({
    foodImg: Amala,
    foodName: "Amala with gbegiri & ewedu",
  });
  return (
    <div className="px-6 pt-10 pb-20 min-h-screen">
      <div className="flex space-x-14 items-center">
        <span onClick={() => navigate("/profile")}>
          <img src={BackArrow} alt="" />
        </span>
        <h2 className="text-gray-300 font-bold text-lg ">Select Meal</h2>
      </div>

      <div className="mt-24">
        <div className="flex space-x-10 items-center mb-8">
          <img src={selectedMeal.foodImg} alt="" className="h-100  w-100" />
          <div>
            <p className="text-sm font-medium text-gray-400 pr-6 leading-7">
              {selectedMeal.foodName}
            </p>
            <button
              onClick={() => navigate("/menu-page")}
              className="rounded-md w-100 flex items-center justify-center h-25 font-semibold text-xs border  mt-4
              
                bg-orange-400 border-orange-400 text-white"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-40">
        <ButtonComponent
          fullWidth
          btnText="Place Order"
          disabled={false}
          type
          callToAction={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default ConfirmMenuPage;
