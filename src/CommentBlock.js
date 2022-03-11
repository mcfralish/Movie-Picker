export function CommentBlock(props) {
    // Determines if a rating is null or not. If it is, it displays that a rating has not been given with this review
    function determineNull() {
        if (props.rating === null) {
            return 'No rating given';
        }
        return '';
    }

    return (
        <div>
            <p>Title: {props.title}</p>
            <p>Comment: {props.comment}</p>
            <p>Your Rating: {determineNull()}</p>
            <input type="number" min="1" max="5" value={props.rating} onChange={props.onRatingChange} />
            <br />
            <button class="trash" onClick={props.onDeleteButton}>Trash</button>
        </div>
    );
}

export default CommentBlock;