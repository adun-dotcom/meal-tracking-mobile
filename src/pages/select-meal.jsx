import React, { useState } from "react";
import Amala from "../assets/amala-ewedu.png";
import Jollof from "../assets/jollof.png";
import YamAndEgg from "../assets/yam-egg.png";
import BackArrow from "../assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/button";

const menuLists = [
  {
    foodImg: Amala,
    foodName: "Amala with gberii & ewedu",
  },
  {
    foodImg: YamAndEgg,
    foodName: "Yam and Egg sauce",
  },
  {
    foodImg: Jollof,
    foodName: "Jollof rice with chicken and dodo",
  },
  {
    foodImg: Amala,
    foodName: "Amala with gberii & ewedu",
  },
  {
    foodImg: YamAndEgg,
    foodName: "Yam and Egg sauce",
  },
];
const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <div className="px-6 pt-10 pb-20 min-h-screen">
      <div className="flex space-x-14 items-center">
        <span onClick={() => navigate("/profile")}>
          <img src={BackArrow} alt="" />
        </span>
        <h2 className="text-gray-300 font-bold text-lg ">Select Meal</h2>
      </div>

      <div className="mt-12">
        {menuLists.map((menu, menuItem) => {
          return (
            <div key={menuItem} className="flex space-x-10 items-center mb-8">
              <img src={menu.foodImg} alt="" className="h-100  w-100" />
              <div>
                <p className="text-sm font-medium text-gray-400 pr-6 leading-7">
                  {menu.foodName}
                </p>
                <button
                  onClick={() => setSelectedMeal(menuItem)}
                  className={`rounded-md w-100 flex items-center justify-center h-25 font-semibold text-xs border  mt-4
                ${
                  selectedMeal === menuItem
                    ? "bg-orange-400 border-orange-400 text-white"
                    : selectedMeal === null
                    ? "border-orange-400 text-orange-400 bg-white"
                    : "bg-white border-gray-500 text-gray-500"
                }
                `}
                >
                  Select{selectedMeal === menuItem ? "ed" : ""}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full mt-14">
        <ButtonComponent
          fullWidth
          btnText="Proceed"
          disabled={selectedMeal === null}
          callToAction={() => navigate("/confirm-menu")}
        />
      </div>
    </div>
  );
};

export default MenuPage;
