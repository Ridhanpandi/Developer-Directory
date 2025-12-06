# Production Setup - Render & Netlify

## 🚀 Backend Configuration (Render)

### Step 1: Update Environment Variables in Render

1. Go to https://render.com
2. Select your backend service
3. Click **Settings** → **Environment**
4. Update these variables:

```
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_key_change_in_production_min_32_chars_abcdefghijklmnop
MONGODB_URI=mongodb+srv://developer:1%40ridhan%40%401@developer.zukx5v2.mongodb.net/developer_directory?retryWrites=true&w=majority
FRONTEND_URL=https://developer-directory.netlify.app
```

5. Click **Save**
6. Service will redeploy automatically

---

## 🎨 Frontend Configuration (Netlify)

### Step 1: Update Environment Variables in Netlify

1. Go to https://app.netlify.com
2. Select your frontend site
3. Go to **Site settings** → **Build & deploy** → **Environment**
4. Add variable:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://developer-directory-api.onrender.com`
5. Click **Save**

### Step 2: Trigger Redeploy

1. Go to **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete

---

## ✅ Verify Configuration

### Test Backend API
```bash
curl https://developer-directory-api.onrender.com/health
```

Should return:
```json
{"success": true, "message": "Server is running"}
```

### Test Frontend
1. Open https://developer-directory.netlify.app
2. Try to signup
3. Check browser console (F12) for errors

---

## 🔧 Common Issues & Fixes

### "Signup Failed" Error

**Cause:** Frontend can't reach backend API

**Fix:**
1. Check `REACT_APP_API_URL` in Netlify environment
2. Verify backend URL is correct
3. Check CORS in backend (FRONTEND_URL should match)
4. Redeploy both services

### CORS Error

**Cause:** Backend CORS not configured for frontend domain

**Fix in Render:**
1. Update `FRONTEND_URL` to your Netlify URL
2. Redeploy backend

### MongoDB Connection Error

**Cause:** MongoDB URI incorrect or network access not allowed

**Fix:**
1. Verify `MONGODB_URI` in Render environment
2. Check MongoDB Atlas network access allows Render IP
3. Go to MongoDB Atlas → Network Access → Allow from anywhere

---

## 📋 Your URLs

- **Backend:** https://developer-directory-api.onrender.com
- **Frontend:** https://developer-directory.netlify.app
- **MongoDB:** MongoDB Atlas (cloud)

---

## 🎯 Deployment Checklist

- [ ] Backend environment variables set in Render
- [ ] Frontend environment variables set in Netlify
- [ ] Backend redeployed
- [ ] Frontend redeployed
- [ ] Backend API responds to /health
- [ ] Frontend loads without errors
- [ ] Signup works
- [ ] Login works
- [ ] Can add developers
- [ ] Can view developers

---

## 📞 Support

If signup still fails:
1. Open browser console (F12)
2. Look for error messages
3. Check Network tab for API requests
4. Verify all environment variables are set correctly
5. Redeploy both services

---

**Once configured, your app should work perfectly!** 🚀
