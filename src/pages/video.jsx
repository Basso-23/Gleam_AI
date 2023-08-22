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

const SearchForm = ({ getVideo, language }) => {
  const [text, setText] = useState("");
  const [sendBtn, setSendBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    getVideo(text);
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
              : "p-3 bg-[#F6B10C] text-black flex my-auto text-[min(5vw,22px)] "
          }
        >
          <FaPaperPlane />
        </button>
      </div>
      <div className="textGray fontSmall mt-3">
        {language ? (
          <div>Try: A dog playing with a ball.</div>
        ) : (
          <div>Prueba: Un perro jugando con una pelota.</div>
        )}
      </div>
    </form>
  );
};

const Video = ({ firstName, lastName, avatar, language }) => {
  const [empty, setEmpty] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [prediction, setPrediction] = useState();
  const [error, setError] = useState(null);

  const getVideo = async (e) => {
    setIsTyping(true);
    setEmpty(false);
    const response = await fetch("/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e,
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
      const response = await fetch("/api/video/" + prediction.id);
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
            <div className="fontSmall text-[#F6B10C] text-center">
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
          <div className="text-[#F6B10C] fontExtraSmall mt-3 poppinsMedium text-center">
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
          title={language ? "Video" : "Video"}
          color="bg-[#F6B10C]"
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
          <SearchForm getVideo={getVideo} language={language} />
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
             }} className=" mt-[-35px]">
                <video controls className="w-full aspect-video md:pr-14">
                  <source src={prediction.output} />
                </video>
              </m.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
