import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import {
  FaMeteor,
  FaFacebookMessenger,
  FaImage,
  FaVideo,
  FaHeadphonesAlt,
  FaCode,
  FaCog,
  FaCaretLeft,
  FaColumns,
} from "react-icons/fa";

const List = ({ name, icon, title }) => {
  const pathname = usePathname();
  return (
    <Link
      href={`/${name}`}
      className={
        pathname === `/${name}`
          ? "flex justify-between cursor-pointer sm:py-1 py-2 px-3  pointer-events-none bg-[#F6B10C] text-black "
          : "flex justify-between cursor-pointer sm:py-1 py-2 px-3 text-[#949494] hover:bg-[#F6B10C] hover:text-black "
      }
    >
      <div className="flex">
        <div
          className={
            pathname === `/${name}`
              ? "my-auto fontMedium mr-4 "
              : "my-auto fontMedium mr-4 "
          }
        >
          {icon}
        </div>
        <div
          className={
            pathname === `/${name}`
              ? "my-auto capitalize "
              : "my-auto capitalize "
          }
        >
          {title}
        </div>
      </div>
      <FaCaretLeft
        className={
          pathname === `/${name}`
            ? "my-auto fontLarge py-[4px] text-black "
            : "my-auto fontLarge py-[4px] text-transparent"
        }
      />
    </Link>
  );
};

const SidebarMobile = ({ language }) => {
  return (
    <div className="lg:hidden w-[280px] flex flex-col colorGray h-screen fixed textWhite pl-5 pr-4 pt-6 pb-4">
      {/* TITLE DIV--------------------------------------------------------------------- */}
      <Link
        href="/dashboard"
        className=" cursor-pointer flex poppinsBold text-[min(6vw,25px)] mt-2 ml-2"
      >
        <BsStars className="my-auto text-[min(9vw,35px)] mr-3" />
        <div className="my-auto">GleamAI.</div>
      </Link>
      {/* TABS LIST DIV--------------------------------------------------------------------- */}
      <div className="flex flex-col poppinsMedium fontSmall mt-16 gap-6">
        <List
          name="dashboard"
          title={language ? "Dashboard" : "Panel principal"}
          icon={<FaColumns />}
        />
        <List
          name="chat"
          title={language ? "Chat" : "Chat"}
          icon={<FaFacebookMessenger />}
        />
        <List
          name="image"
          title={language ? "Image" : "Imagen"}
          icon={<FaImage />}
        />
        <List
          name="video"
          title={language ? "Video" : "Video"}
          icon={<FaVideo />}
        />
        <List
          name="music"
          title={language ? "Music" : "Música"}
          icon={<FaHeadphonesAlt />}
        />
        <List
          name="code"
          title={language ? "Code" : "Código"}
          icon={<FaCode />}
        />
        <List
          name="settings"
          title={language ? "Settings" : "Ajustes"}
          icon={<FaCog />}
        />
      </div>
    </div>
  );
};
export default SidebarMobile;
