interface Props {
    label: string,
    placeholder?: string,
    type: "text" | "password" | "email",
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
    label,
    placeholder,
    type,
    onChange,
    ...props
} : Props) {
    return (
        <div className="my-2">
        <div className="font-bold mb-2">
            {label}
        </div>
        <div>
            <input className="border border-slate-200 p-1.5 rounded-sm w-full" {...props} placeholder={placeholder ? placeholder : ""} type={type} autoComplete={type == "password"? "current-password" : ""} onChange={onChange}/>
        </div>
        </div>
    )
}