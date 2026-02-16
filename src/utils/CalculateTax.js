export const calculateTax = (qty, tax_percentage, CurrentTaxVal) => {
    if (tax_percentage === "High Tax") {
        return qty * CurrentTaxVal?.data?.high_tax_amt;
    } else if (tax_percentage === "Low Tax") {
        return qty * CurrentTaxVal?.data?.low_tax_amt;
    } else if (tax_percentage === "No Tax") {
        return qty * 0;
    }
};

export const tatalTaxAmount = (currentRingups) => {
    return currentRingups?.reduce((sum, item) => sum + item.tax * item.qty, 0);
}