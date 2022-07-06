import firebase from "firebase";
import { memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import axiosBase from "axios";
import { Box, Button, Text, Center } from "@chakra-ui/react";
import { useMessage } from "../../hooks/useMessage";
import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";
const axios = axiosBase.create({
  baseURL: "http://localhost:3000", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "http://localhost:3004",
  },
  responseType: "json",
});

export const Login: VFC = memo(() => {
  const { showMessage } = useMessage();
  const { token } = useAuth();
  const { setLoginUser } = useLoginUser();

  const history = useHistory();
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXtLwptUt9jEcMk76V0vpGbUx4mcPHBrw",
    authDomain: "nest-app-2.firebaseapp.com",
    databaseURL: "https://nest-app-2-default-rtdb.firebaseio.com",
    projectId: "nest-app-2",
    storageBucket: "nest-app-2.appspot.com",
    messagingSenderId: "478814543890",
    appId: "1:478814543890:web:59432ea9e0976179f078cb",
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  var provider = new firebase.auth.GoogleAuthProvider();

  useEffect(() => {
    setTimeout(() => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async () => {
          firebase.auth().onAuthStateChanged(
            (user) => {
              if (user) {
                // User is signed in.
                var uid = user.uid;
                // console.log(res.data._fieldsProto);
                firebase
                  .auth()
                  .currentUser?.getIdToken(/* forceRefresh */ true)
                  .then((idToken) => {
                    axios
                      .get(`/v0/users/me`, {
                        headers: {
                          authorization: `TEST ${idToken}`,
                        },
                      })
                      .then((res) => {
                        if (res.data) {
                          console.log("res.data");
                          console.log(res.data);
                          setLoginUser({ id: res.data.id });
                          history.push(`/`);
                        } else {
                          history.push("/auth/register");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        history.push("/auth/register");
                      });
                    // console.log("currentトークン  :");
                    // console.log(idToken);
                    // Send token to your backend via HTTPS
                  })
                  .catch((error) => {
                    console.log("うまくいかない");
                    console.log(error);
                  });
              } else {
                showMessage({
                  title: "ユーザー取得に失敗しました",
                  status: "error",
                });
              }
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  }, []);

  return (
    <>
      <Center>
        <Box>認証画面に遷移します</Box>
        <Box>遷移しない場合こちらをクリックしてください</Box>
        <Button
          onClick={() => {
            history.go(0);
          }}
        >
          こちら
        </Button>
      </Center>
    </>
  );
});
