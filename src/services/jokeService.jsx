export const getAllJokes = async () => {
  return await fetch("http://localhost:8088/jokes").then((res) => res.json());
};

export const addNewJoke = async (jokeObject) => {
  return await fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  });
};

export const moveJoke = async (jokeObject) => {
  return await fetch(`http://localhost:8088/jokes/${jokeObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  });
};

export const deleteJoke = async (jokeObject) => {
  return await fetch(`http://localhost:8088/jokes/${jokeObject.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  });
};
