import typography from "../../assets/img/Typography";

type CourseOverviewProps = {
  course: any;
  overView?: string;
};

export default function CourseOverview({
  course,
  overView,
}: CourseOverviewProps) {
  const title = course?.title;
  const content = <>{course?.desc}</>;

  return (
    <article className="my-4">
      <h2
        style={{
          fontSize: typography.h2,
          marginBottom: "1.5rem",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          lineHeight: "2rem",
        }}
      >
        {content}
      </p>
    </article>
  );
}
