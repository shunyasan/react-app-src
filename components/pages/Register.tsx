import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useRadioGroup,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { axiosUser } from "../../types/api/axiosUser";
import axiosBase from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RadioCard } from "../atoms/radio/RadioCard";
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3004",
  },
  responseType: "json",
});

export const Register: VFC = memo(() => {
  const history = useHistory();
  const [loginId, setLoginId] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [showLoginId, setShowLoginId] = useState<boolean>(true);
  const [showGender, setShowGender] = useState<boolean>(false);
  const { uid, token } = useAuth();

  const loginIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const genderChange = useCallback(
    (value) => {
      setGender(value);
    },
    [gender]
  );

  // const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const passChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPass(e.target.value);
  // };

  const boxChange = useCallback(() => {
    setShowLoginId(false);
    setShowGender(true);
  }, []);

  useEffect(() => {
    setLoginId(loginId);
    setGender(gender);
  }, [loginId, gender]);

  const submit = useCallback(() => {
    let submit = {
      loginId: loginId,
      gender: gender,
    };
    console.log("token");
    console.log(token);
    alert(JSON.stringify(submit));
    axios
      .post("/v0/users", submit, {
        headers: {
          authorization: `TEST ${token}`,
        },
      })
      .then((res) => {
        alert("登録しました");
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        alert(err);
        history.push("/auth/register");
      });
  }, [loginId, gender]);

  return (
    <Center>
      <Box m={20}>
        <Stack>
          {showLoginId && (
            <>
              <FormControl>
                <FormLabel mb={5}>EveryID</FormLabel>
                <Input
                  w="500px"
                  mb={10}
                  bg="whiteAlpha.800"
                  onChange={loginIdChange}
                  value={loginId}
                />
              </FormControl>
              <Center>
                <Button
                  w="300px"
                  onClick={boxChange}
                  bg="teal.400"
                  color="white"
                  _hover={{ opacity: 0.8 }}
                >
                  次へ
                </Button>
              </Center>
            </>
          )}
          {showGender && (
            <>
              <RadioGroup mb={10}>
                <FormLabel mb={5}>性別</FormLabel>
                <Radio
                  onClick={() => genderChange("male")}
                  value={"male"}
                  size="lg"
                  name="1"
                  colorScheme="blue"
                  mr={8}
                >
                  男性
                </Radio>
                <Radio
                  onClick={() => genderChange("female")}
                  value={"female"}
                  size="lg"
                  name="1"
                  colorScheme="blue"
                  mr={8}
                >
                  女性
                </Radio>
                <Radio
                  onClick={() => genderChange("secret")}
                  value={"secret"}
                  size="lg"
                  name="1"
                  colorScheme="blue"
                  mb={10}
                >
                  非公開
                </Radio>
              </RadioGroup>

              <Center>
                <Button
                  onClick={submit}
                  bg="teal.400"
                  color="white"
                  _hover={{ opacity: 0.8 }}
                >
                  登録
                </Button>
              </Center>
            </>
          )}
          {/* <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input onChange={emailChange} value={email} />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input onChange={passChange} value={pass} />
        </FormControl> */}
        </Stack>
      </Box>
    </Center>
  );
});
