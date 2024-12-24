import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';

export function ForgotPassword() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-white via-indigo-50/30 to-white">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}