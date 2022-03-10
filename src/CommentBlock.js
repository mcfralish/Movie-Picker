export function CommentBlock(props) {

    function determineNull() {
        if (props.rating === null) {
            return "No rating given"
        }
        else {
            return (props.rating)
        }
    }

    return (
        <li>
            <p>Title: {props.title}</p>
            <p>Comment: {props.comment}</p>
            <p>Rating: {determineNull()}</p>
        </li>
    );
}

export default CommentBlock;