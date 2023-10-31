import typography from "../../assets/img/Typography";

type CourseOverviewProps = {
  section: any;
  overView?: string;
};

export default function CourseOverview({ section }: CourseOverviewProps) {
  const title = section?.name;
  const overView = <>{section?.overView}</>;

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
        {overView}
      </p>
    </article>
  );
}
