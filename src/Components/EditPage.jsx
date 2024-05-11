import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
const EditPage = () => {
  const { id } = useParams();

  // Create Employee
  const [nameEdit, setNameEdit] = useState("");
  const [mobileNoEdit, setMobileNoEdit] = useState();
  const [emailEdit, setEmailEdit] = useState("");
  const [designationEdit, setDesignationEdit] = useState("");
  const [genderEdit, setGenderEdit] = useState("");
  const [courseEdit, setCourseEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var mobilevalid = /^[6-9][0-9]{9}$/;
  var Name = /^[a-zA-Z][a-zA-Z]/;

  const editEmployee = async () => {
    if (!nameEdit) {
      return alert("Enter Your name");
    }
    if (!nameEdit.match(Name)) {
      return alert("Please Enter Valid Name");
    }
    if (!emailEdit) {
      return alert("Enter Your Email");
    }
    if (!emailEdit.match(validRegex)) {
      return alert("Please Enter Valid Email-Id");
    }
    if (!mobileNoEdit) {
      return alert("Enter Contact Number");
    }
    if (mobileNoEdit.length !== 10) {
      return alert("Enter Contact Number should be 10 digits");
    }

    if (!mobileNoEdit.match(mobilevalid)) {
      return alert("Enter Valid Contact Number");
    }
    if (!designationEdit) {
      return alert("Select Your Designation");
    }

    if (!genderEdit) {
      return alert("Select Your Gender");
    }

    if (!courseEdit) {
      return alert("Select Your Courses");
    }

    try {
      const config = {
        url: `/getemployee/edit/${id}`,
        method: "put",
        baseURL: "http://localhost:8080/api",
        headers: { "content-type": "multipart/form-data" },
        data: {
          Name: nameEdit,
          MobileNo: mobileNoEdit,
          Email: emailEdit,
          Designation: designationEdit,
          Gender: genderEdit,
          Course: courseEdit,
          Image: imageEdit,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          window.location.assign("/employeelist");
          setNameEdit("");
          setMobileNoEdit("");
          setEmailEdit("");
          setDesignationEdit("");
          setGenderEdit("");
          setCourseEdit("");
          setImageEdit("");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  // -----------------------------------------------------------

  return (
    <>

    
    <div className="container-form">
      <p className="title">Edit Employee Details</p>

      <form action="" className="edit-form">
        <div className="row m-0 p-0 ">
          <div className="col-lg-12">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="vi_0"
              onChange={(e) => setNameEdit(e.target.value)}
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
              onChange={(e) => setEmailEdit(e.target.value)}
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
              onChange={(e) => setMobileNoEdit(e.target.value)}
            />
          </div>
        </div>

        <div className="row m-0 p-0">
          <div className="col-lg-12">
            <label>Designation</label>
            <select
              onChange={(e) => setDesignationEdit(e.target.value)}
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
                  onChange={(e) => setGenderEdit(e.target.value)}
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
                  onChange={(e) => setGenderEdit(e.target.value)}
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
                  onChange={(e) => setCourseEdit(e.target.value)}
                />
                <label className="" style={{ marginInline: "5px" }}>
                  BSC
                </label>
              </div>
              <div className="d-flex" style={{ marginLeft: "20px" }}>
                <input
                  type="checkbox"
                  value="MCA"
                  onChange={(e) => setCourseEdit(e.target.value)}
                />
                <label style={{ marginInline: "5px" }}>MCA</label>
              </div>
              <div className="d-flex" style={{ marginLeft: "20px" }}>
                <input
                  type="checkbox"
                  value="BCA"
                  onChange={(e) => setCourseEdit(e.target.value)}
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
              onChange={(e) => setImageEdit(e.target.files[0])}
            />
          </div>
        </div>

        <div className="edit-btn"> 
            <Button   onClick={() => editEmployee()}>
          Submit
        </Button>

        </div>

       
      </form>
    </div>

    
</>
  );
};

export default EditPage;
