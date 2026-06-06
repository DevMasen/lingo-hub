# Lingo Hub — API Contract

Base URL: 'EMPTY'

Auth: Bearer token in Authorization header
`Authorization: Bearer <token>`

---

## Authentication

### POST /auth/login

Login with phone number or email and password.

**Request body:**

```json
{
	"identifier": "09131234567", // phone number or email
	"password": "mypassword123"
}
```

**Success response: 200**

```json
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
```

**Error responses:**

401 :

```json
{ "error": "INVALID_CREDENTIALS", "message": "رمز عبور اشتباه است" }
```

404:

```json
{ "error": "USER_NOT_FOUND", "message": "کاربری با این مشخصات یافت نشد" }
```

---

### POST /auth/signup

Register a new user.

**Request body:**

```json
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
```

**Success response: 201**

```json
{
	"message": "ثبت‌نام با موفقیت انجام شد"
}
```

**Error responses:**

409:

```json
{ "error": "PHONE_EXISTS", "message": "این شماره قبلاً ثبت شده است" }
```

409:

```json
{ "error": "EMAIL_EXISTS", "message": "این ایمیل قبلاً ثبت شده است" }
```

422:

```json
{ "error": "INVALID_INPUT", "message": "اطلاعات وارد شده معتبر نیست" }
```

---

### POST /auth/otp/send

Generate and send OTP to the user.

**Request body:**

```json
{ "userId": "u_01" }
```

**Success response: 200**

```json
{ "message": "کد ارسال شد" }
```

---

### POST /auth/otp/verify

Verify the OTP code — returns a token on success.

**Request body:**

```json
{
	"userId": "u_01",
	"code": "4827"
}
```

**Success response: 200**

```json
{
	"token": "eyJhbGci..."
}
```

**Error responses:**

401:

```json
{ "error": "INVALID_OTP", "message": "کد وارد شده صحیح نیست" }
```

410:

```json
{ "error": "EXPIRED_OTP", "message": "کد منقضی شده است" }
```

---

## Rooms & Reservations

### GET /rooms

Get all rooms and their availability for today.
Requires auth header.

**Success response: 200**

```json
{
	"reserveDate": "14031201",
	"rooms": [
		{
			"id": 0,
			"timeLines": [
				null,
				null,
				"u_01",
				null,
				"u_02",
				null,
				null,
				null,
				null,
				null
			]
			// null = available, userId string = booked by that user
		}
	]
}
```

---

### POST /reservations

Book a time slot.
Requires auth header.

**Request body:**

```json
{
	"roomId": 2,
	"timeSlot": 3,
	"userId": "u_01"
}
```

**Success response: 201**

```json
{
	"reservationId": "r_99",
	"message": "رزرو با موفقیت انجام شد"
}
```

**Error responses:**
409:

```json
{ "error": "SLOT_TAKEN", "message": "این زمان قبلاً رزرو شده است" }
```

403:

```json
{ "error": "MAX_RESERVE_REACHED", "message": "به سقف رزرو رسیده‌اید" }
```

---

### DELETE /reservations/:reservationId

Cancel a reservation.
Requires auth header.

**Success response: 200**

```json
{ "message": "رزرو لغو شد" }
```

**Error responses:**
403:

```json
{ "error": "NOT_YOUR_RESERVATION", "message": "این رزرو متعلق به شما نیست" }
```

404:

```json
{ "error": "NOT_FOUND", "message": "رزرو یافت نشد" }
```

---

## User

### GET /users/:userId

Get logged-in user's profile.
Requires auth header.

**Success response: 200**

```json
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
```

---

### PATCH /users/:userId/password

Change password.
Requires auth header.

**Request body:**

```json
{
	"oldPassword": "oldpass123",
	"newPassword": "newpass456"
}
```

**Success response: 200**

```json
{ "message": "رمز عبور با موفقیت تغییر یافت" }
```

**Error responses:**
401:

```json
{ "error": "WRONG_PASSWORD", "message": "رمز عبور قدیمی اشتباه است" }
```

---

## Wallet

### PATCH /users/:userId/balance

Top up wallet balance.
Requires auth header.

**Request body:**

```json
{ "amount": 50000 }
```

**Success response: 200**

```json
{ "newBalance": 200000 }
```

---

## Error Format (all endpoints)

All errors follow this shape:

```json
{
	"error": "ERROR_CODE", // machine-readable, for your switch/if logic
	"message": "..." // human-readable, can show directly to user
}
```
