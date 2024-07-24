const Urls = {
    authEndpoint: {
        register: "/auth-service/auth/register",
        login: "/auth-service/auth/login",
        logout: "/auth-service/auth/logout",
        updatePassword: "/auth-service/auth/email/update/password",
        forgotPasswordRequest: "/auth-service/auth/email/request/password",
        forgotPasswordVerify: "/auth-service/auth/email/verify/password",
        refreshToken: "/auth-service/auth/refresh-token",
        verifyRefreshToken :"/auth-service/auth/verify-refresh-token",
        sendEmailOtp: "/auth-service/auth/email/request/otp",
        verifyEmailOtp: "/auth-service/auth/email/verify/otp"
    },
    mealEndpoint: {
        checkIsMealPlanDone: "/auth-service/user-info/check-meal-plan",
    }
};

export default Urls;