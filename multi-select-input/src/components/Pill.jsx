const Pill = ({ image, text, onClick }) => {
  return (
    <span className="user-pill">
      <img src={image} alt={text} />
      <span>{text}</span>
      <span onClick={onClick}>&times;</span>
    </span>
  );
};

export default Pill;
