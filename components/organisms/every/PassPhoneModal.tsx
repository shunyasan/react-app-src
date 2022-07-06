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
  Text,
  Button,
  Center,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
};

export const PassPhoneModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onClick } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>電話番号認証をしてください</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack m={4}>
            <Center>
              <Box>
                <Text>
                  ログインボーナスを受け取るには、電話番号認証が必要です
                </Text>
                <Center>
                  <Button mt={7} onClick={onClick}>
                    電話番号認証をする
                  </Button>
                </Center>
              </Box>
            </Center>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
