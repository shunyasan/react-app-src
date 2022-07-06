import { Center, Flex, HStack, Text, Box, Link } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { memo, VFC } from "react";
import axiosBase from "axios";
import { useHistory, useParams } from "react-router-dom";
//blue-apiへの接続
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3004",
  },
  responseType: "json",
});

export const CloverOneLive: VFC = memo(() => {
  const [onAirId, setOnAirId] = useState<string>("");

  return (
    <>
      <Center mt={5}>CloverOneLive</Center>
    </>
  );
});
