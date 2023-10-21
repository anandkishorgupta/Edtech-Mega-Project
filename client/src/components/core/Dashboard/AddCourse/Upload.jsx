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

    // initially in courseInformation components where i call upload
    // name="courseImage"
    // label="Course Thumbnail"
    // register={register}
    // errors={errors}
    // setValue={setValue}
    // editData={editCourse ? course?.thumbnail : null}

    const [selectedFile, setSelectedFile] = useState(null);

    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
        // editData contain videoUrl
    );

    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log(file)
        if (file) {
            previewFile(file);
            setSelectedFile(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/*": [".mp4"] },
        onDrop,
    });

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    }

    useEffect(() => {
        register(name, { required: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register]);

    useEffect(() => {
        setValue(name, selectedFile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue]);

    return (
        <div>
            <label htmlFor={label} className="text-richblack-5 text-sm mb-2 block">
                {label}
                <sup className="text-pink-200">*</sup>
            </label>
            <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"
                } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
                {previewSource ? (
                    <div
                        className="p-5  flex justify-center flex-col items-center w-full object-cover"

                    >
                        {!video ? (
                            <img
                                src={previewSource}
                                alt="preview"
                                className="rounded-md object-cover"
                            />
                        ) : (
                            <Player src={previewSource} aspectRatio="16:9"  
                            
                            />
                           
                        )}
                        {!viewData && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewSource(""); //no preview
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                                className="mt-3 text-richblack-400 underline cursor-pointer"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className="flex flex-col items-center w-full"
                    >
                        <label htmlFor={label} className="text-richblack-5 text-sm mb-2 block invisible">
                            {label}
                            <sup className="text-pink-200">*</sup>
                        </label>
                        <input {...getInputProps()} ref={inputRef} id={label} />
                        <div className="bg-richblack-900 rounded-full w-fit p-4 text-yellow-50 text-2xl">
                            <FiUploadCloud />
                        </div>
                        <p className="max-w-[200px] text-sm text-center text-richblack-200">
                            Drag and drop on {!video ? "image" : "video"}, or click to{" "}
                            <span className="font-semibold text-yellow-50">Browse</span>a file
                        </p>
                        <ul className="flex justify-evenly w-full text-xs text-richblack-200 list-disc mt-10">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
            {errors[name] && (
                <span className="addCourseError">{label} is required</span>
            )}
        </div>
    );
};

export default Upload;
