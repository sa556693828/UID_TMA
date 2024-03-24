"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/components/Provider";
import { tableMap } from "@/types/types";
import { supabase } from "@/utils/supabase";
import { useBackButton } from "@tma.js/sdk-react";

export default function Test() {
  const buttonRef = useRef<HTMLDialogElement>(null);
  const [score, setScore] = useState(new Array(8).fill(0.5));
  const { userTG, userData, goPage } = useContext(Context);
  const backButton = useBackButton();
  const onBackButtonClick = () => {
    goPage("/");
  };
  const { reFetchUserData } = useContext(Context);
  const updateUserScore = async (score: any, userID: number) => {
    try {
      const { data, error } = await supabase
        .from(tableMap.users)
        .update({ score: score })
        .eq("user_id", userID);
      if (error) throw error;
      reFetchUserData();
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newScore = [...score];
    newScore[index] = parseFloat(event.target.value);
    setScore(newScore);
  };
  const question = [
    {
      title: "Do you recharge by being alone or interacting with others?",
      value: ["Introversion", "Extraversion"],
    },
    {
      title:
        "Is your worldview grounded in reality or shaped by what could be?",
      value: ["Sensing", "Intuition"],
    },
    {
      title:
        "In decisions, do you prioritize objective logic or empathetic considerations?",
      value: ["Thinking", "Feeling"],
    },
    {
      title:
        "Do you prefer life to be planned out or do you revel in spontaneity?",
      value: ["Judging", "Perceiving"],
    },
    {
      title: "Are you shaped by your innate nature or your environment?",
      value: ["Nature", "Nurture"],
    },
    {
      title: "Do you find comfort in stability or embrace change?",
      value: ["Stability", "Change"],
    },
    {
      title:
        "Are you more pessimistic or optimistic about life and its possibilities?",
      value: ["Pessimism", "Optimism"],
    },
    {
      title:
        "Do past experiences or future considerations guide your decisions?",
      value: ["Past", "Future"],
    },
  ];
  useEffect(() => {
    backButton.show();
    backButton.on("click", onBackButtonClick);
    return () => {
      backButton.off("click", onBackButtonClick);
      backButton.hide();
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 h-full">
      <div className="text-2xl font-bold uppercase">Daily Test</div>
      {question.map((item, index) => (
        <div
          className={`flex flex-col w-5/6 py-4 gap-2 border-neutral-700 ${
            index !== question.length - 1 ? "border-b" : ""
          }`}
          key={index}
        >
          <a className="text-lg">
            {index + 1}. {item.title}
          </a>
          <div className="flex w-full justify-between">
            <a className="text-sm">{item.value[0]}</a>
            <a className="text-sm">{item.value[1]}</a>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.0001"
            value={
              userData.score !== null ? userData.score[index] : score[index]
            }
            className="range"
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <div className="w-full flex gap-4 px-4 py-4">
        <button
          className="text-lg border w-1/2 h-10 rounded-full border-white hover:bg-white hover:text-black"
          onClick={() => {
            setScore(new Array(8).fill(10));
            goPage("/test");
          }}
        >
          reset
        </button>
        <button
          className="text-lg border w-1/2 h-10 rounded-full border-white hover:bg-white hover:text-black"
          onClick={() => buttonRef.current?.showModal()}
        >
          confirm
        </button>
        <dialog id="my_modal_1" className="modal" ref={buttonRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Do you want to submit the test ? You can only submit once a day.
            </h3>
            <div className="modal-action justify-between">
              <form method="dialog">
                <button className="btn w-32">Close</button>
              </form>
              <form method="dialog">
                <button
                  className="btn w-32"
                  onClick={() => updateUserScore(score, userTG?.id as number)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {userData.score !== null && (
        <div className="w-full flex gap-4 px-4 pb-4">
          <button
            className="text-lg border w-full h-12 rounded-full hover:bg-cyan-600 bg-white hover:text-white text-black"
            onClick={() => goPage("/art")}
          >
            Go to your Art
          </button>
        </div>
      )}
    </div>
  );
}
