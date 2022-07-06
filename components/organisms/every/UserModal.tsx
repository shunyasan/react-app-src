import { ChangeEvent, memo, VFC } from "react";
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
} from "@chakra-ui/react";
import { axiosUser } from "../../../types/api/axiosUser";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: axiosUser | null;
};

export const UserModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, user } = props;
  const [selectUser, setSelectUser] = useState<axiosUser | null>();
  // const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setSelectUser(user ?? null);
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー詳細情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <Box>
              <Box>名前</Box>
              {selectUser?.firstname}
              {selectUser?.lastname}
            </Box>
            <Box>
              <Box>メールアドレス</Box>
              {selectUser?.email}
            </Box>
            <Box>
              <Box>TEL</Box>
              {selectUser?.phone ? "登録済み" : "未登録"}
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
