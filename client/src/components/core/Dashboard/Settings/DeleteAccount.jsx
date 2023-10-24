import { AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteAccount } from "../../../../services/operations/profileAPI"

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function handleAccountDeletion() {
    await deleteAccount(token, dispatch, navigate)
  }
  return (
    <div className="flex flex-row gap-x-5 my-10  rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <AiOutlineDelete size={28} />
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-richblack-5">Delete Account</p>
        <div className="w-3/5 text-pink-25">
          <p>Would you like to delete account?</p>
          <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
          <br />
          <p className="italic">You will be logged out, and your account will be completely removed in 10 days. Logging in again will cancel the deletion process.</p>
          <p className="w-fit cursor-pointer italic text-pink-300 transition-all duration-200 ease-linear hover:scale-110"
            onClick={handleAccountDeletion}
          >I want to delete my account</p>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount