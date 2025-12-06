# Where to Find MongoDB Connection Details

## 🔍 Finding Your Connection String

### Step 1: Go to MongoDB Atlas Dashboard
1. Open https://cloud.mongodb.com
2. Login to your account
3. You'll see your cluster on the dashboard

### Step 2: Click "Connect" Button
1. Find your cluster (usually named "Cluster0")
2. Click the **"Connect"** button next to it

### Step 3: Choose Connection Method
1. A popup will appear with 3 options:
   - **Drivers** ← Click this one
   - Connect with MongoDB Compass
   - Connect with MongoDB Shell

### Step 4: Select Node.js Driver
1. Click **"Drivers"**
2. Select **"Node.js"** from the dropdown
3. Select version **"4.x or later"**

### Step 5: Copy Connection String
You'll see a code block with your connection string:

```
mongodb+srv://developer:PASSWORD@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

---

## 📝 Understanding the Connection String

```
mongodb+srv://developer:PASSWORD@cluster0.xxxxx.mongodb.net/developer_directory?retryWrites=true&w=majority
                 ↑         ↑        ↑                    ↑
              username  password  cluster name      database name
```

### Parts to Replace:

1. **`developer`** - Your database username (you created this)
2. **`PASSWORD`** - Your database password (you created this)
3. **`cluster0.xxxxx`** - Your cluster name (shown in MongoDB Atlas)
4. **`developer_directory`** - Database name (keep as is)

---

## 🎯 Example

If your details are:
- Username: `developer`
- Password: `MySecurePass123`
- Cluster: `cluster0.abcde.mongodb.net`

Your connection string should be:
```
mongodb+srv://developer:MySecurePass123@cluster0.abcde.mongodb.net/developer_directory?retryWrites=true&w=majority
```

---

## 📍 Where to Find Each Part

### Finding Your Cluster Name
1. Go to **Databases** in left sidebar
2. Look at your cluster card
3. The cluster name is shown (usually "Cluster0")
4. Click **"Connect"** to see full cluster URL

### Finding Your Username & Password
1. Go to **Database Access** in left sidebar
2. You'll see your database user listed
3. Username is shown (e.g., "developer")
4. Password is what you created (not shown, only you know it)

### Finding Your Database Name
- Default: `developer_directory`
- Or check in **Databases** → **Collections**

---

## ✅ Step-by-Step to Get Connection String

1. **Login to MongoDB Atlas**
   - https://cloud.mongodb.com

2. **Click on your Cluster**
   - Usually "Cluster0"

3. **Click "Connect" Button**
   - Green button on cluster card

4. **Select "Drivers"**
   - From the popup menu

5. **Choose "Node.js"**
   - From the dropdown

6. **Copy the Connection String**
   - It's in the code block

7. **Replace PASSWORD**
   - Use your database user password

---

## 🔐 Security Note

**NEVER share your connection string!**
- It contains your password
- Keep it secret
- Don't commit to GitHub
- Use .env file (already in .gitignore)

---

## 📸 Visual Guide

```
MongoDB Atlas Dashboard
├── Left Sidebar
│   ├── Database Access ← Find username here
│   ├── Network Access
│   └── Databases ← Click here
│
├── Databases Section
│   ├── Your Cluster (e.g., "Cluster0")
│   └── Connect Button ← Click this
│
└── Connect Popup
    ├── Drivers ← Select this
    ├── Node.js ← Select this
    └── Connection String ← Copy this
```

---

## 🆘 Troubleshooting

### Can't find "Connect" button?
- Make sure you're in the **Databases** section
- Look for your cluster card
- Green "Connect" button should be visible

### Connection string looks different?
- That's okay, as long as it has:
  - `mongodb+srv://`
  - Your username
  - Your password
  - Your cluster name
  - `/developer_directory`

### Forgot your password?
1. Go to **Database Access**
2. Find your user
3. Click the **"..."** menu
4. Click **"Edit Password"**
5. Create new password

---

## 📋 Checklist

- [ ] Logged into MongoDB Atlas
- [ ] Found your cluster
- [ ] Clicked "Connect"
- [ ] Selected "Drivers"
- [ ] Selected "Node.js"
- [ ] Copied connection string
- [ ] Replaced PASSWORD with your password
- [ ] Updated server/.env file
- [ ] Ready to start app

---

## 💡 Quick Example

**Your MongoDB Atlas shows:**
- Cluster: `cluster0.abcde.mongodb.net`
- Username: `developer`
- Password: `MyPass123`

**Your .env should have:**
```
MONGODB_URI=mongodb+srv://developer:MyPass123@cluster0.abcde.mongodb.net/developer_directory?retryWrites=true&w=majority
```

---

**Once you have your connection string, update `server/.env` and let me know!** 🚀
