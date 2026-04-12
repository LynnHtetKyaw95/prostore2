import UserProfileForm from "@/app/features/user/UserProfileForm";
import { getUser, getUserById } from "@/lib/actions/userAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const UserProfilePage = async () => {
  const userId = await getUser();
  const currentUser = await getUserById(userId);

  return (
    <>
      <UserProfileForm user={currentUser} />
    </>
  );
};
export default UserProfilePage;
