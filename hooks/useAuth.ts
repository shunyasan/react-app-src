import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import axios from "axios";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import firebase from "firebase";
import { setupMaster } from "cluster";
var firebaseConfig = {
  apiKey: "AIzaSyAXtLwptUt9jEcMk76V0vpGbUx4mcPHBrw",
  authDomain: "nest-app-2.firebaseapp.com",
  databaseURL: "https://nest-app-2-default-rtdb.firebaseio.com",
  projectId: "nest-app-2",
  storageBucket: "nest-app-2.appspot.com",
  messagingSenderId: "478814543890",
  appId: "1:478814543890:web:59432ea9e0976179f078cb",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [auth, setAuth] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("ログイン中のユーザー");
        console.log(user);
        // console.log("refreshトークン  :" + user.refreshToken);
        setAuth(true);
        setDisplayName(user?.displayName ?? "");
        setUid(user.uid);
        setUser(user);
      } else {
        console.log("ログインなし");
        history.push("/auth");
      }
    });

    firebase
      .auth()
      .currentUser?.getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        // console.log("currentトークン  :");
        // console.log(idToken);
        setToken(idToken);
        // Send token to your backend via HTTPS
      })
      .catch((error) => {
        console.log("うまくいかない");
        console.log(error);
      });
  }, []);
  // [token, auth, displayName, uid]

  // const createToken = useCallback(() => {
  //   firebase
  //     .auth()
  //     .currentUser?.getIdToken(/* forceRefresh */ true)
  //     .then((idToken) => {
  //       // console.log("currentトークン  :");
  //       // console.log(idToken);
  //       setToken(idToken);
  //       // Send token to your backend via HTTPS
  //     })
  //     .catch((error) => {
  //       console.log("うまくいかない");
  //       console.log(error);
  //     });
  // }, [token]);

  const signOut = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setAuth(false);
        alert("ログアウトしました");
        console.log("ログアウトしました");
        history.push("/auth");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("ログアウトできませんでした");
        console.log(error);
        // An error happened.
      });
  }, [auth]);

  return { signOut, auth, displayName, uid, token, user };
};

// const login = useCallback((id: string) => {
//   setLoading(true);
//   axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
//     if (res.data) {
//       const isAdmin = res.data.id === 10 ? true : false;
//       setLoginUser({...res.data, isAdmin});
//       showMessage({title: "ログインしました", status: "success"});
//       history.push("/home");
//     } else {
//       showMessage({title: "ユーザーが見つかりません", status: "error"});
//       setLoading(false);
//     }
//   }).catch(() => {
//     showMessage({title: "ログインできません", status: "error"});
//     setLoading(false);
//   });
// },[history, showMessage, setLoginUser]);
