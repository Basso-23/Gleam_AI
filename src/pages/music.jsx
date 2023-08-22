import Heading from "@/components/heading";
import {
  FaPaperPlane,
  FaMeteor,
  FaQuestion,
  FaSlidersH,
  FaAngleUp,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { BsStars } from "react-icons/bs";
import { motion as m } from "framer-motion";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SearchForm = ({ getMusic, durationActive, language }) => {
  const [text, setText] = useState("");
  const [sendBtn, setSendBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    getMusic(text, durationActive);
    setText("");
  };

  useEffect(() => {
    if (text.length != 0) {
      setSendBtn(false);
    }
    if (text.length === 0) {
      setSendBtn(true);
    }
  }, [text]);

  return (
    <form onSubmit={handleSubmit} className="poppinsMedium mb-6 w-full mt-4 ">
      <div className="flex gap-2">
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language ? "Send a message" : "Enviar un mensaje"}
          className="bg-[#242525] w-full fontSmall py-3 px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent transition-all"
        />

        <button
          type="submit"
          className={
            sendBtn
              ? "p-3 bg-[#181818] text-[#8A8A8A] flex my-auto text-[min(5vw,22px)] pointer-events-none "
              : "p-3 bg-[#E12D7B] text-black flex my-auto text-[min(5vw,22px)] "
          }
        >
          <FaPaperPlane />
        </button>
      </div>
      <div className="textGray fontSmall mt-3">
        {language ? (
          <div>Try: A jazz melody.</div>
        ) : (
          <div>Prueba: Una melodía de jazz.</div>
        )}
      </div>
    </form>
  );
};

const Music = ({ firstName, lastName, avatar, language }) => {
  const [empty, setEmpty] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState(false);
  const [durationActive, setDurationActive] = useState(5);
  const [prediction, setPrediction] = useState();
  const [error, setError] = useState(null);

  const getMusic = async (e, durationActive) => {
    setIsTyping(true);
    setEmpty(false);
    const response = await fetch("/api/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e,
        duration: durationActive,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/music/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
      if (prediction.status === "succeeded") {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="min-h-screen colorBlack sm:mb-20 mb-10 textWhite">
      {/* EMPTY DIV--------------------------------------------------------------------- */}
      {empty ? (
        <div className="lg:pl-[280px] poppinsMedium absolute fixedCenter2 flex flex-col items-center justify-center">
          <div className="space-y-6 my-auto text-[#181818]">
            <FaQuestion className="mx-auto text-[min(30vw,150px)]" />
            <div className="fontSmall text-[#E12D7B] text-center">
              {language ? (
                <div>No conversation started.</div>
              ) : (
                <div>No hay ninguna conversación.</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {/* IS TYPING DIV--------------------------------------------------------------------- */}
      {isTyping ? (
        <div className="poppinsMedium fixed bg-[#000000ea] h-screen min-w-full fixedCenter z-50 flex flex-col items-center justify-center">
          <div className="space-y-5">
            <BsStars className="mx-auto text-[min(13vw,65px)] animate-bounce" />
            <div className="fontSmall">
              {language ? (
                <div>Gleam is thinking...</div>
              ) : (
                <div>Gleam esta pensando...</div>
              )}
            </div>
          </div>
          <div className="text-[#E12D7B] fontExtraSmall mt-3 poppinsMedium text-center">
            {language ? (
              <div>
                Note: This can sometimes take around 3 to 5 minutes while the
                model boots up.
              </div>
            ) : (
              <div>
                Nota: Esto a veces puede tardar entre 3 a 5 minutos mientras
                arranca el modelo.
              </div>
            )}
          </div>
        </div>
      ) : null}
      {/* HEADER--------------------------------------------------------------------- */}
      <div className="flex xl:px-32 lg:px-20 sm:px-12 px-4">
        <Heading
          title={language ? "Music" : "Música"}
          color="bg-[#E12D7B]"
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
          language={language}
        />
      </div>

      {/* MAIN DIV--------------------------------------------------------------------- */}
      <div className="xl:px-32 lg:px-20 sm:px-12 px-4">
        {/* INPUT DIV--------------------------------------------------------------------- */}
        <div className="mb-20">
          <SearchForm
            getMusic={getMusic}
            durationActive={durationActive}
            language={language}
          />
        </div>
        {/* IMAGES OPTIONS DIV--------------------------------------------------------------------- */}
        <div className=" absolute max-w-[89vw] ">
          <div
            onClick={() => {
              setOptions(!options);
            }}
            className="w-[min(10vw,42px)] h-[min(10vw,42px)] rounded-sm colorGray mt-[-50px] flex p-[7.5px] cursor-pointer transition-all"
          >
            {options ? (
              <FaAngleUp
                size="full"
                className="m-auto text-[#F6B10C] transition-all"
              />
            ) : (
              <FaSlidersH
                size="full"
                className="m-auto text-[#F6B10C] transition-all"
              />
            )}
          </div>
          {/* OPTIONS--------------------------------------------------------------------- */}
          {options ? (
            <m.div
              initial={{ y: "-5%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                delay: 0,
              }}
              className=" sm:w-auto w-[50vw] colorGray rounded-sm poppinsMedium fontSmall sm:p-5 p-3 mt-4"
            >
              {language ? <div>Duration:</div> : <div>Duración:</div>}
              <div className="flex flex-wrap mt-3 gap-6">
                <div
                  onClick={() => {
                    setDurationActive(5);
                  }}
                  className={
                    durationActive === 5
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  5s
                </div>
                <div
                  onClick={() => {
                    setDurationActive(10);
                  }}
                  className={
                    durationActive === 10
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  10s
                </div>
                <div
                  onClick={() => {
                    setDurationActive(15);
                  }}
                  className={
                    durationActive === 15
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  15s
                </div>
                <div
                  onClick={() => {
                    setDurationActive(20);
                  }}
                  className={
                    durationActive === 20
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  20s
                </div>
                <div
                  onClick={() => {
                    setDurationActive(25);
                  }}
                  className={
                    durationActive === 25
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  25s
                </div>
                <div
                  onClick={() => {
                    setDurationActive(30);
                  }}
                  className={
                    durationActive === 30
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  30s
                </div>
              </div>
            </m.div>
          ) : null}
        </div>

        {/* MUSIC DIV--------------------------------------------------------------------- */}
        {error && <div>{error}</div>}

        {prediction && (
          <div className="pt-1">
            {prediction.output && (
              <m.div
                initial={{ x: "5%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0,
                }}
                className=" mt-5"
              >
                <audio controls className="w-full md:pr-14 mt-8">
                  <source src={prediction.output} />
                </audio>
              </m.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
