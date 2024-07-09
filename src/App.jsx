import { useEffect, useState } from "react";
import { addNewJoke, getAllJokes } from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";
export const App = () => {
  const [newJoke, setNewJoke] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  // const [render, setRender] = useState(0);

  useEffect(() => {
    updateJokes();
  }, []);

  useEffect(() => {
    const jokesToTell = allJokes.filter((joke) => !joke.told);
    setUntoldJokes(jokesToTell);
  }, [allJokes]);

  useEffect(() => {
    const jokesTold = allJokes.filter((joke) => joke.told);
    setToldJokes(jokesTold);
  }, [allJokes]);

  const updateJokes = () => {
    getAllJokes().then((jokes) => setAllJokes(jokes));
  };

  const handleSubmit = async () => {
    const jokeObject = {
      text: newJoke,
      told: false,
    };
    await addNewJoke(jokeObject);
    setNewJoke("");
    updateJokes();
  };
  const moveJoke = (event) => {
    console.log(event.currentTarget.value);
  };

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
          onClick={handleSubmit}
        >
          ADD
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold Jokes
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <button value={joke} title="Move to Told" onClick={moveJoke}>
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>
            Told Jokes<span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <button title="Move to Untold">
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
