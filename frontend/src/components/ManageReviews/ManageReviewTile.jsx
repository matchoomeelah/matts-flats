// import ReviewTile from "../ReviewDisplay/ReviewTile/ReviewTile";
// import ManageReviewsDisplay from "./ManageReviewsDisplay";
import UpdateDeleteButtons from "./UpdateDeleteButtons";

function ManageReviewTile({review}) {
    return (
        <div className="manage-review-tile">
            <h2>{review.Spot.name}</h2>
            <h3>{new Date(review.createdAt).toLocaleString('default', {month: 'long'})} {new Date(review.createdAt).getFullYear()} </h3>
            <p>{review.review}</p>
            {console.log(review)}
            <UpdateDeleteButtons reviewId={review.id}/>
        </div>
    )
}

export default ManageReviewTile;
