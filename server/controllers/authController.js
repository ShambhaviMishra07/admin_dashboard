import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new admin (used once to seed, or by super-admin)
// @route   POST /api/auth/register
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ name, email, password, role });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get logged-in admin profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.admin);
};

// @desc    Logout (client just deletes token; endpoint kept for symmetry / future blacklist)
// @route   POST /api/auth/logout
export const logoutAdmin = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// @desc    Update admin profile (name)
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Change admin password
// @route   PUT /api/auth/password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword; // pre-save hook hashes it
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};