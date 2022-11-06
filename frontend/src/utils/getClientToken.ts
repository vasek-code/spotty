export const getClientToken = () => {
  const token = localStorage.getItem("spotty_auth");

  return token;
};
