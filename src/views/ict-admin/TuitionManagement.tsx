import React, { useState } from "react";
import useToggle from "../../utility/hooks/useToggle";
import AddTuition from "../../components/modals/AddTuition";
import TuitionTable from "../../components/tables/admin-tables/TuitionTable";

// Three User Stories towards Tuition Management
// As a Super Admin User, I can specify the amount for each campus so that students can pay different fees 
// As a Super Admin User, I can set up discounts for tuition fees as specified by RBTC management 
/**
 * Data Fields - Campus, Level, Tuition Amount, DiscountApplied?, Discount Amount
 * So 1, we need a button to fire up form modal to set tuition
 * Then 2,  a table displaying all existing tuition
 */

export default function TuitionManagement() {

    const [option, setOption] = useState(0);
    const [modalState, toggleModal] = useToggle();
 

  return (
   <section>

    <AddTuition toggle={toggleModal} visibility={modalState} />

    {/* Add Tuition */}
    <article className="d-flex gap-5 m-5">
          <button
            onClick={toggleModal}
            className="btn btn-blue-800 btn-lg "
            style={{ width: "30%" }}
          >
            Add Tuition
          </button>
      </article>

      {/* Table */}
      <article>

            {/* Table */}
            <TuitionTable />
          </article>
   </section>
  );
}
