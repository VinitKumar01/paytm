interface Props {
    value: string,
    type: "submit",
    disabled: boolean 
}

export default function Button({value, type, disabled}: Props) {
    return (
        <div className="text-white bg-black flex justify-center rounded-md p-2.5 my-3">
            <button type={type} disabled={disabled}>{value}</button>
        </div>
    )
}