export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json());
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
