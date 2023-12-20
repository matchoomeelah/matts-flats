// import ReviewTile from "../ReviewDisplay/ReviewTile/ReviewTile";
// import ManageReviewsDisplay from "./ManageReviewsDisplay";

function ManageReviewTile({review}) {
    return (
        <div>
            {/* <ReviewTile review={review} /> */}
            <h2>{review.Spot.name}</h2>
            <h3>{new Date(review.createdAt).toLocaleString('default', {month: 'long'})} {new Date(review.createdAt).getFullYear()} </h3>

            {console.log(review)}
        </div>
    )
}

export default ManageReviewTile;
