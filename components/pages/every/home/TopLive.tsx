import {
  Center,
  Flex,
  HStack,
  Text,
  Box,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { memo, VFC } from "react";
import axiosBase from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
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

export const TopLive: VFC = memo(() => {
  const [veteranLive, setVeteranLive] = useState<any>();
  const { token } = useAuth();

  const veteransLiveAxios = useCallback(() => {
    axios
      .get("v0/live/veterans", {
        headers: {
          authorization: `TEST ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("veteran獲得OK");
        setVeteranLive(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, veteranLive]);

  useEffect(() => {
    if (token) {
      veteransLiveAxios();
    }
  }, [token]);

  return (
    <>
      <Center mt={5}>注目TOP</Center>
      {veteranLive && (
        <Flex wrap="wrap" my={8} mx="40" w="xl">
          <HStack spacing="20">
            {veteranLive.map((value: any) => (
              <Box
                w="200px"
                border="1px solid #222"
                borderRadius="9px"
                key={value.id}
              >
                <Image
                  src={value.user.picture.uri}
                  w="100%"
                  borderRadius="9px"
                />
                <Text textAlign="center" w="100%" my={2}>
                  {value.name}
                </Text>
              </Box>
            ))}
          </HStack>
        </Flex>
      )}
    </>
  );
});
