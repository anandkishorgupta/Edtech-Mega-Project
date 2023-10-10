import IconBtn from "./IconBtn"

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 flex justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="flex flex-col gap-y-3 border border-richblack-400 bg-richblack-800
             rounded-xl px-9 py-5 w-[350px]">
                <p className="text-2xl font-semibold">
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>
                <div className="flex gap-x-3 font-semibold">
                    <IconBtn onClick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />   
                    <button onClick={modalData?.btn2Handler} className="text-richblack-900 rounded-md font-semibold bg-richblack-200 px-[20px] py-[8px]">
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal