import { useRef, useState } from "react"
import { useSelector } from "react-redux"

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile)
    const fileInputRef = useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const handleClick = () => {
        console.log(fileInputRef.current)
        fileInputRef.current.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }
    // preview the file 
    const previewFile = (file) => {
        const reader = new FileReader();

        reader.onload = function () {
            setPreviewSource(reader.result);
        };

        // Read the image as a data URL
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-row ">
            <div>
                <img
                    src={previewSource || user?.image}
                    alt=""
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <p>Change Profile Picture</p>
                <div>
                    <input type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png,image/gif,image/jpeg"
                    />
                    <button
                        onClick={handleClick}
                        // disabled={loadi}
                        className=" cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >

                        Select
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture