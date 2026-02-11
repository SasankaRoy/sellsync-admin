import { Download } from "lucide-react";

export const InvoiceDownloadBtn = (props) => {
  const { data } = props;
  const invoiceUrl =
    data?.expense_invoice_image || data?.purchase_invoice_image;

  if (!invoiceUrl || invoiceUrl === "N/A") {
    return <span className="text-gray-400 italic text-sm">No File</span>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <a
        href={invoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--button-color5)] hover:text-[#F8A61B] transition-all duration-300"
        title="Download Invoice"
        download
      >
        <Download size={18} />
      </a>
    </div>
  );
};
