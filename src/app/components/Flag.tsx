export default function Flag(props: { 
    emoji: string | undefined
}) {
    return (
        <p className="text-9xl m-4">{props.emoji}</p>
    )
}