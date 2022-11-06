export const fetchServer = async (
  pathname: string,
  method: "POST" | "GET",
  token: string,
  body: unknown
) => {
  const res = await fetch(`http://localhost:4000/${pathname}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return res;
};
