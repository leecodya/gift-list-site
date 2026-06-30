function User({ user, setSelectedUser }) {
  return (
    <li className="mb-2">
      <button onClick={() => setSelectedUser(user)}>
        {user.name}
      </button>
    </li>
  );
}

export default User;