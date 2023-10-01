
const IconBtn = ({ text, onClick, children, disable, outline = false, customClasses, type }) => {
    return (
        <button
            disabled={disable}
            onClick={onClick}
            type={type}
            className={`flex flex-row gap-x-2 ${outline ? "" : "bg-yellow-50 "} text-richblack-900 items-center px-5  py-2 rounded-md text-base `}
        >
            {
                children ? (
                    <>
                        <span>{text}</span>
                        {children}
                    </>
                ) : (
                    text
                )
            }
        </button>
    )
}

export default IconBtn