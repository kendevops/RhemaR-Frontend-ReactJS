import React, { useState, useRef, useEffect } from "react";
import CardWrapper from "../../components/students/CardWrapper";
import typography from "../../assets/img/Typography";
import EventsCards from "../../components/molecules/EventsCards";
import useAllUsers from "../../hooks/queries/useAllUsers";
import userRoles from "../../utility/userRoles";

const CampusCoordinatorDashboard = () => {
  const { data: userData, isLoading } = useAllUsers();
  const users = userData?.users?.nodes;

  const students = users
    ? users?.filter((user) =>
        user?.roles.map((r) => r?.name).includes(userRoles.STUDENT)
      )
    : [];

  const prospectiveStudents = users
    ? users?.filter((user) =>
        user?.roles.map((r) => r?.name).includes(userRoles.PROSPECTIVE_STUDENT)
      )
    : [];

  const alumni = users
    ? users?.filter((user) =>
        user?.roles.map((r) => r?.name).includes(userRoles.ALUMNI)
      )
    : [];

  const instructors = users
    ? users?.filter((user) =>
        user?.roles.map((r) => r?.name).includes(userRoles.INSTRUCTOR)
      )
    : [];

  const newStudents = Math.round(students?.length - students?.length / 3);

  const dashData = [
    { title: "Prospective Stduents", value: prospectiveStudents?.length },
    { title: "New Stduents", value: newStudents },
    { title: "Instructors", value: instructors?.length },
    { title: "Alumni", value: alumni?.length },
    { title: "Total students", value: students?.length },
    { title: "Total fees paid", value: 750000 },
    { title: "Total pending fees", value: 320000 },
  ];

  return (
    <main>
      {/* Dash Cards */}
      <section
        className="mb-5 d-flex gap-2 justify-content-between"
        style={{
          flexWrap: "wrap",
        }}
      >
        {dashData?.map((d) => {
          let value = d?.title?.includes("fees") ? `N${d?.value}` : d?.value;
          return (
            <CardWrapper key={d?.title} style={{ minWidth: "300px" }}>
              <p className="mt-2">{d?.title}</p>
              <h2
                style={{
                  fontSize: typography.h2,
                  fontWeight: "bold",
                }}
              >
                {value}
              </h2>
            </CardWrapper>
          );
        })}
      </section>

      {/* Events */}
      <section style={{ marginTop: "2rem" }}>
        <h2
          style={{
            fontSize: typography.h2,
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Upcoming Events
        </h2>

        <CardWrapper>
          <EventsCards isStudent />
        </CardWrapper>
      </section>
    </main>
  );
};

export default CampusCoordinatorDashboard;
