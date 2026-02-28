// Initialize Lucide icons
lucide.createIcons();

// --- UI Interactions ---

// Header scroll effect
const header = document.getElementById('mainHeader');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
        if (themeColorMeta) themeColorMeta.setAttribute('content', 'rgba(22, 44, 78, 0.95)'); // Matches scrolled header precisely
    } else {
        header.classList.remove('header-scrolled');
        if (themeColorMeta) themeColorMeta.setAttribute('content', 'transparent'); // iPhone transparent header over Hero section
    }
});

// Mobile menu functionality
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        // Small delay to allow display block to apply before changing opacity
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0');
            mobileMenu.classList.add('opacity-100');
        }, 10);
        menuToggle.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
    } else {
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('opacity-0');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        menuToggle.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
    }
    lucide.createIcons();
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) toggleMenu();
    });
});

// Testimonial Carousel
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = track.children;
    const totalSlides = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
}

// Q&A Accordion Logic
function toggleFaq(id) {
    const answer = document.getElementById(`faq-a-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        answer.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// --- Internationalization ---

const content = {
    EN: {
        name: "Bitra",
        navHome: "Home",
        navFeatures: "Features",
        navPricing: "Pricing",
        navPortfolio: "Portfolio",
        navBrand: "Our Brand",
        navQandA: "Q&A",
        navContact: "Ask Us",
        getStarted: "Get Started",
        langName: "العربية",

        badgePlatform: "Bitra Real Estate Platform",
        heroTitle: 'Empowering<br>Real Estate<br><span class="text-white opacity-80">Appraisal</span> Firms',
        heroSubtitle: "Accurate Valuation. Trusted Results.",
        seePortfolio: "See Portfolio",
        statPrecision: "Precision Rate",
        scrollDown: "Scroll Down",

        featSub: "Our Capabilities",
        featTitle: "Cutting-Edge Features",
        feat1Title: "Property Valuation Tools",
        feat1Desc: "Advanced algorithms running massive datasets to provide accurate, reliable property valuations instantly.",
        feat2Title: "Company Dashboard",
        feat2Desc: "A unified architectural hub to manage all your reports, clients, and company analytics visually in one place.",
        feat3Title: "Market Analytics",
        feat3Desc: "Gain profound insights into market trends with real-time analytics, maps, and predictive modeling.",
        feat4Title: "Secure Cloud Storage",
        feat4Desc: "Enterprise-grade encrypted security to ensure your valuation data remains strictly private and accessible.",
        feat5Title: "Custom Reports & Branding",
        feat5Desc: "Generate beautiful, white-labeled appraisal reports that perfectly match your corporate identity. Incorporate logos, customize palettes, and export to PDF instantly.",

        portSub: "Case Studies",
        portTitle: "See Our Platform In Action",
        portBtn: "View All Projects",
        port1Badge: "Report Example",
        port1Title: "Commercial Hub Valuation",
        port1Desc: "Dubai Financial District",
        port2Badge: "Dashboard Spec",
        port2Title: "Luxury Residential Estate",
        port2Desc: "Riyadh Premium Villas",

        priceSub: "Select Your Tier",
        priceTitle: "Transparent Pricing",
        planBasic: "Basic",
        planBasicDesc: "For independent appraisers",
        mo: "/month",
        li50: "Up to 50 reports/mo",
        liStandard: "Standard Templates",
        liBranding1: "Custom Branding",
        liTeam1: "Team Dashboard",
        btnBasic: "Start Free Trial",
        badgeRec: "Recommended",
        planPro: "Professional",
        planProDesc: "For growing appraisal firms",
        liUnlim: "Unlimited reports",
        liAdv: "Advanced Templates",
        liBranding2: "Custom Branding",
        liAI: "AI Valuation Assist",
        btnPro: "Get Started",
        planEnt: "Enterprise",
        planEntDesc: "For large-scale operations",
        custom: "Custom",
        liAll: "Everything in Pro",
        liAPI: "Dedicated API Access",
        liManager: "Dedicated Manager",
        liPortal: "White-label Portal",
        btnEnt: "Contact Sales",

        testTitle: "Trusted by Industry Leaders",
        test1Quote: '"Bitra has completely transformed our appraisal process. The speed and accuracy of our reports have improved by 40%, and our clients love the modern format."',
        test1Role: "Director of Valuation, Prime Estates",
        test2Quote: '"The custom reporting and branding features on Bitra give us a significant edge. It’s a premium tool built specifically for modern valuation needs."',
        test2Role: "CEO, Horizon Appraisals",

        brandSub: "Our Identity",
        brandTitle: "Our Brand Elements",
        brandDesc: "We believe in a minimalist, bold aesthetic centered around pure Black and White, emphasizing precision, extreme clarity, and institutional trust.",
        colorNavy: "Corporate Navy",
        colorEmerald: "Growth Emerald",
        colorSilver: "Precision Silver",
        colorBlue: "Trust Blue",
        ourSignature: "Official Signature",

        qaSub: "Support",
        qaTitle: "Questions & Answers",
        q1: "How accurate is the AI Valuation tool?",
        a1: "Our AI model is trained on millions of real estate data points and is updated daily, providing an industry-leading 99.8% precision rate in prime areas.",
        q2: "Can I customize the reports with my company logo?",
        a2: "Absolutely. Professional and Enterprise plans allow complete white-labeling, including adding your own colors, fonts, and company signature.",
        q3: "Is my data secure?",
        a3: "We use AES-256 encryption at rest and TLS 1.3 in transit. Your appraisal reports and client data are strictly private and ring-fenced.",

        askSub: "Get In Touch",
        askTitle: "Ask Us Anything",
        lblName: "Full Name",
        lblEmail: "Email Address",
        lblSubject: "Subject",
        lblMsg: "Message",
        btnSend: "Send Inquiry",

        ctaTitle: "Ready to Transform Your Workflow?",
        ctaDesc: "Join thousands of leading appraisal firms transforming their business with Bitra today.",
        ctaBtn: "Start Your Free Trial",

        footerDesc: "Leading the digital transformation of real estate appraisal processes worldwide with unmatched precision and security.",
        fPlatform: "Platform",
        fFeatures: "Features",
        fPricing: "Pricing",
        fCases: "Case Studies",
        fAPI: "Appraisal API",
        fCompany: "Company",
        fAbout: "About Us",
        fCareers: "Careers",
        fBlog: "Blog",
        fContact: "Ask Us",
        fLegal: "Legal",
        fPrivacy: "Privacy Policy",
        fTerms: "Terms of Service",
        fSecurity: "Security Overview",
        fRights: "© 2026 Bitra Systems. All rights reserved.",
        fSlogan: "PRECISE VALUATION. EVERYWHERE."
    },
    AR: {
        name: "بيترا",
        navHome: "الرئيسية",
        navFeatures: "الميزات",
        navPricing: "الأسعار",
        navPortfolio: "أعمالنا",
        navBrand: "علامتنا التجارية",
        navQandA: "سؤال وجواب",
        navContact: "اسألنا",
        getStarted: "ابدأ الآن",
        langName: "English",

        badgePlatform: "منصة بيترا العقارية",
        heroTitle: 'تمكين شركات<br><span class="text-white opacity-80">التقييم</span><br>العقاري',
        heroSubtitle: "تقييم دقيق. نتائج موثوقة.",
        seePortfolio: "شاهد أعمالنا",
        statPrecision: "معدل الدقة",
        scrollDown: "التمرير لأسفل",

        featSub: "قدراتنا",
        featTitle: "ميزات متطورة",
        feat1Title: "أدوات تقييم العقارات",
        feat1Desc: "خوارزميات متقدمة لمعالجة البيانات الضخمة لتوفير تقييمات دقيقة وموثوقة فوراً.",
        feat2Title: "لوحة تحكم الشركة",
        feat2Desc: "مركز إداري موحد لإدارة التقارير والعملاء وتحليلات الشركة في مكان واحد.",
        feat3Title: "تحليلات السوق",
        feat3Desc: "احصل على رؤى عميقة لاتجاهات السوق مع تحليلات ورسومات بيانية حية.",
        feat4Title: "تخزين سحابي آمن",
        feat4Desc: "تشفير بمستوى المؤسسات لضمان بقاء بيانات التقييم الخاصة بك خاصة تماماً وآمنة.",
        feat5Title: "تقارير مخصصة وهوية",
        feat5Desc: "إنشاء تقارير تقييم جميلة تحمل هويتك المؤسسية بشكل مثالي. أضف شعارك وعدل الألوان وصدر بصيغة PDF فوراً.",

        portSub: "دراسات حالة",
        portTitle: "شاهد منصتنا في العمل",
        portBtn: "عرض جميع المشاريع",
        port1Badge: "مثال لتقرير",
        port1Title: "تقييم مركز تجاري",
        port1Desc: "المنطقة المالية في دبي",
        port2Badge: "لوحة القيادة",
        port2Title: "مجمع سكني فاخر",
        port2Desc: "فلل الرياض المميزة",

        priceSub: "اختر الباقة",
        priceTitle: "أسعار شفافة",
        planBasic: "الأساسية",
        planBasicDesc: "للمقيمين المستقلين",
        mo: "/شهر",
        li50: "حتى 50 تقرير/شهر",
        liStandard: "قوالب قياسية",
        liBranding1: "تخصيص الهوية",
        liTeam1: "لوحة تحكم الفريق",
        btnBasic: "ابدأ التجربة المجانية",
        badgeRec: "موصى به",
        planPro: "الاحترافية",
        planProDesc: "لشركات التقييم النامية",
        liUnlim: "تقارير غير محدودة",
        liAdv: "قوالب متقدمة",
        liBranding2: "هوية مخصصة بالكامل",
        liAI: "مساعد التقييم بالذكاء الاصطناعي",
        btnPro: "ابدأ الآن",
        planEnt: "المؤسسات",
        planEntDesc: "للعمليات واسعة النطاق",
        custom: "مخصص",
        liAll: "كل شيء في باقة الاحترافية",
        liAPI: "وصول خاص لواجهة برمجة التطبيقات (API)",
        liManager: "مدير حساب مخصص",
        liPortal: "بوابة العلامة البيضاء",
        btnEnt: "اتصل بالمبيعات",

        testTitle: "موثوقون من قادة الصناعة",
        test1Quote: '"غيرت بيترا عملية التقييم لدينا بالكامل. تحسنت سرعة ودقة تقاريرنا بنسبة 40%، وعملاؤنا يحبون التنسيق الحديث."',
        test1Role: "مدير التقييم، برايم إستيتس",
        test2Quote: '"تمنحنا ميزات التقارير المخصصة والوسم في بيترا ميزة تنافسية كبيرة. إنها أداة فاخرة بنيت خصيصا لاحتياجات التقييم الحديثة."',
        test2Role: "الرئيس التنفيذي، هورايزون للتقييم",

        brandSub: "هويتنا",
        brandTitle: "عناصر علامتنا التجارية",
        brandDesc: "نحن نؤمن بالجماليات البسيطة والجريئة المتمركزة حول الأسود الخالص والأبيض، مع التركيز على الدقة والوضوح الشديد والثقة المؤسسية.",
        colorNavy: "كحلي مؤسسي",
        colorEmerald: "زمردي للنمو",
        colorSilver: "فضي دقيق",
        colorBlue: "أزرق ثقة",
        ourSignature: "التوقيع الرسمي",

        qaSub: "الدعم والمساعدة",
        qaTitle: "سؤال وجواب",
        q1: "ما مدى دقة أداة التقييم بالذكاء الاصطناعي؟",
        a1: "يتم تدريب نموذج الذكاء الاصطناعي الخاص بنا على ملايين نقاط البيانات العقارية ويتم تحديثه يوميا، مما يوفر معدل دقة رائد في الصناعة يبلغ 99.8%.",
        q2: "هل يمكنني تخصيص التقارير بشعار شركتي؟",
        a2: "بالتأكيد. تتيح لك الباقات الاحترافية والمؤسسية التخصيص الكامل، بما في ذلك إضافة الألوان والخطوط وتوقيع الشركة.",
        q3: "هل بياناتي آمنة؟",
        a3: "نحن نستخدم تشفير AES-256 وتقنية TLS 1.3 في النقل. بياناتك آمنة تماماً.",

        askSub: "تواصل معنا",
        askTitle: "اسألنا أي شيء",
        lblName: "الاسم الكامل",
        lblEmail: "البريد الإلكتروني",
        lblSubject: "الموضوع",
        lblMsg: "الرسالة",
        btnSend: "إرسال الاستفسار",

        ctaTitle: "مستعد لتحويل سير عملك؟",
        ctaDesc: "انضم إلى آلاف شركات التقييم الرائدة التي تحول أعمالها مع بيترا اليوم.",
        ctaBtn: "ابدأ تجربتك المجانية",

        footerDesc: "نقود التحول الرقمي لعمليات التقييم العقاري حول العالم بدقة وأمان لا مثيل لهما.",
        fPlatform: "المنصة",
        fFeatures: "الميزات",
        fPricing: "الأسعار",
        fCases: "دراسات الحالة",
        fAPI: "برمجة التقييم (API)",
        fCompany: "الشركة",
        fAbout: "من نحن",
        fCareers: "الوظائف",
        fBlog: "المدونة",
        fContact: "اسألنا",
        fLegal: "قانوني",
        fPrivacy: "سياسة الخصوصية",
        fTerms: "شروط الخدمة",
        fSecurity: "نظرة عامة على الأمان",
        fRights: "© 2026 أنظمة بيترا. جميع الحقوق محفوظة.",
        fSlogan: "تقييم دقيق. في كل مكان."
    }
};

let currentLang = 'EN';

const langToggle = document.getElementById('langToggle');

function toggleLanguage() {
    currentLang = currentLang === 'EN' ? 'AR' : 'EN';

    const bodyWrap = document.getElementById('bodyWrap');
    if (currentLang === 'AR') {
        bodyWrap.setAttribute('dir', 'rtl');
        bodyWrap.classList.remove('text-left');
        bodyWrap.classList.add('text-right');
        if (langToggle) langToggle.textContent = content['AR'].langName;
    } else {
        bodyWrap.setAttribute('dir', 'ltr');
        bodyWrap.classList.add('text-left');
        bodyWrap.classList.remove('text-right');
        if (langToggle) langToggle.textContent = content['EN'].langName;
    }

    // Update text for elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (content[currentLang] && content[currentLang][key]) {
            el.innerHTML = content[currentLang][key];
        }
    });

    // Re-initialize icons just in case they were replaced
    lucide.createIcons();
}

if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
}

// Setup initial translations
const initialRender = () => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (content['EN'] && content['EN'][key]) {
            el.innerHTML = content['EN'][key];
        }
    });
};
initialRender();
