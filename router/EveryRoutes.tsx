import { EveryHome } from "../components/pages/every/EveryHome";
import { Follows } from "../components/pages/every/Follows";
import { Live } from "../components/pages/every/Live";
import { Followers } from "../components/pages/every/Followers";
import { UserSearch } from "../components/pages/every/UserSearch";
import { Mypage } from "../components/pages/every/Mypage";
import { Page404 } from "../components/pages/Page404";

export const everyRoutes = [
  {
    path: "/",
    exact: true,
    children: <Live />,
  },
  {
    path: "/follows",
    exact: false,
    children: <Follows />,
  },
  {
    path: "/followers",
    exact: false,
    children: <Followers />,
  },
  {
    path: "/search",
    exact: false,
    children: <UserSearch />,
  },
  {
    path: "/mypage",
    exact: false,
    children: <Mypage />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
