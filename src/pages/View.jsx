import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./view.css";
const View = () => {
  const [User, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setUser({ ...response.data[0] });
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Details </p>
          <strong>ID: </strong>
          <span>{id} </span>
          <br />
          <br />
          <strong>Name: </strong>
          <strong>{User && User.name} </strong>
          <br />
          <br />
          <strong>email: </strong>
          <span>{User && User.email} </span>
          <br />
          <br />
          <strong>contact: </strong>
          <span>{User && User.contact} </span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-success"> go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
