import { memo, VFC } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickFollows: () => void;
  onClickFollowers: () => void;
  onClickSerch: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    onClickHome,
    onClickFollows,
    onClickFollowers,
    onClickSerch,
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button onClick={onClickHome} w="100%">
              TOP
            </Button>
            <Button onClick={onClickFollows} w="100%">
              フォロー中
            </Button>
            <Button onClick={onClickFollowers} w="100%">
              フォロワー
            </Button>
            <Button onClick={onClickSerch} w="100%">
              ユーザー検索
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
