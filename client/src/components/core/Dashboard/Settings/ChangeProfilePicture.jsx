import { useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../common/IconBtn"
const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile)
    const {token}=useSelector((state)=>state.auth)
    const fileInputRef = useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const dispatch=useDispatch()
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
    function handleFileUpload() {
        const formData=new FormData()
        formData.append("displayPicture",imageFile)
        // dispatch(updateDisplayPicture(token,formData))
    }
    return (
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
            <div className="flex flex-row items-center gap-x-4">
                <img
                    src={previewSource || user?.image}
                    alt=""
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="flex flex-col gap-y-2">
                    <p>Change Profile Picture</p>
                    <div className="flex gap-x-3 items-center">
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
                        <IconBtn text={"upload"}
                            onClick={handleFileUpload}>
                            <FiUpload />
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangeProfilePicture