interface Props {
    label: string,
    placeholder?: string,
    type: "text" | "password" | "email"
}

export default function Input({
    label,
    placeholder,
    type,
    ...props
} : Props) {
    return (
        <div className="my-2">
        <div className="font-bold mb-2">
            {label}
        </div>
        <div>
            <input className="border border-slate-200 p-1.5 rounded-sm" {...props} placeholder={placeholder ? placeholder : ""} type={type} autoComplete={type == "password"? "current-password" : ""} />
        </div>
        </div>
    )
}