import { SignIn } from "@screens/SignIn";
import "./src/styles/global.css"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SignIn />
    </>
  );
}

