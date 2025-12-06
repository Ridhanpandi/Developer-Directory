# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Sign Up** (or Sign In if you have account)
3. Create account with email/password or Google
4. Verify email

---

## Step 2: Create a Cluster

1. Click **Create** on the dashboard
2. Choose **Free** tier (M0)
3. Select your region (closest to you)
4. Click **Create Cluster**
5. Wait 2-3 minutes for cluster to be created

---

## Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Enter username: `developer`
5. Enter password: (create strong password, save it!)
6. Click **Add User**

---

## Step 4: Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
4. Click **Confirm**

---

## Step 5: Get Connection String

1. Go to **Databases** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Drivers**
4. Select **Node.js** and version **4.x or later**
5. Copy the connection string

It looks like:
```
mongodb+srv://developer:PASSWORD@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

---

## Step 6: Update .env File

Edit `server/.env` and replace:

```
MONGODB_URI=mongodb+srv://developer:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/developer_directory?retryWrites=true&w=majority
```

Replace:
- `YOUR_PASSWORD` - Password you created for database user
- `cluster0.xxxxx` - Your cluster name (from connection string)

---

## Step 7: Install Dependencies

```powershell
npm install
```

---

## Step 8: Start Application

```powershell
# Terminal 1: Backend
npm start

# Terminal 2: Frontend
cd client
npm start
```

---

## Verify Connection

1. Open http://localhost:3000
2. Try to signup
3. Check MongoDB Atlas dashboard
4. Go to **Collections** → You should see `users` and `developers` collections created

---

## Troubleshooting

### "Authentication failed"
- Check username and password in MONGODB_URI
- Verify database user was created
- Check IP address is whitelisted

### "Connection timeout"
- Check internet connection
- Verify IP address is allowed
- Check MONGODB_URI format

### "Database not found"
- Collections are created automatically on first write
- Try adding a developer after signup

### "Cannot connect"
- Verify MONGODB_URI in .env
- Check MongoDB Atlas cluster is running
- Restart backend: `npm start`

---

## MongoDB Atlas Dashboard

Once connected, you can view data:

1. Go to **Databases** → **Collections**
2. Click on `developer_directory` database
3. View `users` and `developers` collections
4. Click on documents to see data

---

## Next Steps

1. Create MongoDB Atlas account
2. Create cluster and database user
3. Get connection string
4. Update `server/.env`
5. Run `npm install`
6. Start backend and frontend
7. Test signup and add developers

**Let me know when you've set up MongoDB Atlas!** 🚀
