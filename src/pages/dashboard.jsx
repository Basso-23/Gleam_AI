import Heading from "@/components/heading";
import Link from "next/link";
import { motion as m } from "framer-motion";
import {
  FaLightbulb,
  FaFacebookMessenger,
  FaImage,
  FaVideo,
  FaHeadphonesAlt,
  FaCode,
  FaCogs,
  FaCheckCircle,
  FaColumns,
} from "react-icons/fa";

{
  /* AVAILABLE TABS STRUCTURE----------------------- */
}
const Tabs = ({
  title,
  description,
  icon,
  bgIcon,
  bg,
  colorTitle,
  colorDescription,
  btn,
  btnColor,
  bgBtn,
  link,
}) => {
  return (
    <div
      className={`${bg} w-full justify-between flex px-6 mt-6 py-4 poppinsMedium fontSmall flex-wrap gap-4`}
    >
      <div className="flex">
        <div className={`${bgIcon} my-auto p-2 rounded-sm`}>{icon}</div>
        <div className="ml-3">
          <div className={`${colorTitle}`}>{title}</div>
          <div className={`${colorDescription} fontExtraSmall`}>
            {description}
          </div>
        </div>
      </div>
      <Link
        href={link}
        className={`my-auto ${bgBtn} ${btnColor} rounded-sm py-1 px-4 hover:bg-[#F6B10C] hover:text-black transition-all`}
      >
        {btn}
      </Link>
    </div>
  );
};

