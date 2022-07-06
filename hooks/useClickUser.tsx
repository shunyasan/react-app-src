import { useCallback } from "react";
import { axiosUser } from "../types/api/axiosUser";
import axiosBase from "axios";
import { useState } from "react";
const axios = axiosBase.create({
  baseURL: "http://localhost:3004", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

type Props = {
  user_id: string;
  onOpen: () => void;
};

export const useClickUser = () => {
  const [selectUser, setSelectUser] = useState<axiosUser | null>(null);
  const onClickUser = useCallback((props: Props) => {
    const { user_id, onOpen } = props;
    axios
      .get(`user/${user_id}`)
      .then(async (res) => {
        await setSelectUser(res.data);
        // console.log("取得データ： \n" + JSON.stringify(res.data));
        onOpen();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);
  return { selectUser, onClickUser };
};
