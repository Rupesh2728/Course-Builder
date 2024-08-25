import React from "react";
import Header from "./components/Header/Header";
import { ChakraProvider } from '@chakra-ui/react'
import Section from "./components/Section/section";

const App=()=>{
  return (
    <>
     <ChakraProvider>
     <Header/>
     <Section/>
    </ChakraProvider>
    </>
  );
}

export default App;
