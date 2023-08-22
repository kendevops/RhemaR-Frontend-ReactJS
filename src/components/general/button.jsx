const BButton = ({ text, onClick }) => {
  return (
    <button
      className="btn btn-blue-800 my-5 p-4  w-100 text-xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BButton;
