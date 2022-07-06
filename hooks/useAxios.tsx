import axiosBase from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useMessage } from "./useMessage";
import crypto from "crypto";
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  responseType: "json",
});

export const useAxios = () => {
  const { token } = useAuth();
  const [searchAxiosUser, setSearchAxiosUser] = useState<any[]>();
  const [myId, setMyId] = useState<any>();
  const [followNumber, setFollowNumber] = useState<number>(0);
  const [followerNumber, setFollowerNumber] = useState<number>(0);
  const [loginBonus, setLoginBonus] = useState<any>();
  const [receivedBonus, setReceivedBonus] = useState<any>();

  // setInterval(() => {
  //   console.log("token状況");
  //   console.log(token);
  // }, 10000);

  const searchAxios = useCallback(
    (props) => {
      const { loginId } = props;
      console.log(loginId);
      console.log("token取得");
      console.log(token);
      axios
        .get<any>("/v0/users/", {
          params: {
            loginId: loginId,
          },
          headers: {
            authorization: `TEST ${token}`,
          },
        })
        .then((res) => {
          setSearchAxiosUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [token]
  );

  const addFollowAxios = useCallback(
    (props) => {
      const { id } = props;
      console.log("token取得");
      console.log(token);
      axios
        .post(
          `/v0/follows/users/${id}`,
          {},
          {
            headers: {
              authorization: `TEST ${token}`,
            },
          }
        )
        .then((res) => {
          alert("フォローしました");
          console.log("フォローしました");
          // setAddFollowUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [token]
  );

  const removeFollowAxios = useCallback(
    (props) => {
      const { id } = props;
      console.log("token取得");
      console.log(token);
      axios
        .delete(`/v0/follows/users/${id}`, {
          headers: {
            authorization: `TEST ${token}`,
          },
        })
        .then((res) => {
          alert("フォロー解除しました");
          console.log("フォロー解除しました");
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [token]
  );

  const findMeAxios = useCallback(
    async (props) => {
      console.log("token確認");
      console.log(props);
      await axios
        .get<any>(`/v0/users/me`, {
          headers: {
            authorization: `TEST ${props}`,
          },
        })
        .then((res) => {
          console.log("res.data");
          console.log(res.data);
          if (res.data) {
            console.log("格納します");
            setMyId(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [token, myId]
  );

  const findAllFollowsAxios = useCallback(
    (props) => {
      const { userId, tokenId } = props;
      axios
        .get("/v0/users", {
          params: {
            followId: userId,
          },
          headers: {
            authorization: `TEST ${tokenId}`,
          },
        })
        .then((res) => {
          console.log("フォロー数");
          console.log(res.data.length);
          setFollowNumber(res.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [token]
  );

  const findAllFollowersAxios = useCallback(
    (props) => {
      const { userId, tokenId } = props;
      axios
        .get("/v0/users", {
          params: {
            followerId: userId,
          },
          headers: {
            authorization: `TEST ${tokenId}`,
          },
        })
        .then((res) => {
          console.log("フォロワー数");
          console.log(res.data.length);
          setFollowerNumber(res.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [token]
  );

  const phoneInsertAxios = useCallback(
    async (phoneNumber: string, tokenId: string) => {
      const md5 = crypto.createHash("md5");
      const num = phoneNumber.slice(-4);
      const baseString = "Blue" + num;
      let key = md5
        .update(Buffer.from(baseString).toString("base64"))
        .digest("hex");
      console.log(key);

      await axios
        .put(
          `v0/users/me/phone-number-verified-date/${key}`,
          {},
          {
            headers: {
              authorization: `TEST ${tokenId}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          return;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
    []
  );

  const loginBonusAxios = useCallback(
    async (tokenId: string) => {
      await axios
        .get("v0/login-bonuses", {
          headers: {
            authorization: `TEST ${tokenId}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setLoginBonus(res.data);
          return res.data;
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    },
    [token]
  );

  const loginBonusPost = useCallback(
    (loginBonusID: string, tokenID: string) => {
      axios
        .post(
          `v0/login-bonuses/${loginBonusID}/prize`,
          {},
          {
            headers: {
              authorization: `TEST ${tokenID}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setReceivedBonus(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 500) {
            console.log("受け取り済みだお");
          }
        });
    },
    [token]
  );

  return {
    searchAxios,
    searchAxiosUser,
    addFollowAxios,
    removeFollowAxios,
    findMeAxios,
    myId,
    findAllFollowsAxios,
    findAllFollowersAxios,
    followNumber,
    followerNumber,
    phoneInsertAxios,
    loginBonusAxios,
    loginBonus,
    receivedBonus,
    loginBonusPost,
  };
};
