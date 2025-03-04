interface Props {
    label: string,
    customStyles?: string
}

export default function Heading({label, customStyles} : Props) {
    return (
        <div className={"text-4xl font-bold pt-6 " + customStyles} >
            {label}
        </div>
    )
}