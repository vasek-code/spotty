/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getMe } from "../calls/getMe";
import { User } from "../../../backend/node_modules/@prisma/client";
import { getClientToken } from "../utils/getClientToken";

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const token = getClientToken();

    if (!token) {
      setError(true);
      setUser(null);
      return;
    } else {
      setError(false);
    }
    const userRes = await getMe(token);

    if (userRes.ok) {
      console.log(user);
      setUser(await userRes.json());
      setLoading(false);
    } else {
      setLoading(true);
      setError(true);
      setUser(null);
    }
  };

  const removeCookie = async () => {
    await fetch("http://localhost:4000/user/remove-token");

    localStorage.setItem("spotty_auth", "");
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  return {
    data: user,
    signOut: async () => {
      await removeCookie();
      await fetchUser();
    },
    loading: loading,
    error,
  };
};
