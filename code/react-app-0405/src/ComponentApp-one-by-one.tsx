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
  return (
    <div>
      ComponentApp
      <UserProfile name="Eva Smith" bio="Great!" />
      <UserProfile name="John Smith" bio="Great John!" />
      <UserProfile name="Max Smith" bio="Great Eva!" />
    </div>
  );
}

export default ComponentApp;
