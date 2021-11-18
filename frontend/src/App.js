import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [unwish, setUnwish] = useState("");
  const [participating, setParticipating] = useState();
  const circle = "1"

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('http://localhost:5000/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        wish: wish,
        unwish: unwish,
        participating: participating,
        circle: circle,
      })
    }).catch((err) => {
      console.log(err);
    });
    

  }

  return (
    <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>Enter your name:
        <input
          type="text" 
          value={wish}
          onChange={(e) => setWish(e.target.value)}
        />
      </label>
      <label>Enter your name:
        <input
          type="text" 
          value={unwish}
          onChange={(e) => setUnwish(e.target.value)}
        />
      </label>
      <label>Osallistutko
        <input
          type="radio"
          value="yes"
          name="participating"
          value={participating}
          onChange={(e) => setParticipating(true)}
        />Kyllä
          <input
          type="radio"
          value="no"
          name="participating"
          value={participating}
          onChange={(e) => setParticipating(false)}
        />Ei
      </label>
      <button type="submit" onClick={handleSubmit}>Lähetä</button>
    </form>
  )
  
}

export default App;
