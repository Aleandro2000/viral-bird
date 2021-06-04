function ShowComments(props) {
    return props.comments.map((item) => {
        return(
            <p className="comment">
                <br/>
                <h4>
                    <b>
                        {item.username}
                    </b>
                </h4>
                <p>
                    {item.comment}
                </p>
                <br/>
            </p>
        );
    });
}

export default ShowComments;