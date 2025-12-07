# Render Environment Variables Setup

## 🔐 Your JWT_SECRET
```
0a778ec25b89d963a9004ccde7147e17
```

## 📋 Complete Environment Variables for Render

Add these to your Render backend service:

```
PORT=10000
NODE_ENV=production
JWT_SECRET=0a778ec25b89d963a9004ccde7147e17
MONGODB_URI=mongodb+srv://developer:1%40ridhan%40%401@developer.zukx5v2.mongodb.net/developer_directory?retryWrites=true&w=majority
FRONTEND_URL=https://warm-gumption-44bfd7.netlify.app
```

---

## 🚀 How to Add to Render

### Step 1: Go to Render Dashboard
1. Open https://render.com
2. Select your backend service (`developer-directory-api`)
3. Click **Settings**

### Step 2: Add Environment Variables
1. Click **Environment** tab
2. For each variable, click **Add Environment Variable**:

| Key | Value |
|-----|-------|
| PORT | 10000 |
| NODE_ENV | production |
| JWT_SECRET | 0a778ec25b89d963a9004ccde7147e17 |
| MONGODB_URI | mongodb+srv://developer:1%40ridhan%40%401@developer.zukx5v2.mongodb.net/developer_directory?retryWrites=true&w=majority |
| FRONTEND_URL | https://warm-gumption-44bfd7.netlify.app |

### Step 3: Save & Redeploy
1. Click **Save**
2. Render will automatically redeploy
3. Wait for deployment to complete

---

## ✅ Verify Setup

After redeploy:
1. Check logs show: `✅ MongoDB connected successfully`
2. Go to https://warm-gumption-44bfd7.netlify.app
3. Try signup
4. Should work now! 🎉

---

## 📝 Notes

- `.env` files are not committed to GitHub (security)
- Environment variables must be set in Render dashboard
- JWT_SECRET is used to sign authentication tokens
- Keep JWT_SECRET secret and secure

---

**Your app is now ready!** 🚀
