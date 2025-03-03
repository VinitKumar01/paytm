interface Props {
    label: string
}

export default function SubHeading({label} : Props) {
    return (
        <div className="text-[18px] text-slate-600 text-wrap text-center">
            {label}
        </div>
    )
}