import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import { useMessage } from "./useMessage";
import axiosBase from "axios";
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  responseType: "json",
});

export const useAllUsersAxios = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [endPoint, setEndPoint] = useState<boolean>();

  const { token } = useAuth();
  const { showMessage } = useMessage();

  const getUsers = useCallback(
    (tokenId: string) => {
      setEndPoint(false);
      console.log("myId2回目");
      console.log(tokenId);
      axios
        .get<any>("/v0/users/all", {
          params: {
            number: Number(page),
          },
          headers: {
            authorization: `TEST ${tokenId}`,
          },
        })
        .then((res) => {
          if (res.data.length == 0) {
            showMessage({ title: "全て表示されました", status: "success" });
            return;
          }
          setAllUsers([...allUsers, ...res.data]);
          setPage(page + 1);
          setEndPoint(true);
          console.log(res.data);
          console.log(page);
          return;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    },
    [allUsers, page]
  );

  return { getUsers, allUsers, endPoint };
};
