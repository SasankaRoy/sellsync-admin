import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQyt,
  increaseQyt,
  updatePrice,
  updateQty,
} from "../../../../Redux/RingUpSlice";
import { useState } from "react";
import axiosInstance from "../../../../utils/axios-interceptor";
import { useDeboune } from "../../../../hooks/useDebounce";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const ItemList = ({
  id,
  cur,
  setIsKeyboardOpen,
  setActiveInputField,
  keyboardInput,
  activeInputField,
  isCustomerScreen
}) => {
  const [editingQty, setEditingQty] = useState({});
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const currentBillId = useSelector((state) => state.currentBill.billId);
  const currentQty = useSelector((state) => state.ringUps);
  // Debounce callback
  const debounceCallback = useDeboune((results, error) => {
    if (results) {
      queryClient.invalidateQueries(["get_bill_details"]);
      console.log("results", results);
    }
    console.log("error", error);
  }, 500);

  const reqQtyUpdate = async (billId, productId, newQty) => {
    try {
      if (newQty <= 0) {
        const billDetails = await axiosInstance.delete(
          `/api/v1/bills/${billId}/items/${productId}`
        );
        if (billDetails.status === 200) {
          // toast.success("Quantity updated successfully");
          queryClient.invalidateQueries(["get_bill_details"]);
          return true;
        }
      } else {
        const billDetails = await axiosInstance.put(
          `/api/v1/bills/${billId}/items/${productId}`,
          {
            qty: Number(newQty),
          }
        );
        if (billDetails.status === 200) {
          // toast.success("Quantity updated successfully");
          queryClient.invalidateQueries(["get_bill_details"]);
          return true;
        }
      }
    } catch (error) {
      console.error("Error in reqQtyUpdate", error);
      toast.error(error.response.data.message || "Failed to update quantity");
    }
  };

  const handleIncreaseQty = async (id, action) => {
    const currentItemQty = currentQty.find((item) => item.id === id)?.qty;
    const newQty =
      action === "increase" ? currentItemQty + 1 : currentItemQty - 1;
    if (action === "increase") {
      dispatch(increaseQyt(id));
    } else if (action === "decrease") {
      dispatch(decreaseQyt(id));
    }
    console.log("newQty", newQty <= 0);
    await reqQtyUpdate(currentBillId, id, newQty);
  };

  return (
    <>
      <div
        key={id}
        className={`flex justify-center items-center w-full ${id % 2 === 0 ? "bg-(--secondary-color)/70" : "bg-transparent"
          }`}
      >
        <div className="border-r border-(--border-color) py-3 px-1  min-w-[5dvw] max-w-[5dvw] flex justify-center items-center">
          <input
            readOnly={isCustomerScreen}
            value={isCustomerScreen ? cur.quantity :
              activeInputField?.type === "quantity" &&
                activeInputField?.itemId === cur.id
                ? keyboardInput
                : editingQty[cur.id] !== undefined
                  ? editingQty[cur.id]
                  : cur.qty
            }
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full border-none active:border-none outline-none mainFont text-[1dvw] font-semibold text-center"
            onFocus={(e) => {
              e.stopPropagation();
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: "quantity", itemId: cur.id });
              }
            }}
            onChange={async (e) => {
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
              // await debounceCallback(currentBillId, cur.id, parsed);
              await debounceCallback(
                `/api/v1/bills/${currentBillId}/items/${cur.id}`,
                parsed,
                "QTY_UPDATE"
              );
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Ensure active field is set even if keyboard is already open
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: "quantity", itemId: cur.id });
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
                src={isCustomerScreen ? cur.product_image : cur.product_image}
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
            readOnly={isCustomerScreen}
            value={isCustomerScreen ? `$ ${cur.price.toFixed(2)}` :
              activeInputField?.type === "price" &&
                activeInputField?.itemId === cur.id
                ? keyboardInput
                : ` $ ${cur.product_price}.00` ?? ""
            }
            onFocus={(e) => {
              e.stopPropagation();
              if (setIsKeyboardOpen && setActiveInputField) {
                setIsKeyboardOpen(true);
                setActiveInputField({ type: "price", itemId: cur.id });
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
                setActiveInputField({ type: "price", itemId: cur.id });
              }
            }}
            className="w-full text-center outline-none text-[1dvw] mainFont font-semibold border-(--border-color) py-2 bg-(--secondary-color)/50 appearance-none"
          />
        </div>
        {
          !isCustomerScreen && (

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
          )
        }




        <div className="border-r border-(--border-color) py-3  min-w-[8dvw] shrink-0 flex justify-center items-center">
          <p className="text-[1dvw] font-semibold mainFont">
            $ {isCustomerScreen ? cur.total.toFixed(2) : `${cur.product_price * cur.qty}.00`}
          </p>
        </div>

        {
          !isCustomerScreen && (

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
          )
        }



      </div>
    </>
  );
};
