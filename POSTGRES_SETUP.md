# PostgreSQL Setup Guide

## Step 1: Install PostgreSQL

### Windows
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer
3. Choose default settings
4. Remember the password you set for `postgres` user
5. Port should be 5432 (default)

### Mac
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu)
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## Step 2: Create Database

After PostgreSQL is installed, open PowerShell and run:

```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql prompt, create database
CREATE DATABASE developer_directory;

# Exit psql
\q
```

---

## Step 3: Create Tables

Run the schema file:

```powershell
psql -U postgres -d developer_directory -f server/config/schema.sql
```

---

## Step 4: Verify Setup

```powershell
# Connect to database
psql -U postgres -d developer_directory

# List tables
\dt

# Should show:
# - public | developers | table | postgres
# - public | users      | table | postgres

# Exit
\q
```

---

## Step 5: Update .env File

Edit `server/.env` and update DATABASE_URL:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/developer_directory
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

---

## Troubleshooting

### "psql: command not found"
- PostgreSQL not installed or not in PATH
- Restart computer after installation
- Add PostgreSQL to PATH manually

### "password authentication failed"
- Wrong password in DATABASE_URL
- Check password you set during installation
- Reset password: `ALTER USER postgres WITH PASSWORD 'newpassword';`

### "database does not exist"
- Run: `psql -U postgres -c "CREATE DATABASE developer_directory;"`

### "relation does not exist"
- Schema not created
- Run: `psql -U postgres -d developer_directory -f server/config/schema.sql`

---

## Quick Commands

```powershell
# Connect to database
psql -U postgres -d developer_directory

# View all users
SELECT * FROM users;

# View all developers
SELECT * FROM developers;

# Count records
SELECT COUNT(*) FROM developers;

# Exit
\q
```

---

## Next Steps

1. Install PostgreSQL
2. Create database: `CREATE DATABASE developer_directory;`
3. Create tables: `psql -U postgres -d developer_directory -f server/config/schema.sql`
4. Update `server/.env` with correct password
5. Restart backend: Stop and restart `npm start`
6. App should now work!

---

**Need help?** Check TROUBLESHOOTING.md for more issues.
