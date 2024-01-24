

export function StoryDetails({story}) {
    const {txt, imgUrl, by, loc, comments, likedBy, tags} = story;
    const {fullname, imgUrl: userImage} = by;

    return <section className="story-details">
        <div>
            <img className="user-icon" src={userImage}/>
            <span>fullname</span>
        </div>
        <img className="story-details-img" src={imgUrl}/>
    </section>
}
