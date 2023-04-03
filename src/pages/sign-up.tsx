const SignUp = () => {
  return (
    <main className="container">
      <form>
        <h1 className="mt-5">Sign Up</h1>
        <label className="form-label mt-3" htmlFor="username">
          Username
        </label>
        <input className="form-control" type="text" />
        <label className="form-label mt-3" htmlFor="password">
          Password
        </label>
        <input className="form-control" type="text" />
        <button className="btn btn-primary mt-5">Submit</button>
      </form>
    </main>
  );
};

export default SignUp;
