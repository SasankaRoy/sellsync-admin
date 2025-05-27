import React, { useState } from "react";
import { Layout } from "../../../components/common/Layout/Layout";
import {
  ChatWithUsIcon,
  MakeACallIcon,
  PlayIcon,
  TroubleShootingIcon,
  UserGuideIcon,
} from "../../../assets/Svgs/AllSvgs";
import { HelpOverviewCard } from "./HelpOverviewCard";
import VedioImg1 from "../../../assets/images/VedioImg1.png";
import VedioImg2 from "../../../assets/images/VedioImg2.png";
import VedioImg3 from "../../../assets/images/VedioImg3.png";

const FAQData = [
  {
    id: 1,
    qus: `How do I reset my password?`,
    ans: `If you have forgotten your password, you can reset it by clicking on the.`,
  },
  {
    id: 2,
    qus: `How do I add a new user?`,
    ans: `If you have forgotten your password, you can reset it by clicking on the.`,
  },
  {
    id: 3,
    qus: `How do I issue a refund?`,
    ans: `If you have forgotten your password, you can reset it by clicking on the.`,
  },
];

export const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <Layout>
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
              Help
            </h3>
          </div>
        </div>
        <div className="border border-[#D4D4D4] my-4 px-3 py-1.5 flex justify-center gap-2 rounded-full bg-white w-full">
          <input
            className="flex-1 border-none px-3 py-1.5 outline-none font-[var(--paraFont)] font-semibold text-[1dvw]"
            placeholder="Search topics like 'barcode scanner issue,' 'payment failure,' etc."
            type="text"
          />
          <button className="bg-[var(--button-color1)] text-white px-6 flex justify-center items-center rounded-full border-none outline-none cursor-pointer font-semibold text-[1.1dvw] font-[var(--paraFont)]">
            Search
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <HelpOverviewCard
            cardBgColor="#0052CC"
            viewPath=""
            cardTitle="User Guide"
            cardIcon={<UserGuideIcon />}
          />
          <HelpOverviewCard
            cardBgColor="#DD8E08"
            viewPath=""
            cardTitle="Trouble shooting"
            cardIcon={<TroubleShootingIcon />}
          />
          <HelpOverviewCard
            cardBgColor="#02A5BE"
            viewPath=""
            cardTitle="Make a Call"
            cardIcon={<MakeACallIcon />}
          />
          <HelpOverviewCard
            cardBgColor="#02BE7C"
            viewPath=""
            cardTitle="Chat with Us"
            cardIcon={<ChatWithUsIcon />}
          />
        </div>

        <div className="bg-white p-5 border border-[#D4D4D4] rounded-xl my-4">
          <div className="w-full border-b border-[#D9D9D9] py-4 px-2">
            <h3 className="font-semibold text-[1.5dvw]">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="flex flex-col gap-3 my-6">
            {FAQData.map((item, index) => (
              <AccordionItem
                key={index}
                index={index}
                title={item.qus}
                checkList={item.ans}
                isOpen={openIndex === index}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-5 border border-[#D4D4D4] rounded-xl my-4">
          <div className="w-full border-b border-[#D9D9D9] py-4 px-2">
            <h3 className="font-semibold text-[1.5dvw]">Video Tutorials</h3>
          </div>

          <div className="w-full grid grid-cols-4 gap-4 my-5">
            <div className="w-full h-[20dvh] rounded-xl overflow-hidden relative cursor-pointer">
              <img src={VedioImg1} alt="vedio" />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/40">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <PlayIcon />
                  <div className="w-full px-2">
                    <h4 className="text-[1dvw] text-white font-semibold font-[var(--paraFont)]">How to process a sale</h4>
                    <p className="text-[.75dvw] text-white font-[var(--paraFont)] font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[20dvh] rounded-xl overflow-hidden relative cursor-pointer">
              <img src={VedioImg2} alt="vedio" />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/40">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <PlayIcon />
                  <div className="w-full px-2">
                    <h4 className="text-[1dvw] text-white font-semibold font-[var(--paraFont)]">Setting up barcode scanning</h4>
                    <p className="text-[.75dvw] text-white font-[var(--paraFont)] font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[20dvh] rounded-xl overflow-hidden relative cursor-pointer">
              <img src={VedioImg3} alt="vedio" />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/40">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <PlayIcon />
                  <div className="w-full px-2">
                    <h4 className="text-[1dvw] text-white font-semibold font-[var(--paraFont)]">Managing inventory alerts</h4>
                    <p className="text-[.75dvw] text-white font-[var(--paraFont)] font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const AccordionItem = ({ title, checkList, isOpen, index, onToggle }) => {
  return (
    <>
      <div className="bg-transparent">
        <button
          style={{
            background: isOpen ? "transparent" : "transparent",
            color: isOpen ? "#fff" : "#0C0544",
          }}
          className={`flex flex-col justify-start items-start w-full gap-4 py-4 rounded-2xl border border-[#7F7F7F] ${
            isOpen ? "px-8  border-0" : "px-4"
          } text-left  focus:outline-none  transition-all duration-300 ease-linear`}
          onClick={() => onToggle(index)}
        >
          <div className="flex justify-between items-center w-full">
            <span
              className={`font-[700] font-mainFont text-[1.3vw] ${
                isOpen ? "text-[#000000]" : "text-[#000000]"
              }`}
            >
              {title}
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform duration-500 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            >
              <path
                d="M13.9999 3.33326L1.99994 3.33326C1.87845 3.33364 1.75936 3.36715 1.65549 3.43018C1.55163 3.49321 1.46692 3.58337 1.41048 3.69097C1.35404 3.79856 1.32802 3.9195 1.33521 4.04079C1.3424 4.16207 1.38253 4.27909 1.45128 4.37926L7.45128 13.0459C7.69994 13.4053 8.29861 13.4053 8.54794 13.0459L14.5479 4.37926C14.6174 4.2793 14.6581 4.16222 14.6657 4.04073C14.6733 3.91925 14.6474 3.79801 14.5909 3.69019C14.5344 3.58237 14.4495 3.49209 14.3453 3.42917C14.2411 3.36624 14.1217 3.33307 13.9999 3.33326Z"
                fill="#fff"
              />
            </svg>
          </div>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-linear ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="p-6 bg-transparent flex flex-col gap-4">
            {/* {checkList.map((cur, id) => (
                <>
                  <div className="flex justify-start items-center gap-3">
                    <input
                      name={name}
                      type="checkbox"
                      id={`section${index + 1}_${id}`}
                      value={cur}
                      onChange={handleOnChange}
                    />
                    <label
                      htmlFor={`section${index + 1}_${id}`}
                      className="font-mainFont font-[400] text-white text-[1.2vw]"
                    >
                      {cur}
                    </label>
                  </div>
                </>
              ))} */}
            <p>{checkList}</p>
          </div>
        </div>
      </div>
    </>
  );
};
