import { memo, useCallback, useState, VFC } from "react";
import { Box, Center, Flex, Stack, Button } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import axiosBase from "axios";
import { useAxios } from "../../../hooks/useAxios";
//blue-apiへの接続
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3004",
  },
  responseType: "json",
});

export const Live: VFC = memo(() => {
  const { token, user } = useAuth();

  const [onAirId, setOnAirId] = useState<string>("");

  // ライブ開始
  const startLiveAxios = useCallback(() => {
    axios
      .post(
        "v0/live",
        {
          // 女子とか男子のやつ
          liveCategoryId: "fd97b15b-59ef-46bd-a9ae-dd7a90d68242",

          // イベント
          eventId: "19a12b49-a57a-4f1e-8e66-152be08e6111",

          // セカンドイベント
          subEventId: "63611456-1546-4cda-b5ed-db50857a23ad",

          // 配信名
          name: "フィアーの配信",
        },
        {
          headers: {
            authorization: `TEST ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("成功おめでとう");
        console.log(res.data);
        setOnAirId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  // ライブ終了
  const endLiveAxios = useCallback(
    (id: string) => {
      axios
        .delete(`v0/live/${id}`, {
          headers: {
            authorization: `TEST ${token}`,
          },
        })
        .then((res) => {
          console.log("終了できた");
          console.log(res.data);
          setOnAirId("");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [token]
  );

  return (
    <Center mt={5}>
      <Flex wrap="wrap">
        <Stack m={8}>
          <Button m={10} onClick={startLiveAxios}>
            ライブ開始
          </Button>
        </Stack>
        <Stack m={8}>
          <Button
            m={10}
            onClick={() => endLiveAxios(onAirId)}
            isDisabled={onAirId == ""}
          >
            ライブ終了
          </Button>
        </Stack>
      </Flex>
    </Center>
  );
});
