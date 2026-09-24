type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Prop = {
  user: User;
};

export const UserInfo = ({ user }: Prop) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
