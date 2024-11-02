import useAuthStore from "../../../stores/useAuthStore";

export default function UserInfo() {
  const { user } = useAuthStore();
  console.log("user", user);

  return (
    <>
      <div className="bg-comp-purple rounded-lg p-4">
        <div className="flex flex-col items-center justify-center rounded bg-white"></div>

        <h1>My Profile</h1>
      </div>
    </>
  );
}
