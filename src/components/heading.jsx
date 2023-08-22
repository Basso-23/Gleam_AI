import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SidebarMobile from "./sidebar-mobile";

const Heading = ({ title, color, avatar, firstName, lastName, language}) => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="textWhite flex poppinsBold fontLarge py-6 justify-between w-full border-b-[2px] borderGray">
      {/* TILE DIV--------------------------------------------------------------------- */}
      <div className="flex">
        <div>{title}</div>
        <div
          className={`${color} w-[min(2.5vw,9px)] h-[min(2.5vw,9px)] rounded-full ml-3`}
        ></div>
      </div>
      {/* MENU--------------------------------------------------------------------- */}
      <div className="flex">
        {menu ? (
          <FaTimes
            onClick={() => {
              setMenu(!menu);
            }}
            className="z-50 text-[#FFC42D] hover:text-white transition-all w-[min(7.5vw,32px)] h-[min(7.5vw,32px)] my-auto lg:hidden cursor-pointer"
          />
        ) : (
          <FaBars
            onClick={() => {
              setMenu(!menu);
            }}
            className=" transition-all w-[min(7.5vw,30px)] h-[min(7.5vw,30px)] my-auto lg:hidden cursor-pointer"
          />
        )}

        {menu ? (
          <div className="z-40 lg:hidden flex h-full fixed left-0 top-0">
            <div className=" w-[280px]">
              <SidebarMobile language={language}/>
            </div>
            <div className="w-screen h-full glass"></div>
          </div>
        ) : null}
      </div>
      {/* AVATAR + USERNAME --------------------------------------------------------------------- */}
      <div className="lg:flex hidden fontSmall">
        <div className="my-auto mr-4">
          <div className=" capitalize poppinsSemiBold">
            {firstName} {lastName}
          </div>
          <div className="text-end poppinsSemiBold text-[#0cdf4f] fontExtraSmall">
            Online
          </div>
        </div>
        <div
          className={`${avatar} w-[55px] h-[55px] rounded-full m-auto`}
        ></div>
      </div>
    </div>
  );
};
export default Heading;
