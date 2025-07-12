import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LandingPage.module.css';
import { useAuth } from '../../contexts/authContext';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "UX Designer",
    content: "This platform completely transformed how I learn new skills. I swapped my design expertise for coding lessons and it's been incredible!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full-stack Developer",
    content: "Finally a place where I can share my knowledge and get help with areas I'm less familiar with. The community is amazing!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Marketing Specialist",
    content: "As someone who's always looking to learn, this platform has been a game-changer. I've gained so many practical skills through skill swaps.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

// Skill tags data
const skillTags = [
  "Web Development", "UI/UX Design", "Digital Marketing", 
  "Data Science", "Graphic Design", "Mobile Development",
  "Project Management", "Content Writing", "Photography",
  "Video Editing", "SEO", "Blockchain"
];

const LandingPage = () => {
  const { currentUser, logout } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={styles.landingPage}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <motion.div 
            className={styles.logo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.logoPrimary}>Skill</span>
            <span className={styles.logoSecondary}>Swap</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how-it-works" className={styles.navLink}>How It Works</a>
            <a href="#testimonials" className={styles.navLink}>Testimonials</a>
            
            {currentUser ? (
              <>
                <Link to="/profile" className={styles.profileLink}>
                  <h1>Profile</h1>
                </Link>
                <button onClick={handleLogout} className={styles.navButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navButton}>Sign In</Link>
                <Link to="/signup" className={`${styles.navButton} ${styles.primary}`}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={styles.menuIcon}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#features" className={styles.mobileNavLink}>Features</a>
              <a href="#how-it-works" className={styles.mobileNavLink}>How It Works</a>
              <a href="#testimonials" className={styles.mobileNavLink}>Testimonials</a>
              {currentUser ? (
                <>
                  <Link to="/login" className={styles.mobileNavLink}>Profile</Link>
                  <button onClick={handleLogout} className={styles.mobileNavButton}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.mobileNavButton}>Sign In</Link>
                  <Link to="/signup" className={`${styles.mobileNavButton} ${styles.primary}`}>
                    Get Started
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Swap Skills, <span className={styles.highlight}>Not Cash</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Connect with professionals worldwide and exchange knowledge through our innovative skill-sharing platform.
          </motion.p>
          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {currentUser ? (
              <Link to="/dashboard" className={`${styles.button} ${styles.primary}`}>
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className={`${styles.button} ${styles.primary}`}>
                Start Swapping
              </Link>
            )}
            <a href="#how-it-works" className={`${styles.button} ${styles.secondary}`}>
              Learn More
            </a>
          </motion.div>
        </div>
        <motion.div 
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
         
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose SkillSwap?</h2>
          <p>Our platform offers unique benefits for lifelong learners</p>
        </div>
        <div className={styles.featuresGrid}>
          <motion.div 
            className={styles.featureCard}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={styles.featureIcon}>
              
            </div>
            <h3>Fair Exchanges</h3>
            <p>Our credit system ensures equitable swaps so everyone gets value from their knowledge sharing.</p>
          </motion.div>

          <motion.div 
            className={styles.featureCard}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.featureIcon}>
              
            </div>
            <h3>Vetted Community</h3>
            <p>All members are verified professionals passionate about sharing their expertise.</p>
          </motion.div>

          <motion.div 
            className={styles.featureCard}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.featureIcon}>
             
            </div>
            <h3>Flexible Learning</h3>
            <p>Schedule sessions that work for you, from quick 30-minute lessons to in-depth workshops.</p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2>How SkillSwap Works</h2>
          <p>Get started in just a few simple steps</p>
        </div>
        <div className={styles.steps}>
          <motion.div 
            className={styles.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Create Your Profile</h3>
              <p>List the skills you can offer and those you want to learn.</p>
            </div>
          </motion.div>

          <motion.div 
            className={styles.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Find Your Match</h3>
              <p>Browse our community or let our algorithm suggest perfect skill partners.</p>
            </div>
          </motion.div>

          <motion.div 
            className={styles.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>Initiate a Swap</h3>
              <p>Propose a skill exchange and agree on the details with your partner.</p>
            </div>
          </motion.div>

          <motion.div 
            className={styles.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3>Learn & Grow</h3>
              <p>Conduct your skill swap through our integrated video platform.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>What Our Community Says</h2>
          <p>Hear from professionals who've transformed their skills</p>
        </div>
        <div className={styles.testimonialContainer}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={testimonials[currentTestimonial].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={styles.testimonial}
            >
              <div className={styles.testimonialContent}>
                <p>"{testimonials[currentTestimonial].content}"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name} 
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p>{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={styles.testimonialDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentTestimonial ? styles.active : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skills}>
        <div className={styles.sectionHeader}>
          <h2>Popular Skills on Our Platform</h2>
          <p>Find people to exchange knowledge with in these areas</p>
        </div>
        <div className={styles.skillTags}>
          {skillTags.map((skill, index) => (
            <motion.span
              key={skill}
              className={styles.skillTag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Swapping Skills?</h2>
          <p>Join our community of knowledge sharers today</p>
          <div className={styles.ctaButtons}>
            {currentUser ? (
              <Link to="/dashboard" className={`${styles.button} ${styles.primary}`}>
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className={`${styles.button} ${styles.primary}`}>
                Get Started Free
              </Link>
            )}
            <Link to="/login" className={`${styles.button} ${styles.secondary}`}>
              {currentUser ? 'Invite Friends' : 'Sign In'}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span className={styles.logoPrimary}>Skill</span>
            <span className={styles.logoSecondary}>Swap</span>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Testimonials</a>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
            </div>
            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Twitter"><img src="/icons/twitter.svg" alt="Twitter" /></a>
            <a href="#" aria-label="LinkedIn"><img src="/icons/linkedin.svg" alt="LinkedIn" /></a>
            <a href="#" aria-label="Facebook"><img src="/icons/facebook.svg" alt="Facebook" /></a>
            <a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="Instagram" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;