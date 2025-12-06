const express = require('express');
const Developer = require('../models/Developer');
const authMiddleware = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// Get all developers with filters, search, and sorting
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { role, search, sortBy = 'experience', sortOrder = 'asc', page = 1, limit = 12 } = req.query;
    
    let query = {};

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Search by name or tech stack
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tech_stack: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    const validSortFields = ['experience', 'name', 'joining_date'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'experience';
    const order = sortOrder.toLowerCase() === 'desc' ? -1 : 1;
    const sortObj = { [sortField]: order };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const developers = await Developer.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Developer.countDocuments(query);

    res.json({
      success: true,
      data: developers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get developers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch developers' });
  }
});

// Get single developer profile
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const developer = await Developer.findById(id);
    
    if (!developer) {
      return res.status(404).json({ success: false, message: 'Developer not found' });
    }

    res.json({ success: true, data: developer });
  } catch (error) {
    console.error('Get developer error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch developer' });
  }
});

// Create developer
router.post('/', authMiddleware, validate(schemas.developer), async (req, res) => {
  try {
    const { name, role, techStack, experience, description, photoUrl } = req.validatedData;
    const userId = req.user.id;

    const developer = new Developer({
      user_id: userId,
      name,
      role,
      tech_stack: techStack,
      experience,
      description: description || null,
      photo_url: photoUrl || null
    });

    await developer.save();

    res.status(201).json({
      success: true,
      message: 'Developer added successfully',
      data: developer
    });
  } catch (error) {
    console.error('Create developer error:', error);
    res.status(500).json({ success: false, message: 'Failed to add developer' });
  }
});

// Update developer
router.put('/:id', authMiddleware, validate(schemas.developer), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, techStack, experience, description, photoUrl } = req.validatedData;
    const userId = req.user.id;

    // Check ownership
    const developer = await Developer.findById(id);
    if (!developer) {
      return res.status(404).json({ success: false, message: 'Developer not found' });
    }

    if (developer.user_id.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Update developer
    developer.name = name;
    developer.role = role;
    developer.tech_stack = techStack;
    developer.experience = experience;
    developer.description = description || null;
    developer.photo_url = photoUrl || null;
    developer.updated_at = new Date();

    await developer.save();

    res.json({
      success: true,
      message: 'Developer updated successfully',
      data: developer
    });
  } catch (error) {
    console.error('Update developer error:', error);
    res.status(500).json({ success: false, message: 'Failed to update developer' });
  }
});

// Delete developer
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check ownership
    const developer = await Developer.findById(id);
    if (!developer) {
      return res.status(404).json({ success: false, message: 'Developer not found' });
    }

    if (developer.user_id.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await Developer.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Developer deleted successfully'
    });
  } catch (error) {
    console.error('Delete developer error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete developer' });
  }
});

module.exports = router;
