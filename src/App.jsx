import { useEffect, useState } from "react";
import {
  addNewJoke,
  deleteJoke,
  getAllJokes,
  moveJoke,
} from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";
export const App = () => {
  const [newJoke, setNewJoke] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

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
    if (newJoke != "") {
      const jokeObject = {
        text: newJoke,
        told: false,
      };
      await addNewJoke(jokeObject);
      setNewJoke("");
      updateJokes();
    } else {
      window.alert("please type a joke");
    }
  };

  const handleMoveJoke = async (joke) => {
    const updatedJoke = {
      id: joke.id,
      text: joke.text,
      told: !joke.told,
    };

    await moveJoke(updatedJoke);
    updateJokes();
  };

  const handleDeleteJoke = async (joke) => {
    await deleteJoke(joke);
    updateJokes();
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
      <form className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          required
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
      </form>
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
                <button
                  title="This joke is bad"
                  onClick={() => handleDeleteJoke(joke)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  title="Move to Told"
                  value={joke}
                  id={joke.id}
                  onClick={() => handleMoveJoke(joke)}
                >
                  <i className="fa-solid fa-arrow-right" id={joke.id} />
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
                <button
                  title="This joke is bad"
                  onClick={() => handleDeleteJoke(joke)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  title="Move to Untold"
                  id={joke.id}
                  onClick={() => handleMoveJoke(joke)}
                >
                  <i className="fa-solid fa-arrow-left" id={joke.id}></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
