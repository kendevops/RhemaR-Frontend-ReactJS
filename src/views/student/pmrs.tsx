import { useState } from "react";
import Tab from "../../components/atoms/Tab";
import CardWrapper from "../../components/students/CardWrapper";
import PMRForm from "../../components/students/PmrForm";
import FinalPMRForm from "../../components/students/FinalPmrForm";

const tabs = ["PMR Form", "Final PMR Assessment"];
export default function StudentPmrs() {
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  const hours = 100;
  const canFinalise = hours >= 100;

  return (
    <>
      <Tab.Wrapper>
        {tabs?.map((t, i) => {
          return (
            <Tab
              key={t}
              onClick={() => {
                if (i !== 1) {
                  setTab(i);
                  return;
                }
                canFinalise
                  ? setTab(i)
                  : alert(
                      "You need to have done at least 100 hours in practical ministry before the final assessment "
                    );
              }}
              tabColor="#289483"
              isSelected={currentTab === t}
            >
              {t}
            </Tab>
          );
        })}
      </Tab.Wrapper>

      <section className=" my-5 col-xl-6 col-lg-7 col-md-8 col-12 mx-auto">
        <CardWrapper>
          {tab === 0 && <PMRForm />}

          {tab === 1 && <FinalPMRForm />}
        </CardWrapper>
      </section>
    </>
  );
}
