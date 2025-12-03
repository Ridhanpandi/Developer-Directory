const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'developers.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory and file exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Helper functions
const readDevelopers = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
};

const writeDevelopers = (developers) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(developers, null, 2));
};

// GET /developers - Return list of developers
app.get('/developers', (req, res) => {
  try {
    const developers = readDevelopers();
    res.json({ success: true, data: developers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch developers' });
  }
});

// POST /developers - Save developer details
app.post('/developers', (req, res) => {
  try {
    const { name, role, techStack, experience } = req.body;

    // Validation
    if (!name || !role || !techStack || experience === undefined) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters' });
    }

    const validRoles = ['Frontend', 'Backend', 'Full-Stack'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role selected' });
    }

    if (experience < 0 || experience > 50) {
      return res.status(400).json({ success: false, message: 'Experience must be between 0 and 50 years' });
    }

    const newDeveloper = {
      id: uuidv4(),
      name: name.trim(),
      role,
      techStack: techStack.split(',').map(tech => tech.trim()).filter(Boolean),
      experience: Number(experience),
      createdAt: new Date().toISOString()
    };

    const developers = readDevelopers();
    developers.push(newDeveloper);
    writeDevelopers(developers);

    res.status(201).json({ success: true, data: newDeveloper, message: 'Developer added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add developer' });
  }
});

// DELETE /developers/:id - Delete a developer
app.delete('/developers/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Developer ID is required' });
    }

    const developers = readDevelopers();
    const developerIndex = developers.findIndex(dev => dev.id === id);

    if (developerIndex === -1) {
      return res.status(404).json({ success: false, message: 'Developer not found' });
    }

    const deletedDeveloper = developers.splice(developerIndex, 1);
    writeDevelopers(developers);

    res.json({ success: true, data: deletedDeveloper[0], message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete developer' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
