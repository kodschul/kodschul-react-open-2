export type IUserProfile = {
  name: string;
  bio: string;
};

export interface UserProfileProps extends IUserProfile {
  onClick: () => void;
}

function UserProfile(props: UserProfileProps) {
  return (
    <div className="tesr" onClick={props.onClick}>
      <h1>{props.name}</h1>
      <p>{props.bio}</p>
    </div>
  );
}

export default UserProfile;
