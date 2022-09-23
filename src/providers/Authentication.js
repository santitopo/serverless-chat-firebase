import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authCleared, authenticated, selectUser } from "../redux/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const Authentication = ({ children }) => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        console.log({ fbUser });
        dispatch(
          authenticated({
            displayName: fbUser?.displayName,
            email: fbUser?.email,
            emailVerified: fbUser?.emailVerified,
            photoURL: fbUser?.photoURL,
          })
        );
      } else {
        console.log("cleared auth");
        dispatch(authCleared());
      }
    });

    return unsubscribe;
  }, [auth, dispatch]);

  return children;
};

export const useIsLoggedIn = () => {
  const user = useSelector(selectUser);
  return !!user;
};

export default Authentication;