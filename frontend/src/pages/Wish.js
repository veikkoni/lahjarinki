import React, { useState } from "react";

function Wish() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [unwish, setUnwish] = useState("");
  const [participating, setParticipating] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const circle = "1";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || participating === undefined) {
      setError("Nimi ja osallistuminen vaaditaan");
      return;
    }
    const address = "API_ADDRESS";

    setError("");
    fetch(address + "/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        wish: wish,
        unwish: unwish,
        participating: participating,
        circle: circle,
      }),
    })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .then((res) => {
        setSubmitted(true);
      });
  };

  return !submitted ? (
    <div className="main-content">
      <form className="join-form">
        <div className="form-header">
          <h1>SECRET SANTA 2021</h1>
        </div>
        <div className="form-content">
          <div className="form-element">
            <p>
              Ole hyvä ja täytä tämä lomake. Tänä vuonna lahjan budjetti on 20€
            </p>
          </div>
          <div className="form-element">
            <label>Nimi: *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-element">
            <label>Osallistutko: *</label>
            <div className="radio-container">
              <label for="yes">Kyllä</label>
              <div className="radio-selection">
                <input
                  id="yes"
                  type="radio"
                  value="yes"
                  name="participating"
                  onChange={(e) => setParticipating(true)}
                />
              </div>
              <label for="no">En</label>
              <div className="radio-selection">
                <input
                  id="no"
                  type="radio"
                  value="no"
                  name="participating"
                  onChange={(e) => setParticipating(false)}
                />
              </div>
            </div>
          </div>

          {participating && (
            <>
              <div className="form-element">
                <p>
                  Täytä myös toive ja kerro mitä et mielellään haluaisi. Tämän
                  täyttäminen ei ole pakollista, mutta helpottaa hyvin paljon
                  lahjan ostamista.
                </p>
              </div>
              <div className="form-element">
                <label>Mitä haluaisit:</label>
                <input
                  type="text"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                />
              </div>
              <div className="form-element">
                <label>Mitä et toivoisi:</label>
                <input
                  type="text"
                  value={unwish}
                  onChange={(e) => setUnwish(e.target.value)}
                />
              </div>
            </>
          )}

          {error != "" && (
            <div className="form-element error">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" onClick={handleSubmit}>
            Lähetä
          </button>
        </div>
      </form>
      <div className="footer">lahjarinki.fi</div>
    </div>
  ) : (
    <div className="main-content">
      <form className="join-form">
        <div className="form-header">
          <h1>SECRET SANTA 2021</h1>
        </div>
        <div className="form-content">
          <div className="form-element">
            <p>Kiitos vastauksesta. Parit ilmoitetaan myöhemmin.</p>
          </div>
          <button
            type="submit"
            onClick={() => {
              setSubmitted(false);
            }}
          >
            Vastaa uudestaan
          </button>
        </div>
      </form>
      <div className="footer">lahjarinki.fi</div>
    </div>
  );
}

export default Wish;
