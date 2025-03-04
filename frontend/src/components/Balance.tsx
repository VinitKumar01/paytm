interface Props {
    amount: number,
    currency: "Rs" | "Usd"
}

export default function Balance({
    amount,
    currency
}: Props) {
    return (
        <div className="p-6 font-bold">
            Your Balance is {currency} {amount.toLocaleString()}
        </div>
    )
}