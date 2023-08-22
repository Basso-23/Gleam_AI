import Heading from "@/components/heading";
import { useEffect, useState } from "react";
import { motion as m} from "framer-motion";
import {
  FaPaperPlane,
  FaMeteor,
  FaQuestion,
  FaSlidersH,
  FaAngleUp,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const SearchForm = ({ getImages, sizeActive, quantityActive, language }) => {
  const [text, setText] = useState("");
  const [sendBtn, setSendBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    getImages(text, sizeActive, quantityActive);
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
              : "p-3 bg-[#ffffff] text-black flex my-auto text-[min(5vw,22px)] "
          }
        >
          <FaPaperPlane />
        </button>
      </div>
      <div className="textGray fontSmall mt-3">
        {" "}
        {language ? (
          <div>Try: A cute red cat.</div>
        ) : (
          <div>Prueba: Un lindo gato rojo.</div>
        )}
      </div>
    </form>
  );
};

const Image = ({ firstName, lastName, avatar, language }) => {
  const [empty, setEmpty] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState(false);
  const [quantityActive, setQuantityActive] = useState(1);
  const [sizeActive, setSizeActive] = useState("256x256");

  const getImages = async (text, sizeActive, quantityActive) => {
    setIsTyping(true);
    setEmpty(false);

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: text,
        n: quantityActive,
        size: sizeActive,
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        options
      );
      const data = await response.json();
      console.log(data);
      data?.data.forEach((imageObject) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", imageObject.url);
        imageContainer.append(imageElement);
        document.querySelector(".images-section").append(imageContainer);
        setIsTyping(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen colorBlack sm:mb-20 mb-10 textWhite">
      {/* EMPTY DIV--------------------------------------------------------------------- */}
      {empty ? (
        <div className="lg:pl-[280px] poppinsMedium absolute fixedCenter2 flex flex-col items-center justify-center">
          <div className="space-y-6 my-auto text-[#181818]">
            <FaQuestion className="mx-auto text-[min(30vw,150px)]" />
            <div className="fontSmall text-[#ffffff] text-center">
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
        </div>
      ) : null}
      {/* HEADER--------------------------------------------------------------------- */}
      <div className="flex xl:px-32 lg:px-20 sm:px-12 px-4">
        <Heading
          title={language ? "Image" : "Imagen"}
          color="bg-white"
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
            getImages={getImages}
            sizeActive={sizeActive}
            quantityActive={quantityActive}
            language={language}
          />
        </div>
        {/* IMAGES OPTIONS DIV--------------------------------------------------------------------- */}
        <div className=" absolute max-w-[89vw]">
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
            }} className="colorGray rounded-sm poppinsMedium fontSmall sm:p-5 p-3 mt-4">
              {language ? <div>Quantity:</div> : <div>Cantidad:</div>}
              <div className="flex flex-wrap mt-3 gap-6">
                <div
                  onClick={() => {
                    setQuantityActive(1);
                  }}
                  className={
                    quantityActive === 1
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  1
                </div>
                <div
                  onClick={() => {
                    setQuantityActive(2);
                  }}
                  className={
                    quantityActive === 2
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  2
                </div>
                <div
                  onClick={() => {
                    setQuantityActive(3);
                  }}
                  className={
                    quantityActive === 3
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  3
                </div>
                <div
                  onClick={() => {
                    setQuantityActive(4);
                  }}
                  className={
                    quantityActive === 4
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm transition-all cursor-pointer"
                  }
                >
                  4
                </div>
              </div>
              <div className="mt-4">
                {language ? <div>Size:</div> : <div>Tamaño:</div>}
              </div>
              <div className="flex flex-col flex-wrap mt-3 gap-5">
                <div
                  onClick={() => {
                    setSizeActive("256x256");
                  }}
                  className={
                    sizeActive === "256x256"
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm text-center transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm text-center transition-all cursor-pointer"
                  }
                >
                  256x256
                </div>
                <div
                  onClick={() => {
                    setSizeActive("512x512");
                  }}
                  className={
                    sizeActive === "512x512"
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm text-center transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm text-center transition-all cursor-pointer"
                  }
                >
                  512x512
                </div>
                <div
                  onClick={() => {
                    setSizeActive("1024x1024");
                  }}
                  className={
                    sizeActive === "1024x1024"
                      ? "px-4 py-2 bg-[#F6B10C] text-black rounded-sm text-center transition-all"
                      : "px-4 py-2 bg-[#2a2a2a] rounded-sm text-center transition-all cursor-pointer"
                  }
                >
                  1024x1024
                </div>
              </div>
            </m.div>
          ) : null}
        </div>

        {/* GENERATED IMAGES DIV--------------------------------------------------------------------- */}
        <section className="images-section"></section>
      </div>
    </div>
  );
};
export default Image;
