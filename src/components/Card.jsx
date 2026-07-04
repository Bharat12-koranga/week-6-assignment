function Card({ id, title, description, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>

      <button
        onClick={() => onDelete(id)}
        style={{ marginTop: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default Card;
