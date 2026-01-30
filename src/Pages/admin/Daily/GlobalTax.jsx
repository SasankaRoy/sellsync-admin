import React, { useMemo, useState } from 'react'
import Layout from '../../../components/common/Layout/Layout'
import { PluseIcon } from '../../../assets/Svgs/AllSvgs'
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { handleGetTaxValue, handleTaxUpateHistory, handleUpdateTax } from '../../../utils/apis/Taxes';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from '../../../components/UI/Loading/Loading';



ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
    mode: "none",
    headerCheckbox: false,
};

const Taxes = () => {
    const [taxValue, setTaxValue] = useState({
        low_tax: '',
        high_tax: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    const { data: rowData, isError: UpdateTaxHistoryError } = useQuery({
        queryKey: ['get_update_history_tax'],
        queryFn: async () => await handleTaxUpateHistory()
    })

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "id", headerName: 'Update Id' },
        { field: "date", headerName: 'Date and Time' },
        { field: "high_tax_amt", headerName: 'High Tax' },
        { field: "low_tax_amt", headerName: 'Low Tax' },
    ]);

    // Apply settings across all columns
    const defaultColDef = useMemo(() => {
        return {
            filter: true,
            editable: false,
        };
    }, []);



    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setTaxValue({
            ...taxValue,
            [name]: value
        })
    }

    const { isLoading: curTaxFetching, isError } = useQuery({
        queryKey: ['get_current_tax'],
        queryFn: async () => {
            const taxData = await handleGetTaxValue();
            if (taxData) {
                setTaxValue({
                    ...taxValue,
                    high_tax: taxData.data.high_tax_amt,
                    low_tax: taxData.data.low_tax_amt
                })
            }
            return taxData
        }
    })










    return (
        <>
            <Layout>
                {
                    curTaxFetching ? (
                        <Loading />
                    ) : (
                        <>

                            <div className="pb-14 w-full px-4 sm:px-6 lg:px-0">
                                <div className="w-full">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                                        <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                                            Global Taxes
                                        </h3>
                                        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
                                            <button className="px-4 sm:px-5 2xl:py-1.5 xl:py-1.5 lg:py-1.5 md:portrait:py-1.5 md:landscape:py-1.5 py-3 rounded-full bg-[var(--button-color5)] flex justify-center items-center gap-2 sm:gap-4 text-white mainFont font-[500] cursor-pointer text-sm md:text-sm lg:text-[1dvw] hover:bg-[#F8A61B] transition-all duration-300 ease-linear">
                                                Import CSV <PluseIcon />
                                            </button>


                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-5 w-full my-8'>
                                    <div className='w-full border border-(--border-color) bg-(--secondary-color) p-3 rounded-md'>
                                        <h2 className='text-[1.3dvw] font-semibold underline underline-offset-4'>Current Tax percent</h2>

                                        <div className='my-5 flex w-full justify-center items-center gap-5 px-5'>
                                            <div className='flex justify-center items-center gap-5 w-full'>
                                                <label className='text-[1.2dvw] shrink-0 text-(--button-color2) font-medium mainFont'>
                                                    Hight Tax  :-
                                                </label>
                                                <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3 appearance-none" type='number' onChange={handleOnchange} name='high_tax' value={taxValue.high_tax} placeholder='5' />
                                            </div>
                                            <div className='flex justify-center items-center gap-5 w-full'>
                                                <label className='text-[1.2dvw] shrink-0 text-(--button-color2) font-medium mainFont'>
                                                    Low Tax  :-
                                                </label>
                                                <input className="bg-[#F3F3F3] w-full font-semibold font-[var(--paraFont)] placeholder:text-[#333333]/40 text-sm sm:text-base lg:text-[1.1dvw] border border-[#d4d4d4] active:outline transition-all duration-300 ease-linear active:outline-[var(--button-color1)] focus:outline focus:outline-[var(--button-color1)] rounded-full py-2 px-3 appearance-none" type='number' placeholder='5' onChange={handleOnchange} name='low_tax' value={taxValue.low_tax} />
                                            </div>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                setIsLoading(true)
                                                const data = await handleUpdateTax({ taxValue })
                                                if (data) {
                                                    setIsLoading(false);
                                                    toast.success(data.message);
                                                    queryClient.invalidateQueries({
                                                        queryKey: ["get_update_history_tax"],
                                                    })

                                                } else {
                                                    toast.error('Failed to update tax !');
                                                    setIsLoading(false)
                                                }
                                            }}
                                            className="w-full py-3 sm:py-4 lg:py-4 disabled:opacity-70 disabled:pointer-events-none disabled:cursor-not-allowed bg-[var(--button-color1)] text-white mainFont font-[600] rounded-xl cursor-pointer text-sm sm:text-base">
                                            {
                                                isLoading ? 'Updating....' : 'Update Tax'
                                            }
                                        </button>
                                    </div>
                                    <div className='w-full p-2'>
                                        <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-x-scroll overflow-y-auto lg:overflow-visible">
                                            <div className="min-w-[800px] lg:min-w-0 h-full">
                                                <AgGridReact
                                                    rowData={rowData}
                                                    columnDefs={colDefs}
                                                    defaultColDef={defaultColDef}
                                                    pagination={true}
                                                    rowSelection={rowSelection}
                                                    onSelectionChanged={(event) => console.log("Row Selected!")}
                                                    onCellValueChanged={(event) =>
                                                        console.log(`New Cell Value: ${event.value}`)
                                                    }
                                                    className="w-full h-full text-sm lg:text-base"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </Layout>
        </>
    )
}

export default Taxes