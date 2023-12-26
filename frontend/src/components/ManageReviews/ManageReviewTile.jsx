import UpdateDeleteButtons from "./UpdateDeleteButtons";

function ManageReviewTile({review}) {
    return (
        <div className="manage-review-tile">
            <h2>{review.Spot.name}</h2>
            <h3>{new Date(review.createdAt).toLocaleString('default', {month: 'long'})} {new Date(review.createdAt).getFullYear()} </h3>
            <p>{review.review}</p>
            <UpdateDeleteButtons reviewId={review.id} spotId={review.spotId}/>
        </div>
    )
}

export default ManageReviewTile;
