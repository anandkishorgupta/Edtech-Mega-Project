import { useRef, useState } from "react"
import { AiOutlineCloudUpload } from "react-icons/ai"
const Upload = ({ name, label, register, setValue, errors, video = false, viewData = null, editData = null }) => {
    const [uploaded, setUploaded] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const fileInputRef = useRef(null)
    function handleClick() {
        fileInputRef.current.click()
    }
    function handleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setUploaded(true)
            previewFile(file)


        }
    }
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onload = function () {
            setPreviewSource(reader.result);
        };
        // Read the image as a data URL
        reader.readAsDataURL(file);
    };
    return (
        <div>
            {
                !uploaded &&
                <div className="cursor-pointer">
                    <input type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        hidden
                    />
                    <div
                        onClick={handleClick}
                    >
                        <AiOutlineCloudUpload />
                        <p>Drag and drop an image, or</p>
                        <p>click to <span> Browse</span>a file</p>
                        <ul className="flex justify-evenly">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                </div>
            }
            {
                uploaded &&
                <div className="flex flex-col">
                    <img src={previewSource} alt="" />
                    <div onClick={()=>setUploaded(false)}>
                        cancel
                    </div>
                </div>
            }


        </div>
    )
}

export default Upload