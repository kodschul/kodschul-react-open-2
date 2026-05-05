function UserProfile() {
  return (
    <div>
      <h1>John Doe</h1>
      <p>John Doe is an Expert!</p>
    </div>
  );
}

function ComponentApp() {
  return (
    <div>
      ComponentApp
      <UserProfile />
      <UserProfile />
      <UserProfile />
    </div>
  );
}

export default ComponentApp;
