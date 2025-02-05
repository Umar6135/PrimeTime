if(window.innerWidth > 768){

    let aboutSection;
    let aboutObserver;
    let originalAboutStyles;
    let originalMaxWidth;
    
    let aboutViewportHeight;
    let aboutViewportWidth;
    let aboutSectionHeight;
    let aboutSectionPercentageWidth;
    let aboutSectionPixelWidth;
    let aboutMaxRatio;
    let aboutBottomThreshold;
    let aboutTopThreshold;
    let aboutTotalTransitionPixels;
    let aboutTransitionPercentage;
    
    let isMobile = false;
    let prevWidth;
    
    // Calculation Functions
    function calculateAboutMaxRatio() {
        aboutViewportHeight = window.innerHeight;
        aboutSectionHeight = aboutSection.offsetHeight;
        aboutMaxRatio = aboutViewportHeight / aboutSectionHeight;
    }
    
    function calculateAboutBottomTopThresholds() {
        aboutBottomThreshold = aboutMaxRatio / 3;
        aboutTopThreshold = aboutMaxRatio / 1.5;
    }
    
    function calculateAboutSectionPercentageWidth() {
        aboutSectionPercentageWidth = (aboutSection.offsetWidth / aboutViewportWidth);
    }
    
    function calculateAboutSectionPixelWidth() {
        aboutSectionPixelWidth = aboutViewportWidth * aboutSectionPercentageWidth;
    }
    
    function calculateAboutTotalTransitionPixels() {
        aboutTotalTransitionPixels = aboutViewportWidth - aboutSectionPixelWidth;
    }
    
    // Apply styles based on screen width (only for >768px)
    function applyInitialStyles() {
        let viewportWidth = window.innerWidth;
        // Reset any previously applied inline styles
        aboutSection.style.width = '';
        aboutSection.style.maxWidth = '';
    
        // Only apply these styles if viewport width is greater than 768px
        if (viewportWidth > 768) {
            if (viewportWidth > 1440) {
                aboutSection.style.maxWidth = '1310px';
                aboutSection.style.width = '1310px';
            } else if (viewportWidth > 1200) {
                aboutSection.style.maxWidth = '1310px';
                aboutSection.style.width = '1110px';
            } else if (viewportWidth > 991) {
                aboutSection.style.maxWidth = '890px';
                aboutSection.style.width = '890px';
            } else if (viewportWidth > 768) {
                aboutSection.style.maxWidth = '768px';
                aboutSection.style.width = '768px';
            }
        }
    }
    
    // Initialize all logic for wider screens (>768px)
    function initAboutSection() {
        originalAboutStyles = getComputedStyle(aboutSection);
        originalMaxWidth = parseInt(originalAboutStyles.maxWidth);
    
        applyInitialStyles(); // Apply initial styles
    
        calculateAboutMaxRatio();
        calculateAboutBottomTopThresholds();
        calculateAboutSectionPercentageWidth();
        calculateAboutSectionPixelWidth();
        calculateAboutTotalTransitionPixels();
    
        createAboutSectionObserver();
    }
    
    // Cleanup logic for screens <=768px
    function cleanupAboutSection() {
        // Disconnect the observer if it exists
        if (aboutObserver) {
            aboutObserver.disconnect();
            aboutObserver = null;
        }
        // Remove any inline styles
        if (aboutSection) {
            aboutSection.style.removeProperty('width');
            aboutSection.style.removeProperty('max-width');
        }
    }
    
    // Create IntersectionObserver for aboutSection
    function createAboutSectionObserver() {
        let sectionOptions = {
            root: null,
            rootMargin: '0px',
            threshold: buildAboutThresholdList()
        };
    
        aboutObserver = new IntersectionObserver(function (entries) {
            // Guard: if mobile, do nothing.
            if (isMobile) {
                aboutSection.style.maxWidth = 'none';
                aboutSection.style.width = '100%';
                return;
            }
    
            entries.forEach(entry => {
                if (entry.intersectionRatio >= aboutBottomThreshold && entry.intersectionRatio <= aboutTopThreshold) {
                    aboutTransitionPercentage = ((entry.intersectionRatio - aboutBottomThreshold) / (aboutTopThreshold - aboutBottomThreshold));
                    aboutSection.style.maxWidth = '100%';
                    aboutSection.style.width = aboutSectionPixelWidth + (aboutTransitionPercentage * aboutTotalTransitionPixels) + 'px';
                } else if (entry.intersectionRatio > aboutTopThreshold) {
                    aboutSection.style.maxWidth = '100%';
                    aboutSection.style.width = aboutSectionPixelWidth + aboutTotalTransitionPixels + 'px';
                } else {
                    if (aboutViewportWidth <= 1440) {
                        aboutSection.style.maxWidth = (aboutSectionPercentageWidth * aboutViewportWidth) + 'px';
                        aboutSection.style.width = (aboutSectionPercentageWidth * aboutViewportWidth) + 'px';
                    } else {
                        aboutSection.style.maxWidth = aboutSectionPixelWidth + 'px';
                        aboutSection.style.width = aboutSectionPixelWidth + 'px';
                    }
                }
            });
        }, sectionOptions);
    
        aboutObserver.observe(aboutSection);
    }
    
    // Build a threshold list for IntersectionObserver
    function buildAboutThresholdList() {
        let thresholds = [];
        const numSteps = 1000;
        for (let i = 1; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
        }
        thresholds.push(0);
        return thresholds;
    }
    
    // On page load, check the viewport width and act accordingly
    window.addEventListener('DOMContentLoaded', () => {
        aboutViewportWidth = window.innerWidth;
        aboutSection = document.querySelector('.about');
    
        if (aboutViewportWidth <= 768) {
            isMobile = true;
            cleanupAboutSection();
        } else {
            isMobile = false;
            initAboutSection();
        }
    }, false);
    
    // On window resize, perform the same check
    window.onresize = function () {
        prevWidth = aboutViewportWidth;
        aboutViewportWidth = window.innerWidth;
    
        if (aboutViewportWidth <= 768) {
            isMobile = true;
            cleanupAboutSection();
            return;
        } else {
            isMobile = false;
        }
    
        // Ensure aboutSection is defined.
        if (!aboutSection) {
            aboutSection = document.querySelector('.about');
        }
    
        // Disconnect any existing observer before reinitializing.
        if (aboutObserver) {
            aboutObserver.disconnect();
        }
    
        // Adjust internal measurements if needed.
        if (prevWidth > 1440 && aboutViewportWidth <= 1440) {
            aboutSectionPercentageWidth = originalMaxWidth / 1440;
        }
        if (prevWidth <= 1440 && aboutViewportWidth > 1440) {
            aboutSectionPixelWidth = originalMaxWidth;
        }
        if (aboutViewportWidth <= 1440) {
            calculateAboutSectionPixelWidth();
        }
    
        applyInitialStyles();
        calculateAboutMaxRatio();
        calculateAboutBottomTopThresholds();
        calculateAboutTotalTransitionPixels();
    
        createAboutSectionObserver();
    };
    
}


let samt = 0;
window.addEventListener('scroll', function () {
    samt <= 10 ? samt++ : AOS.refresh();
});

AOS.init({
    animatedClassName: 'aos-animate',
    disable: function () {
        var maxWidth = 769;
        return window.innerWidth < maxWidth;
    }
});


$(document).ready(function () {
    $('.testimonial-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
        responsive: [
            {
                breakpoint: 1024, // For tablets and small desktops
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },

            {
                breakpoint: 576, // For small mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    });
});



$(document).ready(function () {
    $('.partner-creator-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: '<span type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></span>',
        nextArrow: '<span type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></span>',
        responsive: [
            {
                breakpoint: 1024, // Tablets and small desktops
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },

            {
                breakpoint: 576, // Small mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,

                    dots: true,
                }
            }
        ]
    });
});





$('.popup-youtube').magnificPopup({
    type: 'iframe',
    iframe: {
        markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allow="autoplay"></iframe>' +
            '</div>',
        patterns: {
            youtube: {
                index: 'youtube.com/',
                id: 'v=',
                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
            }
        }
    },
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,

});




