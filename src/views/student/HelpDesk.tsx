import CardHeader from "../../components/atoms/CardHeader";
import HelpdeskIcon from "../../assets/img/helpdeskIcon.svg";
import SearchBar from "../../components/general/searchBar";
import AddFaq from "../../components/modals/AddFaq";
import useToggle from "../../utility/hooks/useToggle";
import EventsList from "../../components/lists/events-list";
import Accordion from "../../components/molecules/Accordion";
import { useState } from "react";
import useAllFaqs from "../../hooks/queries/faqs/useAllFaqs";
import { Spinner } from "reactstrap";

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
    header: "What is RBTC?",
  },
  {
    id: "2",
    header: "What is RBTC?",
  },
  {
    id: "3",
    header: "What is RBTC?",
  },
  {
    id: "4",
    header: "What is RBTC?",
  },
  {
    id: "5",
    header: "What is RBTC?",
  },
];

export default function StudentHelpDesk() {
  const { isLoading, data } = useAllFaqs();

  const categoryData = data
    ? data?.categories?.map((d: any) => ({ id: d?.id, header: d?.name }))
    : [];

  const faqsData = data?.faqs?.nodes;

  const [selectedCategoryData, setSelectedCategoryData] = useState<any[]>([]);

  function handleSelectCategory(category: string) {
    if (!faqsData) return;

    const selectedData = faqsData
      ?.filter((f: any) => f?.category?.name === category)
      ?.map((f: any) => ({ ...f, header: f?.question }));

    setSelectedCategoryData(selectedData);
  }

  return (
    <>
      <CardHeader heading="Frequently asked questions" imgSrc={HelpdeskIcon} />
      <section className="col col-md-9 mx-auto">
        {/* Search Row */}
        <article className="d-flex gap-5 ">
          <div style={{ flex: 1 }}>
            <SearchBar placeholder="Search FAQ Database" />
          </div>
        </article>

        {/* body */}
        <section className="card my-5 helpdesk-card">
          {isLoading && <Spinner />}
          {data && (
            <>
              <EventsList
                onSelect={handleSelectCategory}
                ListData={categoryData}
              />
              <div className="px-5 my-4">
                <h3 className="text-capitalize fw-bold mb-4">FAQs</h3>

                {/* accordion */}
                <Accordion
                  viewOnly
                  AccordionData={selectedCategoryData}
                  component="helpdesk"
                />
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
}
