import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { getUserProjects } from "@/lib/actions";

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const result = (await getUserProjects(id, 100)) as { user: UserProfile };

  if (!result) {
    return <div>Failed to get user info</div>;
  }
  return <ProfilePage user={result?.user} />;
};

export default Profile;
