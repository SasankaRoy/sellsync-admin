export const LowStockList = ({ lowStocklist }) => {
    console.log(lowStocklist)
    return (
        <>
            <div className="border border-[#D4D4D4] rounded-md p-3 sm:p-4 md:p-3.5 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4 md:mb-3.5">
                    <h3 className="font-semibold text-lg sm:text-xl md:text-xl lg:text-[1.1dvw]">Low Stocks</h3>
                    <button className="cursor-pointer bg-[var(--button-color2)] text-white px-3 sm:px-4 md:px-3.5 py-2 sm:py-1 md:py-1.5 rounded-full text-sm sm:text-base md:text-base lg:text-[1dvw] font-[var(--paraFont)] font-medium w-full sm:w-auto">
                        See all
                    </button>
                </div>

                <div className="flex flex-col gap-3 md:gap-2.5 my-3 md:my-2.5">
                    {[1, 2, 3].map((cur, id) => (
                        <div
                            key={id}
                            className="w-full flex justify-start items-center gap-3 md:gap-2.5"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-[3dvw] lg:h-[3dvw] flex-shrink-0">
                                <img
                                    className="w-full h-full object-cover rounded"
                                    src={ProductImg1}
                                    alt="sellsync.com"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold font-[var(--paraFont)] text-sm sm:text-base md:text-base lg:text-[1dvw] truncate">
                                    Budwiser Magnum 750ML
                                </h4>
                                <p className="text-xs sm:text-sm md:text-sm lg:text-[.9dvw] font-medium text-[#333333] font-[var(--paraFont)]">
                                    Out Of Stock
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}