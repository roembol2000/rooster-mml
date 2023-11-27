async function getEntries(netwerkCredentials) {
  const query = {
    netwerk_username: netwerkCredentials.username,
    netwerk_password: netwerkCredentials.password,
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

    if (response.status === 403) {
      const error = new Error("Forbidden");
      error.name = "ForbiddenError";
      throw error;
    }

    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  return data;
}

const getSchedule = (netwerkCredentials, schedule, weekNumber) => {
  return new Promise((resolve, reject) => {
    const query = {
      week: weekNumber,
      type: schedule.type,
      id: schedule.id,
      netwerk_username: netwerkCredentials.username,
      netwerk_password: netwerkCredentials.password,
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

          if (response.status === 403) {
            const error = new Error("Forbidden");
            error.name = "ForbiddenError";
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

const login = (credentials) => {
  return new Promise((resolve, reject) => {
    const body = {
      username: credentials.username,
      password: credentials.password,
    };
    const endpoint = "/api/login";

    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            const error = new Error("User is unauthorized!");
            error.name = "AuthenticationError";
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

export { getEntries, getSchedule, login };
