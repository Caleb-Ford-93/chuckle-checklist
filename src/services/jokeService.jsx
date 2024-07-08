export const addNewJoke = (jokeObject) => {
  const response = fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  });
};
