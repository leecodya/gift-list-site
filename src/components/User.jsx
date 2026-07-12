function User({ user, setSelectedUser }) {
  return (
    <li className="w-auto md:w-full">
      <button className="w-auto md:w-full" onClick={() => setSelectedUser(user)}>
        {user.name}
      </button>
    </li>
  );
}

export default User;