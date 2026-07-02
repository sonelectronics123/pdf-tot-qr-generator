import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import Container from "../../components/Container/Container";
import HeroSection from "./sections/HeroSection";

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
      </Container>
    </main>
  );
};

export default HomePage;