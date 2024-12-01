import { Link } from "react-router-dom";
import { SquareBtn } from "../../Buttons";
import { UserSpecific } from "../../../types";

interface ProfileCardCompProps {
  user: UserSpecific;
}

export function ProfileCard({ user }: ProfileCardCompProps): JSX.Element {
  return (
    <div className="bg-comp-purple p-6 rounded-lg shadow-md w-full h-fit xl:sticky xl:top-20">
      {user.venueManager && (
        <div className="flex items-center justify-center">
          <span className="text-md bg-white text-primary-blue font-semibold w-full text-center px-3 py-2 rounded-full">Registered Venue Manager</span>
        </div>
      )}
      <div className="flex my-4 gap-4 items-center">
        <div>
          <img src={user.avatar.url} alt="User avatar" className="w-20 h-20 max-w-20 max-h-20 rounded-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{user.name}</p>
          <p className="italic">{user.bio}</p>
          <p>Registered contact info: {user.email}</p>
        </div>
      </div>
      <Link to={`/user/${user.name}/settings`}>
        <SquareBtn innerText="my settings" width="full" tail="lowercase" bgColor="transparent" textColor="primary-purple" />
      </Link>
    </div>
  );
}
