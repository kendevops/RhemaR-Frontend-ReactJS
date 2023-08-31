import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

type ExportStudentsThirdModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  fieldData?: any;
  searchData?: any;
};
const ExportStudentsThirdModal = ({
  isOpen,
  toggle,
  searchData,
  fieldData,
}: ExportStudentsThirdModalProps) => {
  console.log(searchData);

  return (
    <Modal
      centered
      {...{ isOpen, toggle }}
      scrollable
      style={{ minWidth: "800px" }}
    >
      <ModalHeader toggle={toggle}>Export Students Record</ModalHeader>

      <ModalBody>
        <h1>Step 3: Summary</h1>
        <div className="container">
          <div className=" d-flex  gap-4 ">
            <div className="col-6 p-5 " style={{ background: "#fff" }}>
              <h1 style={{ background: "#f0f0f0" }} className="p-3 my-3 w-100">
                Search Criteria
              </h1>
              <div className="d-flex flex-column  gap-3 ">
                <div className="my-3">
                  <h2>Campus</h2>
                  <div className="d-flex gap-3 flex-wrap ">
                    {searchData[0].campus?.map((s: string, i: number) => {
                      return (
                        <div
                          className="p-3 my-1 w-auto rounded-5"
                          style={{ background: "#f0f0f0" }}
                          key={i}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-3">
                  <h2>Session</h2>

                  <div className="d-flex gap-3 flex-wrap ">
                    {searchData[0].session?.map((s: string, i: number) => {
                      return (
                        <div
                          className="p-3 my-1 w-auto rounded-5"
                          style={{ background: "#f0f0f0" }}
                          key={i}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-3">
                  <h2>Intake</h2>

                  <div className="d-flex gap-3 flex-wrap ">
                    {searchData[0].intake?.map((s: string, i: number) => {
                      return (
                        <div
                          className="p-3 my-1 w-auto rounded-5"
                          style={{ background: "#f0f0f0" }}
                          key={i}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-3">
                  <h2>Level</h2>

                  <div className="d-flex gap-3 flex-wrap ">
                    {searchData[0].level?.map((s: string, i: number) => {
                      return (
                        <div
                          className="p-3 my-1 w-auto rounded-5"
                          style={{ background: "#f0f0f0" }}
                          key={i}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-3">
                  <h3>Payment Status</h3>

                  <div className="d-flex gap-3 flex-wrap ">
                    {searchData[0].status?.map((s: string, i: number) => {
                      return (
                        <div
                          className="p-3 my-1 w-auto rounded-5"
                          style={{ background: "#f0f0f0" }}
                          key={i}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-2">
                  <h3>No. Of Classes Completed</h3>

                  <div className="d-flex gap-3 flex-wrap ">
                    {searchData[0].classesCompleted?.map(
                      (s: string, i: number) => {
                        return (
                          <div
                            className="p-3 my-1 w-auto rounded-5"
                            style={{ background: "#f0f0f0" }}
                            key={i}
                          >
                            {s}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 p-5 " style={{ background: "#fff" }}>
              <h1 style={{ background: "#f0f0f0" }} className="p-3 my-3 w-100">
                {" "}
                Fields To Export
              </h1>
              <div className="d-flex gap-4 flex-wrap ">
                {fieldData?.map((f: any, i: number) => {
                  return (
                    <div
                      className=" p-3 my-3 w-auto rounded-5"
                      style={{ background: "#f0f0f0" }}
                      key={i}
                    >
                      {f.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            className="btn btn-blue-800 btn-lg w-100 my-5 "
            type="button"
            onClick={() => {
              //   toggle();
              //   toggleSecondModalOpen();
            }}
          >
            Export
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default ExportStudentsThirdModal;
