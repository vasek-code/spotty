/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";

export const useSession = () => {
  const getUser = trpc.useQuery(["user.getSession"], {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const removeCookie = trpc.useMutation(["user.removeToken"]);
  const router = useRouter();

  useEffect(() => {
    getUser.refetch().then();
  }, [router.pathname]);

  return {
    data: getUser.data,
    signOut: async () => {
      await removeCookie.mutateAsync();
      await getUser.refetch();
    },
    loading: getUser.isLoading,
  };
};
