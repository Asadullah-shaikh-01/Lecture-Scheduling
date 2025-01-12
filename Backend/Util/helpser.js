import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword; // Return the hashed password
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed"); // Throw error to be handled by the calling function
  }
};


export const comparePassword = async (Passsword,hashedPassword) => {
  return bcrypt.compare(Passsword,hashedPassword)
}





