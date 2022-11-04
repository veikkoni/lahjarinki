import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Result() {
  let { id } = useParams();

  useEffect(() => {
    const address = "/api";

    fetch(address + "/results/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.result) {
          setResult(res.result);
          setLoading(false);
        } else {
          alert("Invalid code");
        }
      });
  }, [id]);

  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  if (!loading) {
    return (
      <div className="main-content">
        <form
          className="join-form"
          style={{ "max-width": 350 + "px", width: 60 + "%" }}
        >
          <div className="form-header">
            <h1>SECRET SANTA 2021</h1>
          </div>
          <div className="result-content">
            <div className="result-element">
              <p>
                Hei <b>{result.name}</b>!
              </p>
            </div>
            <div className="result-element">
              <p>
                Sinulle arvottu pari on <b>{result.target}</b>
              </p>
            </div>
            <div className="result-element">
              <p>
                Hänen toiveensa: <br />"{result.wish}"
              </p>
            </div>
            <div className="result-element">
              <p>Budjetti noin 20€</p>
            </div>
            <div className="result-element">
              <img
                src="https://i.imgur.com/80MRNal.png"
                height="100px"
                width="100px"
              />
            </div>
          </div>
        </form>
        <div className="footer">lahjarinki.fi</div>
      </div>
    );
  } else {
    return <div>Nothing here</div>;
  }
}

export default Result;
