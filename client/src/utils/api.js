async function getEntries(credentials) {
  const query = {
    netwerk_username: credentials.username,
    netwerk_password: credentials.password,
  };
  const endpoint = "/api/entries?" + new URLSearchParams(query);

  const response = await fetch(endpoint);

  console.log(response);

  if (!response.ok) {
    if (response.status === 401) {
      const error = new Error("User is unauthorized!");
      error.name = "AuthenticationError";
      throw error;
    }

    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  return data;
}

const getSchedule = (credentials, schedule, weekNumber) => {
  return new Promise((resolve, reject) => {
    const query = {
      week: weekNumber,
      type: schedule.type,
      id: schedule.id,
      netwerk_username: credentials.username,
      netwerk_password: credentials.password,
    };
    const endpoint = "/api/schedule?" + new URLSearchParams(query);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            const error = new Error("User is unauthorized!");
            error.name = "AuthenticationError";
            throw error;
          }

          if (response.status === 404) {
            const error = new Error("Schedule not found!");
            error.name = "NotFoundError";
            throw error;
          }

          const error = new Error(
            `Something went wrong! Got status ${response.status} from server.`
          );
          error.name = "UnexpectedStatusError";
          throw error;
        }

        return response.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getEntries, getSchedule };
