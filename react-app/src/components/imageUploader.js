import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const UploadPicture = ({ setImg }) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/caws/awsUploader', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            setImageLoading(false);
            setImg(data.url)
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }



    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    return (
        <form id="imageForm" onSubmit={handleSubmit}>
            <div className="image-upload flex">

                <label for="file-input">
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm56-97h489L578 583 446 754l-93-127-117 152Zm-56 97V276v600Z" /></svg>
                </label>
                <input
                    classname='file'
                    id='file-input'
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />
                <button type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>}
            </div>
        </form>
    )
}

export default UploadPicture;
