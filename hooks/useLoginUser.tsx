import { useCallback, useContext, useState, VFC } from "react";
import {
  LoginUserContext,
  LoginUserContextType,
} from "../providers/LoginUserProviderst";

type Props = {
  id: string;
};

export const useLoginUser = () => {
  const [userId, setUserId] = useState<string>("");

  const setLoginUser = useCallback(
    (props: Props) => {
      console.log("格納します");
      setUserId(props.id);
    },
    [userId]
  );

  return { userId, setLoginUser };
};
