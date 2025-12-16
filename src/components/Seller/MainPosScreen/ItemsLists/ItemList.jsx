import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  decreaseQyt,
  increaseQyt,
  updatePrice,
  updateQty,
} from "../../../../Redux/RingUpSlice";
import { useState } from "react";

export const ItemList = ({ 
  id, 
  cur,
  setIsKeyboardOpen,
  setActiveInputField,
  keyboardInput,
  activeInputField
}) => {
  const [editingQty, setEditingQty] = useState({});
  const dispatch = useDispatch();

  const handleIncreaseQty = (id, action) => {
    if (action === "increase") {
      dispatch(increaseQyt(id));
    } else if (action === "decrease") {
      dispatch(decreaseQyt(id));
    }
  };

  return (
    <>
      <div
        key={id}
        className={`flex justify-center items-center w-full ${
          id % 2 === 0 ? "bg-(--secondary-color)/70" : "bg-transparent"
        }`}
      >
        <div className="border-r border-(--border-color) py-3 px-1  min-w-[5dvw] max-w-[5dvw] flex justify-center items-center">
          <input
            value={
              activeInputField?.type === 'quantity' && activeInputField?.itemId === cur.id
                ? keyboardInput
                : (editingQty[cur.id] !== undefined ? editingQty[cur.id] : cur.qty)
            }
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full border-none active:border-none outline-none mainFont text-[1dvw] font-semibold text-center"
            onFocus={(e) => {
              e.stopPropagation();
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: 'quantity', itemId: cur.id });
              }
            }}
            onChange={(e) => {
              const val = e.target.value;
              // allow only digits
              if (!/^\d*$/.test(val)) return;
              setEditingQty((prev) => ({
                ...prev,
                [cur.id]: val,
              }));

              if (val === "") return;
              const parsed = parseInt(val, 10);
              if (Number.isNaN(parsed)) return;
              dispatch(
                updateQty({
                  id: cur.id,
                  name: cur.name,
                  qty: parsed,
                })
              );
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Ensure active field is set even if keyboard is already open
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: 'quantity', itemId: cur.id });
              }
            }}
            onBlur={() => {
              setEditingQty((prev) => {
                const next = { ...prev };
                delete next[cur.id];
                return next;
              });
            }}
          />
        </div>
        <div className="border-r  border-(--border-color) py-3 w-full flex justify-between gap-3 px-1 items-center">
          <div className="flex justify-start items-center gap-3">
            <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden">
              <img
                src={cur.product_image}
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[1dvw] font-semibold mainFont line-clamp-1">
              {cur.name}
            </p>
          </div>
          <div className="shrink-0">
            <p className="text-[.9dvw] text-(--button-color2) paraFont font-medium">
              Add ons
            </p>
          </div>
        </div>
        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
          <input
            type="text"
            placeholder="0.00"
            value={
              activeInputField?.type === 'price' && activeInputField?.itemId === cur.id
                ? keyboardInput
                : (` $ ${cur.product_price}.00` ?? "")
            }
            onFocus={(e) => {
              e.stopPropagation();
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: 'price', itemId: cur.id });
              }
            }}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              dispatch(
                updatePrice({
                  id: cur.id,
                  name: cur.name,
                  price: Number.isNaN(parsed) ? 0 : parsed,
                })
              );
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Ensure active field is set even if keyboard is already open
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: 'price', itemId: cur.id });
              }
            }}
            className="w-full text-center outline-none text-[1dvw] mainFont font-semibold border-(--border-color) py-2 bg-(--secondary-color)/50 appearance-none"
          />
        </div>
        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] w-[8dvw] shrink-0 flex justify-center items-center px-2">
          <select
            value={cur.tax_percentage}
            className="w-full text-center outline-none text-[1dvw] font-semibold mainFont  border-(--border-color) py-2 bg-(--secondary-color)/50 rounded-md appearance-none"
          >
            <option>No Tax</option>
            <option>Low Tax</option>
            <option>High Tax</option>
          </select>
        </div>
        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">
            $ {cur.product_price * cur.qty}.00
          </p>
        </div>
        <div className="py-3  min-w-[8dvw] flex justify-center gap-3 items-center shrink-0">
          <button
            onClick={() => {
              handleIncreaseQty(cur.id, "increase");
            }}
            className="bg-(--button-color1) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer"
          >
            <Plus />
          </button>
          <button
            onClick={() => {
              handleIncreaseQty(cur.id, "decrease");
            }}
            className="bg-(--Negative-color) text-(--primary-color) rounded-full p-2 flex justify-center items-center cursor-pointer"
          >
            <Minus />
          </button>
        </div>
      </div>
    </>
  );
};
