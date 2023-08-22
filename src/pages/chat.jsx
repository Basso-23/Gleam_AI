import Heading from "@/components/heading";
import { FaBars, FaPaperPlane, FaMeteor, FaQuestion } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const systemMessage = {
  //  Define AI Behavior
  role: "system",
  content:
    "You are a conversational AI named Gleam. When you get ask: Who are you? You have to reply that you are gleam a conversational AI, created by Carlos Baso, a developer and programmer, with the purpose of answer every question people ask you, and finally you must share this link: https://www.carlosbaso.com/.",
};

const SearchForm = ({ sendQuestion, setUserChat, language }) => {
  const [text, setText] = useState("");
  const [sendBtn, setSendBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuestion(text);
    setUserChat(text);
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
              : "p-3 bg-[#0cdf4f] text-black flex my-auto text-[min(5vw,22px)] "
          }
        >
          <FaPaperPlane />
        </button>
      </div>
      <div className="textGray fontSmall mt-3">
        {language ? (
          <div>Try: Who are you?</div>
        ) : (
          <div>Prueba: ¿Quién eres?</div>
        )}
      </div>
    </form>
  );
};

const ConversationBody = ({ userText, cosmoText, avatar }) => {
  const [lengthUser, setLengthUser] = useState(true);
  const [lengthCosmo, setLengthCosmo] = useState(true);

  useEffect(() => {
    if (userText.length != 0) {
      setLengthUser(false);
    }
    if (userText.length === 0) {
      setLengthUser(true);
    }
  }, []);

  useEffect(() => {
    if (cosmoText.length != 0) {
      setLengthCosmo(false);
    }
    if (cosmoText.length === 0) {
      setLengthCosmo(true);
    }
  }, []);
  return (
    <div className="md:pr-14 mt-[30px] flex flex-col w-full mx-auto text-[min(5vw,15px)] transition-all z-10 poppinsMedium fontSmall">
      {/* USER TEXT DIV--------------------------------------------------------------------- */}
      <div className="flex mt-[-15px]">
        {/* CONTAINER--------------------------------------------------------------------- */}
        <m.div
          initial={{ x: "5%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            delay: 0,
          }}
          className={
            lengthUser ? "hidden" : "flex colorGray w-full rounded-sm p-3"
          }
        >
          {/* USER TEXT--------------------------------------------------------------------- */}
          <div className="flex">
            <div
              className={
                lengthUser
                  ? `hidden`
                  : `mr-4 w-[min(12vw,50px)] h-[min(12vw,50px)] rounded-full ${avatar}`
              }
            ></div>
            <div className="my-auto py-2">{userText}</div>
          </div>
        </m.div>
      </div>

      {/* GLEAM TEXT DIV--------------------------------------------------------------------- */}
      <div className="flex mt-[15px]">
        {/* CONTAINER--------------------------------------------------------------------- */}
        <m.div
          initial={{ x: "5%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            delay: 0.05,
          }}
          className={
            lengthCosmo ? "hidden" : "flex colorWhite w-full rounded-sm p-3"
          }
        >
          {/* GLEAM TEXT--------------------------------------------------------------------- */}
          <div className="flex textBlack">
            <div
              className={
                lengthCosmo
                  ? `hidden`
                  : `mr-4 w-[min(12vw,50px)] h-[min(12vw,50px)] rounded-full flex my-auto`
              }
            >
              <BsStars className="m-auto text-[min(7vw,30px)]" />
            </div>
            <div className="my-auto py-2">{cosmoText}</div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

const Chat = ({ firstName, lastName, avatar, language }) => {
  const [userChat, setUserChat] = useState("");
  const [empty, setEmpty] = useState(true);
  const [cosmoChat, setCosmoChat] = useState("");
  const [conversation, setConversation] = useState([]);

  const sendQuestion = (search) => {
    handleSend(search);
    setEmpty(false);
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);

        setCosmoChat(data.choices[0].message.content);
        setIsTyping(false);
      });
  }

  useEffect(() => {
    storeMessages(userChat, cosmoChat);
  }, [cosmoChat]);

  const storeMessages = (userText, cosmoText) => {
    const response = {
      key: 1,
      user: userText,
      cosmo: cosmoText,
    };
    // messages.push(joke)
    setConversation([...conversation, response]);
  };

  return (
    <div className="min-h-screen colorBlack sm:mb-20 mb-10 textWhite">
      {/* EMPTY DIV--------------------------------------------------------------------- */}
      {empty ? (
        <div className="lg:pl-[280px] poppinsMedium absolute fixedCenter2 z-10 flex flex-col items-center justify-center">
          <div className="space-y-6 my-auto question">
            <FaQuestion className="mx-auto text-[min(30vw,150px)]" />
            <div className="fontSmall text-[#0cdf4f] text-center">
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
        <div className="poppinsMedium fixed typing h-screen min-w-full fixedCenter z-50 flex flex-col items-center justify-center">
          <div className="space-y-5">
            <BsStars className="mx-auto text-[min(13vw,65px)] animate-bounce" />
            <div className="fontSmall">
              {language ? (
                <div>Gleam is thinking...</div>
              ) : (
                <div>Gleam está pensando...</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {/* HEADER--------------------------------------------------------------------- */}
      <div className="flex xl:px-32 lg:px-20 sm:px-12 px-4">
        <Heading
          title="Chat"
          color="bg-[#0cdf4f]"
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
            sendQuestion={sendQuestion}
            setUserChat={setUserChat}
            language={language}
          />
        </div>

        {/* ConversationBody DIV--------------------------------------------------------------------- */}
        <div className="flex flex-col-reverse mt-[-70px]">
          {conversation.map((message) => (
            <ConversationBody
              key={message.key}
              userText={message.user}
              cosmoText={message.cosmo}
              avatar={avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Chat;
