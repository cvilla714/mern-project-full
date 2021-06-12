module.exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: '', password: ''}

  if (err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect or already used";

  if (err.message.includes('email'));
    errors.email = "Email incorrect";

  if (err.message.includes('password'));
    errors.password = "Password incorrect put 6 caracters minum !"

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
    errors.pseudo = "This pseudo is already used !"

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = "This email is already saved !"

  return errors
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}
  if (err.message.includes('email'))
    errors.email = "Email unkwonw";
  if (err.message.includes('password'))
    errors.password = "password does not match"

  return errors

};


module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ''};

  if(err.message.includes('invalid file'));
    errors.format = 'Incompatible format';

  if(err.message.includes('max size'))
    errors.maxSize = 'size more than 5OOko';

  return errors
}