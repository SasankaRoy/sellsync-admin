import { CircleX, CreditCard, HandCoins, IdCard, QrCode } from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  {
    id: 1,
    name: "Cash",
    icon: <HandCoins size={70} />,
  },
  {
    id: 2,
    name: "Card",
    icon: <CreditCard size={70} />,
  },
  {
    id: 3,
    name: "QR Code",
    icon: <QrCode size={70} />,
  },
  {
    id: 4,
    name: "EBT",
    icon: <IdCard size={70} />,
  },
];

export const PaymentOptions = ({ setIsOpenPaymentModel, onSelecte }) => {
  return (
    <div className="h-screen fixed  top-0  bg-black/20 backdrop-blur-md w-full flex justify-center items-center">
      <div className="bg-white w-[60%] rounded-2xl shadow-md p-4">
        <div className="bg-(--button-color1) rounded-xl p-3 flex justify-between items-center">
          <h2 className="text-[1.5dvw] font-semibold text-(--primary-color)">
            Select Payment Options
          </h2>
          <button
            onClick={() => setIsOpenPaymentModel(false)}
            className="text-(--primary-color) cursor-pointer"
          >
            <CircleX />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 my-10 px-5">
          {paymentMethods.map((method, id) => (
            <div
              key={id}
              onClick={()=>onSelecte(method.name)}
              className="bg-(--button-color1) group flex justify-center items-center flex-col gap-5 p-5 rounded-2xl shadow-lg text-(--primary-color) cursor-pointer hover:scale-105 hover:bg-(--button-color5) transition-all duration-300 ease-in-out"
            >
              <div className="border-2 border-(--border-color) p-3 rounded-full flex justify-center items-center">
                {/* <HandCoins size={70} /> */}
                {method.icon}
              </div>
              <h2 className="text-[1.5dvw] font-bold">{method.name}</h2>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end items-center p-5">
          <button
            onClick={() => setIsOpenPaymentModel(false)}
            className="bg-(--button-color3) mainFont text-(--primary-color) px-5 py-2 rounded-lg hover:bg-(--button-color2) text-[1.2dvw] cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
