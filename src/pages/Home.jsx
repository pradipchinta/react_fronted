import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setdata(response.data);
    }
  };
  console.log(data);

  const onDeleteUser = async (id) => {
    if (window.confirm("are want to delete user")) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        getUsers();
      }
    }
  };
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">contact</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <Link to={`/update/${item.id}`}>
                <button className="btn btn-secondary">edit</button>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => onDeleteUser(item.id)}
              >
                Delete
              </button>
              {/* </Link> */}
              <Link to={`/view/${item.id}`}>
                <button className="btn btn-primary">view</button>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
