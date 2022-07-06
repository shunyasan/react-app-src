import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  HStack,
  Image,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useAxios } from "../../../hooks/useAxios";
import { PhoneModal } from "../../organisms/every/PhoneModal";
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

export const Mypage: VFC = memo(() => {
  const [modalItem, setModalItem] = useState<string>("");

  const { token, signOut } = useAuth();
  const history = useHistory();
  const {
    findMeAxios,
    myId,
    findAllFollowsAxios,
    findAllFollowersAxios,
    followNumber,
    followerNumber,
  } = useAxios();
  useEffect(() => {
    if (token) {
      findMeAxios(token);
    }
  }, [token]);

  useEffect(() => {
    if (myId) {
      console.log("myId");
      console.log(myId);
      findAllFollowsAxios({ userId: myId?.id, tokenId: token });
      findAllFollowersAxios({ userId: myId?.id, tokenId: token });
    }
  }, [myId]);

  const onClickFollows = useCallback(() => history.push("/every/follows"), []);
  const onClickFollowers = useCallback(
    () => history.push("/every/followers"),
    []
  );
  // const walletCheckAxios = useCallback(() => {
  //   axios
  //     .get(`v0/users/me/daimond/withdrawal-histories`, {
  //       headers: {
  //         authorization: `TEST ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //       console.log(err);
  //     });
  // }, [token]);

  return (
    <>
      <Box w="70%" pb="100px" m="auto">
        <Stack p={5}>
          <Box fontSize="2xl" textAlign="center" mx="auto">
            EveryID :　 {myId?.loginId}
          </Box>
          <Box
            border="1px solid #888"
            p="50px"
            borderRadius="10px"
            width="100%"
            height="400px"
          >
            <HStack align="flex-start" justify="space-between">
              <Stack border="1px solid #333" borderRadius="50%">
                <Image src={myId?.picture.uri} borderRadius="50%" />
              </Stack>
              <Stack pr="20px" pt="40px">
                <Box
                  borderBottom="1px solid #444"
                  cursor="pointer"
                  mb="10px"
                  pb="5px"
                  display="inline"
                  pos="relative"
                >
                  <Text display="inline" mr="100px">
                    フォロー数 :{" "}
                  </Text>
                  <Text
                    pos="absolute"
                    right="0"
                    display="inline"
                    onClick={onClickFollows}
                    ml="10px"
                  >
                    {followNumber}
                  </Text>
                </Box>
                <Box
                  borderBottom="1px solid #444"
                  cursor="pointer"
                  mb="10px"
                  pb="5px"
                  display="inline"
                  pos="relative"
                >
                  <Text display="inline" mr="100px">
                    フォロワー数 :
                  </Text>

                  <Text
                    cursor="pointer"
                    onClick={onClickFollowers}
                    pb="5px"
                    display="inline"
                    pos="absolute"
                    right="0"
                  >
                    {followerNumber}
                  </Text>
                </Box>
              </Stack>
            </HStack>
            <Box mt="40px">
              <Text ml="20px">紹介文</Text>
              <Center
                border="1px solid #888"
                height="100px"
                borderRadius="10px"
              >
                テスト
              </Center>
            </Box>
          </Box>
          <Stack textAlign="center">
            <Box my={8}>
              <Text>
                電話番号認証 :　
                {myId?.phoneNumberVerifiedDateTime != null
                  ? "認証済み"
                  : "未認証"}
              </Text>
            </Box>
            <Box my={8}>
              {myId?.phoneNumberVerifiedDateTime == null && (
                <Button onClick={() => setModalItem("phoneModal")} mx={5}>
                  電話番号認証
                </Button>
              )}
              <Button onClick={signOut} mx={5}>
                サインアウト
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <PhoneModal
        isOpen={"phoneModal" == modalItem}
        onClose={() => setModalItem("")}
      />
    </>
  );
});
