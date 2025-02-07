import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAlert } from "../../context/AlertContext";
import axios from "../../api/axios.js";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const DisplayProfile = ({ setEditing }) => {
  const { addAlert } = useAlert();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    pincode: "",
    country: "",
    state: "",
    district: "",
    block: "",
    context: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/personal");
        const data = response.data.data;
        if (data) {
          const {
            first_name,
            last_name,
            age,
            gender,
            pincode,
            address,
            context,
          } = data;
          setFormData({
            first_name,
            last_name,
            age,
            gender,
            pincode,
            country: address.country,
            state: address.state,
            district: address.district,
            block: address.block,
            context,
          });
        }
      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile__block">
      <div className="profile__span">
        <span className="profile__header">
          <div className="profile__title">Personal Information</div>
          <div className="profile__description">
            Review and update your personal details
          </div>
        </span>
      </div>
      <div className="profile__span">
        <div className="profile__container profile__container--big">
          <span className="profile__group">
            <div className="profile__input">
              <div className="profile__input--label">First Name</div>
              <div className="profile__input--value">{formData.first_name}</div>
            </div>
            <div className="profile__input">
              <div className="profile__input--label">Last Name</div>
              <div className="profile__input--value">{formData.last_name}</div>
            </div>
          </span>
          <span className="profile__group">
            <div className="profile__input">
              <div className="profile__input--label">Age</div>
              <div className="profile__input--value">{formData.age}</div>
            </div>
            <div className="profile__input">
              <div className="profile__input--label">Gender</div>
              <div className="profile__input--value">{formData.gender}</div>
            </div>
            <div className="profile__input">
              <div className="profile__input--label">Pincode</div>
              <div className="profile__input--value">{formData.pincode}</div>
            </div>
          </span>
          <span className="profile__group">
            <div className="profile__input">
              <div className="profile__input--label">Country</div>
              <div className="profile__input--value">{formData.country}</div>
            </div>
            <div className="profile__input">
              <div className="profile__input--label">State</div>
              <div className="profile__input--value">{formData.state}</div>
            </div>
          </span>
          <span className="profile__group">
            <div className="profile__input">
              <div className="profile__input--label">District</div>
              <div className="profile__input--value">{formData.district}</div>
            </div>
            <div className="profile__input">
              <div className="profile__input--label">Block</div>
              <div className="profile__input--value">{formData.block}</div>
            </div>
          </span>
        </div>
        <div className="profile__container profile__container--big">
          <div className="profile__input">
            <div className="profile__input--label">Context</div>
            <div className="profile__input--textarea">{formData.context}</div>
          </div>
        </div>
      </div>
      <div className="profile__span">
        <button
          type="button"
          className="profile__button"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(DisplayProfile);
