# Debugging 500 Error on Signup

## 🔍 Check Render Logs

### Step 1: Go to Render Dashboard
1. Open https://render.com
2. Select your backend service
3. Click **Logs** tab

### Step 2: Look for Error Messages
You should see one of these errors:

---

## ❌ Common 500 Errors & Fixes

### Error 1: MongoDB Connection Failed
```
❌ MongoDB connection error: connect ECONNREFUSED
```

**Fix:**
1. Check `MONGODB_URI` in Render environment
2. Verify MongoDB Atlas network access allows Render
3. Go to MongoDB Atlas → Network Access → Allow from anywhere

---

### Error 2: MongoDB URI Not Set
```
❌ MongoDB connection error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

**Fix:**
1. Go to Render Dashboard
2. Check `MONGODB_URI` environment variable is set
3. Make sure it's not empty
4. Redeploy

---

### Error 3: Validation Error
```
Email validation failed: email: Cast to String failed
```

**Fix:**
1. Make sure you're sending valid email format
2. Try: `test@example.com`
3. Not: `test` or `test@`

---

### Error 4: Duplicate Key Error
```
E11000 duplicate key error collection: developer_directory.users index: email_1
```

**Fix:**
1. Email already exists in database
2. Use a different email
3. Or delete the user from MongoDB Atlas

---

## 🛠️ How to Check Render Logs

1. **Go to Render:** https://render.com
2. **Select service:** developer-directory-api
3. **Click Logs:** See real-time logs
4. **Look for errors:** Red text with error messages
5. **Copy error:** Share with me if stuck

---

## 📝 What to Do

### Step 1: Check Render Logs
- Go to Render Dashboard
- Click **Logs**
- Look for error messages
- Copy the error

### Step 2: Share Error
- Tell me the exact error message
- I'll help you fix it

### Step 3: Common Fixes
- Verify `MONGODB_URI` is set in Render
- Verify `FRONTEND_URL` is set in Render
- Redeploy service
- Try different email

---

## ✅ Verification Checklist

- [ ] Render environment variables set
- [ ] MONGODB_URI is correct
- [ ] FRONTEND_URL is correct
- [ ] Backend redeployed
- [ ] Logs show "✅ MongoDB connected successfully"
- [ ] Try signup with new email

---

## 🚀 Next Steps

1. Check Render logs
2. Look for error message
3. Tell me the error
4. I'll help fix it!

---

**What error do you see in the Render logs?** 📋
