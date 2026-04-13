import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const t = useTranslations("SignIn");
  const commonT = useTranslations("Common");
  
  const [userType, setUserType] = useState<"personal" | "corporate">("personal");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    corporateId: "",
    companyName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication
    console.log("Form submitted:", formData);
    // For now, just close the modal
    alert(
      isSignUp ? t("signUpSuccess") : t("signInSuccess")
    );
    onClose();
    setFormData({ name: "", email: "", phone: "", password: "", corporateId: "", companyName: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ 
      name: "", 
      email: "", 
      phone: "", 
      password: "",
      corporateId: "",
      companyName: ""
    });
    setShowPassword(false);
  };

  const switchUserType = (type: "personal" | "corporate") => {
    setUserType(type);
    setFormData({ 
      name: "", 
      email: "", 
      phone: "", 
      password: "",
      corporateId: "",
      companyName: ""
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
            >
              {/* Brand Header */}
              <div className="relative h-32 bg-brand-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-2xl font-bold text-white">
                    {isSignUp ? t("registerTitle") : t("title")}
                  </h2>
                  <p className="text-white/90 text-sm mt-1">
                    {isSignUp
                      ? t("journeySubtitle")
                      : t("adventureSubtitle")}
                  </p>
                </div>
              </div>

              {/* User Type Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => switchUserType("personal")}
                  className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                    userType === "personal"
                      ? "text-brand-primary bg-brand-primary/5"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("personal")}
                  {userType === "personal" && (
                    <motion.div
                      layoutId="userTypeLine"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary"
                    />
                  )}
                </button>
                <button
                  onClick={() => switchUserType("corporate")}
                  className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                    userType === "corporate"
                      ? "text-brand-primary bg-brand-primary/5"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t("corporate")}
                  {userType === "corporate" && (
                    <motion.div
                      layoutId="userTypeLine"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary"
                    />
                  )}
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Company Name (Corporate Sign Up Only) */}
                  {userType === "corporate" && isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("companyName")}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder={t("companyNamePlaceholder")}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Corporate ID (Corporate Only) */}
                  {userType === "corporate" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("corporateId")}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="corporateId"
                          value={formData.corporateId}
                          onChange={handleInputChange}
                          placeholder={t("corporateIdPlaceholder")}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Name Field (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {userType === "corporate" ? t("phone") : t("fullName")}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={userType === "corporate" ? t("phonePlaceholder") : t("fullNamePlaceholder")}
                          required={isSignUp}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {userType === "corporate" ? t("membershipNumber") : t("email")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={userType === "corporate" ? t("membershipNumberPlaceholder") : t("emailPlaceholder")}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Field (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("phone")}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("phonePlaceholder")}
                          required={isSignUp}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={t("passwordPlaceholder")}
                        required
                        minLength={6}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link (Sign In Only) */}
                  {!isSignUp && (
                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm text-brand-primary hover:text-brand-secondary font-medium transition-colors"
                      >
                        {t("forgotPassword")}
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-brand-primary text-white font-semibold py-3 rounded-lg hover:bg-brand-secondary hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSignUp ? t("signUp") : t("signIn")}
                  </button>

                  {/* Social Sign In Buttons (Personal Only) */}
                  {userType === "personal" && (
                    <>
                      {/* Divider */}
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            {t("orContinueWith")}
                          </span>
                        </div>
                      </div>

                      <div className="grid">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          {t("google")}
                        </button>
                      </div>
                    </>
                  )}
                </form>

                {/* Toggle Sign In / Sign Up */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isSignUp
                      ? t("alreadyHaveAccount")
                      : t("dontHaveAccount")}{" "}
                    <button
                      onClick={toggleMode}
                      className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                      {isSignUp ? t("signIn") : t("signUp")}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
