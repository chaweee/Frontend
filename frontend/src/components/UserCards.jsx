const UserCards = ({ users }) => {
  return (
    <>
      <section className="container mx-auto px-4 py-2 bg-purple-300 rounded-lg shadow-md">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Password: {user.password}</h3>
          </div>
        ))}
      </section>
    </>
  );
};

export default UserCards;
