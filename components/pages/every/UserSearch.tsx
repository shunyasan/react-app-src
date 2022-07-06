import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useAxios } from "../../../hooks/useAxios";
import { useAllUsersAxios } from "../../../hooks/useAllUsersAxios";
import { FollowButton } from "../../atoms/button/FollowButton";

export const UserSearch: VFC = memo(() => {
  const [loginId, setLoginId] = useState<string>("");
  const [create, setCreate] = useState<boolean>(true);
  const [users, setUsers] = useState<any>();

  const { searchAxios, searchAxiosUser } = useAxios();
  const { token } = useAuth();
  const { getUsers, allUsers, endPoint } = useAllUsersAxios();

  const changeLoginId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  }, []);

  const startSearch = useCallback(() => {
    searchAxios({ loginId: loginId });
  }, [loginId, searchAxiosUser, token]);

  useEffect(() => {
    if (searchAxiosUser) {
      console.log("searchAxiosUser");
      console.log(searchAxiosUser);
      setUsers(searchAxiosUser);
    }
  }, [searchAxiosUser]);

  useEffect(() => {
    if (token) {
      if (create) {
        console.log("入った");
        getUsers(token);
      }
    }
  }, [create, token]);

  useEffect(() => {
    if (endPoint) {
      setCreate(false);
    }
  }, [endPoint]);

  window.addEventListener("scroll", () => {
    // getElementById ...
    // 要素を取得系?
    let element = document.getElementById("item");
    if (element) {
      let item = element.lastElementChild;
      if (item) {
        let off = item.getBoundingClientRect().top - 700;
        if (off < 0) {
          // console.log("終わったよ");
          return setCreate(true);
        }
      }
      console.log("あぶね");
      return;
    } else {
      return;
    }
  });

  return (
    <>
      <Center>
        <Stack p={8}>
          <Heading p={7}>検索ページ</Heading>
        </Stack>
      </Center>
      <FormControl>
        <Center m={8}>
          <FormLabel w="500px" mb={5}>
            EveryID
          </FormLabel>
        </Center>
        <Center>
          <Input
            w="500px"
            bg="whiteAlpha.800"
            onChange={changeLoginId}
            value={loginId}
          />
          <Button mr={5} onClick={startSearch}>
            検索
          </Button>
        </Center>
      </FormControl>
      {users && (
        <Center mt={20}>
          <Box fontSize="20px">検索結果</Box>
        </Center>
      )}
      <Center>
        {users ? (
          users.map((user: any) => (
            <Box w={"50rem"} bg="white" rounded="md" p={5} shadow="lg" m={20}>
              {user.loginId}
              <FollowButton followStatus={user.followStatus} userId={user.id} />
            </Box>
          ))
        ) : (
          <Box id="item">
            {allUsers.map((user) => (
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
                <FollowButton
                  followStatus={user.followStatus}
                  userId={user.id}
                />
              </Box>
            ))}
          </Box>
        )}
      </Center>
    </>
  );
});
