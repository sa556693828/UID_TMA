"use client";
import Box from "@/components/Art";
import { Context } from "@/components/Provider";
import { useBackButton } from "@tma.js/sdk-react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

interface ArtProps {
  userID: string;
  userScore: Array<number>;
}

export default function Art() {
  const backButton = useBackButton();
  const { userData, goPage } = useContext(Context);

  const onBackButtonClick = () => {
    goPage("/");
  };

  useEffect(() => {
    backButton.show();
    backButton.on("click", onBackButtonClick);
    return () => {
      backButton.off("click", onBackButtonClick);
      backButton.hide();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <Box userID={userData.user_id} userScore={userData.score} />
    </div>
  );
}
