# Lingo Hub — API Contract

Base URL: `https://api.lingohub.com/v1`
Auth: Bearer token in Authorization header
`Authorization: Bearer <token>`

---

## Authentication

### POST /auth/login

Login with phone number or email and password.

**Request body:**
{
"identifier": "09131234567", // phone number or email
"password": "mypassword123"
}

**Success response: 200**
{
"token": "eyJhbGci...",
"user": {
"id": "u_01",
"firstName": "علی",
"lastName": "رضایی",
"email": "ali@example.com",
"phoneNumber": "09131234567",
"signupStatus": "approved", // "waiting" | "approved" | "rejected"
"creditBalance": 150000,
"maxReserveCount": 3
}
}

**Error responses:**
401 { "error": "INVALID_CREDENTIALS", "message": "رمز عبور اشتباه است" }
404 { "error": "USER_NOT_FOUND", "message": "کاربری با این مشخصات یافت نشد" }

---

### POST /auth/signup

Register a new user.

**Request body:**
{
"firstName": "علی",
"lastName": "رضایی",
"phoneNumber": "09131234567",
"email": "ali@example.com",
"password": "mypassword123",
"language": "انگلیسی",
"level": "مبتدی",
"explanation": "توضیحات تکمیلی"
}

**Success response: 201**
{
"message": "ثبت‌نام با موفقیت انجام شد"
}

**Error responses:**
409 { "error": "PHONE_EXISTS", "message": "این شماره قبلاً ثبت شده است" }
409 { "error": "EMAIL_EXISTS", "message": "این ایمیل قبلاً ثبت شده است" }
422 { "error": "INVALID_INPUT", "message": "اطلاعات وارد شده معتبر نیست" }

---

### POST /auth/otp/send

Generate and send OTP to the user.

**Request body:**
{ "userId": "u_01" }

**Success response: 200**
{ "message": "کد ارسال شد" }

---

### POST /auth/otp/verify

Verify the OTP code — returns a token on success.

**Request body:**
{
"userId": "u_01",
"code": "4827"
}

**Success response: 200**
{
"token": "eyJhbGci..."
}

**Error responses:**
401 { "error": "INVALID_OTP", "message": "کد وارد شده صحیح نیست" }
410 { "error": "EXPIRED_OTP", "message": "کد منقضی شده است" }

---

## Rooms & Reservations

### GET /rooms

Get all rooms and their availability for today.
Requires auth header.

**Success response: 200**
{
"reserveDate": "14031201",
"rooms": [
{
"id": 0,
"timeLines": [null, null, "u_01", null, "u_02", null, null, null, null, null]
// null = available, userId string = booked by that user
}
]
}

---

### POST /reservations

Book a time slot.
Requires auth header.

**Request body:**
{
"roomId": 2,
"timeSlot": 3,
"userId": "u_01"
}

**Success response: 201**
{
"reservationId": "r_99",
"message": "رزرو با موفقیت انجام شد"
}

**Error responses:**
409 { "error": "SLOT_TAKEN", "message": "این زمان قبلاً رزرو شده است" }
403 { "error": "MAX_RESERVE_REACHED", "message": "به سقف رزرو رسیده‌اید" }

---

### DELETE /reservations/:reservationId

Cancel a reservation.
Requires auth header.

**Success response: 200**
{ "message": "رزرو لغو شد" }

**Error responses:**
403 { "error": "NOT_YOUR_RESERVATION", "message": "این رزرو متعلق به شما نیست" }
404 { "error": "NOT_FOUND", "message": "رزرو یافت نشد" }

---

## User

### GET /users/:userId

Get logged-in user's profile.
Requires auth header.

**Success response: 200**
{
"id": "u_01",
"firstName": "علی",
"lastName": "رضایی",
"email": "ali@example.com",
"phoneNumber": "09131234567",
"language": "انگلیسی",
"level": "مبتدی",
"explanation": "...",
"signupStatus": "approved",
"creditBalance": 150000,
"maxReserveCount": 3,
"reservedRooms": ["r_99", "r_100"]
}

---

### PATCH /users/:userId/password

Change password.
Requires auth header.

**Request body:**
{
"oldPassword": "oldpass123",
"newPassword": "newpass456"
}

**Success response: 200**
{ "message": "رمز عبور با موفقیت تغییر یافت" }

**Error responses:**
401 { "error": "WRONG_PASSWORD", "message": "رمز عبور قدیمی اشتباه است" }

---

## Wallet

### PATCH /users/:userId/balance

Top up wallet balance.
Requires auth header.

**Request body:**
{ "amount": 50000 }

**Success response: 200**
{ "newBalance": 200000 }

---

## Error Format (all endpoints)

All errors follow this shape:
{
"error": "ERROR_CODE", // machine-readable, for your switch/if logic
"message": "..." // human-readable, can show directly to user
}
