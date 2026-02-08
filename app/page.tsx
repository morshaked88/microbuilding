"use client";

import Image from "next/image";
import { useEffect } from "react";
import GalleryCarousel from "./components/GalleryCarousel";
import { GrFacebook, GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    // Set RTL direction
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "he";

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    const toggleMenu = () => {
      navLinks?.classList.toggle("active");
    };

    mobileMenuBtn?.addEventListener("click", toggleMenu);

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks?.classList.remove("active");
      });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const target = document.querySelector(
          (e.currentTarget as HTMLAnchorElement).getAttribute("href") || "",
        );
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });

    // Scroll effect for header
    let lastScroll = 0;
    const header = document.querySelector("header") as HTMLElement;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
      } else {
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe service cards and gallery items
    document.querySelectorAll(".service-card, .gallery-item").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(20px)";
      (el as HTMLElement).style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

    return () => {
      mobileMenuBtn?.removeEventListener("click", toggleMenu);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <nav>
          <div className="logo">סטודיו גבות </div>
          <ul className="nav-links" id="navLinks">
            <li>
              <a href="#home">בית</a>
            </li>
            <li>
              <a href="#about">אודות</a>
            </li>
            <li>
              <a href="#services">שירותים</a>
            </li>
            <li>
              <a href="#gallery">גלריה</a>
            </li>
            <li>
              <a href="#contact">צור קשר</a>
            </li>
          </ul>
          <div className="mobile-menu-btn" id="mobileMenuBtn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-subtitle">מומחים במיקרובליידינג</div>
          <h1>
            גבות מושלמות,
            <br />
            בדיוק בשבילך
          </h1>
          <a href="#contact" className="cta-button">
            קבעי תור עכשיו
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">+500</span>
          <span className="stat-label">לקוחות מרוצות</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">+5</span>
          <span className="stat-label">שנות ניסיון</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">תוצאות טבעיות</span>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2>אודותינו</h2>
            <p>
              אנחנו סטודיו מיקרובליידינג מוביל המתמחה בהדגשת היופי הטבעי שלך. עם
              שנות ניסיון ותשוקה לשלמות, אנו מתמחים ביצירת גבות יפות וטבעיות
              שממסגרות את הפנים בצורה מושלמת.
            </p>
            <p>
              המומחים המוסמכים שלנו משתמשים בטכניקות העדכניות ביותר ובפיגמנטים
              באיכות הגבוהה ביותר כדי להבטיח תוצאות מרשימות ועמידות. כל טיפול
              מותאם אישית להתאים למאפיינים הייחודיים של הפנים והסגנון האישי שלך.
            </p>
            <p>
              אנחנו מאמינים שגבות יפות יכולות לשנות לא רק את המראה שלך, אלא גם
              את הביטחון העצמי. תני לנו לעזור לך להתעורר כל יום עם גבות מושלמות.
            </p>
          </div>
          <div className="about-image">
            <Image
              src="/1.jpg"
              alt="אודות סטודיו גבות"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="services-container">
          <h2>השירותים שלנו</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3>מיקרובליידינג</h3>
              <p>
                קווי שיער טבעיים לגבות מלאות ומעוצבות בצורה מושלמת שמחזיקות 1-2
                שנים.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">💫</div>
              <h3>גבות אבקה</h3>
              <p>אפקט אבקה עדין למראה מייקאפ שתמיד מוכן למצלמה.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌟</div>
              <h3>גבות קומבו</h3>
              <p>השילוב המושלם - מיקרובליידינג עם הצללה לעומק וממד.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3>טיפולי ריענון</h3>
              <p>
                שמרי על הגבות המושלמות שלך עם שירותי הריענון המקצועיים שלנו.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery" id="gallery">
        <div className="gallery-container">
          <h2>העבודות שלנו</h2>
          <GalleryCarousel
            images={[
              "/g_1.png",
              "/g_2.png",
              "/g_3.png",
              "/g_4.png",
              "/g_5.png",
              "/g_6.png",
            ]}
          />
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <h2>צרי קשר</h2>
          <p>
            מוכנה לשנות את הגבות שלך? צרי איתנו קשר היום כדי לקבוע תור או לשאול
            כל שאלה.
          </p>
          <a
            href="https://wa.me/972501234567?text=היי!%20אני%20מעוניינת%20לקבוע%20תור%20למיקרובליידינג"
            className="whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="whatsapp-icon"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            שלחי הודעה בוואטסאפ
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">סטודיו גבות</div>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <GrInstagram size={24} />
            </a>
            <a href="#" aria-label="Facebook">
              <GrFacebook size={24} />
            </a>
            <a href="#" aria-label="TikTok">
              <FaTiktok size={24} />
            </a>
          </div>
          <p>&copy; 2026 סטודיו גבות. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </>
  );
}
