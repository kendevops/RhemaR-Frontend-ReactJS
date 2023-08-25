import React from "react";

import { GrUserSettings } from "react-icons/gr";
import { MdOutlineVideoSettings } from "react-icons/md";

export default function FAQCard() {
  return (
    <div
      className="border-top border-4 border-blue-800 px-3 py-5 text-blue-800 shadow-lg  my-4"
      style={{ width: "450px" }}
    >
      <div className="d-flex align-items-center gap-4">
        <MdOutlineVideoSettings
          style={{ fontSize: "150px", color: "#203864" }}
        />

        <div>
          <h2 className="fw-semibold mb-4">Tech Support</h2>
          <p className="lh-sm ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            doloremque sint quos ducimus error est?
          </p>
        </div>
      </div>
    </div>
  );
}
