import "./styles.css";
import Bloom from "./components/Bloom";
import Deck from "./components/Deck";
import NearSlider from "./components/NearSlider"
import ImageInfo from "./components/ImageInfo"
import theme from './styles/theme';
import React, { useState } from "react";
import { Box, ChakraProvider } from '@chakra-ui/react'

// import swiper.js styling
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";


function App() {
  const [initialViewState, setInitialViewState] = useState({
    latitude: -22.9047,
    longitude: -43.1823,
    position: [0, 0, 2000],
    bearing: 0,
    pitch: 90,
    far: 99999,
    near: 0.1,
  });

  const [selectedManifest, setSelectedManifest] = useState("")
  
  return (
    <ChakraProvider >
      <Box _fullScreen>
        <ImageInfo selectedManifest={selectedManifest} />
        <NearSlider initialViewState={initialViewState} setInitialViewState={setInitialViewState} />
        <Deck initialViewState={initialViewState} />
        <Bloom setInitialViewState={setInitialViewState} setSelectedManifest={setSelectedManifest} selectedManifest={selectedManifest} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
