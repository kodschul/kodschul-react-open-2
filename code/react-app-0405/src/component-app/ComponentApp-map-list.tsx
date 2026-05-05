type UserProfileProps = {
  name: string;
  bio: string;
};

function UserProfile(props: UserProfileProps) {
  const isSmith = props.name == "John Smith";
  return (
    <div>
      {isSmith ? <h4>John Smith</h4> : <h1>{props.name}</h1>}
      <p>{props.bio}</p>
    </div>
  );
}

function ComponentApp() {
  const users: UserProfileProps[] = [
    { name: "Eva Smith", bio: "Great!" },
    { name: "John Smith", bio: "Great John!" },
    { name: "Max Smith", bio: "Great Eva!" },
    { name: "Marta Smith", bio: "Great Eva!" },
    { name: "Max Rick", bio: "Great Eva!" },
    { name: "Schanchez Moritz", bio: "Great Eva!" },
    { name: "Morty Smith", bio: "Great Eva!" },
  ];
  return (
    <div>
      ComponentApp
      {/* {users.map(renderUserProfile)} */}
      {users.map((user) => (
        <UserProfile key={user.name} name={user.name} bio={user.bio} />
      ))}
      {/* <UserProfile name={users[0].name} bio="Great!" />
      <UserProfile name="John Smith" bio="Great John!" />
      <UserProfile name="Max Smith" bio="Great Eva!" /> */}
    </div>
  );
}

export default ComponentApp;
