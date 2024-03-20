"use client";

import { useEffect, useMemo, useState } from "react";
import { useBackButton, useInitData, useMainButton } from "@tma.js/sdk-react";
import { supabase } from "@/utils/supabase";
import { tableMap, UserData } from "@/types/types";
import { TonConnectButton } from "@tonconnect/ui-react";
// import Box from "@/components/Art";

export default function Home() {
  const [user, setUser] = useState<UserData>();
  const [open, setOpen] = useState(false);
  const initData = useInitData();

  const InitDataJson = useMemo(() => {
    if (!initData) {
      return <></>;
    }
    const { user } = initData;

    return (
      <a className="text-3xl font-bold text-center">
        Hello {user?.username ? user?.id : user?.firstName}
      </a>
    );
  }, [initData]);

  useEffect(() => {
    async function getUser() {
      const { data: user } = await supabase
        .from(tableMap.users)
        .select("*")
        .eq("user_id", initData?.user?.id);
      if (user && user.length > 0) {
        setUser(user[0] as any);
      }
    }
    if (initData) getUser();
  }, [initData]);

  return (
    <div className="w-full py-4 flex items-center flex-col gap-4">
      {/* <Box /> */}
      <div className="w-full flex justify-center">{InitDataJson}</div>
      <div className="flex w-full px-4 justify-center gap-4">
        <TonConnectButton className="w-1/2" />
        {/* {JSON.stringify(user)} */}
        <button
          className="text-lg border w-1/2 rounded-full bg border-white h-auto"
          onClick={() => setOpen(!open)}
        >
          start a test
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}
