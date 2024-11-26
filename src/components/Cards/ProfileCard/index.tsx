import { Link } from "react-router-dom";
import { SquareBtn } from "../../Buttons";

interface Avatar {
  url: string;
}

interface User {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  venueManager?: boolean;
}

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-comp-purple p-6 rounded-lg shadow-md w-full h-fit xl:sticky xl:top-20">
      {user.venueManager && (
        <div className="flex items-center justify-center">
          <span className="text-md bg-white text-primary-blue font-semibold w-full text-center px-3 py-2 rounded-full">Registered Venue Manager</span>
        </div>
      )}
      <div className="flex my-4 gap-4 items-center p-4">
        <div>
          <img src={user.avatar.url} alt="User avatar" className="max-w-20 max-h-20 rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{user.name}</p>
          <p>{user.bio}</p>
          <p>Registered contact info: {user.email}</p>
        </div>
      </div>
      <Link to={`/user/${user.name}/settings`}>
        <SquareBtn innerText="my settings" width="full" tailw="lowercase" bgColor="transparent" textColor="primary-purple" />
      </Link>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import { SquareBtn } from "../../Buttons";

// export function ProfileCard({ user }) {
//   return (
//     <div className="bg-comp-purple p-6 rounded-lg shadow-md w-full h-fit xl:sticky xl:top-20">
//       {user.venueManager && (
//         <div className="flex items-center justify-center">
//           <span className="text-md bg-white text-primary-blue font-semibold w-full text-center px-3 py-2 rounded-full">Registered Venue Manager</span>
//         </div>
//       )}
//       <div className="flex my-4 gap-4 items-center p-4">
//         <div>
//           <img src={user.avatar.url} className="max-w-20 max-h-20 rounded-full"></img>
//         </div>
//         <div className="flex flex-col gap-1">
//           <p className="font-semibold">{user.name}</p>
//           <p className="">{user.bio}</p>
//           <p className="">Registered contact info: {user.email}</p>
//         </div>
//       </div>
//       <Link to={`/user/${user.name}/settings`}>
//         <SquareBtn innerText="my settings" width="full" tailw="lowercase" bgColor="transparent" textColor="primary-purple" />
//       </Link>
//     </div>
//   );
// }
