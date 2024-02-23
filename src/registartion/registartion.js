





const RegistrationForm = () => {
   
 
  const [users, setUsers] = useState([
    { username: 'user1', password: 'password1', email: 'emailid' },
    { username: 'user2', password: 'password2', email: 'emailid' },
  ]);

  const register = (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('registeremail').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      alert('Invalid email format');
      return false;
    }

    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('password', JSON.stringify(password));

    alert('Registration successful! Now go to the login page.');
    navigate('/Login');

    setUsers([...users, { username, password, email }]);

    return true;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>
      <form id="registerform" onSubmit={register}>
        <input
          type="text"
          id="registerUsername"
          placeholder="Username"
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="password"
          id="registerPassword"
          placeholder="Password"
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <br />
        <input
          type="email"
          id="registeremail"
          placeholder="Email"
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <br />
        <button
          type="submit"
          style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px' }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;