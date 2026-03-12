import React, { useMemo, useState } from 'react'
import Layout from '../../../components/common/Layout/Layout'
import { DeleteIcon } from 'lucide-react'
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import moment from 'moment';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLowSrockData, getTopSellingItems } from '../../../utils/apis/handleReports';
import { Loading } from '../../../components/UI/Loading/Loading';
import PaginationTest from '../../../components/common/PaginationTest/PaginationTest';

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
    mode: "none",
    headerCheckbox: false,
};

export const TopSellinglist = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(100)
    const [totalData, setTotalData] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [refetching, setRefetching] = useState(false)
    const queryClient = useQueryClient();


    const { data: rowData, isLoading: lowStockLoading, isError, } = useQuery({
        queryKey: ['get_top_selling_items'],
        queryFn: async () => {
            const { page, limit, total_records, total_pages, results } = await getTopSellingItems({
                page: currentPage,
                limit: pageLimit
            });
            if (results) {
                setCurrentPage(page);
                setPageLimit(limit);
                setTotalData(total_records)
                setTotalPages(total_pages)
                return results
            }
            return []
        },
        refetchInterval: 3000,
        placeholderData: (prev) => prev,
    });




    const handlePageChange = (newPage) => {
        // Prefetch the page after the one we're going to
        setRefetching(true)
        queryClient.prefetchQuery({
            queryKey: ["get_top_selling_list", newPage + 1],
            queryFn: async () => await getTopSellingItems({ page: newPage + 1, limit: pageLimit }),
        });
        setCurrentPage(newPage);
        setRefetching(false)

    };


    const checkStatus = (status) => {
        switch (status) {
            case "active":
                return {
                    forDot: "bg-blue-500",
                    forText: "text-blue-500",
                };

            case "inactive":
                return {
                    forDot: "bg-green-500",
                    forText: "text-green-500",
                };

            case "HOLD":
                return {
                    forDot: "bg-yellow-500",
                    forText: "text-yellow-500",
                };

            case "CANCELLED":
                return {
                    forDot: "bg-red-500",
                    forText: "text-red-500",
                };


            default:
                break;
        }
    };


    // Column Definitions: Defines & controls grid columns.
    const [colDefs,] = useState([
        {
            field: 'product_sku',
            headerName: 'Product SKU'
        },
        {
            field: 'name',
            headerName: 'Product Name'
        },
        {
            field: "category_name",
            headerName: "Category Name",

        },
        { field: "product_size", headerName: "Product Size" },
        { field: "product_rank", headerName: "Product Rank" },
        {
            field: "product_price", headerName: "Product Price", cellRenderer: (amount) => {
                return `$ ${amount.value.toFixed(2)}`;
            },
        },
        {
            field: "product_latest_cost", headerName: "Product Cost", cellRenderer: (amount) => {
                return amount.value ? `$ ${amount.value.toFixed(2)}` : '$ 00';
            },
        },
        { field: "qty_on_hand", headerName: "In Stock" },
        { field: "tax_percentage", headerName: "Tax" },
        { field: "supplier_name", headerName: "Supplier Name" },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     cellRenderer: (status) => {
        //         return (
        //             <>
        //                 <div className=" px-3 flex justify-center items-center w-auto gap-3">
        //                     <div
        //                         className={`h-[.8dvw] w-[.8dvw] rounded-full ${checkStatus(status.value).forDot}`}
        //                     ></div>
        //                     <p
        //                         className={`font-medium ${checkStatus(status.value).forText} text-[1.2dvw]`}
        //                     >
        //                         {status.value}
        //                     </p>
        //                 </div>
        //             </>
        //         );
        //     },
        // },

    ]);

    // Apply settings across all columns
    const defaultColDef = useMemo(() => {
        return {
            filter: true,
            editable: false,
        };
    }, []);
    return (
        <>
            <Layout>
                <div className="pb-14 w-full px-4 sm:px-6 lg:px-0 h-[calc(100vh-5rem)]">
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-0">
                            <h3 className="text-2xl sm:text-3xl lg:text-[1.4dvw] font-semibold text-[var(--mainText-color)]">
                                Top Selling  products
                            </h3>

                        </div>
                    </div>



                    <div className="w-full flex-col flex gap-2 my-5 bg-[var(--primary-color)] rounded-md border border-[#d4d4d4] px-2.5 py-2 h-[80dvh]">
                        <div className="h-full w-full overflow-x-scroll overflow-y-auto">
                            <div className="min-w-[800px] h-full">
                                <AgGridReact
                                    rowData={rowData}
                                    columnDefs={colDefs}
                                    // loading={loading}
                                    defaultColDef={defaultColDef}
                                    pagination={false}
                                    rowSelection={rowSelection}
                                    onSelectionChanged={(event) => console.log("Row Selected!")}
                                    loading={refetching}
                                    onCellValueChanged={(event) =>
                                        console.log(`New Cell Value: ${event.value}`)
                                    }
                                    className="w-full h-full text-sm"
                                />
                            </div>
                        </div>
                        <PaginationTest
                            page={currentPage}
                            limit={pageLimit}
                            total_records={totalData}
                            total_pages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}
