// forgotPasswordController.js

import mysqlConnection from "../database/db"; // Assuming you have a MySQL connection module

export const generateResetToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [user] = await mysqlConnection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (!user.length) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 3600000); // Token expiration time: 1 hour

    await mysqlConnection.execute(
      'UPDATE users SET resetToken = ?, resetTokenExpiration = ? WHERE email = ?',
      [resetToken, resetTokenExpiration, email]
    );

    req.resetToken = resetToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const [user] = await mysqlConnection.execute(
      'SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiration > NOW()',
      [token]
    );

    if (!user.length) {
      return res.status(401).json({ message: 'Invalid or expired reset token.' });
    }

    await mysqlConnection.execute('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?', [password, user[0].id]);

    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
