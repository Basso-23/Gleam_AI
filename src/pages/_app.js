import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import Head from "next/head";

const App = ({ Component, pageProps, router }) => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [firstName, setFirstName] = useState("User");
  const [lastName, setLastName] = useState("Name");
  const [avatar, setAvatar] = useState("avatar1");
  const [theme, setTheme] = useState(true);
  const [language, setLanguage] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setSidebarActive(true);
    } else if (pathname != "/") {
      setSidebarActive(false);
    }
  }, [pathname]);

  return (
    <div className="w-full">
      <Head>
        <title>GleamAI</title>
      </Head>
      {/* SIDEBAR--------------------------------------------------------------------- */}
      {sidebarActive ? null : <Sidebar language={language} />}
      {/* PAGES--------------------------------------------------------------------- */}
      <div className={sidebarActive ? "" : "lg:pl-[280px]"}>
        <Component
          key={router.pathname}
          {...pageProps}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          avatar={avatar}
          setAvatar={setAvatar}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
};

export default App;
