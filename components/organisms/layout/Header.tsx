import { memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faHome,
  faImage,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { signOut, auth } = useAuth();
  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickFollows = useCallback(() => history.push("/every/follows"), []);
  const onClickFollowers = useCallback(
    () => history.push("/every/followers"),
    []
  );
  const onClickLive = useCallback(() => history.push("/every"), []);
  const onClickSerch = useCallback(() => history.push("/every/search"), []);
  const onClickMyPage = useCallback(() => history.push("/every/mypage"), []);

  return (
    <>
      <Flex
        as="nav"
        bg="white"
        color="gray.50"
        padding={{ base: 3, md: 5 }}
        pos="fixed"
        left="0"
        right="0"
        bottom="0"
        zIndex={10}
      >
        {auth && (
          <Flex
            align="center"
            fontSize="sm"
            justify="space-between"
            flexGrow={2}
            mx={20}
          >
            <Box textAlign="center" cursor="pointer" onClick={onClickHome}>
              <FontAwesomeIcon color="#888" size="3x" icon={faHome} />
              <Box fontSize="xs" color="#888">
                ホーム
              </Box>
            </Box>
            <Box textAlign="center" cursor="pointer" onClick={onClickSerch}>
              <FontAwesomeIcon color="#888" size="3x" icon={faSearch} />
              <Box fontSize="xs" color="#888">
                検索
              </Box>
            </Box>
            <Box textAlign="center" cursor="pointer" onClick={onClickLive}>
              <FontAwesomeIcon color="#00bfff" size="3x" icon={faDotCircle} />
              {/* 丸ボタン */}
            </Box>
            <Box textAlign="center" cursor="pointer">
              <FontAwesomeIcon color="#888" size="3x" icon={faImage} />
              <Box fontSize="xs" color="#888">
                タイムライン
              </Box>
            </Box>
            <Box textAlign="center" cursor="pointer" onClick={onClickMyPage}>
              <FontAwesomeIcon color="#888" size="3x" icon={faUser} />
              <Box fontSize="xs" color="#888">
                マイページ
              </Box>
            </Box>
          </Flex>
        )}
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickHome={onClickHome}
        onClickFollows={onClickFollows}
        onClickFollowers={onClickFollowers}
        onClickSerch={onClickSerch}
      />
    </>
  );
});
