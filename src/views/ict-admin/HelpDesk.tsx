import CardHeader from "../../components/atoms/CardHeader";
import HelpdeskIcon from "../../assets/img/helpdeskIcon.svg";
import SearchBar from "../../components/general/searchBar";
import AddFaq from "../../components/modals/AddFaq";
import useToggle from "../../utility/hooks/useToggle";
import EventsList from "../../components/lists/events-list";
import Accordion from "../../components/molecules/Accordion";
import { useState } from "react";
import EditIcon from "../../components/icons/Edit";

const Listdata = [
  {
    id: "1",
    header: "all questions",
  },
  {
    id: "2",
    header: "exam & courses",
  },
  {
    id: "3",
    header: "tuition & payment",
  },
  {
    id: "4",
    header: "login & security",
  },
  {
    id: "5",
    header: "events & meetings",
  },
];

const Accordiondata = [
  {
    id: "1",
    question: "What is RBTC 1?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
  {
    id: "2",
    question: "What is RBTC and more 2?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Exam & Courses",
  },
  {
    id: "3",
    question: "What is RBTC 3?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
  {
    id: "4",
    question: "What is RBTC 4?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
  {
    id: "5",
    question: "What is RBTC 5?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
];

export default function HelpDesk() {
  const [visibility, toggle] = useToggle();
  const [active, setActive] = useState("");
  const [visibilityEdit, toggleEdit] = useToggle();
  const [data, setData] = useState<any>();

  const viewOnly = false;

  const handleClick = (id: string) => {
    setActive(id);
  };

  return (
    <>
      <CardHeader heading="Frequently asked questions" imgSrc={HelpdeskIcon} />

      <div className="col col-md-9 mx-auto">
        {/* Search Row */}
        <article className="d-flex gap-5 ">
          <div style={{ flex: 1 }}>
            <SearchBar placeholder="Search FAQ Database" />
          </div>

          <div>
            <button
              onClick={toggle}
              className="btn btn-blue-800 btn-lg card-btn"
            >
              Add F.A.Q
            </button>
            <AddFaq {...{ toggle, visibility }} />
          </div>
        </article>

        {/* body */}
        <div className="card my-5 helpdesk-card">
          <EventsList ListData={Listdata} />

          <div className="px-5 my-4">
            <h3 className="text-capitalize fw-bold mb-4">All questions</h3>

            {/* accordion */}
            {/* <Accordion AccordionData={Accordiondata} component="helpdesk" /> */}

            <div className="accordion" id={"helpdesk"}>
              {Accordiondata.map((item, i) => {
                return (
                  <div className="accordion-item mb-3" key={item.id}>
                    <h2
                      className="accordion-header d-flex mb-0"
                      id={`heading-${item.id}`}
                    >
                      <button
                        onClick={() => handleClick(item.id)}
                        style={{ flex: 1, marginRight: "15px" }}
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#question-${item.id}`}
                        aria-expanded={active === item.id ? "true" : "false"}
                        aria-controls={`question-${item.id}`}
                      >
                        {item.question}
                      </button>

                      <div className="helpdesk-edit">
                        {!viewOnly && (
                          <button
                            onClick={async () => {
                              setData(item);
                              toggleEdit();
                            }}
                            className="edit-btn py-3 px-4 d-flex justify-content-center align-items-center"
                          >
                            Edit
                            <EditIcon />
                          </button>
                        )}

                        {/* <EditFaq
                  toggle={toggle}
                  visibility={visibility}
                  defaultValues={item}
                /> */}

                        {/* <AddFaq
                          toggle={toggleEdit}
                          visibility={visibilityEdit}
                          defaultValues={item}
                        /> */}
                      </div>
                    </h2>
                    <div
                      id={`question-${item.id}`}
                      className={`accordion-collapse collapse ${
                        active === item.id ? "show" : ""
                      } `}
                      aria-labelledby={`heading-${item.id}`}
                      data-bs-parent={`#${"helpdesk"}`}
                    >
                      <div className="accordion-body">
                        {item.answer ?? "Answer"}
                      </div>
                    </div>
                  </div>
                );
              })}

              {data && (
                <AddFaq
                  toggle={toggleEdit}
                  visibility={visibilityEdit}
                  defaultValues={data}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
