import { useEffect, useState, useRef } from "react";
import Heading from "@/components/heading";
import Link from "next/link";
import { motion as m } from "framer-motion";

const Settings = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  avatar,
  setAvatar,
  language,
  setLanguage,
}) => {
  const [text1, setText1] = useState(firstName);
  const [text2, setText2] = useState(lastName);
  const [sendBtn1, setSendBtn1] = useState(true);
  const [sendBtn2, setSendBtn2] = useState(true);

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
    <form
      onSubmit={handleSubmit}
      className="min-h-screen colorBlack sm:mb-20 mb-10"
    >
      {/* HEADER--------------------------------------------------------------------- */}
      <div className="lg:hidden flex xl:px-32 lg:px-20 sm:px-12 px-4">
        <Heading
          title={language ? "Settings" : "Ajustes"}
          color="transparent"
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
          language={language}
        />
      </div>
      <div className="w-full h-20 lg:flex hidden"></div>
      {/* MAIN DIV--------------------------------------------------------------------- */}
      <div className="xl:px-32 lg:px-20 sm:px-12 px-4 textWhite flex">
        <div className=" lg:bg-[#151616] m-auto rounded-lg">
          {/* GRADIENT DIV--------------------------------------------------------------------- */}
          <div className="w-full h-32 settingsBg rounded-lg lg:flex hidden"></div>
          <m.div
            initial={{ y: "10%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "spring",
              delay: 0,
            }}
            className="lg:px-24 lg:pb-16"
          >
            {/* AVATAR + USERNAME DIV--------------------------------------------------------------------- */}
            <div className="justify-between lg:mt-[-50px] lg:pt-0 pt-8">
              <div className="flex">
                {/* AVATAR--------------------------------------------------------------------- */}
                <div className="p-[3px] bg-[#181818] rounded-full shadow-lg">
                  <div
                    className={`w-[min(20vw,120px)] h-[min(20vw,120px)] rounded-full ${avatar}`}
                  ></div>
                </div>
                {/* USERNAME--------------------------------------------------------------------- */}
                <div className=" self-end capitalize poppinsSemiBold mb-2 ml-4">
                  {firstName} {lastName}
                  <div className="poppinsMedium text-[#0cdf4f] fontExtraSmall">
                    {language ? <div>Online</div> : <div>En línea</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONAL DETAILS DIV--------------------------------------------------------------------- */}
            <div className="mt-10 w-full justify-between gap-16">
              {/* INPUT First Name--------------------------------------------------------------------- */}
              <div className="poppinsMedium mb-6 w-full">
                <div className="textWhite poppinsSemiBold fontMedium mb-2">
                  {language ? (
                    <div>Personal details</div>
                  ) : (
                    <div>Detalles personales</div>
                  )}
                </div>
                <div className="mb-2 fontSmall">
                  {language ? (
                    <div>Change name:</div>
                  ) : (
                    <div>Cambiar nombre:</div>
                  )}
                </div>
                <input
                  type="text"
                  id="text1"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder={
                    language ? "Change first name" : "Cambiar nombre"
                  }
                  className="bg-[#242525] w-full fontSmall py-3 px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent transition-all"
                />
              </div>
              {/* INPUT Last Name--------------------------------------------------------------------- */}
              <div className="poppinsMedium w-full">
                <div className="mb-2 fontSmall">
                  {language ? (
                    <div>Change last name:</div>
                  ) : (
                    <div>Cambiar apellido:</div>
                  )}
                </div>
                <input
                  type="text"
                  id="text2"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder={
                    language ? "Change last name" : "Cambiar apellido"
                  }
                  className="bg-[#242525] w-full fontSmall py-3 px-4 outline-none focus-visible:ring-0 focus-visible:ring-transparent transition-all"
                />
              </div>
            </div>

            {/* AVATARS DIV--------------------------------------------------------------------- */}
            <div className="poppinsMedium textGray flex flex-col mt-12">
              <div className="textWhite poppinsSemiBold fontMedium mb-2">
                {language ? <div>Profile</div> : <div>Perfil</div>}
              </div>
              <div className="fontSmall">
                {language ? (
                  <div>Select an avatar:</div>
                ) : (
                  <div>Seleccione un avatar:</div>
                )}
              </div>
              <div className="flex flex-wrap gap-6 md:justify-start justify-center mt-8">
                {/* AVATAR 1--------------------------------------------------------------------- */}
                <div
                  onClick={() => {
                    setAvatar("avatar1");
                  }}
                  className={
                    avatar === "avatar1"
                      ? "bg-[#FFC42D] rounded-full flex p-[2px] transition-all"
                      : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer transition-all"
                  }
                >
                  <div className="avatar1 w-[min(18vw,75px)] h-[min(18vw,75px)] rounded-full m-auto"></div>
                </div>
                {/* AVATAR 2--------------------------------------------------------------------- */}
                <div
                  onClick={() => {
                    setAvatar("avatar2");
                  }}
                  className={
                    avatar === "avatar2"
                      ? "bg-[#FFC42D] rounded-full flex p-[2px] transition-all"
                      : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer transition-all "
                  }
                >
                  <div className="avatar2 w-[min(18vw,75px)] h-[min(18vw,75px)] rounded-full m-auto"></div>
                </div>
                {/* AVATAR 3--------------------------------------------------------------------- */}
                <div
                  onClick={() => {
                    setAvatar("avatar3");
                  }}
                  className={
                    avatar === "avatar3"
                      ? "bg-[#FFC42D] rounded-full flex p-[2px] transition-all"
                      : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer transition-all"
                  }
                >
                  <div className="avatar3 w-[min(18vw,75px)] h-[min(18vw,75px)] rounded-full m-auto"></div>
                </div>
                {/* AVATAR 4--------------------------------------------------------------------- */}
                <div
                  onClick={() => {
                    setAvatar("avatar4");
                  }}
                  className={
                    avatar === "avatar4"
                      ? "bg-[#FFC42D] rounded-full flex p-[2px] transition-all"
                      : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer transition-all"
                  }
                >
                  <div className="avatar4 w-[min(18vw,75px)] h-[min(18vw,75px)] rounded-full m-auto"></div>
                </div>
                {/* AVATAR 5--------------------------------------------------------------------- */}
                <div
                  onClick={() => {
                    setAvatar("avatar5");
                  }}
                  className={
                    avatar === "avatar5"
                      ? "bg-[#FFC42D] rounded-full flex p-[2px] transition-all avatarBtn"
                      : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer transition-all avatarBtn"
                  }
                >
                  <div className="avatar5 w-[min(18vw,75px)] h-[min(18vw,75px)] rounded-full m-auto"></div>
                </div>
                {/* AVATAR 6--------------------------------------------------------------------- */}
                <div
                  onClick={() => {
                    setAvatar("avatar6");
                  }}
                  className={
                    avatar === "avatar6"
                      ? "bg-[#FFC42D] rounded-full flex p-[2px] transition-all"
                      : "bg-[#838383] rounded-full flex p-[2px] cursor-pointer transition-all"
                  }
                >
                  <div className="avatar6 w-[min(18vw,75px)] h-[min(18vw,75px)] rounded-full m-auto"></div>
                </div>
              </div>
            </div>

            {/* PREFERENCES DIV--------------------------------------------------------------------- */}
            <div className="mt-12 flex">
              {/* THEMES AND LANGUAGE DIV DIV--------------------------------------------------------------------- */}
              <div className="poppinsMedium textGray mb-6 w-full">
                <div className="textWhite poppinsSemiBold fontMedium mb-2">
                  {language ? <div> Preferences</div> : <div>Preferencias</div>}
                </div>

                {/* LANGUAGE DIV--------------------------------------------------------------------- */}
                <div className="mb-2 fontSmall">
                  {language ? (
                    <div> Select a language:</div>
                  ) : (
                    <div>Seleccione un idioma:</div>
                  )}
                </div>
                <div className="flex gap-6 justify-evenly mt-6 fontSmall">
                  <div
                    onClick={() => {
                      setLanguage(true);
                    }}
                    className={
                      language
                        ? "p-2 bg-[#F6B10C] text-black  px-5 transition-all "
                        : "p-2 bg-[#2a2a2a]  px-5  cursor-pointer hover:bg-[#F6B10C] hover:text-black transition-all"
                    }
                  >
                    English
                  </div>
                  <div className="my-auto">/</div>
                  <div
                    onClick={() => {
                      setLanguage(false);
                    }}
                    className={
                      language
                        ? "p-2 bg-[#2a2a2a]  px-5  cursor-pointer hover:bg-[#F6B10C] hover:text-black transition-all"
                        : "p-2 bg-[#F6B10C] text-black  px-5 transition-all"
                    }
                  >
                    Español
                  </div>
                </div>
              </div>
            </div>

            {/* SAVE CHANGES BUTTON--------------------------------------------------------------------- */}
            <div className="flex mt-16 fontSmall poppinsMedium w-full">
              <Link
                href="/dashboard"
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-[#F6B10C] text-black py-[12px] px-8 mx-auto sm:w-[250px] w-full text-center hover:bg-black hover:text-[#F6B10C] transition-all"
              >
                {language ? (
                  <div> Save Changes</div>
                ) : (
                  <div>Guardar cambios</div>
                )}
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </form>
  );
};
export default Settings;
