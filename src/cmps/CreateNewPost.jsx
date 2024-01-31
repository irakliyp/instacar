import {useEffect, useRef, useState} from "react";
import UploadImage from "../assets/upload.svg"
import {uploadService} from "../services/upload.service.js";
import { HiOutlineArrowLeft } from "react-icons/hi";
import {useSelector} from "react-redux";
import {addStory} from "../store/actions/stories.actions.js";


export function CreateNewPost({toggleNewPostModal}) {
    const modalRef = useRef();
    const hiddenFileInput = useRef(null);
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    });
    const user = useSelector(storeState => storeState.usersModule.user);
    const {fullname, username, password, isAdmin, id, imgUrl: userImage} = user;
    const [desc, setDesc] = useState('');

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside)
        }, 0)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [])

    function handleClickOutside(ev) {
        if (modalRef.current && !modalRef.current.contains(ev.target)) {
            toggleNewPostModal()
        }
    }

    const handleClick = event => {
        hiddenFileInput.current.click();    // ADDED
    };

    async function uploadImg(ev) {
        const { secure_url, height, width } = await uploadService.uploadImg(ev);
        setImgData({ imgUrl: secure_url, width, height });
    }

    function onShare() {
        const story = {
            txt: desc,
            imgUrl: [imgData.imgUrl],
            by: {
                "fullname": fullname,
                "username": username,
                "password": password,
                "isAdmin": isAdmin,
                "imgUrl": userImage,
                "id": id
            },
            loc: {},
            comments: [],
            likedBy: [],
            tags: []
        }
        addStory(story);
        toggleNewPostModal();
    }

    return <section className="new-post-modal" ref={modalRef}>
        <section className="new-post-container">
            {!imgData.imgUrl ? <>
                <header className="new-post-header">Create new post</header>
                <section className="new-post-file-container">
                    <img src={UploadImage}/>
                    <div>Drag photos and videos here</div>
                    <button className="new-post-upload-button" onClick={handleClick}>Select from computer
                    </button>
                    <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" ref={hiddenFileInput} style={{ display: 'none' }}/>
                </section>
            </>
                :
                <>
                <div className="header-file-selected">
                    <div className="nav-icon">
                        <HiOutlineArrowLeft/>
                    </div>
                    <div>Create new post</div>
                    <button className="header-file-selected-button" onClick={onShare}>Share</button>
                </div>
                    <section className="new-post-share-container">
                        <div className="img-container">
                            <img src={imgData.imgUrl}/>
                        </div>
                        <section className="desc-container">
                            <div className="user-details padding">
                                <img className="user-icon" src={userImage}/>
                                <span className="user-name bold">{fullname}</span>
                            </div>
                            <textarea value={desc} onChange={(event) => setDesc(event.target.value)} placeholder="Write a caption...">
                            </textarea>
                            <div className="word-length">{desc.length}/2200</div>
                        </section>
                    </section>
                </>
            }
        </section>
    </section>
}
