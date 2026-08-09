
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';
import generateToken from '../utils/generateToken.js';
import { getCurrentInviteCode } from '../utils/getInviteCode.js';


// @desc    Register a new admin
// @route   POST /api/auth/register
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, inviteCode } = req.body;

    // 1. Check current invite code
    const currentCode = await getCurrentInviteCode();

    if (inviteCode !== currentCode) {
      return res.status(403).json({
        message: 'Invalid invite code. Registration is restricted.',
      });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address.',
      });
    }

    // 3. Check if admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        message: 'Admin already exists',
      });
    }

    // 4. First admin becomes super-admin
    // All subsequent admins are regular admins
    const adminCount = await Admin.countDocuments();

    const assignedRole = adminCount === 0
      ? 'super-admin'
      : 'admin';

    // 5. Create admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: assignedRole,
    });

    // 6. Return admin information and token
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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

    res.status(401).json({
      message: 'Invalid email or password',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// @desc    Get logged-in admin profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.admin);
};


// @desc    Logout
// @route   POST /api/auth/logout
export const logoutAdmin = async (req, res) => {
  res.json({
    message: 'Logged out successfully',
  });
};


// @desc    Update admin profile
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found',
      });
    }

    res.json(admin);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// @desc    Change admin password
// @route   PUT /api/auth/password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found',
      });
    }

    const isMatch = await admin.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Current password is incorrect',
      });
    }

    admin.password = newPassword;

    // Admin schema pre-save hook should hash the password
    await admin.save();

    res.json({
      message: 'Password updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// @desc    Get current invite code
// @route   GET /api/auth/invite-code
export const getInviteCode = async (req, res) => {
  try {
    // Only super-admin can view the invite code
    if (req.admin.role !== 'super-admin') {
      return res.status(403).json({
        message: 'Only super-admins can view the invite code',
      });
    }

    const inviteCode = await getCurrentInviteCode();

    res.json({
      inviteCode,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// @desc    Regenerate / set a new invite code
// @route   PUT /api/auth/invite-code
export const updateInviteCode = async (req, res) => {
  try {
    // Only super-admin can change the invite code
    if (req.admin.role !== 'super-admin') {
      return res.status(403).json({
        message: 'Only super-admins can change the invite code',
      });
    }

    const { inviteCode } = req.body;

    if (!inviteCode || inviteCode.trim().length < 6) {
      return res.status(400).json({
        message: 'Invite code must be at least 6 characters',
      });
    }

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        inviteCode: inviteCode.trim(),
      });
    } else {
      settings.inviteCode = inviteCode.trim();
      await settings.save();
    }

    res.json({
      inviteCode: settings.inviteCode,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

