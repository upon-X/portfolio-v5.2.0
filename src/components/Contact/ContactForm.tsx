/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "../../context/TranslationContext";
import { sendAlert } from "../sweetAlerts";
import { useTheme } from "../../context/ThemeContext";

export const ContactForm = () => {
  const serviceId = "service_kpadu0l";
  const templateId = "template_4mme38a";
  const publicKey = "Poy9PZERtei7dEa-6";
  const { theme } = useTheme();
  const { language, content } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const templateParams = {
      user_name: name,
      user_email: email,
      message: message,
    };
    if (!name || !email || !message) {
      sendAlert(language === "es" ? "corrige" : "fix");
    } else {
      setIsSubmitting(true);
      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((res) => {
          console.log(res);
          setName("");
          setEmail("");
          setMessage("");
          setIsSubmitting(false);
          sendAlert(language === "es" ? "bien" : "good");
        })
        .catch((error) => {
          sendAlert(language === "es" ? "mal" : "bad");
          setIsSubmitting(false);
          console.error("Error", error);
        });
    }
  };
  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className={`flex flex-col items-end gap-4 2xl:h-[450px] text-xl rounded-lg shadow-lg p-8 
      2xl:w-[800px] 2xl:grid 2xl:grid-cols-2 2xl:grid-row-3
      xl:w-[700px] xl:grid xl:grid-cols-2 xl:grid-row-3
      lg:w-[500px]
      md:w-[400px]
      sm:w-[90vw] sm:px-4
      ${theme === "light" ? "bg-[#f5f5f5]" : "bg-[#2c2c2c]"}
      `}
    >
      <label className="flex flex-col gap-1 w-full">
        {content?.contact[language].form.name}
        <input
          className={`text-lg rounded-md border ${
            theme === "light"
              ? "bg-[#ffffff] border-[#e7e7e7]"
              : "bg-darkTheme border-[#818181]"
          } focus:outline-purple outline-purple`}
          type="text"
          id="form_name"
          name="form_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </label>
      <label className="flex flex-col gap-1 w-full">
        {content?.contact[language].form.email}
        <input
          className={`text-lg rounded-md border ${
            email
              ? !email.includes("@")
                ? "border-inputWrong focus:outline-inputWrong"
                : "border-inputRight focus:outline-inputRight"
              : theme === "light"
              ? "border-[#e7e7e7]"
              : "border-[#818181]"
          } ${
            theme === "light" ? "bg-[#ffffff]" : "bg-darkTheme"
          } focus:outline-purple outline-purple`}
          type="email"
          id="form_email"
          name="form_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={100}
          required
        />
      </label>
      <label className="flex flex-col gap-2 w-full 2xl:col-span-2 xl:col-span-2">
        <span className="flex justify-between">
          {content?.contact[language].form.message}
          {message ? (
            <span className={message.length >= 600 ? "text-[#ff8f44]" : ""}>
              {message.length > 0 ? message.length : null}/600
            </span>
          ) : null}
        </span>
        <textarea
          className={`text-lg rounded-md min-h-[200px] max-h-[200px] outline-purple focus:outline-purple p-2 resize-none border
          ${theme === "light" ? "bg-[#ffffff]" : "bg-darkTheme"} ${
            message
              ? message.length === 600
                ? "border-[#ff8f44] outline-[#ff8f44] focus:outline-[#ff8f44]"
                : theme === "light"
                ? "border-[#e7e7e7]"
                : "border-[#818181]"
              : theme === "light"
              ? "border-[#e7e7e7]"
              : "border-[#818181]"
          }
          `}
          id="form_message"
          name="form_message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={1}
          maxLength={600}
          required
        />
      </label>
      <div className=" flex justify-center 2xl:col-start-2 xl:col-start-2 w-full sm:mt-2">
        <button
          type="submit"
          className="px-14 py-2 uppercase font-figtreeFF font-semibold transition-all 2xl:w-full w-full outline-purple
          active:scale-95 
          border-2 border-purple rounded-full hover:bg-purple hover:text-white
        "
        >
          {isSubmitting
            ? content?.contact[language].form.sending
            : content?.contact[language].form.send}
        </button>
      </div>
    </form>
  );
};
