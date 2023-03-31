import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import FemaleAvatar from "../../assets/female-avatar.svg";
import LogoutIcon from "../../assets/logout.svg";
import BrandLogo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import ButtonComponent from "../../components/button";
import { useRecoilState } from "recoil";
import { employeeDetailsState } from "../../atoms";
import BusyOverlay from "../../components/BusyOverlay";
import { useUpdateUserDataMutation } from "../../operations/mutations";
import Moment from "react-moment";
import "moment-timezone";

const LogoutModal = ({ show, setShow, handleDelete, deleteText }) => {
  return (
    <div className={`delete-overlay ${show && "delete-overlay-show"}`}>
      <div
        className={`delete-overlay-content ${
          show && "delete-overlay-content-show"
        }`}
      >
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
          </svg>
        </figure>
        <h2 className="text-gray-400 font-medium my-3 text-xl">
          Are you sure?
        </h2>

        <div className="flex w-full justify-center space-x-4">
          <button
            className="text-orange-400 font-medium"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button className="text-red-600 font-medium" onClick={handleDelete}>
            {deleteText || "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const [openQrReader, setOpenQrReader] = useState(false);
  const [codeResult, setCodeResult] = useState("");
  const [userProfile, setEmployeeState] = useRecoilState(employeeDetailsState);
  const [pageLoading, setPageLoading] = useState(false);
  const { mutate, isError } = useUpdateUserDataMutation();

  const handleOpenMenu = () => {
    navigate("/login");
  };
  const navigate = useNavigate();
  const qrScannerRef = useRef();
  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
  };
  return (
    <>
      <BusyOverlay loading={pageLoading} />
      <LogoutModal
        show={openLogout}
        setShow={setOpenLogout}
        handleDelete={handleOpenMenu}
        warningMessage={"You might have unsaved changes"}
        deleteText={"Log Out"}
      />
      <div className="bg-neutral-400 px-5 pt-10 pb-20 min-h-screen">
        <div className="flex items-center justify-end">
          <div className="flex justify-between w-full items-center mb-3">
            <span>
              <img src={BrandLogo} alt="epic logo" />
            </span>
            <h2 className="text-gray-300 font-bold text-lg ">My Profile</h2>
            <span onClick={() => setOpenLogout(true)}>
              <img src={LogoutIcon} alt="" />
            </span>
          </div>
        </div>
        <div className="bg-white shadow-lg pb-10 pt-5 px-5 rounded-lg flex flex-col space-y-4 items-center">
          <img src={FemaleAvatar} alt="" className="mb-4" />
          <h2 className="text-gray-300 font-bold text-base mb-5 tracking-wide">
            Name: {userProfile?.name}
          </h2>

          <p className="text-gray-600 font-bold text-sm mb-10 tracking-wide">
            Department: {userProfile?.department}
          </p>
          <div className="flex space-x-3 items-center">
            <p className="text-gray-600 font-bold text-sm tracking-wide">
              Meal Status:
            </p>
            <span
              className={`text-sm border rounded font-medium px-4 h-34 flex justify-center items-center
             ${
               userProfile?.mealStatus?.toLowerCase() === "active"
                 ? "text-green-200  border-green-200 bg-green-100 "
                 : "text-gray-600 border-gray-600 bg-gray-700"
             }
            `}
            >
              {userProfile?.mealStatus}
            </span>
          </div>
        </div>
        <div className="bg-white shadow-lg px-14 mt-5 py-10 rounded-lg flex flex-col space-y-3 items-center">
          {!!openQrReader && (
            <div className="w-28 h-100  border-4 border-gray-400">
              <QrReader
                size={256}
                // constraints={ faci: 'user' }
                onResult={(result, error) => {
                  setPageLoading(true);

                  console.log("result");
                  if (!codeResult && !!result) {
                    mutate(result.text);
                    setOpenQrReader(false);
                    setPageLoading(false);
                    setCodeResult(result.text);
                    stopScanning();
                  }

                  if (!!error) {
                    setPageLoading(false);
                  }
                }}
                style={{ width: "100%" }}
              />
            </div>
          )}
          {userProfile?.mealStatus?.toLowerCase() === "active" && (
            <div className="w-full mt-5 whitespace-nowrap flex justify-center">
              <ButtonComponent
                btnText="SCAN QR CODE"
                disabled={false}
                callToAction={() => {
                  setOpenQrReader(true);
                }}
              />
            </div>
          )}
          {userProfile?.mealStatus?.toLowerCase() === "inactive" && (
            <p>
              {
                <Moment format="DD-MMM-YY -  hh:mm A">
                  {new Date(userProfile?.lastUpdated)}
                </Moment>
              }
            </p>
          )}
          <p className="text-gray-600 text-center text-sm mb-10 tracking-wider pt-5">
            {userProfile?.mealStatus?.toLowerCase() === "active"
              ? "You haven’t used your meal ticket today"
              : "You've already reached your daily meal allowance. Check back again tomorrow"}
          </p>

          <p>{codeResult}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
