export function CommentBlock(props) {
    return (
        <li>
            <p>{props.userID}</p>
            <p>{props.rating}</p>
            <p>{props.comment}</p>
        </li>
    )
}