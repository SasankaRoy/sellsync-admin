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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-lg sm:text-xl md:text-[1.4dvw]  sm:text-[1.2dvw]  md:portrait:text-[2.4dvw] md:landscape:text-[2.4dvw] font-semibold text-[var(--mainText-color)]">
              Help
            </h3>
          </div>
        </div>
        <div className="border border-[#D4D4D4] my-4 px-2 sm:px-3 py-1 flex flex-row justify-center items-center gap-2 rounded-full bg-white w-full">
          <input
            className="flex-1 border-none px-2 sm:px-3 py-0.5 sm:py-1.5 outline-none font-[var(--paraFont)] font-semibold text-[0.75rem] sm:text-sm md:text-base lg:text-[1dvw]"
            placeholder="Search topics like 'barcode scanner issue,' 'payment failure,' etc."
            type="text"
          />
          <div className="sm:hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.4057 17.2843 14.1426 16.1089 15.4632L20.3231 19.6774C20.7056 20.0598 20.7056 20.6749 20.3231 21.0574C19.9407 21.4398 19.3256 21.4398 18.9431 21.0574L14.7289 16.8432C13.4083 18.0186 11.6714 18.7343 9.7665 18.7343C5.62436 18.7343 2.2665 15.3764 2.2665 11.2343C2.2665 7.09214 5.62436 3.73428 9.7665 3.73428C9.7665 3 10.5 3 10.5 3ZM9.7665 4.76786C6.24214 4.76786 3.3 7.70999 3.3 11.2343C3.3 14.7587 6.24214 17.7007 9.7665 17.7007C13.2909 17.7007 16.2329 14.7587 16.2329 11.2343C16.2329 7.70999 13.2909 4.76786 9.7665 4.76786Z"
                fill="#0052CC"
              />
            </svg>
          </div>
          <button className="hidden sm:block bg-[var(--button-color1)] text-white px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 rounded-full border-none outline-none cursor-pointer font-semibold text-xs sm:text-sm md:text-base lg:text-[1.1dvw] font-[var(--paraFont)]">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

        <div className="bg-white p-4 sm:p-5 border border-[#D4D4D4] rounded-xl my-4">
          <div className="w-full border-b border-[#D9D9D9] py-4 px-2">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-[1.5dvw]">
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

        <div className="bg-white p-4 sm:p-5 border border-[#D4D4D4] rounded-xl my-4">
          <div className="w-full border-b border-[#D9D9D9] py-4 px-2">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-[1.5dvw]">
              Video Tutorials
            </h3>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
            <div className="w-full h-[30vh] sm:h-[25vh] md:h-[22vh] lg:h-[20dvh] rounded-xl overflow-hidden relative cursor-pointer">
              <img src={VedioImg1} alt="video" className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/40">
                <div className="flex flex-col gap-2 justify-center items-center px-2">
                  <PlayIcon />
                  <div className="w-full">
                    <h4 className="text-sm sm:text-base md:text-lg lg:text-[1dvw] text-white font-semibold font-[var(--paraFont)]">
                      How to process a sale
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base lg:text-[.75dvw] text-white font-[var(--paraFont)] font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[30vh] sm:h-[25vh] md:h-[22vh] lg:h-[20dvh] rounded-xl overflow-hidden relative cursor-pointer">
              <img src={VedioImg2} alt="video" className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/40">
                <div className="flex flex-col gap-2 justify-center items-center px-2">
                  <PlayIcon />
                  <div className="w-full">
                    <h4 className="text-sm sm:text-base md:text-lg lg:text-[1dvw] text-white font-semibold font-[var(--paraFont)]">
                      Setting up barcode scanning
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base lg:text-[.75dvw] text-white font-[var(--paraFont)] font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[30vh] sm:h-[25vh] md:h-[22vh] lg:h-[20dvh] rounded-xl overflow-hidden relative cursor-pointer">
              <img src={VedioImg3} alt="video" className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000]/40">
                <div className="flex flex-col gap-2 justify-center items-center px-2">
                  <PlayIcon />
                  <div className="w-full">
                    <h4 className="text-sm sm:text-base md:text-lg lg:text-[1dvw] text-white font-semibold font-[var(--paraFont)]">
                      Managing inventory alerts
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base lg:text-[.75dvw] text-white font-[var(--paraFont)] font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
    <div className="bg-transparent">
      <button
        style={{
          background: isOpen ? "transparent" : "transparent",
          color: isOpen ? "#fff" : "#0C0544",
        }}
        className={`flex flex-col justify-start items-start w-full gap-4 py-4 rounded-2xl border border-[#7F7F7F] ${
          isOpen ? "px-6 sm:px-8 border-0" : "px-4"
        } text-left focus:outline-none transition-all duration-300 ease-linear`}
        onClick={() => onToggle(index)}
      >
        <div className="flex justify-between items-center w-full">
          <span
            className={`font-[700] font-mainFont text-sm sm:text-base md:text-lg lg:text-[1.3vw] ${
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
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${
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
        <div className="p-4 sm:p-6 bg-transparent flex flex-col gap-4">
          <p className="text-sm sm:text-base md:text-lg lg:text-[1.2vw] font-[var(--paraFont)]">{checkList}</p>
        </div>
      </div>
    </div>
  );
};