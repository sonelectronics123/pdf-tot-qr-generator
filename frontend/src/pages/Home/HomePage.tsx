import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import Container from "../../components/Container/Container";
import HeroSection from "./sections/HeroSection";
// import AboutAppSection from "./sections/AboutAppSection";

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  console.log("Selected file:", selectedFile?.name);

  return (
    <main>
      <Container>
        <HeroSection
          auth={auth}
          setAuth={setAuth}
          setSelectedFile={setSelectedFile}
        />
        
        {/* <AboutAppSection /> */}
      </Container>
    </main>
  );
};

export default HomePage;