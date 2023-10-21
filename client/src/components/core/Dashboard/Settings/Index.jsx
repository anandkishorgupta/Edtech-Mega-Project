import ChangeProfilePicture from "./ChangeProfilePicture"
import PasswordUpdate from "./PasswordUpdate"
import UpdateProfileInfo from "./UpdateProfileInfo"

const Settings = () => {
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* change profile picture */}
      <ChangeProfilePicture />
      {/* edit profile */}
      <UpdateProfileInfo />
      {/* password update  */}
      <PasswordUpdate />
      {/* delete account */}

    </div>
  )
}

export default Settings