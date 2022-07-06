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
import { axiosUser } from "../../types/api/axiosUser";
import { loginBonus } from "../../types/api/loginBonus";
import axiosBase from "axios";
import { UserModal } from "../organisms/every/UserModal";
import { DiamondModal } from "../organisms/every/DiamondModal";
import { PhoneModal } from "../organisms/every/PhoneModal";
import { useClickUser } from "../../hooks/useClickUser";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3004",
  },
  responseType: "json",
});

export const Pagenation: VFC = memo(() => {
  const [users, setUsers] = useState<Array<axiosUser>>([]);
  const [page, setPage] = useState<number>(0);
  const [create, setCreate] = useState<boolean>(true);
  const [modalItem, setModalItem] = useState<string>("");
  const [loginBonus, setLoginBonus] = useState<loginBonus[]>([]);
  const [loading, setLoading] = useState<boolean>();
  //
  const history = useHistory();
  const { onOpen } = useDisclosure();
  const { selectUser, onClickUser } = useClickUser();
  const { displayName, token } = useAuth();

  const getUser = useCallback(async () => {
    await axios
      .get<any>("/v0/users/follows/", {
        params: {
          number: Number(page),
          followId: "0e82f0fa-7e9f-4735-af90-8d362f403465",
        },
        headers: {
          authorization: `TEST ${token}`,
        },
      })
      .then((res) => {
        if (res.data.length == 0) {
          alert("max");
          return;
        }
        setUsers([...users, ...res.data]);
        setPage(page + 1);
        console.log(res.data);
        console.log(page);
        setLoading(false);
        return setCreate(false);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [users, page, token]);

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
    console.log("token");
    if (create) {
      getUser();
    }
  }, [create, token]);

  const formatDate = useCallback((resume_time: Date) => {
    let format = new Date(resume_time);
    let year = format.getFullYear();
    let month = format.getMonth() + 1;
    let day = format.getDate();
    let hour = format.getHours();
    let min = format.getMinutes();
    let sec = format.getSeconds();
    return `${year}年${month}月${day}日  ${hour}:${min}:${sec}`;
  }, []);

  const onClickBan = useCallback(async (user_id) => {
    let date = new Date();
    date.setSeconds(date.getSeconds() + 20);
    alert(formatDate(date));
    axios
      .put(`user/setBan/${user_id}`, { resume_time: date })
      .then(async () => {
        alert(`BANされました。\n${formatDate(date)}に再表示されます`);
        setLoading(true);
        console.log("通ったよ");
        getUser();
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const onClickUserSelect = useCallback(
    (user_id: string) => {
      onClickUser({ user_id, onOpen });
      setModalItem("userModal");
    },
    [onClickUser, onOpen, modalItem]
  );

  const onClickDiamondModal = useCallback(
    (user_id: string) => {
      axios.get(`login-bonus/create/${user_id}`).then((res) => {
        console.log(res.data[0]);
        onClickUser({ user_id, onOpen });
        setLoginBonus(res.data);
        setModalItem("diamondModal");
      });
    },
    [onClickUser, onOpen, modalItem, loginBonus]
  );

  const innerJoinTest = useCallback(() => {
    console.log(token);
  }, [token]);

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
        <Center>
          <Button onClick={innerJoinTest} p={7}>
            innerJoin テスト
          </Button>
        </Center>
        <Center>
          <Heading p={7}>ユーザー一覧</Heading>
        </Center>
        <Box w={"50rem"} bg="white" rounded="md" p={5} shadow="lg" m={20}>
          ユーザー： {displayName}
        </Box>
        {users.map((user) => (
          <Box
            key={user.id}
            w={"50rem"}
            bg="white"
            rounded="md"
            p={5}
            shadow="lg"
            m={20}
          >
            {user.firstname}：
            {user.resume_time != null
              ? `${formatDate(user.resume_time)}まで`
              : ""}
            <Button
              isDisabled={user.resume_time == null ? false : true}
              onClick={() => onClickBan(user.id)}
              borderRadius="sm"
              px="2"
              ml="20"
              colorScheme="gray"
            >
              BAN
            </Button>
            <Button
              onClick={() => onClickUserSelect(user.id)}
              borderRadius="sm"
              px="2"
              ml="20"
              colorScheme="teal"
            >
              詳細
            </Button>
            <Button
              borderRadius="sm"
              px="2"
              ml="20"
              colorScheme="blue"
              onClick={() => onClickDiamondModal(user.id)}
            >
              ダイヤ付与
            </Button>
            <Button ml="20">スコア： {user.score}</Button>
          </Box>
        ))}
      </Box>
      {/* <UserModal
        user={selectUser}
        isOpen={"userModal" == modalItem}
        onClose={() => setModalItem("")}
      /> */}
      <DiamondModal
        user={selectUser}
        loginBonus={loginBonus}
        isOpen={"diamondModal" == modalItem}
        getUser={getUser}
        onClose={() => setModalItem("")}
      />
    </>
  );
});
