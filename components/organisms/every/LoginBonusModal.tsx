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
  Center,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loginBonus: any;
  bonusTarget: string;
};

export const LoginBonusModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, loginBonus, bonusTarget } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} size="3xl">
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader textAlign="center" mt={3}>
          ログインボーナス
        </ModalHeader>
        <ModalBody mx={4}>
          <Center m={8}>
            <Flex wrap="wrap">
              {loginBonus.prizes.map((prize: any, i: number) => (
                <Stack m={8} width="50px">
                  <Text textAlign="center">{i + 1}日目</Text>
                  {prize.receivedDateTime != undefined ? (
                    <Button isDisabled>済</Button>
                  ) : (
                    bonusTarget == prize.id && <Button>取得</Button>
                  )}
                </Stack>
              ))}
            </Flex>
          </Center>
          <Center mb={8}>
            <Button onClick={onClose}>受け取る</Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
