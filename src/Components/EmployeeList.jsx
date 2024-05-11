import React, { useState, useEffect } from "react";
import moment from "moment";
import Navbar from "./Navbar";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
const EmployeeList = () => {
  let UserDetails = JSON.parse(sessionStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [addUser, setAddUser] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchItem, setSearchItem] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Create Employee
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState();
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var mobilevalid = /^[6-9][0-9]{9}$/;
  var Name = /^[a-zA-Z][a-zA-Z]/;
  const add = async (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Enter Your name");
    }
    if (!name.match(Name)) {
      return alert("Please Enter Valid Name");
    }
    if (!email) {
      return alert("Enter Your Email");
    }
    if (!email.match(validRegex)) {
      return alert("Please Enter Valid Email-Id");
    }
    if (!mobileNo) {
      return alert("Enter Contact Number");
    }
    if (mobileNo.length !== 10) {
      return alert("Enter Contact Number should be 10 digits");
    }

    if (!mobileNo.match(mobilevalid)) {
      return alert("Enter Valid Contact Number");
    }
    if (!designation) {
      return alert("Select Your Designation");
    }

    if (!gender) {
      return alert("Select Your Gender");
    }

    if (!course) {
      return alert("Select Your Courses");
    }

    try {
      const config = {
        url: "/add/adduser/",
        method: "post",
        baseURL: "http://localhost:8080/api",
        headers: { "content-type": "multipart/form-data" },
        data: {
          Name: name,
          MobileNo: mobileNo,
          Email: email,
          Designation: designation,
          Gender: gender,
          Course: course,
          Image: image,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          window.location.assign("/employeelist");
          setName("");
          setMobileNo("");
          setEmail("");
          setDesignation("");
          setGender("");
          setCourse("");
          setImage("");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  // ----------------------------------------------------------

  const getAllEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getemployee/sortBy?page=${pagination.currentPage}&limit=5&search=${searchItem}&sort=${sortBy}&order=${sortOrder}`
      );
      if (res.status === 200) {
        setAddUser(res.data.employees);
        setPagination({
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/del/employees/${userId}`
      );
      if (res.status === 200) {
        alert(res.data.success);
        getAllEmployees();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserDetails = JSON.parse(sessionStorage.getItem("user"));
    if (!UserDetails) {
      alert("Please login first");
      window.location.assign("/login");
    } else {
      getAllEmployees();
    }
  }, [pagination.currentPage, sortBy, sortOrder, searchItem]);

  return (
    <>
      <Navbar />
      <div className="add-gr">
        <div className="container">
          <h5 className="mt-4">Employee List</h5>
          <div
            className="ad-b mt-4"
            style={{
              display: "flex",
              gap: "21px",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <div className="do-sear mt-2 d-flex ">
              <label htmlFor="">Search</label>
              <input
                type="text"
                placeholder="Search"
                className="vi_0"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />

              <label htmlFor="sortby">SortBy</label>

              <select
              id="sortby"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setSortOrder("asc"); // Resetting sortOrder to "asc" when selecting a new column
                }}
              >
                <option value="Name">Name</option>
                <option value="Email">Email</option>
                <option value="CreateDate">Create Date</option>
                <option value="_id">id</option>
              </select>
            </div>
            <div className="">
              {" "}
              <Button className="btn-success" onClick={handleShow}>
                Create Employee
                <i
                  className="fa-solid fa-plus fa-sm"
                  style={{ color: "#ffffff" }}
                ></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="mo-gra mt-5">
            <Table
              responsive
              striped
              bordered
              hover
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th>Unique Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Create Date</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {addUser?.filter((item1) => {
                
                 
                  if (
                    
                    (searchItem === "" ||
                      item1?.Name?.toLowerCase()?.includes(searchItem) ||
                      item1?.Email?.toLowerCase()?.includes(
                        searchItem?.toLowerCase()
                      ) ||
                      item1?.MobileNo?.toString()?.includes(
                        searchItem
                      ) ||
                      item1?.Course?.toLowerCase()?.includes(
                        searchItem?.toLowerCase()
                      ) ||
                      item1?.Gender?.toString()?.includes(
                        searchItem
                      ) || item1?.Designation?.toString()?.includes(
                        searchItem
                      ) ||
                      (moment(item1.CreateDate).format("DD-MM-YYYY"))
                      ?.includes(
                        searchItem?.toLowerCase()
                      ))
                  
                  ) {
                    return true;
                  }
                  return false;
                })?.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>
                        {" "}
                        <Image
                          src={`http://localhost:8080/adduser/${item.Image}`}
                          alt="pic"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{item.Name}</td>
                      <td>{item.Email}</td>
                      <td>{item.MobileNo}</td>
                      <td>{item.Designation}</td>
                      <td>{item.Gender}</td>
                      <td>{item.Course}</td>
                      <td>{moment(item.CreateDate).format("DD-MM-YYYY")}</td>
                      <td>
                        <Link
                          to={`/edit/${item._id}`}
                          className="btn btn-primary m-2 "
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <span
                          className="btn btn-primary m-2"
                          onClick={() => {
                            deleteEmployee(item._id);
                          }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* Pagination */}
            <div className="pagination-container">
              <button
               className="pagination-button "
                disabled={pagination.currentPage === 1}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage - 1,
                  })
                }
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
               className="pagination-button"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage + 1,
                  })
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Add Model */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#" }}>Create Employee </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row m-0 p-0 ">
              <div className="col-lg-12">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="vi_0"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row m-0 p-0">
              <div className="col-lg-12">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="vi_0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="row m-0 p-0">
              <div className="col-lg-12">
                <label>Mobile No</label>
                <input
                  type="number"
                  placeholder="Enter mobile no "
                  className="vi_0"
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
            </div>

            <div className="row m-0 p-0">
              <div className="col-lg-12">
                <label>Designation</label>
                <select
                  onChange={(e) => setDesignation(e.target.value)}
                  className="vi_0"
                >
                  <option className="vi_0">Hr</option>
                  <option className="vi_0">Sales</option>
                  <option className="vi_0">Manager</option>
                </select>
              </div>
            </div>

            <div className=" row p-0 m-0 ad_exp align-items-center ">
              <div className="col-lg-12">
                <label>Gender</label>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="d-flex">
                    <input
                      className="vi_0"
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="" style={{ marginInline: "5px" }}>
                      Male
                    </label>
                  </div>
                  <div className="d-flex" style={{ marginLeft: "20px" }}>
                    <input
                      className="vi_0"
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label style={{ marginInline: "5px" }}>Female</label>
                  </div>
                </div>
              </div>
            </div>

            <div className=" row p-0 m-0 ad_exp align-items-center ">
              <div className="col-lg-12">
                <label>Course</label>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      name=""
                      value="BSC"
                      onChange={(e) => setCourse(e.target.value)}
                    />
                    <label className="" style={{ marginInline: "5px" }}>
                      BSC
                    </label>
                  </div>
                  <div className="d-flex" style={{ marginLeft: "20px" }}>
                    <input
                      type="checkbox"
                      value="MCA"
                      onChange={(e) => setCourse(e.target.value)}
                    />
                    <label style={{ marginInline: "5px" }}>MCA</label>
                  </div>
                  <div className="d-flex" style={{ marginLeft: "20px" }}>
                    <input
                      type="checkbox"
                      value="BCA"
                      onChange={(e) => setCourse(e.target.value)}
                    />
                    <label style={{ marginInline: "5px" }}>BCA</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row m-0 p-0">
              <div className="col-lg-12">
                <label>Image Upload</label>
                <input
                  type="file"
                  placeholder="Upload image"
                  accept="image/png, image/jpg"
                  className="vi_0"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={(e) => add(e)}>
              Add
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Model */}
      </div>
    </>
  );
};

export default EmployeeList;
