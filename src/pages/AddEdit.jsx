import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./addedit.css";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  email: "",
  contact: "",
};

const addUser = async (data) => {
  const response = await axios.post(`http://localhost:5000/user/${data}`);
  if (response.status === 200) {
    toast.success(response.data);
  }
};

const updateUser = async (data, id) => {
  const response = await axios.put(`http://localhost:5000/user/${id}`);
  if (response.status === 200) {
    toast.success(response.data);
  }
};
const AddEdit = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialState);
  const { name, email, contact } = initialState;
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setData({ ...response.data[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("please provide value");
    } else {
      if (!id) {
        addUser(data);
      } else {
        updateUser(data, id);
      }
      setTimeout(() => history("/", { replace: true }));
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="enter name"
          onChange={handleInputChange}
          value={data.name}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="enter email"
          onChange={handleInputChange}
          value={data.email}
        />
        <label htmlFor="contact">contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="enter contact"
          onChange={handleInputChange}
          value={data.contact}
        />
        <input type="submit" value={id ? "update" : "add"} />
      </form>
    </div>
  );
};

export default AddEdit;
