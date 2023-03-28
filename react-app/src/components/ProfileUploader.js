import React, { useRef, useState } from "react";



const UploadProfilePicture = ({ setImg }) => {
    const [imageLoading, setImageLoading] = useState(false);
    const formRef = useRef(null);

    const updateImage = async (e) => {

        if (e.target.files[0]) {
            e.preventDefault();
            const formData = new FormData();
            formData.append("image", e.target.files[0]);

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
                console.log(res)
                console.log("error");
            }
        }
    }

    return (
        <form className=" absolute top-7 left-7" ref={formRef} id="imageForm">
            <div className="image-upload flex">

                <label htmlFor="file-inputs" className="h-10 flex justify-center items-center rounded-full" style={{ backgroundColor: 'rgba(0 0 0 / .5)' }}>

                    <svg className="cursor-pointer" fill="white" height="24" viewBox="0 96 960 960" width="40"><path d="M768.667 406.666v-84h-84V256h84v-84.667h66.666V256H920v66.666h-84.667v84h-66.666ZM102.666 976q-27 0-46.833-19.833T36 909.334V407.333q0-26.333 19.833-46.5 19.833-20.166 46.833-20.166h140.001L316 256h266.667v66.666H346.333l-73 84.667H102.666v502.001h666.668V509.333H836v400.001q0 27-20.167 46.833Q795.667 976 769.334 976H102.666Zm333.001-144q73.333 0 123.499-50.167 50.167-50.166 50.167-123.5 0-73.333-50.167-123.166Q509 485.334 435.667 485.334q-73.334 0-123.167 49.833t-49.833 123.166q0 73.334 49.833 123.5Q362.333 832 435.667 832Zm0-66.666q-45.667 0-76.001-30.667-30.333-30.667-30.333-76.334 0-45.666 30.333-76Q390 552 435.667 552q45.666 0 76.333 30.333 30.667 30.334 30.667 76 0 45.667-30.667 76.334t-76.333 30.667ZM436 658.667Z" /></svg>

                </label>
                <input
                    className='file'
                    id='file-inputs'
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />

            </div>
        </form>
    )
}

export default UploadProfilePicture;
