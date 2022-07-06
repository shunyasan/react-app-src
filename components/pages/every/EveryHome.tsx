import {
  Spinner,
  Wrap,
  WrapItem,
  useDisclosure,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { memo, VFC } from "react";
import { useAllUsers } from "../../../hooks/useAllUsers";
import { useSelectUser } from "../../../hooks/useSelectUser";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { UserCard } from "../../organisms/user/UserCard";
import { LoginBonusModal } from "../../organisms/every/LoginBonusModal";
import { PassPhoneModal } from "../../organisms/every/PassPhoneModal";
import axiosBase from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { TopLive } from "./home/TopLive";
import { NewLive } from "./home/NewLive";
import { CloverOneLive } from "./home/CloverOneLive";
import { CloverTwoLive } from "./home/CloverTwoLive";
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

export const EveryHome: VFC = memo(() => {
  const { token, user } = useAuth();
  const history = useHistory();
  const { loginBonusAxios, loginBonus, loginBonusPost, receivedBonus } =
    useAxios();
  const [bonusAuthorization, setBonusAuthorization] = useState<string>("");
  const [bonusTarget, setBonusTarget] = useState<string>("");
  const [modalItem, setModalItem] = useState<string>("");
  const [selectPage, setSelectPage] = useState<string>("TopLive");
  const [leftUnderBar, setLeftunderBar] = useState<string>("-1%");
  const [widthUnderBar, setWidthUnderBar] = useState<string>("12%");

  const onClickTopLive = useCallback(() => {
    setSelectPage("TopLive");
    setLeftunderBar("-1%");
    setWidthUnderBar("12%");
  }, [selectPage]);

  const onClickNewLive = useCallback(() => {
    setSelectPage("NewLive");
    setLeftunderBar("22%");
    setWidthUnderBar("15%");
  }, [selectPage]);

  const onClickCloverOne = useCallback(() => {
    setSelectPage("CloverOne");
    setLeftunderBar("46%");
    setWidthUnderBar("23%");
  }, [selectPage]);

  const onClickCloverTwo = useCallback(() => {
    setSelectPage("CloverTwo");
    setLeftunderBar("78%");
    setWidthUnderBar("23%");
  }, [selectPage]);

  const mypage = useCallback(() => {
    history.push(`/every/mypage/`);
  }, []);

  return (
    <>
      <Center pt={5}>
        <Box pos="relative">
          <HStack spacing={10}>
            <Text
              cursor="pointer"
              onClick={onClickTopLive}
              fontWeight={selectPage == "TopLive" ? "bold" : "normal"}
              transition="all .3s ease-in-out"
            >
              注目
            </Text>
            <Text
              cursor="pointer"
              onClick={onClickNewLive}
              fontWeight={selectPage == "NewLive" ? "bold" : "normal"}
              transition="all .3s ease-in-out"
            >
              NEW
            </Text>
            <Text
              cursor="pointer"
              onClick={onClickCloverOne}
              fontWeight={selectPage == "CloverOne" ? "bold" : "normal"}
              transition="all .3s ease-in-out"
            >
              Clo_One
            </Text>
            <Text
              cursor="pointer"
              onClick={onClickCloverTwo}
              fontWeight={selectPage == "CloverTwo" ? "bold" : "normal"}
              transition="all .3s ease-in-out"
            >
              Clo_Two
            </Text>
          </HStack>
          {/* アンダーバー */}
          <Box
            m={0}
            pos="absolute"
            left={leftUnderBar}
            bottom="-2px"
            width={widthUnderBar}
            height="2px"
            background="#ff64de"
            transition="all .3s ease-in-out"
          ></Box>
          {/*  */}
        </Box>
      </Center>
      {selectPage == "TopLive" && (
        <Box>
          <TopLive />
        </Box>
      )}
      {selectPage == "NewLive" && (
        <Box>
          <NewLive />
        </Box>
      )}
      {selectPage == "CloverOne" && (
        <Box>
          <CloverOneLive />
        </Box>
      )}
      {selectPage == "CloverTwo" && (
        <Box>
          <CloverTwoLive />
        </Box>
      )}
      {bonusAuthorization == "auth" && (
        <LoginBonusModal
          isOpen={"loginBonus" == modalItem}
          onClose={() => setModalItem("")}
          loginBonus={loginBonus}
          bonusTarget={bonusTarget}
        />
      )}
      {bonusAuthorization == "none" && (
        <PassPhoneModal
          isOpen={"passPhone" == modalItem}
          onClose={() => setModalItem("")}
          onClick={mypage}
        />
      )}
    </>
  );
});
