import "./src/styles/global.css"
import { StatusBar } from 'react-native';
import { 
  useFonts, 
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { SignIn } from "@screens/SignIn";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <>
      <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
      {!fontsLoaded ? <Loading /> : <SignIn/>}
    </>
  );
}

