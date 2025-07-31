// === Twitter Icon Buttons (Optional: add safe checks if buttons don't exist) ===
const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    window.open('https://twitter.com/yourhandle', '_blank');
  });
}

const footerClose = document.getElementById('footerClose');
if (footerClose) {
  footerClose.addEventListener('click', () => {
    window.open('https://twitter.com/yourhandle', '_blank');
  });
}

// === Preloader Logic ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const progressBar = document.querySelector(".progress-fill");
  const mainContent = document.getElementById("main-content");

  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (progress >= 100) clearInterval(interval);
  }, 60); // ~6 seconds total

  setTimeout(() => {
    if (preloader) {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        if (mainContent) mainContent.style.display = "block";
      }, 500);
    }
  }, 6000);
});

// === Video Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById('boruVideo');
  const muteBtn = document.getElementById('muteToggle');
  const overlay = document.querySelector('.video-overlay');

  if (video) {
    // Intersection Observer to autoplay when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play();
            if (overlay) overlay.style.display = 'none';
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    // Loop video when ended
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  }

  // Play on overlay click (manual trigger)
  overlay?.addEventListener('click', function () {
    if (video) {
      video.play();
      this.style.display = 'none';
    }
  });

  // Mute toggle button
  if (muteBtn && video) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? '🔇' : '🔊';
    });
  }
});
window.addEventListener('load', () => {
  const title = document.querySelector('.footer-title');
  if (!title) return;

  // Function to replay animation by toggling class
  function replayAnimation() {
    title.classList.remove('slide-in');
    void title.offsetWidth; // trigger reflow
    title.classList.add('slide-in');
  }

  // Play on page load
  replayAnimation();

  // Animate again when the title enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        replayAnimation();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(title);
});

document.addEventListener('DOMContentLoaded', () => {
  const whoImage = document.querySelector('.who-content img');

  function checkSlideIn() {
    const rect = whoImage.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.75) {
      whoImage.classList.add('slide-in');
      window.removeEventListener('scroll', checkSlideIn);
    }
  }

  window.addEventListener('scroll', checkSlideIn);
  checkSlideIn(); // Initial check in case already visible
});


document.addEventListener("DOMContentLoaded", () => {
  const text = `Boru is many...
Nobody knows where they came from, 
but they’ve taken over
each with their own style, mood, and mission.

They showed up out of nowhere..
dressed in chaos and emotion, not chasing power or 
riches… 

just your attention.`;

  const typingText = document.getElementById("typing-text");
  let index = 0;
  let isTyping = false;

  function typeEffect() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 70);
    } else {
      isTyping = false;
    }
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  window.addEventListener("scroll", () => {
    if (isInViewport(typingText)) {
      if (!isTyping && typingText.textContent.length < text.length) {
        isTyping = true;
        typingText.textContent = '';
        index = 0;
        typeEffect();
      }
    } else {
      // Reset when it's out of view
      typingText.textContent = '';
      index = 0;
      isTyping = false;
    }
  });
});

// === Hero Title Slide-in Animation + Replay on Scroll ===
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title'); // changed to class selector
  if (!heroTitle) return;

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight * 0.8 &&
      rect.bottom >= 0
    );
  }

  function replaySlideIn() {
    heroTitle.classList.remove('slide-in');
    void heroTitle.offsetWidth; // Force reflow to restart animation
    heroTitle.classList.add('slide-in');
  }

  setTimeout(() => {
    replaySlideIn(); // Initial animation
  }, 500);

  window.addEventListener('scroll', () => {
    if (isInViewport(heroTitle)) {
      replaySlideIn();
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('hero-typing-text');
  if (!el) return;

  const fullText = "Attention is the only scoreboard that matters";
  el.textContent = '';
  let index = 0;
  let typingInterval;

  function type() {
    if (index < fullText.length) {
      el.textContent += fullText.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }

  function isInViewport() {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  function startTyping() {
    if (!typingInterval) {
      typingInterval = setInterval(type, 200);
    }
  }

  function resetTyping() {
    clearInterval(typingInterval);
    typingInterval = null;
    index = 0;
    el.textContent = '';
  }

  function checkScroll() {
    if (isInViewport()) {
      if (el.textContent === '') {
        startTyping();
      }
    } else {
      if (el.textContent !== '') {
        resetTyping();
      }
    }
  }

  checkScroll();
  window.addEventListener('scroll', checkScroll);
});


const cardsContainer = document.querySelector('.cards');

if (cardsContainer) {
  const cardWidth = cardsContainer.querySelector('img').clientWidth + 20; // card width + gap

  let scrollPosition = 0;

  setInterval(() => {
    scrollPosition += cardWidth;

    if (scrollPosition >= cardsContainer.scrollWidth) {
      scrollPosition = 0; // reset to start for infinite loop
    }

    cardsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, 3000); // slide every 3 seconds
}
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// 1. Toggle nav on hamburger click
hamburger.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevents body click from triggering
  navLinks.classList.toggle('active');
});

// 2. Close nav when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// 3. Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

