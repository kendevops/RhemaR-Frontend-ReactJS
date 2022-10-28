import typography from "../../assets/img/Typography";

type CourseOverviewProps = {
  course: string;
};

export default function CourseOverview({ course }: CourseOverviewProps) {
  //fetch the course

  const title = "Pneumatology 1 : Introduction & Course Objectives";
  const content = (
    <>
      This course provides a Biblical understanding of the Person and operation
      of the Holy Spirit. Students will learn principles to help them recognize
      and respond to the voice of the Lord in prayer and beyond. In this course,
      students will also learn how to be led by the Holy Spirit, walk in the
      power of God and receive revelation knowledge from the Holy Spirit for
      victorious living and service. <br />
      In this course, you will learn the various ways by which God speaks to His
      children; how to be led by the Spirit of God. This course provides deep
      knowledge on the tripartite nature of man; as a spirit that has a soul and
      lives in a body. You will also learn the practical approaches to develop
      human spirit in order to live a triumphant life in Christ Jesus... click
      to read the course syllabus.
    </>
  );

  return (
    <article>
      <h2
        style={{
          fontSize: typography.h2,
          marginBottom: "1.5rem",
        }}
      >
        {title}
      </h2>

      <p>{content}</p>
    </article>
  );
}
