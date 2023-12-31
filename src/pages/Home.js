import {
  Box,
  Link,
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

import UserController from "../firebase/controllers/users";
import "./Home.css";
import { selectUser } from "../redux/auth";
import { useIsLoggedIn } from "../providers/Authentication";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import FileUploader from "../components/FileUploader";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const SSOSignIn = async (provider) => {
  const auth = getAuth();
  const userCredential = await signInWithPopup(auth, provider);
  const fbUser = userCredential.user;
  await UserController.postUser(
    {
      name: fbUser.displayName,
      email: fbUser.email,
      profilePicture: fbUser.photoURL,
    },
    fbUser.uid
  );
};

const onEmailPasswordSignIn = async (auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const onEmailPasswordSignUp = async (
  auth,
  name,
  email,
  password,
  profilePicture
) => {
  const storage = getStorage();
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      // Signed in
      const fbUser = userCredential.user;
      // Registered properly
      // Upload picture
      let profilePictureURL = null;
      try {
        const imageRef = ref(storage, `profilePictures/${fbUser.uid}.jpg`);
        await uploadBytes(imageRef, profilePicture);
        profilePictureURL = await getDownloadURL(imageRef);
      } catch (e) {
        console.log("error trying to upload profile picture", e);
      }
      // Register user in firestore
      await UserController.postUser(
        {
          name,
          email,
          profilePicture: profilePictureURL,
        },
        fbUser.uid
      );
      sendEmailVerification(userCredential.user);
    }
  );
};

const GOOGLE_RED = "#F65654";
const FACEBOOK_BLUE = "#1273EB";

const SSOProviderButton = ({ color, icon, text, onPress }) => {
  return (
    <>
      <div
        onClick={onPress}
        style={{ borderColor: color }}
        id="sso-provider-button"
      >
        <img id="button-icon" src={icon} alt={"Button Icon"} />
        <Typography style={{ color, ...styles.text }}>{text}</Typography>
      </div>
    </>
  );
};

const GoogleButton = () => {
  return (
    <SSOProviderButton
      onPress={() => SSOSignIn(googleProvider)}
      color={GOOGLE_RED}
      text={"Continuar con Google"}
      icon={require("../assets/google.png")}
    />
  );
};

const FacebookButton = () => {
  return (
    <SSOProviderButton
      onPress={() => SSOSignIn(facebookProvider)}
      color={FACEBOOK_BLUE}
      text={"Continuar con Facebook"}
      icon={require("../assets/facebook.png")}
    />
  );
};

const EmailPasswordLogin = ({ goToRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState(null);
  const theme = useTheme();
  const auth = getAuth();

  const submitLoginForm = async () => {
    try {
      await onEmailPasswordSignIn(auth, email, password);
    } catch (e) {
      console.log(e);
      setGeneralError("Error iniciando sesión");
    }
  };

  return (
    <>
      <div id="text-field-container">
        <TextField
          fullWidth
          id="email-login"
          label="Correo Electronico"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div id="text-field-container">
        <TextField
          fullWidth
          id="password-login"
          label="Contraseña"
          type={"password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {generalError && (
        <Typography
          color={theme.palette.error.main}
          style={{ textAlign: "center" }}
        >
          {generalError}
        </Typography>
      )}
      <Box sx={{ margin: 3 }} textAlign="center">
        <Button
          onClick={submitLoginForm}
          variant="contained"
          component="label"
          className="btn btn-primary"
          disabled={!password || !email}
        >
          Iniciar Sesión
        </Button>
      </Box>
      <Typography style={{ textAlign: "center" }}>
        <Link
          component="button"
          variant="body2"
          onClick={goToRegistration}
          sx={{ fontSize: 16 }}
        >
          {"No tiene cuenta aún? Regístrese!"}
        </Link>
      </Typography>
    </>
  );
};

const AuthButtons = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item xs={5}>
        <div id="auth-button-container">
          <Typography style={{ textAlign: "center", fontSize: 24 }}>
            {"Iniciar Sesión:"}
          </Typography>
          <EmailPasswordLogin goToRegistration={() => navigate("/register")} />
        </div>
      </Grid>
      <Grid xs={12} item />
      <Grid item xs={5}>
        <div id="auth-button-container">
          <Typography style={{ textAlign: "center", fontSize: 24 }}>
            {"O continuar con tu cuenta de:"}
          </Typography>
          <GoogleButton />
          <FacebookButton />
        </div>
      </Grid>
    </>
  );
};

const RegistrationForm = ({ backToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [generalError, setGeneralError] = useState("");
  const auth = getAuth();
  const theme = useTheme();

  const submitForm = async () => {
    try {
      await onEmailPasswordSignUp(auth, name, email, password, selectedFile);
    } catch {
      setGeneralError("Error registrando usuario");
    }
  };

  return (
    <div id="auth-button-container">
      <Typography style={{ textAlign: "center", fontSize: 24 }}>
        {"Registrarse:"}
      </Typography>
      <div id="text-field-container">
        <TextField
          fullWidth
          id="name-registration"
          label="Nombre Completo"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div id="text-field-container">
        <TextField
          fullWidth
          id="email-registration"
          label="Correo Electrónico"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div id="text-field-container">
        <TextField
          fullWidth
          type={"password"}
          id="password-registration"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="text-field-container">
        <FileUploader
          text={"Seleccionar Foto"}
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
          selectedFileName={selectedFile?.name}
        />
      </div>
      {generalError && (
        <Typography
          color={theme.palette.error.main}
          style={{ textAlign: "center" }}
        >
          {generalError}
        </Typography>
      )}

      <Box sx={{ margin: 3 }} textAlign="center">
        <Button
          onClick={submitForm}
          variant="contained"
          component="label"
          className="btn btn-primary"
          disabled={!name || !email || !selectedFile}
        >
          Registrarse
        </Button>
      </Box>

      <Typography style={{ textAlign: "center" }}>
        <Link
          component="button"
          variant="body2"
          onClick={backToLogin}
          sx={{ fontSize: 16 }}
        >
          {"Ya está registrado? Iniciar sesión!"}
        </Link>
      </Typography>
    </div>
  );
};

const AuthForms = () => {
  return (
    <>
      <Grid sx={{ paddingY: 20 }} style={{ height: "80vh" }} container>
        <Grid
          alignItems={"center"}
          justifyContent={"center"}
          container
          item
          spacing={3}
          xs={12}
        >
          <AuthButtons />
        </Grid>
      </Grid>
    </>
  );
};

const Welcome = () => {
  const user = useSelector(selectUser);

  return (
    <Grid
      sx={{ paddingX: 50, paddingY: 20 }}
      style={{ height: "100vh" }}
      container
      rowSpacing={3}
    >
      <Grid item xs={12}>
        <Typography fontSize={24} style={{ textAlign: "center" }}>
          {`Bienvenido ${user.displayName},`}
        </Typography>
        <Typography fontSize={20} style={{ textAlign: "center" }}>
          {`Abre el menú de la izquierda para comenzar a chatear!`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function Home() {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Welcome /> : <AuthForms />;
}

const styles = {
  text: { fontSize: 20 },
};
