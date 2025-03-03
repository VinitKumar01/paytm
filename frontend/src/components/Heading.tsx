interface Props {
    label: string
}

export default function Heading({label} : Props) {
    return (
        <div className="text-4xl font-bold pt-6 ">
            {label}
        </div>
    )
}