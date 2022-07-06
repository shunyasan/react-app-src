import {
  Spinner,
  Wrap,
  WrapItem,
  useDisclosure,
  Button,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useCallback } from "react";
import { memo, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import axiosBase from "axios";
import { useAuth } from "../../hooks/useAuth";
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

export const UserManagement: VFC = memo(() => {
  const { getUsers, loading, users } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectUser, selectUser } = useSelectUser();
  const { token, uid } = useAuth();

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  useEffect(() => getUsers(), []);

  const getUser = useCallback(() => {
    // テスト
    console.log("axios  :");
    console.log(token);
    axios
      .get("v0/users", {
        params: {
          loginId: "データ",
        },
        headers: {
          authorization: `TEST ${token}`,
        },
      })
      .then((res) => {
        alert(res.data);
        console.log(res.data);
      });
  }, [token]);

  const findFollower = useCallback(() => {
    // テスト
    // console.log("axios  :");
    // console.log(token);
    let followId = "";
    axios
      .get(`/v0/users/`, {
        params: {
          followId: "0e82f0fa-7e9f-4735-af90-8d362f403465",
        },
        headers: {
          authorization: `TEST ${token}`,
        },
      })
      .then((res) => {
        alert(res.data);
        console.log(res.data);
      });
  }, [token]);

  return (
    <>
      <Center mt={5}>
        <Button m={10} onClick={getUser}>
          ユーザー取得
        </Button>
      </Center>
      <Center mt={5}>
        <Button m={10} onClick={findFollower}>
          フォローワー取得
        </Button>
      </Center>
      {/* {loading ? (
        <Spinner />
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        user={selectUser}
        isAdmin={loginUser?.isAdmin}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
    </>
  );
});
