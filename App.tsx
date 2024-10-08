import "./src/styles/global.css"
import { StatusBar } from 'react-native';
import { 
  useFonts, 
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";
import Toast from "react-native-toast-message";
import { AuthProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <AuthProvider>
      <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
      {!fontsLoaded ? <Loading /> : <Routes />}
      <Toast />
    </AuthProvider>
  );
}

