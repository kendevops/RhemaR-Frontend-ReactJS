import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useCourse from "../../hooks/queries/classes/useCourse";
import { Spinner } from "reactstrap";
import BackButton from "../../components/molecules/BackButton";
import typography from "../../assets/img/Typography";

interface Params {
  id: string;
}

export default function Course() {
  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    if (!id) history.push("/");
  }, [id, history]);

  const { data, isLoading } = useCourse(id);

  return (
    <>
      {isLoading && <Spinner />}

      <section className="px-4 my-5">
        <BackButton />

        {data && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h2
                style={{ fontSize: typography.h2 }}
                className="font-bold mt-3"
              >
                {data?.title}
              </h2>

              <div className="d-flex gap-5">
                <div>
                  <label htmlFor="banner">
                    <u>Change Banner</u>
                  </label>
                  <input id="banner" type={"file"} accept="*/image" hidden />
                </div>
                <u>Edit Course Name</u>
              </div>
            </div>

            <img src={data?.bannerUrl} alt={`${data?.title}`} />
          </>
        )}
      </section>
    </>
  );
}
