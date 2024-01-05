import { NavigateFunction } from "react-router-dom";
import {
  ErrorCode,
  IUser,
  loginUserErrorMessage,
  User as UserModel,
} from "../model";
import {
  User,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../util/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

let uc: User;

const createUser = (
  user: IUser,
  password: string,
  navigate: NavigateFunction
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      if (password !== undefined) {
        createUserWithEmailAndPassword(auth, user.email, password)
          .then(async (userCredential) => {
            uc = userCredential.user;
            await setUserData({
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              email: user.email,
              location: user.location,
              availableWorks: [],
              userId: uc.uid,
              balance: user.balance,
            });
            navigate("/available-works");
          })
          .catch((error) => {
            const errorCode = error.code;
            alert(loginUserErrorMessage[errorCode as ErrorCode] ?? error.code);
          });
      }
    })
    .catch((error) => {
      console.log(error.code + " " + error.message);
    });
};

const loginUser = (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          uc = userCredential.user;
          navigate("/available-works");
        })
        .catch((error) => {
          const errorCode = error.code;
          alert(
            loginUserErrorMessage[errorCode as ErrorCode] ?? "Unexpected Error"
          );
        });
    })
    .catch((error) => {
      console.log(error.code + " " + error.message);
    });
};

const getUserData = async () => {
  const userData = sessionStorage.getItem(
    "firebase:authUser:AIzaSyCX7re6yDioJoT3pSD8NDuj5iDa5hoYvnI:[DEFAULT]"
  );
  if (userData) {
    const userId = JSON.parse(userData).uid;
    const docSnap = await getDoc(doc(db, "User", userId));
    const user = docSnap.data();
    if (user) {
      return new UserModel({ ...user, userId: userId });
    }
  }
};

const setUserData = async (user: IUser) => {
  const docRef = doc(db, "User", user.userId);
  await setDoc(docRef, {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    location: user.location,
    availableWorks: user.availableWorks,
    balance: user.balance,
  });
};

export { createUser, loginUser, getUserData };
