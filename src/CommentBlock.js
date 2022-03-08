export function CommentBlock(props) {
    return (
        <li>
            <p>{props.title}</p>
            <p>{props.rating}</p>
            <p>{props.comment}</p>
        </li>
    )
}