const Dashboard = ({ firstName, lastName, avatar, language }) => {
  return (
    <div className="min-h-screen colorBlack sm:mb-20 mb-10 textWhite ">
      {/* HEADER--------------------------------------------------------------------- */}
      <div className="flex  xl:px-32 lg:px-20 sm:px-12 px-4">
        <Heading
          title={language ? "Dashboard" : "Panel Principal"}
          color="transparent"
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
          language={language}
        />
      </div>
      {/* MAIN DIV--------------------------------------------------------------------- */}
      <div className="xl:px-32 lg:px-20 sm:px-12 px-4">
        {/* WELCOME DIV--------------------------------------------------------------------- */}
        <m.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            delay: 0,
          }}
          className=" w-full colorGray mt-8 rounded-md lg:pt-12 lg:pb-14 pb-6 pt-4"
        >
          <div className=" poppinsBold fontLarge text-center mt-1 flex justify-center">
            {language ? <div>Welcome,</div> : <div>Bienvenido,</div>}
            <div className=" capitalize ml-2">{firstName}</div>
          </div>

          <div className="xl:w-[800px] xl:mx-auto mt-7 justify-between flex text-black poppinsMedium fontSmall text-center bg-[#F6B10C] sm:mx-10 mx-2 ">
            <div className="grid grid-cols-3 w-full">
              <div className="w-full py-3 my-auto">
                {language ? (
                  <div>5+ AI Tools</div>
                ) : (
                  <div>5+ Herramientas de IA</div>
                )}
              </div>
              <div className="w-full border-l-[2px] border-r-[2px] border-black my-auto">
                {language ? (
                  <div>All in one UI</div>
                ) : (
                  <div>Todo en una misma IU</div>
                )}
              </div>
              <div className="w-full py-3 my-auto">
                {language ? <div>Full Access</div> : <div>Acceso completo</div>}
              </div>
            </div>
          </div>
        </m.div>
        {/* CHAT DIV--------------------------------------------------------------------- */}
        <m.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            delay: 0.1,
          }}
          className=" w-full colorGray mt-4 rounded-md pb-6 pt-2 px-2 flex flex-wrap-reverse justify-evenly xl:py-14 lg:py-10 gap-10"
        >
          {/* FEATURES DIV--------------------------------------------------------------------- */}
          <div className=" flex flex-col gap-5 my-auto sm:w-[425px] w-full">
            <div className="flex poppinsSemiBold fontSmall colorBlack py-3 pl-8  w-full">
              <FaCheckCircle className="my-auto mr-4 w-[min(6vw,27px)] h-[min(6vw,27px)] text-[#0cdf4f] flex" />
              <div className="w-full my-auto flex">
                {language ? <div>Optimize</div> : <div>Optimizado</div>}
              </div>
            </div>
            <div className="flex poppinsSemiBold fontSmall colorBlack py-3 pl-8  w-full">
              <FaCheckCircle className="my-auto mr-4 w-[min(6vw,27px)] h-[min(6vw,27px)] text-[#0cdf4f] flex" />
              <div className="w-full my-auto flex">
                {language ? <div>Free access</div> : <div>Acceso gratis</div>}
              </div>
            </div>
            <div className="flex poppinsSemiBold fontSmall colorBlack py-3 pl-8  w-full">
              <FaCheckCircle className="my-auto mr-4 w-[min(6vw,27px)] h-[min(6vw,27px)] text-[#0cdf4f] flex" />
              <div className="w-full my-auto flex">
                {language ? <div>Easy to use</div> : <div>Fácil de usar</div>}
              </div>
            </div>
            <div className="flex poppinsSemiBold fontSmall colorBlack py-3 pl-8  w-full">
              <FaCheckCircle className="my-auto mr-4 w-[min(6vw,27px)] h-[min(6vw,27px)] text-[#0cdf4f] flex" />
              <div className="w-full my-auto flex">
                {" "}
                {language ? <div>Customizable</div> : <div>Perzonalizable</div>}
              </div>
            </div>
            <div className="flex poppinsSemiBold fontSmall colorBlack py-3 pl-8  w-full">
              <FaCheckCircle className="my-auto mr-4 w-[min(6vw,27px)] h-[min(6vw,27px)] text-[#0cdf4f] flex" />
              <div className="w-full my-auto flex">
                {language ? (
                  <div>Great UX/UI design</div>
                ) : (
                  <div>Buen diseño de UX/IU</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="xl:flex xl:w-[900px] sm:w-[425px]">
              {/* IMAGE DIV--------------------------------------------------------------------- */}
              <div className=" z-20 chatDashboard xl:h-[min(75vw,300px)] xl:sm:w-[min(75vw,825px)] sm:w-[min(75vw,425px)] h-[min(65vw,275px)] w-full mx-auto rounded-sm shadow-lg my-auto">
                <div className="w-full h-full dashboardBg z-10"></div>
              </div>
              <div className="lg:my-auto xl:ml-14">
                <div className=" textGray fontSmall poppinsSemiBold mt-4">
                  /Chat
                </div>
                <div className="poppinsBold fontMedium  mt-2">
                  {language ? (
                    <div>Ask Anything you Want!</div>
                  ) : (
                    <div>¡Pregunta lo que quieras!</div>
                  )}
                </div>
                <div className="poppinsMedium fontSmall  mt-2">
                  {language ? (
                    <div>
                      A conversational AI, power by ChatGPT model gpt-3.5-turbo.
                      With all the features you already know.
                    </div>
                  ) : (
                    <div>
                      Una IA conversacional, impulsada por ChatGPT modelo
                      gpt-3.5-turbo. Con todas las características que ya
                      conoces.
                    </div>
                  )}
                </div>
                {/* CHAT NOW BUTTON--------------------------------------------------------------------- */}
                <div className="flex fontSmall poppinsMedium  mt-6">
                  <Link
                    href="/chat"
                    className="bg-[#F6B10C] text-black py-[10px] px-8 hover:bg-black hover:text-[#F6B10C] transition-all"
                  >
                    {language ? <div>Chat Now</div> : <div>Chatea Ahora</div>}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </m.div>
        <m.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            delay: 0.2,
          }}
          className="xl:flex xl:justify-between xl:gap-4"
        >
          {/* AVAILABLE TABS DIV--------------------------------------------------------------------- */}
          <div className=" xl:w-[125%] w-full colorGray mt-4 rounded-md pb-8 pt-3 px-2 sm:px-[42px]">
            {/* TITLES--------------------------------------------------------------------- */}
            <div className=" justify-between flex px-1 sm:mt-4">
              <div className="poppinsBold fontMedium my-auto">
                {language ? (
                  <div> Available Tabs</div>
                ) : (
                  <div>Pestañas disponibles</div>
                )}
              </div>
              <div className="flex fontSmall">
                <div className="poppinsMedium my-auto mr-2">
                  {" "}
                  {language ? (
                    <div> AI Tools</div>
                  ) : (
                    <div>Herramientas de IA</div>
                  )}
                </div>
                <FaLightbulb className="text-[#F6B10C] my-auto" />
              </div>
            </div>
            {/* TABS--------------------------------------------------------------------- */}
            <div className="xl:grid xl:grid-cols-2 gap-y-2 gap-x-6 mt-2">
              <Tabs
                title={language ? "Dashboard" : "Panel principal"}
                description={language ? "All Info" : "Toda la información"}
                icon={
                  <FaColumns className="text-[#ffffff] my-auto text-[min(5.5vw,27px)]" />
                }
                bgIcon="bg-black"
                bg="bg-[#9D00FE]"
                colorTitle="text-white"
                colorDescription="text-white"
                btn={language ? "Now" : "Ahora"}
                btnColor="text-black"
                bgBtn="bg-[#F6B10C]"
                link="/dashboard"
              />
              <Tabs
                title="Chat"
                description={
                  language ? "Conversational AI" : "IA conversacional"
                }
                icon={
                  <FaFacebookMessenger className="text-black my-auto text-[min(5.5vw,27px)]" />
                }
                bgIcon="bg-[#0cdf4f]"
                bg="colorBlack"
                colorTitle="textWhite"
                colorDescription="textGray"
                btn={language ? "Try" : "Probar"}
                btnColor="textWhite"
                bgBtn="colorGray"
                link="/chat"
              />
              <Tabs
                title={language ? "Image" : "Imagen"}
                description={
                  language ? "Image Generator" : "Generador de imágenes"
                }
                icon={
                  <FaImage className="text-black my-auto text-[min(5.5vw,27px)]" />
                }
                bgIcon="bg-white"
                bg="colorBlack"
                colorTitle="textWhite"
                colorDescription="textGray"
                btn={language ? "Try" : "Probar"}
                btnColor="textWhite"
                bgBtn="colorGray"
                link="/image"
              />
              <Tabs
                title={language ? "Video" : "Vídeo"}
                description={
                  language ? "Video Generator" : "Generador de vídeo"
                }
                icon={
                  <FaVideo className="text-black my-auto text-[min(5.5vw,27px)]" />
                }
                bgIcon="bg-[#F6B10C]"
                bg="colorBlack"
                colorTitle="textWhite"
                colorDescription="textGray"
                btn={language ? "Try" : "Probar"}
                btnColor="textWhite"
                bgBtn="colorGray"
                link="/video"
              />
              <Tabs
                title={language ? "Music" : "Música"}
                description={
                  language ? "Music Generator" : "Generador de música"
                }
                icon={
                  <FaHeadphonesAlt className="text-black my-auto text-[min(5.5vw,27px)]" />
                }
                bgIcon="bg-[#E12D7B]"
                bg="colorBlack"
                colorTitle="textWhite"
                colorDescription="textGray"
                btn={language ? "Try" : "Probar"}
                btnColor="textWhite"
                bgBtn="colorGray"
                link="/music"
              />
              <Tabs
                title={language ? "Code" : "Código"}
                description={
                  language ? "Code Generator" : "Generador de código"
                }
                icon={
                  <FaCode className="text-black my-auto text-[min(5.5vw,27px)]" />
                }
                bgIcon="bg-[#A521FF]"
                bg="colorBlack"
                colorTitle="textWhite"
                colorDescription="textGray"
                btn={language ? "Try" : "Probar"}
                btnColor="textWhite"
                bgBtn="colorGray"
                link="/code"
              />
            </div>
          </div>
          {/* UPDATE PROFILE DIV--------------------------------------------------------------------- */}
          <div className="xl:w-[75%] w-full colorGray mt-4 rounded-md pb-6 pt-3 px-2 flex flex-col">
            <div className=" flex flex-col my-auto">
              <div className="poppinsBold fontMedium mx-auto sm:mt-6 mt-2">
                {language ? (
                  <div> Update Your Profile!</div>
                ) : (
                  <div>¡Actualiza tu perfil!</div>
                )}
              </div>
              <div className="rounded-full border-2 border-[#F6B10C] mx-auto mt-6">
                <FaCogs className="p-5 h-[min(25vw,100px)] w-[min(25vw,100px)] text-[#0cdf4f]" />
              </div>
              <div className="poppinsMedium fontSmall mx-auto mt-6 textGray text-center px-8">
                {language ? (
                  <div> Make Changes to Your Profile, Language,</div>
                ) : (
                  <div>Realiza cambios en su perfil, idioma,</div>
                )}
                {language ? (
                  <div> and More. Find It All Here!</div>
                ) : (
                  <div>y más. ¡Encuéntralo todo aquí!</div>
                )}
              </div>
              {/* GO TO SETTINGS BUTTON--------------------------------------------------------------------- */}
              <div className="flex fontSmall poppinsMedium mx-auto mt-8">
                <Link
                  href="/settings"
                  className="bg-[#F6B10C] text-black py-[12px] px-8 hover:bg-black hover:text-[#F6B10C] transition-all"
                >
                  {language ? (
                    <div> Go to Settings</div>
                  ) : (
                    <div>Ir a Ajustes</div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};
export default Dashboard;
