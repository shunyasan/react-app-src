import { ChangeEvent, memo, useCallback, VFC } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Stack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Box,
  Button,
  Center,
  useMenu,
} from "@chakra-ui/react";
import { axiosUser } from "../../../types/api/axiosUser";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";
import { loginBonus } from "../../../types/api/loginBonus";
import firebase from "firebase";
import axiosBase from "axios";
import { useMessage } from "../../../hooks/useMessage";
import { useAxios } from "../../../hooks/useAxios";
import { useAuth } from "../../../hooks/useAuth";
const axios = axiosBase.create({
  baseURL: "http://localhost:3004", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // user: axiosUser | null;
  // getUser: () => void;
};

export const PhoneModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const [selectUser, setSelectUser] = useState<axiosUser | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [authNumber, setAuthNumber] = useState<string>("");
  const [verificationId, setVerificationId] = useState<string>("");
  const [authReady, setAuthReady] = useState<string>("none");

  const { token } = useAuth();
  const { phoneInsertAxios } = useAxios();
  const { showMessage } = useMessage();

  var firebaseConfig = {
    apiKey: "AIzaSyAXtLwptUt9jEcMk76V0vpGbUx4mcPHBrw",
    authDomain: "nest-app-2.firebaseapp.com",
    databaseURL: "https://nest-app-2-default-rtdb.firebaseio.com",
    projectId: "nest-app-2",
    storageBucket: "nest-app-2.appspot.com",
    messagingSenderId: "478814543890",
    appId: "1:478814543890:web:59432ea9e0976179f078cb",
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const firebaseSendNumber = useCallback(async () => {
    try {
      let recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          // UIの色
          theme: "light",

          // UIの大きさ
          size: "normal",

          // タブインデックス
          tabindex: 0,

          // ユーザーが正常な応答を送信したときに実行される

          //reCAPTCHA応答が期限切れになり、ユーザーが再検証する必要があるときに実行される
          "expired-callback": () => {},

          // reCAPTCHAでエラー（通常はネットワーク接続）が発生し、接続が復元されるまで続行できない場合に実行される
          "error-callback": () => {},
        }
      );

      let inputNumber = `+81${phoneNumber.slice(1)}`;
      console.log(inputNumber);

      const provider = new firebase.auth.PhoneAuthProvider();
      let createId = await provider.verifyPhoneNumber(
        inputNumber,
        recaptchaVerifier
      );
      setVerificationId(createId);
      console.log("実行中");
      console.log(createId);
      setAuthReady("block");
    } catch (error) {
      console.error(error);
      setAuthReady("none");
    }
  }, [phoneNumber, token]);

  const firebaseSendAuth = useCallback(async () => {
    try {
      console.log("verificationId表示");
      console.log(verificationId);
      console.log(authNumber);
      const phoneCredential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        authNumber
      );
      console.log("phoneCredential通過");
      console.log(phoneCredential);

      const phoneAuthentication = await firebase
        .auth()
        .currentUser?.linkWithCredential(phoneCredential)
        .then(async () => {
          await phoneInsertAxios(phoneNumber, token);
          showMessage({ title: "認証成功しました", status: "success" });
          console.log("認証成功");
          setPhoneNumber("");
          setAuthNumber("");
          setVerificationId("");
          onClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [authNumber]);

  const phoneNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(e.target.value);
    },
    [phoneNumber]
  );

  const authNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAuthNumber(e.target.value);
    },
    [authNumber]
  );

  const onClickSubmit = useCallback(() => {
    alert(phoneNumber);
    // axios
    //   .put(`user/phone/${user_id}`, {
    //     phone: phoneNumber,
    //   })
    //   .then((res) => {
    //     alert(res.data.message);
    //     console.log(res.data);
    //     console.log("エラーの有無\n" + !res.data.error);
    //     if (!res.data.error) {
    //       onClose();
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     console.log(error);
    //   });
  }, [phoneNumber]);
  // const onClickBonus = useCallback((user_id, value: number) => {
  //   axios
  //     .put(`login-bonus/create/${user_id}`, {
  //       value: value,
  //     })
  //     .then((res) => {
  //       alert(res.data.message);
  //       console.log(res.data);
  //       if (res.data.path) {
  //         alert("リンクがあります");
  //       }
  //       onClose();
  //       getUser();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>電話番号登録</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <Box bg="white" rounded="md" p={7} shadow="lg">
              <FormControl>
                <FormLabel mb="10">登録する電話番号</FormLabel>
                <Center>
                  <Input
                    w="95%"
                    onChange={phoneNumberChange}
                    value={phoneNumber}
                    mx="auto"
                  />
                </Center>
              </FormControl>
            </Box>
            <Button onClick={firebaseSendNumber}>認証する</Button>
            <Box id="recaptcha-container"></Box>
            <Box bg="white" rounded="md" p={7} shadow="lg" display={authReady}>
              <FormControl>
                <FormLabel mb="10">認証コード</FormLabel>
                <Center>
                  <Input
                    w="50%"
                    onChange={authNumberChange}
                    value={authNumber}
                    mx="auto"
                  />
                </Center>
              </FormControl>
            </Box>
            <Button onClick={firebaseSendAuth} display={authReady}>
              登録
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
