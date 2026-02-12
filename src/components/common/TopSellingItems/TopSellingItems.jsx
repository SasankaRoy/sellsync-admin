import { useQuery } from "@tanstack/react-query";
import { getTopSellingItems } from "../../../utils/apis/handleReports";
import { Doughtchart } from "../charts/Doughtchart";
import { Loading } from "../../UI/Loading/Loading";

export const TopSellingItems = () => {
  const { data: topSellingItems, isLoading } = useQuery({
    queryKey: ["get_top_selling_items"],
    queryFn: async () => await getTopSellingItems(),
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-[1.1dvw] font-semibold text-[var(--mainText-color)]">
              Top Selling Items
            </h3>
            <button className="cursor-pointer bg-[var(--button-color2)] text-white px-4 py-1 rounded-full text-[1dvw] font-[var(--paraFont)] font-medium">
              See all
            </button>
          </div>

          <div className="w-full my-6 rounded-lg overflow-hidden border border-[#D4D4D4] bg-white">
            <div className="bg-[var(--button-color2)] text-white flex justify-center">
              <div className="flex-1 p-2 flex justify-start items-center ">
                <p>Product Name</p>
              </div>
              <div className="min-w-[25%] p-2 flex justify-center items-center border-r border-l border-[#D4D4D4]">
                <p>Quantity</p>
              </div>
              <div className="min-w-[25%] p-2 flex justify-center items-center">
                <p>Price</p>
              </div>
            </div>

            {topSellingItems?.map((cur, id) => (
              <div
                key={id}
                className="w-full flex justify-center border-b border-[#D4D4D4]"
              >
                <div className="flex-1 p-2 flex justify-start items-center ">
                  <p className="text-[1.05dvw] line-clamp-2 text-[#7F7F7F] font-[var(--paraFont)]">
                    {cur?.product_name}
                  </p>
                </div>
                <div className="min-w-[25%] flex justify-center items-center border-r border-l border-[#D4D4D4]">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-[1.2dvw]">
                    {cur?.qty_on_hand}
                  </p>
                </div>
                <div className="min-w-[25%] flex justify-center items-center">
                  <p className="font-semibold text-[#7F7F7F] font-[var(--paraFont)] text-[1.1dvw]">
                    $ {cur?.product_price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
