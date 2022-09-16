import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "app_content";
import { auth, getUserFplTeamId } from "config";

export const useFplId = (): number | undefined => {
  const [user] = useAuthState(auth);
  const { fplId: savedFplId } = useContext(AuthContext);
  const [fplId, setFplId] = useState<number | undefined>();

  useEffect(() => {
    const getUserFplId = async (): Promise<void> => {
      const id = user ? await getUserFplTeamId(user.uid) : savedFplId;
      setFplId(id);
    };

    getUserFplId();
  }, [user, savedFplId]);

  return fplId;
};
