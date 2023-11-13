import "./recover.css"

const Recover = () => {

  const handleClick = (e) => {
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">Recuperar contraseña.</h1>
        <form className="form">

          <input
            className="inputText"
            type="text"
            placeholder="Correo"
          />
          <button className="sendButton" onClick={handleClick}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recover;
