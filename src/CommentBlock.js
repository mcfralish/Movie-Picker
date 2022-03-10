export function CommentBlock(props) {

    function determineNull(){
        if(props.rating === null){
            return "No rating given"
        }
        else{
            return (props.rating)
        }
    }

    return (
        <li>
            <p>Title: {props.title}</p>
            <p>Rating: {determineNull()}</p>
            <label>New rating</label>
            <p>Comment: {props.comment}</p>
        </li>
    );
}

export default CommentBlock;