
import { Header } from "@/components/Header";
import { UserProfile } from "@/components/profile/UserProfile";

export function ProfilePage() {
  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-wanted text-western-accent text-center mb-8">Your Profile</h1>
          <UserProfile />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
