// نظام التنقل السلس بين الأقسام
document.addEventListener('DOMContentLoaded', function() {
    console.log('نظام التنقل جاهز!');
    
    // الحصول على جميع روابط التنقل
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // إضافة مستمع حدث لكل رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على الهدف من الرابط
            const targetId = this.getAttribute('href').substring(1);
            console.log('النقر على:', targetId);
            
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // حساب ارتفاع الشريط العلوي
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                
                // حساب الموقع مع تعويض ارتفاع الشريط
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                // التنقل السلس للقسم المطلوب
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // تحديث الرابط النشط
                updateActiveNavLink(this);
            } else {
                console.log('القسم غير موجود:', targetId);
            }
        });
    });
    
    // زر Book Now في التنقل
    const bookNowBtn = document.querySelector('.nav_btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // زر View More في الهيرو
    const viewMoreBtn = document.querySelector('.btn_img');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = aboutSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // زر Contact Us في قسم Popular Rooms
    const contactUsBtn = document.querySelector('.btn_pop');
    if (contactUsBtn) {
        contactUsBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // تحديث الرابط النشط أثناء التمرير
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        console.log('القسم الحالي:', currentSection);
        
        // تحديث الرابط النشط بناءً على القسم الحالي
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === currentSection) {
                link.classList.add('active');
                console.log('تفعيل الرابط:', linkHref);
            }
        });
    });
    
    // دالة لتحديث الرابط النشط
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    // اختبار: طباعة جميع الأقسام المتاحة
    console.log('الأقسام المتاحة:');
    document.querySelectorAll('section[id]').forEach(section => {
        console.log('-', section.id);
    });
});