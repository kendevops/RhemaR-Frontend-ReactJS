import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import FAQCard from "../../components/general/FAQCard";

export default function FAQ() {
  //   const [visibility, toggle] = useToggle();

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8];

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  return (
    <>
      <div className="container my-5">
        <div
          className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
          style={{ color: "white", fontWeight: 700 }}
        >
          <Icon
            icon="mdi:note-text"
            style={{ width: "20px", height: "20px" }}
          />
          <div>FAQ</div>
        </div>

        <div className="d-flex  flex-wrap align-items-center gap-5 py-5 px-5 justify-content-center bg-white shadow ">
          {faqs.map((f, i) => {
            return <FAQCard />;
          })}
        </div>
        {/* Here............ */}

        <div className="d-flex align-items-center justify-content-between my-5 text-4xl">
          <div className="d-flex align-items-center gap-5">
            <h2>
              <AiOutlineDoubleLeft className="" /> Previous
            </h2>
            <h2>
              Next <AiOutlineDoubleRight />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
