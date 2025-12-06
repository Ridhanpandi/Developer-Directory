# MongoDB Atlas Quick Start

## ⚡ 5-Minute Setup

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up (free)
- Create free cluster (M0)

### 2. Create Database User
- Go to **Database Access**
- Add user: `developer` / `your_password`

### 3. Allow Network Access
- Go to **Network Access**
- Click **Allow Access from Anywhere**

### 4. Get Connection String
- Go to **Databases** → **Connect**
- Choose **Drivers** → **Node.js**
- Copy connection string

### 5. Update .env
Edit `server/.env`:
```
MONGODB_URI=mongodb+srv://developer:PASSWORD@cluster0.xxxxx.mongodb.net/developer_directory?retryWrites=true&w=majority
```

### 6. Start App
```powershell
# Terminal 1
npm start

# Terminal 2
cd client && npm start
```

### 7. Test
- Open http://localhost:3000
- Signup with test account
- Add developers
- Check MongoDB Atlas dashboard

---

## 📋 Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Database user created
- [ ] Network access allowed
- [ ] Connection string copied
- [ ] .env file updated
- [ ] npm install completed
- [ ] Backend started
- [ ] Frontend started
- [ ] Signup tested
- [ ] Data visible in MongoDB Atlas

---

## 🔗 Connection String Format

```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

---

## ✅ Done!

Once you've completed these steps, let me know and I'll start the application!
