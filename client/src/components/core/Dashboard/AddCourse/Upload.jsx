import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "video-react";
const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )
    const inputRef = useRef(null)
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            previewFile(file)
            setSelectedFile(file)
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video ? { "image/*": [".jpeg", ".jpg", ".png"] } :
            { "video/*": [".mp4"] }
        , onDrop
    });

    function previewFile(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    useEffect(() => {
        register(name, { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    useEffect(() => {
        setValue(name, selectedFile)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue])

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div>
                {previewSource ? (
                    <div>
                        {!video ? (
                            <img src={previewSource} alt="preview" />
                        ) : (
                            <Player src={previewSource} aspectRatio="16:9" playsInline />
                        )}
                        {!viewData && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewSource(""); //no preview
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                                className="mt-3 text-richblack-400 underline"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ) : (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} ref={inputRef} />
                        <div>
                            <FiUploadCloud />
                        </div>
                        <p>
                            Drag and drop on {!video ? "image" : "video"},
                            or click to {" "}
                            <span>
                                Browse a
                            </span>
                            file
                        </p>
                        <ul>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
            {
                errors.name && (
                    <span>
                        {label} is required
                    </span>
                )
            }
        </div>
    );
};

export default Upload;
