import typography from "../../assets/img/Typography";

type ElearningInstructorProps = {
  instructor: any;
};

export default function ElearningInstructor({
  instructor,
}: ElearningInstructorProps) {
  console.log(instructor);

  const name = `${instructor?.firstName} ${instructor?.lastName}`;
  const email = <>{instructor?.email}</>;

  return (
    <article className="my-4">
      <h2
        style={{
          fontSize: typography.h2,
          marginBottom: "1.5rem",
        }}
      >
        {name}
      </h2>

      <p
        style={{
          lineHeight: "2rem",
        }}
      >
        {email}
      </p>
    </article>
  );
}
