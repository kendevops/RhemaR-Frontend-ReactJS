interface ICard {
  heading: string;
  imgSrc: string;
}

const CardHeader = ({ heading, imgSrc }: ICard) => {
  return (
    <div className="card-deck mt-3 mb-5 w-100 d-flex justify-content-between align-items-center py-4 px-5">
      <h1 className="fw-bold">{heading}</h1>

      <img src={imgSrc} alt="icon" />
    </div>
  );
};

export default CardHeader;
