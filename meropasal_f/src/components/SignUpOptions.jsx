
const SignUpOptions = () => {
  return (
    <>
      <div className="signupoptions">
        <h2>Select an option</h2>
        <div className="signoptions-container">

          <div className="signupoptions-card">
            <p>I am just looking to buy.</p>
            <a href="signup/user">Signup as a User</a>
          </div>
          
          <div className="signupoptions-card">
            <p>I am looking to buy and sell.</p>
            <a href="signup/seller">Signup as a Seller</a>
          </div>

        </div>
      </div>
    </>
  )
}

export default SignUpOptions