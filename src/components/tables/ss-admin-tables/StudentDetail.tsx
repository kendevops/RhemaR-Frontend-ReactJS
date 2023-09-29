import { Link } from "react-router-dom";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import Table from "../../general/table/Table";
import { Spinner } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import imgU from "../../../assets/img/avatars/female-small.png";

export default function StudentDetails({ data }: any) {
  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-between gap-5">
          <div className="d-flex justify-content-between align-items-start col-6">
            <div className="col-3">
              <div className=" d-flex  justify-content-between align-items-center my-3 ">
                <div className=" text-blue-800 " style={{ fontSize: "20px" }}>
                  Profile Picture
                </div>
                <FaEdit style={{ fontSize: "20px" }} />
              </div>
              <img
                className=""
                src={imgU}
                alt="Profile"
                style={{ width: "100px", borderRadius: "10px" }}
              />
            </div>

            <div className="col-8 ">
              <div className=" d-flex  justify-content-between align-items-center my-3 ">
                <div className=" " style={{ fontSize: "20px" }}>
                  Personal Details
                </div>
                <FaEdit style={{ fontSize: "20px" }} />
              </div>
              <div
                className="w-100 px-5 py-2 my-3 "
                style={{ background: "#f0f0f0" }}
              >
                <h4 className="text-blue-800">Name</h4>
                <h3>Ezeji</h3>
              </div>

              <div className="w-100 d-flex justify-content-between align-items-center my-3">
                <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                  <h4>Title</h4>
                  <h3>Mr</h3>
                </div>
                <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                  <h4>Gender</h4>
                  <h3>Male</h3>
                </div>
                <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                  <h4>Marital</h4>
                  <h3>Married</h3>
                </div>
              </div>
              <div className="w-100 d-flex justify-content-between align-items-center my-3">
                <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                  <h4>Nationality</h4>
                  <h3>Nigeria</h3>
                </div>
                <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                  <h4>POB</h4>
                  <h3>Male Male Male</h3>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-6">
            <div className=" d-flex  justify-content-between align-items-center my-3 ">
              <div className=" " style={{ fontSize: "20px" }}>
                Address Details
              </div>
              <FaEdit style={{ fontSize: "20px" }} />
            </div>

            <div
              className="w-100 px-5 py-2 my-3 "
              style={{ background: "#f0f0f0" }}
            >
              <h4>Street</h4>
              <h3>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod,
                modi.
              </h3>
            </div>

            <div className="w-100 d-flex justify-content-between align-items-center my-3">
              <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                <h4>City</h4>
                <h3>Enugu</h3>
              </div>
              <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                <h4>State</h4>
                <h3>Yeeaaaaaa</h3>
              </div>
              <div className="px-5 py-2 " style={{ background: "#f0f0f0" }}>
                <h4>Country</h4>
                <h3>Nigeria</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between gap-5 my-5 ">
          <div className="col-6">
            <div className=" d-flex  justify-content-between align-items-center my-3 ">
              <div className=" " style={{ fontSize: "20px" }}>
                Spousal Details
              </div>
              <FaEdit style={{ fontSize: "20px" }} />
            </div>
            <div className="d-flex justify-content-between align-items-start ">
              <div className="w-100 d-flex justify-content-between align-items-center my-3">
                <div
                  className="px-5 py-2 col-8"
                  style={{ background: "#f0f0f0" }}
                >
                  <h4>Name</h4>
                  <h3>Enugu Enugu Enugu</h3>
                </div>
                <div
                  className="px-5 py-2 col-3"
                  style={{ background: "#f0f0f0" }}
                >
                  <h4>Relationship</h4>
                  <h3>Yeeaaaaaa</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className=" d-flex  justify-content-between align-items-center my-3 ">
              <div className=" " style={{ fontSize: "20px" }}>
                Contact Details
              </div>
              <FaEdit style={{ fontSize: "20px" }} />
            </div>
            <div className="d-flex justify-content-between  flex-column ">
              <div className="w-100 d-flex justify-content-between align-items-center my-3 gap-3 ">
                <div
                  className="px-5 py-2 col-8"
                  style={{ background: "#f0f0f0" }}
                >
                  <h4>Email</h4>
                  <h3>Enugu Enugu Enugu</h3>
                </div>

                <div
                  className="px-5 py-2 col-4"
                  style={{ background: "#f0f0f0" }}
                >
                  <h4>Phone 1</h4>
                  <h3>Yeeaaaaaa</h3>
                </div>
              </div>

              <div
                className="px-5 py-2 col-4 "
                style={{ background: "#f0f0f0" }}
              >
                <h4>Phone 2</h4>
                <h3>Yeeaaaaaa</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 d-flex align-items-start justify-content-between gap-5">
        <div className="col-6  px-4">
          <div className=" d-flex  justify-content-between">
            <div className=" " style={{ fontSize: "20px" }}>
              Comments and Remarks
            </div>
            <div className=" " style={{ fontSize: "20px" }}>
              <FaEdit />
            </div>
          </div>

          <div className="p-5 my-4 " style={{ background: "#f0f0f0" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam in
            illo unde sit laudantium ad quisquam totam? Ex deleniti
            reprehenderit quidem dolores odit, repudiandae quis.
          </div>
        </div>
        <div className="col-6 ">
          <div className=" " style={{ fontSize: "20px" }}>
            Action Buttons
          </div>

          <div className="d-flex my-4 flex-wrap gap-4 ">
            <button
              className="btn btn-blue-800   btn-lg"
              style={{ width: "45%" }}
            >
              Generate ID Card
            </button>

            <button
              className="btn btn-blue-800 btn-lg"
              style={{ width: "45%" }}
            >
              Send Password Reset Link
            </button>

            <button
              className="btn btn-blue-800   btn-lg"
              style={{ width: "45%" }}
            >
              Generate ID Card
            </button>

            <button
              className="btn btn-blue-800 btn-lg"
              style={{ width: "45%" }}
            >
              Send Password Reset Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
