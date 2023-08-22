import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaMeteor } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { motion as m } from "framer-motion";
import Head from "next/head";

{
  /* AVAILABLE TABS AND AITOOL STRUCTURE----------------------- */
}
const Tools = ({ name, image }) => {
  return (
    <div>
      <div
        className={`w-[800px] h-[550px] lg:flex rounded-lg hidden ${image}`}
      ></div>
      <div className="mt-4 italic">{name}</div>
    </div>
  );
};

const Landing = ({
  setFirstName,
  setLastName,
  avatar,
  setAvatar,
  language,
  setLanguage,
}) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [sendBtn1, setSendBtn1] = useState(false);
  const [sendBtn2, setSendBtn2] = useState(false);

  const handleSubmit = (e) => {
    setFirstName(text1);
    setLastName(text2);
    setText1("");
    setText2("");
  };

  useEffect(() => {
    if (text1.length != 0) {
      setSendBtn1(true);
    }
    if (text1.length === 0) {
      setSendBtn1(false);
    }
  }, [text1]);

  useEffect(() => {
    if (text2.length != 0) {
      setSendBtn2(true);
    }
    if (text2.length === 0) {
      setSendBtn2(false);
    }
  }, [text2]);

  return (
    <form onSubmit={handleSubmit} className="min-h-screen colorBlack">
       
      {/* MAIN DIV--------------------------------------------------------------------- */}
      <div className=" textWhite w-full flex flex-wrap xl:px-32 lg:px-20 sm:px-12 justify-between">
        {/* ENTER DIV--------------------------------------------------------------------- */}
        <div className="lg:p-10 sm:px-2 sm:py-4 w-full min-h-screen flex ">
          {/* IMAGE DIV--------------------------------------------------------------------- */}
          <div className="w-[900px] min-h-[90vh] landingImage rounded-3xl xl:rounded-r-none xl:flex hidden">
            <div className="w-full h-full  landingBg  transition-all flex">
              {/* TEXT DIV--------------------------------------------------------------------- */}
              <m.div
                initial={{ y: "25%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  type: "spring",
                  delay: 0,
                }}
                className=" self-end mx-auto poppinsMedium mb-[50px] flex flex-col"
              >
                <div className="fontLarge poppinsBold text-center">
                  {language ? (
                    <div>Welcome to GleamAI</div>
                  ) : (
                    <div>Bienvenido a GleamAI</div>
                  )}
                </div>
                <div className="fontSmall text-center">
                  {language ? (
                    <div>Sign up to explore the power of AI</div>
                  ) : (
                    <div>Registrate para explorar el poder de la IA</div>
                  )}
                </div>
                <div className="flex mt-6 mx-auto gap-2">
                  <div className="w-4 h-[6px] bg-[#ffffff61] rounded-full "></div>
                  <div className="w-5 h-[6px] bg-zinc-100 rounded-full "></div>
                  <div className="w-4 h-[6px] bg-[#ffffff61] rounded-full "></div>
                </div>
              </m.div>
            </div>
          </div>

          {/* SIGN IN DIV--------------------------------------------------------------------- */}
          <div className="lg:w-[1500px] min-h-[90vh] w-full bg-[#151616] sm:rounded-3xl xl:rounded-l-none mx-auto flex flex-col sm:px-6 px-2 pt-6 pb-10">
            <m.div
              initial={{ y: "10%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeOut",
                type: "spring",
                delay: 0,
              }}
              className="m-auto flex flex-col"
            >
              <div className="lg:w-[695px] lg:m-auto mx-auto">
                {/* HEADER DIV--------------------------------------------------------------------- */}
                <div className="md:mr-40 border-b-[2px] borderGray">
                  <div className="poppinsBold fontLarge sm:pt-0">
                    {language ? (
                      <div>Register Account</div>
                    ) : (
                      <div>Registrar Cuenta</div>
                    )}
                  </div>
                  <div className="poppinsMedium fontExtraSmall mt-2 mb-8 textGray">
                    {language ? (
                      <div>Welcome to GleamAI.</div>
                    ) : (
                      <div>Bienvenido a GleamAI.</div>
                    )}
                  </div>
                </div>
                {/* INPUTS DIV--------------------------------------------------------------------- */}
                <div className="mt-6 flex-col flex mx-auto">
                  {/* INPUT First Name--------------------------------------------------------------------- */}
                  <div className="poppinsMedium mb-6 w-full">
                    <div className="mb-2 fontSmall">
                      {language ? <div>Name:</div> : <div>Nombre:</div>}
                    </div>
                    <input
                      type="text"
                      id="text1"
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      placeholder={
                        language ? "Enter first name" : "Ingrese su nombre"
                      }
                      className="bg-[#242525] w-full fontSmall py-3 px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent transition-all"
                    />
                  </div>
                  {/* INPUT Last Name--------------------------------------------------------------------- */}
                  <div className="poppinsMedium w-full">
                    <div className="mb-2 fontSmall">
                      {language ? <div>Last Name:</div> : <div>Apellido:</div>}
                    </div>
                    <input
                      type="text"
                      id="text2"
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      placeholder={
                        language ? "Enter last name" : "Ingrese su apellido"
                      }
                      className="bg-[#242525] w-full fontSmall py-3 px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent transition-all"
                    />
                  </div>
                </div>
                {/* AVATARS DIV--------------------------------------------------------------------- */}
                <div className="poppinsMedium textGray flex flex-col mt-8 mx-auto border-b-[2px] borderGray pb-10">
                  <div className="fontSmall">
                    {language ? (
                      <div>Select an Avatar:</div>
                    ) : (
                      <div>Seleccione un Avatar:</div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-8 md:justify-start justify-center mt-6">
                    {/* AVATAR 1--------------------------------------------------------------------- */}
                    <div
                      onClick={() => {
                        setAvatar("avatar1");
                      }}
                      className={
                        avatar === "avatar1"
                          ? "bg-[#F6B10C] rounded-full flex p-[2px] trasition-all"
                          : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer trasition-all"
                      }
                    >
                      <div className="avatar1 w-[min(18vw,85px)] h-[min(18vw,85px)] rounded-full m-auto"></div>
                    </div>
                    {/* AVATAR 2--------------------------------------------------------------------- */}
                    <div
                      onClick={() => {
                        setAvatar("avatar2");
                      }}
                      className={
                        avatar === "avatar2"
                          ? "bg-[#F6B10C] rounded-full flex p-[2px] trasition-all"
                          : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer trasition-all "
                      }
                    >
                      <div className="avatar2 w-[min(18vw,85px)] h-[min(18vw,85px)] rounded-full m-auto"></div>
                    </div>
                    {/* AVATAR 3--------------------------------------------------------------------- */}
                    <div
                      onClick={() => {
                        setAvatar("avatar3");
                      }}
                      className={
                        avatar === "avatar3"
                          ? "bg-[#F6B10C] rounded-full flex p-[2px] trasition-all"
                          : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer trasition-all"
                      }
                    >
                      <div className="avatar3 w-[min(18vw,85px)] h-[min(18vw,85px)] rounded-full m-auto"></div>
                    </div>
                    {/* AVATAR 4--------------------------------------------------------------------- */}
                    <div
                      onClick={() => {
                        setAvatar("avatar4");
                      }}
                      className={
                        avatar === "avatar4"
                          ? "bg-[#F6B10C] rounded-full flex p-[2px] trasition-all"
                          : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer trasition-all"
                      }
                    >
                      <div className="avatar4 w-[min(18vw,85px)] h-[min(18vw,85px)] rounded-full m-auto"></div>
                    </div>
                    {/* AVATAR 5--------------------------------------------------------------------- */}
                    <div
                      onClick={() => {
                        setAvatar("avatar5");
                      }}
                      className={
                        avatar === "avatar5"
                          ? "bg-[#F6B10C] rounded-full flex p-[2px] trasition-all avatarBtn"
                          : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer trasition-all avatarBtn"
                      }
                    >
                      <div className="avatar5 w-[min(18vw,85px)] h-[min(18vw,85px)] rounded-full m-auto"></div>
                    </div>
                    {/* AVATAR 6--------------------------------------------------------------------- */}
                    <div
                      onClick={() => {
                        setAvatar("avatar6");
                      }}
                      className={
                        avatar === "avatar6"
                          ? "bg-[#F6B10C] rounded-full flex p-[2px] trasition-all"
                          : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer trasition-all"
                      }
                    >
                      <div className="avatar6 w-[min(18vw,85px)] h-[min(18vw,85px)] rounded-full m-auto"></div>
                    </div>
                  </div>
                </div>
                {/* ENTER TO GLEAM BUTTON--------------------------------------------------------------------- */}
                <div className="flex sm:mt-20 mt-12 fontSmall poppinsMedium sm:px-0 px-20">
                  <Link
                    href="/dashboard"
                    onClick={() => {
                      handleSubmit();
                    }}
                    className={
                      sendBtn1 && sendBtn2
                        ? "bg-[#F6B10C] text-black py-[12px] px-8 mx-auto sm:w-[250px] w-full text-center gloww transition-all"
                        : "bg-[#242525] textGray py-[12px] px-8 mx-auto pointer-events-none sm:w-[250px] w-full text-center transition-all"
                    }
                  >
                    {language ? (
                      <div>Enter to Gleam</div>
                    ) : (
                      <div>Entar a Gleam</div>
                    )}
                  </Link>
                </div>
              </div>

              <div className="lg:mt-12 sm:mt-20 mt-12 sm:mb-0 mb-10 mx-auto self-end">
                <div className="flex px-2">
                  <div className=" poppinsBold fontSmall my-auto mr-2 flex gap-3">
                    <div
                      onClick={() => {
                        setLanguage(true);
                      }}
                      className={
                        language
                          ? "text-[#F6B10C] transition-all"
                          : "text-[#373737] transition-all cursor-pointer hover:text-[#FFC42D]"
                      }
                    >
                      ENGLISH
                    </div>
                    <div>/</div>

                    <div
                      onClick={() => {
                        setLanguage(false);
                      }}
                      className={
                        language
                          ? "text-[#373737]  transition-all cursor-pointer hover:text-[#FFC42D]"
                          : "text-[#F6B10C] transition-all"
                      }
                    >
                      ESPAÑOL
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
        <div className="textWhite poppinsMedium fontExtraSmall textGray sm:bg-[#070707] bg-[#151616] w-full lg:px-[40px] sm:px-[8px] px-2 pb-4">
          {language ? (
            <div>©2023 CarlosBaso. All rights reserved.</div>
          ) : (
            <div>©2023 CarlosBaso. Todos los derechos reservados.</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Landing;
