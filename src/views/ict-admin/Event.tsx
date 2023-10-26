import { useEffect } from "react";
import BackButton from "../../components/molecules/BackButton";
import useEvent from "../../hooks/queries/events/useEvent";
import { useHistory, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import FileTypeIcon from "../../components/atoms/FIleTypeIcon";
import downloadFile from "../../utils/downloadFile";

const Event = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    if (!id) {
      history.goBack();
    }
  }, [id, history]);

  const { data, isLoading } = useEvent(id);

  console.log(data);

  return (
    <>
      <main className="container">
        <div className="my-5">
          <BackButton />
        </div>

        {isLoading && <Spinner />}

        {/* Video wrapper */}
        {data && (
          <section className="video-wrapper">
            <video className="video-style" controls>
              <source src={data?.video?.path} type="video/mp4" />
            </video>
          </section>
        )}

        {data && (
          <section className="d-flex px-3 gap-5 my-5">
            <article className="card about-event">
              <h3>About Event</h3>
              <hr />
              <h2 className="event-topic">{data?.name}</h2>
              <p>{data?.desc}</p>
            </article>

            <article className="card about-event event-resources">
              <h3>Event Resources</h3>
              <hr />
              <ul>
                {data?.resources?.map((res: any) => {
                  const attributes = downloadFile(res?.path, res?.name);
                  return (
                    <li>
                      <a
                        key={res?.name}
                        className="d-flex gap-1 justify-content-start align-items-center"
                        {...attributes}
                      >
                        <FileTypeIcon
                          type={res?.type}
                          name={res?.name}
                          path={res?.path}
                        />
                        <p className="mt-3">{res?.name}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </article>
          </section>
        )}
      </main>
    </>
  );
};

export default Event;
