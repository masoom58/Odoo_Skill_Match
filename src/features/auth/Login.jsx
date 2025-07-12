import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { motion } from 'framer-motion';
import styles from './Login.module.css';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSigningIn) return;

        setIsSigningIn(true);
        setErrorMessage('');
        <Navigate to="/landing" replace />
        try {
            await doSignInWithEmailAndPassword(email, password);
        } catch (err) {
            console.error(err);
            setErrorMessage(handleFirebaseAuthError(err));
            setIsSigningIn(false);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        if (isSigningIn) return;

        setIsSigningIn(true);
        setErrorMessage('');
        try {
            await doSignInWithGoogle();
        } catch (err) {
            console.error(err);
            setErrorMessage(handleFirebaseAuthError(err));
            setIsSigningIn(false);
        }
    };

    const handleFirebaseAuthError = (err) => {
        switch (err.code) {
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/invalid-email':
                return 'Invalid email format.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please try again later.';
            case 'auth/invalid-credential':
                return 'Invalid login credentials. Please try again.';
            default:
                return 'Login failed. Please try again.';
        }
    };


    return (
        <motion.div 
            className={styles.loginContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className={styles.loginCard}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                <div className={styles.logo}>
                    <span className={styles.logoPrimary}>Skill</span>
                    <span className={styles.logoSecondary}>Swap</span>
                </div>

                <motion.h3
                    className={styles.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Welcome Back
                </motion.h3>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <motion.div 
                        className={styles.formGroup}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.inputField}
                            placeholder="Enter your email"
                        />
                    </motion.div>

                    <motion.div 
                        className={styles.formGroup}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputField}
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    {errorMessage && (
                        <motion.div 
                            className={styles.errorMessage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errorMessage}
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={isSigningIn}
                        className={`${styles.submitButton} ${isSigningIn ? styles.loading : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {isSigningIn ? (
                            <span className={styles.loadingIndicator}></span>
                        ) : (
                            'Sign In'
                        )}
                    </motion.button>
                </form>

                <motion.div
                    className={styles.linkContainer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    Don't have an account?{' '}
                    <Link to="/signup" className={styles.link}>Sign up</Link>
                </motion.div>

                <motion.div 
                    className={styles.divider}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <div className={styles.dividerLine}></div>
                    <span className={styles.dividerText}>OR</span>
                    <div className={styles.dividerLine}></div>
                </motion.div>

                <motion.button
                    disabled={isSigningIn}
                    onClick={handleGoogleSignIn}
                    className={styles.googleButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <img 
                        src="https://www.svgrepo.com/show/475656/google-color.svg" 
                        alt="Google logo" 
                        className={styles.googleIcon}
                    />
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Login;