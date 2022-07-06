import { ChangeEvent, memo, useCallback, useEffect, VFC } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import firebase from "firebase";
import { axiosUser } from "../../../types/api/axiosUser";
import { loginBonus } from "../../../types/api/loginBonus";
import axiosBase from "axios";
import { UserModal } from "../../organisms/every/UserModal";
import { DiamondModal } from "../../organisms/every/DiamondModal";
import { PhoneModal } from "../../organisms/every/PhoneModal";
import { useClickUser } from "../../../hooks/useClickUser";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { useAxios } from "../../../hooks/useAxios";
import { useMessage } from "../../../hooks/useMessage";
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  responseType: "json",
});

export const Follows: VFC = memo(() => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [create, setCreate] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  //
  const history = useHistory();
  const { onOpen } = useDisclosure();
  const { selectUser, onClickUser } = useClickUser();
  const { displayName, token } = useAuth();
  const { findMeAxios, myId } = useAxios();
  const { showMessage } = useMessage();

  useEffect(() => {
    findMeAxios(token);
    setCreate(true);
  }, [token]);

  // const findMe = useCallback(async () => {
  //   await findMeAxios();
  //   setCreate(true);
  //   console.log("findMe 発見");
  //   console.log(create);
  // }, [create, token]);

  const getUser = useCallback(() => {
    console.log("start");
    axios
      .get<any>("/v0/users/follows/", {
        params: {
          number: Number(page),
          followId: myId?.id,
        },
        headers: {
          authorization: `TEST ${token}`,
        },
      })
      .then((res) => {
        if (res.data.length == 0) {
          showMessage({ title: "全て表示されました", status: "success" });
          return;
        }
        setUsers([...users, ...res.data]);
        setPage(page + 1);
        console.log("res.data");
        console.log(res.data);
        console.log(page);
        setLoading(false);
        return setCreate(false);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [users, page, token, myId]);

  window.addEventListener("scroll", () => {
    // getElementById ...
    // 要素を取得系?
    let element = document.getElementById("item");
    let item = element!.lastElementChild;
    let off = item!.getBoundingClientRect().top - 700;

    if (off < 0) {
      return setCreate(true);
    }
  });

  useEffect(() => {
    if (create) {
      if (myId) {
        console.log("myId");
        console.log(myId?.id);
        getUser();
      }
    }
  }, [create, myId]);

  const onClickUserSelect = useCallback(
    (user_id: string) => {
      onClickUser({ user_id, onOpen });
      setModalItem("userModal");
    },
    [onClickUser, onOpen, modalItem]
  );

  return (
    <>
      {loading ? (
        <Box
          pos="fixed"
          bg="whiteAlpha.800"
          top="0%"
          bottom="0%"
          left="0%"
          right="0%"
          zIndex={3}
        >
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            pos="fixed"
            top="50%"
            bottom="50%"
            left="50%"
            right="50%"
            zIndex={2}
          />
        </Box>
      ) : (
        ""
      )}
      <Box id="item">
        {/* <Center>
          <Button onClick={innerJoinTest} p={7}>
            innerJoin テスト
          </Button>
        </Center> */}
        <Center>
          <Heading p={7}>フォロー中</Heading>
        </Center>
        <Box w={"50rem"} bg="white" rounded="md" p={5} shadow="lg" m={20}>
          ユーザー： {displayName}
        </Box>
        {users &&
          users.map((user) => (
            <Box
              key={user.id}
              w={"50rem"}
              bg="white"
              rounded="md"
              p={5}
              shadow="lg"
              m={20}
            >
              {user.loginId}：
              <Button
                onClick={() => onClickUserSelect(user.id)}
                borderRadius="sm"
                px="2"
                ml="20"
                colorScheme="teal"
              >
                詳細
              </Button>
            </Box>
          ))}
      </Box>
      <UserModal
        user={selectUser}
        isOpen={"userModal" == modalItem}
        onClose={() => setModalItem("")}
      />
    </>
  );
});
