import { useState } from "react";
import { addNewJoke } from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";
export const App = () => {
  const [newJoke, setNewJoke] = useState("");
  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => {
            setNewJoke(event.target.value);
          }}
        />
        <button
          className="joke-input-submit"
          type="submit"
          onClick={(click) => {
            const jokeObject = {
              text: newJoke,
              told: false,
            };
            addNewJoke(jokeObject);
            setNewJoke("");
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};
