import { ChangeEvent, memo, VFC } from "react";
import {  Modal,
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
 } from "@chakra-ui/react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isAdmin?: boolean;
}

export const UserDetailModal: VFC<Props> = memo((props) => {
  const {isOpen, onClose, user, isAdmin = false } = props;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(user?.name ?? '');
    setUsername(user?.username ?? '');
    setEmail(user?.email ?? '');
    setPhone(user?.phone ?? '');
  },[user]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };


  const onClickUpdate = () => alert("test");
  return(
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} >
    <ModalOverlay />
    <ModalContent pb={6}>
      <ModalHeader>ユーザー詳細情報</ModalHeader>
      <ModalCloseButton />
      <ModalBody mx={4}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>名前</FormLabel>
            <Input value={name} onChange={onChangeName} isReadOnly={!isAdmin} />
          </FormControl>
          <FormControl>
            <FormLabel>フルネーム</FormLabel>
            <Input value={username} onChange={onChangeUsername} isReadOnly={!isAdmin} />
          </FormControl>
          <FormControl>
            <FormLabel>mail</FormLabel>
            <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
          </FormControl>
          <FormControl>
            <FormLabel>TEL</FormLabel>
            <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdmin} />
          </FormControl>
        </Stack>
      </ModalBody>
      {isAdmin && (
        <ModalFooter>
          <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
        </ModalFooter>      
      )}
    </ModalContent>
  </Modal>

  )

})
