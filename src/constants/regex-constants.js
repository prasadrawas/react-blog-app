// Regular expression for validating email addresses
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Regular expression for a strong password:
// At least 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
export const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regular expression for validating first name
export const firstNameRegex = /^[A-Za-z\s.'-]+$/;

// Regular expression for validating last name
export const lastNameRegex = /^[A-Za-z\s.'-]+$/;

// Regular expression for validating phone number
export const phoneRegex = /^[6-9]\d{9}$/;
