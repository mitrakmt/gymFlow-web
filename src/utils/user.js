import { request } from "./api";

export function checkUsername(username) {
  const config = {
    url: `/user/username/${username}`,
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return request(config).then(status => status);
}
