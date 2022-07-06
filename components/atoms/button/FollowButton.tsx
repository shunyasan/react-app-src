import { Button } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useAxios } from "../../../hooks/useAxios";

type Props = {
  followStatus: string;
  userId: string;
};

export const FollowButton = memo((props: Props) => {
  const [followedUser, setFollowedUser] = useState<boolean>(false);
  const { addFollowAxios, removeFollowAxios } = useAxios();
  const { token } = useAuth();
  const { followStatus, userId } = props;

  const addFollow = useCallback(
    (id: string) => {
      console.log(followedUser);
      addFollowAxios({ id: id });
      setFollowedUser(!followedUser);
      console.log(followedUser);
    },
    [token, followedUser]
  );

  const removeFollow = useCallback(
    (id: string) => {
      console.log(followedUser);
      removeFollowAxios({ id: id });
      setFollowedUser(!followedUser);
      console.log(followedUser);
    },
    [token, followedUser]
  );

  useEffect(() => {
    if (followStatus == "following") {
      setFollowedUser(true);
    }
  }, []);

  return (
    <Button
      onClick={
        followedUser ? () => removeFollow(userId) : () => addFollow(userId)
      }
      size="sm"
      bg={followedUser ? "blue.500" : "gray.100"}
      color={followedUser ? "gray.100" : "gray.900"}
      ml={10}
    >
      {followedUser ? "フォロー中" : "フォロー"}
    </Button>
  );
});
