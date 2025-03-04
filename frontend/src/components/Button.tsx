interface Props {
    value: string,
    type: "submit",
    disabled: boolean,
    customStyles?: string
}

export default function Button({value, type, disabled, customStyles}: Props) {
    return (
        <div className={"text-white bg-black flex justify-center rounded-md p-2.5 my-3 cursor-pointer " + customStyles}>
            <button type={type} disabled={disabled}>{value}</button>
        </div>
    )
}