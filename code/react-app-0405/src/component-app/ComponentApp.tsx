import { useState } from "react";
import type { IUserProfile } from "./UserProfile";
import UserProfile from "./UserProfile";

const obj = {
  name: "abc",
  age: 20,
};

const ob2 = obj;

function ComponentApp() {
  const [users, setUsers] = useState<IUserProfile[]>([
    { name: "Eva Smith", bio: '<img src="hack.jpg" />' },
    { name: "John Smith", bio: "Great John!" },
    { name: "Max Smith", bio: "Great Eva!" },
    { name: "Marta Smith", bio: "Great Eva!" },
    { name: "Max Rick", bio: "Great Eva!" },
    { name: "Schanchez Moritz", bio: "Great Eva!" },
    { name: "Morty Smith", bio: "Great Eva!" },
  ]);

  return (
    <div>
      ComponentApp
      {/* {users.map(renderUserProfile)} */}
      {users.map((user) => (
        <UserProfile
          key={user.name}
          name={user.name}
          bio={user.bio}
          onClick={() => {
            // users = users.filter((item) => item.name !== user.name);

            // users.push();

            // console.log(users);

            setUsers([...users, { name: "1NEW_NAME", bio: "NEW_BIO" }]);
          }}
        />
      ))}
      {/* <UserProfile name={users[0].name} bio="Great!" />
      <UserProfile name="John Smith" bio="Great John!" />
      <UserProfile name="Max Smith" bio="Great Eva!" /> */}
    </div>
  );
}

export default ComponentApp;
