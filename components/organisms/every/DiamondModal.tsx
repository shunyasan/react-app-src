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
} from "@chakra-ui/react";
import { axiosUser } from "../../../types/api/axiosUser";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";
import { loginBonus } from "../../../types/api/loginBonus";
import axiosBase from "axios";
import { PhoneModal } from "./PhoneModal";
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
  user: axiosUser | null;
  loginBonus: loginBonus[] | null;
  getUser: () => void;
};

export const DiamondModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, user, loginBonus, getUser } = props;
  const [selectUser, setSelectUser] = useState<axiosUser | null>(null);
  const [arrayBonus, setArrayBonus] = useState<loginBonus[] | null>(null);
  const [modalItem, setModalItem] = useState<string>("");

  useEffect(() => {
    setSelectUser(user);
    setArrayBonus(loginBonus);
  }, [user]);

  const onClickBonus = useCallback((user_id, value: number) => {
    axios
      .put(`login-bonus/create/${user_id}`, {
        value: value,
      })
      .then((res) => {
        alert(res.data.message);
        console.log(res.data);
        onClose();
        getUser();
        if (res.data.path) {
          alert("電話番号を登録すると獲得できます");
          setModalItem("phoneModal");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <ModalOverlay />
        <ModalContent pb={6}>
          <ModalHeader>ログインボーナス付与</ModalHeader>
          <ModalCloseButton />
          <Box ml="10" mb="5">
            ユーザー：{selectUser?.firstname}
          </Box>
          <ModalBody mx={4}>
            <Stack spacing={4}>
              {arrayBonus?.map((bonus, i = 1) => (
                <Box key={i} bg="white" rounded="md" p={5} shadow="lg">
                  ログインボーナス{i + 1}日目
                  <Button
                    key={bonus.value}
                    isDisabled={bonus.recieved_date == null ? false : true}
                    borderRadius="sm"
                    px="2"
                    ml="20"
                    colorScheme="gray"
                    onClick={() => onClickBonus(selectUser?.id, bonus.value)}
                  >
                    {bonus.recieved_date == null
                      ? bonus.value + "P 付与"
                      : "済"}
                  </Button>
                </Box>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <PhoneModal
        user={selectUser}
        isOpen={"phoneModal" == modalItem}
        getUser={getUser}
        onClose={() => setModalItem("")}
      /> */}
    </>
  );
});
