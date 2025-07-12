import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { motion } from 'framer-motion';
import styles from './Register.module.css';

const Signup = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^A-Za-z0-9]/)) strength += 1;
        setPasswordStrength(strength);
    }, [password]);

    const passwordsMatch = password === confirmPassword && password !== '';

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!passwordsMatch) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (passwordStrength < 3) {
            setErrorMessage('Password is too weak');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            setErrorMessage('');
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (err) {
                console.error(err.message);
                setErrorMessage(handleFirebaseAuthError(err));
                setIsRegistering(false);
            }
        }
    };

    const handleFirebaseAuthError = (err) => {
        switch (err.code) {
            case 'auth/email-already-in-use':
                return 'Email already in use. Try logging in instead.';
            case 'auth/invalid-email':
                return 'Invalid email format.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled.';
            default:
                return 'Registration failed. Please try again.';
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/landing" replace />;
    }

    return (
        <motion.div 
            className={styles.registerContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className={styles.registerCard}
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
                    Create a New Account
                </motion.h3>

                <form onSubmit={onSubmit} className={styles.form}>
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
                            disabled={isRegistering}
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
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputField}
                            placeholder="Create a password"
                            disabled={isRegistering}
                        />
                        <div className={styles.passwordStrength}>
                            <div 
                                className={styles.passwordStrengthBar} 
                                style={{
                                    width: `${passwordStrength * 25}%`,
                                    backgroundColor: passwordStrength < 2 ? '#f56565' : 
                                                    passwordStrength < 4 ? '#ecc94b' : '#48bb78'
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.div 
                        className={styles.formGroup}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.inputField}
                            placeholder="Confirm your password"
                            disabled={isRegistering}
                        />
                        {confirmPassword && (
                            <div className={`${styles.passwordMatch} ${passwordsMatch ? styles.valid : styles.invalid}`}>
                                {passwordsMatch ? (
                                    <>
                                        <span className={styles.passwordMatchIcon}>✓</span>
                                        Passwords match
                                    </>
                                ) : (
                                    <>
                                        <span className={styles.passwordMatchIcon}>✗</span>
                                        Passwords don't match
                                    </>
                                )}
                            </div>
                        )}
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
                        disabled={isRegistering || !passwordsMatch}
                        className={`${styles.submitButton} ${isRegistering ? styles.loading : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        {isRegistering ? (
                            <span className={styles.loadingIndicator}></span>
                        ) : (
                            'Create Account'
                        )}
                    </motion.button>

                    <motion.div
                        className={styles.linkContainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        Already have an account?{' '}
                        <Link to="/login" className={styles.link}>Log In</Link>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Signup;