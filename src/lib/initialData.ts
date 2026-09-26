import { AppDatabase } from "../types";

export const initialData: AppDatabase = {
  settings: {
    agency_name: "Egypt Creative",
    slogan_en: "ONE AGENCY. EVERYTHING YOUR BRAND NEEDS.",
    slogan_ar: "وكالة واحدة. كل ما تحتاجه علامتك التجارية.",
    phone: "+20 104 4107134",
    whatsapp: "201044107134",
    whatsapp_prefilled_en: "Hello Egypt Creative, I would like to discuss a project for my brand.",
    whatsapp_prefilled_ar: "مرحباً إيجيبت كرييتف، أرغب بمناقشة مشروع خاص بعلامتي التجارية.",
    email: "info@egyptcreative.com",
    address_en: "Mall of Arabia, The Greek Campus, 6th of October, Giza, Egypt",
    address_ar: "مول العرب، الحرم اليوناني (The Greek Campus)، مدينة 6 أكتوبر، مصر",
    instagram: "https://www.instagram.com/egypt_creative_agency",
    linkedin: "https://www.linkedin.com/company/egypt-creative-agency",
    accent_color: "#FFD400",
    hero_headline_en: "WE BUILD BRANDS THAT MOVE FORWARD.",
    hero_headline_ar: "نبني علامات تجارية تصنع الفارق وتنطلق نحو المستقبل.",
    hero_subheadline_en: "ONE AGENCY. EVERYTHING YOUR BRAND NEEDS.",
    hero_subheadline_ar: "وكالة إبداعية متكاملة. كل ما يحتاجه براندك في مكان واحد.",
    about_headline_en: "WE DON'T JUST CREATE. WE BUILD.",
    about_headline_ar: "لا نكتفي بالإبداع المجرد. نحن نبني كيانات مستدامة.",
    about_desc_en: "Egypt Creative is a full-service creative and performance marketing agency operating from Cairo to the region. We blend strategic foresight, iconic visual direction, cutting-edge digital experiences, and measurable ROI to scale ambitious market leaders.",
    about_desc_ar: "إيجيبت كرييتف هي وكالة إبداعية وتسويقية متكاملة تنطلق من القاهرة نحو المنطقة بأسرها. ندمج بين الرؤية الاستراتيجية الاستباقية، الهوية البصرية الأيقونية، التجارب الرقمية الفائقة، والنمو القابل للقياس لقيادة العلامات التجارية الطموحة نحو الريادة.",
    vision_en: "To set the regional benchmark for transformative agency work where boundary-pushing creativity and disciplined commercial impact unite seamlessly.",
    vision_ar: "أن نكون المعيار الإقليمي الأول للعمل الإبداعي التحويلي، حيث يلتقي الابتكار البصري غير المسبوق مع التأثير التجاري الحقيقي والمستدام.",
    mission_en: "To empower visionary businesses with end-to-end creative mastery, eliminating agency fragmentation and delivering cohesive, unforgettable brand authority.",
    mission_ar: "تمكين أصحاب الأعمال والرؤى المستقبلية عبر إدارة إبداعية وتسويقية متكاملة 360 درجة، تنهي تشتت العمل مع جهات متعددة وتمنح العلامة حضوراً لا يُنسى."
  },
  stats: [
    {
      id: "stat-1",
      val: "2011",
      lbl_en: "Founded In Cairo",
      lbl_ar: "تأسست في القاهرة"
    },
    {
      id: "stat-2",
      val: "1,000+",
      lbl_en: "Projects Mastered",
      lbl_ar: "مشروع منجز باحترافية"
    },
    {
      id: "stat-3",
      val: "16+",
      lbl_en: "Years Combined Mastery",
      lbl_ar: "عاماً من الخبرة المتراكمة"
    },
    {
      id: "stat-4",
      val: "98%",
      lbl_en: "Client Retention & Growth",
      lbl_ar: "نسبة استبقاء ونمو العملاء"
    }
  ],
  services: [
    {
      id: "srv-1",
      name_en: "Strategy & Planning",
      name_ar: "الاستراتيجية والتخطيط المؤسسي",
      desc_en: "Deep market intelligence, audience psychology, competitive edge formulation, and data-backed roadmaps that turn uncertainty into dominant market authority.",
      desc_ar: "دراسات معمقة للأسواق، فهم سيكولوجية المستهلكين، صياغة الميزة التنافسية، وبناء خرائط طريق قائمة على البيانات لتحويل الطموحات إلى ريادة سوقية حاسمة.",
      badge_en: "Foundation",
      badge_ar: "الأساس الاستراتيجي",
      icon: "Compass",
      display_order: 1,
      active: true
    },
    {
      id: "srv-2",
      name_en: "Branding & Design",
      name_ar: "الهوية والعلامات التجارية والتصميم",
      desc_en: "Iconic visual identities, comprehensive design systems, typography hierarchy, and luxury packaging crafted to be instantly recognized and permanently remembered.",
      desc_ar: "بناء هويات بصرية استثنائية، أنظمة تصميم متكاملة، تناغم خطي احترافي، وتغليف فاخر مصمم ليُعرَف في اللحظة الأولى ويبقى راسخاً في الذاكرة.",
      badge_en: "Identity",
      badge_ar: "الهوية والتميز",
      icon: "Palette",
      display_order: 2,
      active: true
    },
    {
      id: "srv-3",
      name_en: "Social Media",
      name_ar: "إدارة وتطوير السوشيال ميديا",
      desc_en: "High-octane content ecosystems, scroll-stopping editorial calendars, proactive community management, and trend-setting conversational leadership.",
      desc_ar: "منظومة محتوى تفاعلية فائقة الجاذبية، جداول نشر تحريرية تجبر المستخدم على التوقف، وإدارة استباقية لمجتمعات المتابعين تصنع ولاءً حقيقياً.",
      badge_en: "Engagement",
      badge_ar: "التفاعل والولاء",
      icon: "Share2",
      display_order: 3,
      active: true
    },
    {
      id: "srv-4",
      name_en: "Content Production",
      name_ar: "إنتاج المحتوى والفيديو الإعلاني",
      desc_en: "Cinematic commercial films, high-end photography, dynamic motion graphics, and viral short-form reels crafted with world-class production values.",
      desc_ar: "أفلام إعلانية سينمائية بمواصفات عالمية، تصوير فوتوغرافي فائق الدقة، تحريك جرافيك مبهر، ومقاطع قصيرة سريعة الانتشار تعزز بريق علامتك.",
      badge_en: "Cinematic",
      badge_ar: "إنتاج سينمائي",
      icon: "Video",
      display_order: 4,
      active: true
    },
    {
      id: "srv-5",
      name_en: "Media Buying & Performance",
      name_ar: "الإعلانات الرقمية والتسويق بالأداء",
      desc_en: "Algorithmic paid acquisition across Meta, Google, TikTok, and Programmatic networks. Relentless ROAS optimization, conversion funnels, and data scale.",
      desc_ar: "حملات إعلانية دقيقة مبنية على خوارزميات الذكاء الاصطناعي عبر Meta وGoogle وTikTok. مضاعفة العائد على الإنفاق الإعلاني وزيادة المبيعات والليدز.",
      badge_en: "Growth",
      badge_ar: "النمو المباشر",
      icon: "TrendingUp",
      display_order: 5,
      active: true
    },
    {
      id: "srv-6",
      name_en: "PR & Communications",
      name_ar: "العلاقات العامة والتواصل الإعلامي",
      desc_en: "Tier-1 media relations, broadcast television placements, executive thought leadership, influencer partnerships, and strategic crisis management.",
      desc_ar: "بناء حضور إعلامي وازن عبر كبرى القنوات التلفزيونية والصحف، شراكات حصرية مع كبار المؤثرين والشخصيات العامة، وإدارة السمعة الاحترافية.",
      badge_en: "Authority",
      badge_ar: "الهيبة الإعلامية",
      icon: "Megaphone",
      display_order: 6,
      active: true
    },
    {
      id: "srv-7",
      name_en: "Web Development & Digital Solutions",
      name_ar: "تطوير المواقع والحلول الرقمية",
      desc_en: "Bespoke digital flagships, 60fps cinematic web experiences, robust headless CMS architecture, high-conversion landing engines, and custom web applications.",
      desc_ar: "بناء منصات رقمية فاخرة وسريعة بتجارب تفاعلية متطورة 60fps، نظم إدارة محتوى مرنة، وتطبيقات ويب مصممة لرفع معدلات التحويل التجاري.",
      badge_en: "Technology",
      badge_ar: "التكنولوجيا الرقمية",
      icon: "Globe",
      display_order: 7,
      active: true
    },
    {
      id: "srv-8",
      name_en: "Events & Media Activations",
      name_ar: "الفعاليات والتنشيط الميداني",
      desc_en: "Immersive on-ground brand activations, VIP corporate galas, trade exhibition showstoppers, and seamless hybrid physical-digital experiences.",
      desc_ar: "تصميم وتنظيم تجارب ميدانية حية وفعاليات كبرى واستثنائية للمؤتمرات والمعارض، تدمج بين العالم الواقعي والإبهار البصري الرقمي.",
      badge_en: "Experience",
      badge_ar: "تجارب واقعية",
      icon: "Sparkles",
      display_order: 8,
      active: true
    }
  ],
  projects: [
    {
      id: "proj-1",
      slug: "remas-land",
      company_name_en: "Remas Land Dairy",
      company_name_ar: "ريماس لاند للألبان",
      company_logo: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=300&q=80",
      title_en: "National Market Repositioning & 360 Campaign",
      title_ar: "إعادة التموضع الوطني وحملة الإطلاق المتكاملة 360",
      category_en: "Branding, TVC & Performance",
      category_ar: "الهوية، الإنتاج الإعلاني والأداء",
      tag_en: "FMCG Dominance",
      tag_ar: "ريادة الصناعات الغذائية",
      desc_en: "Transforming one of Egypt's fastest growing dairy empires into a household cultural staple through cinematic commercials, packaging upgrades, and high-conversion retail activations.",
      desc_ar: "تحويل إحدى كبرى قلاع صناعة الألبان والعصائر في مصر إلى خيار العائلة الأول عبر حملات تلفزيونية سينمائية، تجديد عبوات المنتجات، وتوسيع الحصة السوقية.",
      year: "2025-2026",
      hero_image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1200&q=80"
      ],
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      featured: true,
      display_order: 1,
      active: true,
      metrics: [
        { val: "+240%", lbl_en: "Market Penetration", lbl_ar: "نمو الانتشار السوقي" },
        { val: "18.5M", lbl_en: "Organic Reach", lbl_ar: "وصول طبيعي للمحتوى" },
        { val: "4.8x", lbl_en: "Ad Spend ROI", lbl_ar: "عائد الاستثمار الإعلاني" }
      ],
      case_study: {
        challenge_en: "Remas Land faced intense legacy competition in retail shelf space and needed to pivot from an economy positioning to an aspirational, trusted family staple without losing its price accessibility.",
        challenge_ar: "واجهت ريماس لاند منافسة شرسة على أرفف منافذ البيع، وكان التحدي هو الانتقال من صورة المنتج الاقتصادي إلى منتج العائلة الراقي والموثوق مع الحفاظ على ملاءمة السعر.",
        strategy_en: "We engineered an emotive cultural narrative around wholesome family nourishment, introduced modern minimalist packaging with color-coded product variants, and launched a multi-wave celebrity & influencer endorsement rollout.",
        strategy_ar: "قمنا بصياغة قصة ترويجية وجدانية مستوحاة من دفء الأسرة المصرية، وطورنا نظام تغليف حديث مع ترميز لوني واضح للأصناف، بالتزامن مع حملات مؤثرين مدروسة على السوشيال ميديا.",
        execution_en: "Executed a cinematic TV commercial broadcast across premier Egyptian networks, followed by geotargeted digital ads directing grocery consumers to instant delivery partners and modern hypermarket displays.",
        execution_ar: "إنتاج إعلان تلفزيوني سينمائي عالي الجودة تم بثه في كبرى القنوات، بالتزامن مع إعلانات رقمية موجهة جغرافياً توجه المستهلكين لتطبيقات التوصيل السريع وعروض السوبرماركت الكبرى.",
        results_en: "Achieved a 240% surge in verified consumer brand recall, over 18.5 million organic video impressions across TikTok and Instagram, and established record-breaking distributor purchase orders within 60 days.",
        results_ar: "تحقيق قفزة بنسبة 240% في الوعي بالعلامة التجارية، وأكثر من 18.5 مليون مشاهدة عضوية عبر منصات التواصل، وتسجيل طلبات توريد قياسية لدى الموزعين في أول شهرين."
      }
    },
    {
      id: "proj-2",
      slug: "sultan-al-mandy",
      company_name_en: "Sultan Al Mandy",
      company_name_ar: "سلطان المندي",
      company_logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80",
      title_en: "Franchise Scale & Viral Culinary Experience",
      title_ar: "توسع الفروع وصناعة التجربة الغذائية الفيروسية",
      category_en: "Social Growth & Commercial Production",
      category_ar: "نمو السوشيال ميديا وإنتاج الفيديو",
      tag_en: "Hospitality Empire",
      tag_ar: "سلاسل الضيافة والمطاعم",
      desc_en: "Crafting sensory culinary productions, viral TikTok moments, and local VIP activations that made Sultan Al Mandy Cairo's most talked-about traditional dining destination.",
      desc_ar: "صناعة محتوى مرئي حسي مبهر يبرز تفاصيل الطهي الأصيل، وإطلاق تريندات فيروسية وفعاليات مشاهير جعلت سلطان المندي الوجهة الأكثر رواجاً في القاهرة.",
      year: "2025",
      hero_image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      display_order: 2,
      active: true,
      metrics: [
        { val: "35M+", lbl_en: "Video Views", lbl_ar: "مشاهدة فيديو إجمالية" },
        { val: "+310%", lbl_en: "Dine-in Footfall", lbl_ar: "زيادة زوار الفروع" },
        { val: "5 New", lbl_en: "Branch Expansions", lbl_ar: "فروع جديدة تم افتتاحها" }
      ],
      case_study: {
        challenge_en: "Expanding from an authentic local hotspot into a multi-branch culinary franchise without losing the authentic aroma, hospitality essence, and premium perception.",
        challenge_ar: "التوسع من فرع محلي مشهور إلى سلسلة فروع متعددة في القاهرة والجيزة دون التنازل عن جودة التجربة وطابع الضيافة العربي الفاخر.",
        strategy_en: "Focusing on macro food cinematography that captures textures and steam, establishing food-critic partnerships, and creating an irresistible digital appetite trigger.",
        strategy_ar: "التركيز على تصوير سينمائي مقرب (Macro Cinematography) يبرز نضارة ولذة المأكولات، مع استقطاب كبار صناع محتوى الطعام في المنطقة.",
        execution_en: "Produced over 40 bespoke cinematic culinary reels, executed synchronized opening day viral campaigns for new branch rollouts, and managed live VIP table experiences.",
        execution_ar: "إنتاج أكثر من 40 ريلز سينمائي، وإطلاق حملات رقمية متزامنة لكل افتتاح فرع جديد مع تغطيات حية استقطبت طوابير من الزوار منذ اليوم الأول.",
        results_en: "Generated over 35 million cross-platform video views in 6 months, grew dine-in guest reservations by 310%, and supported the successful launch of 5 new prime locations.",
        results_ar: "تجاوزت المشاهدات حاجز 35 مليون مشاهدة خلال 6 أشهر، وارتفعت حجوزات الطاولات بنسبة 310%، مما دعم الافتتاح الناجح لـ 5 فروع جديدة."
      }
    },
    {
      id: "proj-3",
      slug: "nile-luxury-group",
      company_name_en: "Nile Luxury Group",
      company_name_ar: "مجموعة النيل الفاخرة",
      company_logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80",
      title_en: "Ultra-Luxury Hospitality Digital Transformation",
      title_ar: "التحول الرقمي لعلامات الضيافة والفنادق الفاخرة",
      category_en: "Web Experience & Performance PR",
      category_ar: "المنصات الرقمية والعلاقات العامة",
      tag_en: "High-Net-Worth Luxury",
      tag_ar: "الضيافة فائقة الفخامة",
      desc_en: "Crafting a bespoke digital flagship and international media positioning for Egypt's premier boutique river cruise and heritage estate operator.",
      desc_ar: "بناء واجهة رقمية متطورة وحملات علاقات عامة دولية لأبرز مشغل للرحلات النيلية والفنادق التراثية الفاخرة الموجهة لكبار الشخصيات والسياح الدوليين.",
      year: "2025-2026",
      hero_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      display_order: 3,
      active: true,
      metrics: [
        { val: "+195%", lbl_en: "Direct Suite Bookings", lbl_ar: "زيادة الحجوزات المباشرة" },
        { val: "3.2x", lbl_en: "Average Booking Value", lbl_ar: "مضاعفة قيمة الحجز" },
        { val: "99.4%", lbl_en: "International Guest Rating", lbl_ar: "تقييم الضيوف الدوليين" }
      ],
      case_study: {
        challenge_en: "Heavy dependency on third-party international travel agencies, yielding high commission drain and lack of direct brand equity with affluent GCC and European travelers.",
        challenge_ar: "الاعتماد الكبير على وكالات السفر الوسيطة مما قلص هوامش الربح وحرم العلامة من بناء علاقة ولاء مباشرة مع النخبة من مسافري الخليج وأوروبا.",
        strategy_en: "Architected a minimalist editorial booking experience with spatial imagery, integrated VIP concierge live chat, and ran hyper-targeted search and programmatic campaigns.",
        strategy_ar: "تصميم تجربة حجز رقمية راقية تحاكي الفنادق العالمية السبع نجوم، وتفعيل إعلانات رقمية موجهة لفئات الدخل المرتفع في دول الخليج وأوروبا.",
        execution_en: "Built a high-performance web experience with instant suite visualizers, bilingual Arabic/English booking flows, and prestige PR mentions in luxury lifestyle publications.",
        execution_ar: "تطوير موقع ويب فائق الفخامة والسرعة يتيح للعميل استعراض الأجنحة والتفاصيل، مع نشر تقارير تحريرية في كبرى مجلات الضيافة العالمية.",
        results_en: "Direct booking revenue grew by 195%, commission costs to third parties dropped by 45%, and suite occupancy achieved full capacity across prime seasonal months.",
        results_ar: "نمو الإيرادات المباشرة بنسبة 195%، وتوفير 45% من عمولات الوسطاء، مع بلوغ نسبة إشغال 100% في مواسم الذروة."
      }
    },
    {
      id: "proj-4",
      slug: "capital-horizon",
      company_name_en: "Capital Horizon Developments",
      company_name_ar: "كابيتال هورايزون للتطوير العقاري",
      company_logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
      title_en: "Commercial Megaproject Launch & Lead Pipeline",
      title_ar: "إطلاق الميجا بروجكت التجاري وتوليد المشترين الجادين",
      category_en: "Strategy, Media Buying & 3D Visuals",
      category_ar: "الاستراتيجية، الحملات الممولة والعروض ثلاثية الأبعاد",
      tag_en: "Real Estate Powerhouse",
      tag_ar: "التطوير العقاري الاستثماري",
      desc_en: "Positioning a 5-billion EGP mixed-use business tower in West Cairo through 3D architectural showcases, investor-grade landing funnels, and high-ticket lead generation.",
      desc_ar: "إطلاق وتوجيه مبيعات مشروع تجاري وإداري استثماري بقيمة 5 مليارات جنيه في غرب القاهرة، عبر جولات افتراضية ثلاثية الأبعاد، وصفحات تحويل للمستثمرين.",
      year: "2025",
      hero_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      display_order: 4,
      active: true,
      metrics: [
        { val: "1.2B+", lbl_en: "Sales Pipeline Generated", lbl_ar: "مبيعات تعاقدية محققة" },
        { val: "1,400+", lbl_en: "Qualified Investor Leads", lbl_ar: "عميل استثماري مؤهل" },
        { val: "-38%", lbl_en: "CPL Efficiency", lbl_ar: "توفير في تكلفة العميل المؤهل" }
      ],
      case_study: {
        challenge_en: "Saturated real estate advertising clutter in Cairo and high investor skepticism regarding commercial delivery timelines and rental yields.",
        challenge_ar: "ازدحام الإعلانات العقارية التقليدية في السوق المصري، وتشكك المستثمرين في جدوى العوائد الإيجارية ومصداقية مواعيد التسليم.",
        strategy_en: "Replacing vague promotional buzzwords with cold economic modeling, ROI calculators, commercial anchor-tenant announcements, and architectural tours.",
        strategy_ar: "استبدال الشعارات التقليدية بدراسات جدوى اقتصادية واقعية وحاسبة عوائد استثمارية، مع إبراز كبرى العلامات التجارية المتعاقدة كشركاء نجاح.",
        execution_en: "Created an interactive investor deck, deployed multi-stage LinkedIn and Meta lead gen forms with strict qualifying questionnaires, and held an exclusive gala launch.",
        execution_ar: "إطلاق صفحات هبوط متقدمة تفلتر العملاء وتحدد قدرتهم المالية، مع إدارة حدث إطلاق حصري لكبار المستثمرين ورجال الأعمال.",
        results_en: "Sold out Phase 1 within 48 hours of launch, generating over 1.2 Billion EGP in qualified contractual sales while reducing cost per qualified lead by 38%.",
        results_ar: "بيع المرحلة الأولى بالكامل خلال 48 ساعة من الإطلاق، محققاً مبيعات تتجاوز 1.2 مليار جنيه، مع خفض تكلفة العميل المؤهل بنسبة 38%."
      }
    },
    {
      id: "proj-5",
      slug: "kenz-retail-logistics",
      company_name_en: "Kenz Logistics & Retail",
      company_name_ar: "كنز اللوجستية والتجارة الإلكترونية",
      company_logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80",
      title_en: "E-Commerce Disruptor & National Performance Blitz",
      title_ar: "إطلاق منصة تجارة إلكترونية وحملة تسويق أداء قومية",
      category_en: "Media Buying & Performance",
      category_ar: "تسويق الأداء ونمو المبيعات",
      tag_en: "E-Commerce Disruption",
      tag_ar: "التجارة الإلكترونية والنمو",
      desc_en: "Scaling a modern fulfillment and retail platform to 1.8M active shoppers with data-driven funnel optimization and hyper-local media buying.",
      desc_ar: "توسيع وتنمية منصة تجارة إلكترونية لوجستية حديثة لتصل إلى 1.8 مليون متسوق نشط عبر إعلانات الأداء الموجهة وتحسين مسارات الشراء الرقمية.",
      year: "2026",
      hero_image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      display_order: 5,
      active: true,
      metrics: [
        { val: "+340%", lbl_en: "Return on Ad Spend (ROAS)", lbl_ar: "العائد على الإنفاق الإعلاني" },
        { val: "1.8M", lbl_en: "Active App Installs", lbl_ar: "تحميل وتثبيت للتطبيق" },
        { val: "42M EGP", lbl_en: "Gross Quarterly GMV", lbl_ar: "إجمالي المبيعات الربع سنوية" }
      ],
      case_study: {
        challenge_en: "Entering an intensely competitive delivery market with low initial consumer awareness and high ad costs.",
        challenge_ar: "دخول سوق التجارة والتوصيل السريع وسط منافسة شرسة وارتفاع غير مسبوق في تكلفة الإعلانات التقليدية.",
        strategy_en: "Built an automated multi-variant creative testing machine, hyper-local neighborhood offers, and VIP influencer unboxings.",
        strategy_ar: "بناء محرك اختبار إعلاني مؤتمت ينتج مئات الصيغ الإعلانية أسبوعياً، مع عروض مخصصة لكل حي ومحافظة.",
        execution_en: "Managed cross-platform performance campaigns on TikTok, Snapchat, and Meta with automated bidding and real-time ROAS dashboards.",
        execution_ar: "إدارة حملات إعلانية ممولة مكثفة على تيك توك وسناب شات وميتا مرتبطة بلوحة تحكم لحظية لقياس العائد على كل قرش مستثمر.",
        results_en: "Maintained +340% ROAS throughout Black Friday, captured 1.8 million installs, and achieved full operational profitability in 9 months.",
        results_ar: "الحفاظ على عائد إعلاني 340% وتجاوز 1.8 مليون مستخدم وتحقيق الربحية التشغيلية الكاملة خلال 9 أشهر فقط."
      }
    },
    {
      id: "proj-6",
      slug: "el-sewedy-living",
      company_name_en: "El Sewedy Living & Surfaces",
      company_name_ar: "السويدي لأسطح وتصميمات المعيشة",
      company_logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80",
      title_en: "Heritage Brand Revitalization & Cinematic Campaign",
      title_ar: "إحياء علامة معمارية راقية وحملة سينمائية متكاملة",
      category_en: "Brand Identity & Film Production",
      category_ar: "الهوية البصرية والإنتاج السينمائي",
      tag_en: "Luxury Architectural Living",
      tag_ar: "العمارة والديكور الفاخر",
      desc_en: "Elevating an Egyptian manufacturing titan into an international luxury design symbol through sculptural typography and cinematic brand documentary.",
      desc_ar: "الارتقاء بصرح صناعي ومعماري مصري إلى مصاف علامات التصميم الداخلي الفاخرة عبر تايبوغرافي أيقوني وفيلم وثائقي سينمائي مبهر.",
      year: "2025",
      hero_image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      display_order: 6,
      active: true,
      metrics: [
        { val: "+280%", lbl_en: "Brand Equity Index", lbl_ar: "نمو القيمة التقديرية للعلامة" },
        { val: "4.5M", lbl_en: "Organic Cinema Views", lbl_ar: "مشاهدة عضوية للحملة السينمائية" },
        { val: "#1 Top", lbl_en: "Luxury Interior Category", lbl_ar: "المركز الأول في فئة الديكور الراقي" }
      ],
      case_study: {
        challenge_en: "Moving public perception from industrial building materials to high-end artistic lifestyle surfaces.",
        challenge_ar: "نقل الصورة الذهنية لدى الجمهور من مجرد مواد بناء وتصنيع إلى علامة رائدة في أسلوب الحياة العصري والتصميم الراقي.",
        strategy_en: "Positioning marble, ceramics, and stone as timeless art forms through an architectural documentary film shot on location across Egypt and Italy.",
        strategy_ar: "تقديم الرخام والأسطح كتحف فنية خالدة عبر فيلم وثائقي سينمائي تم تصويره في مواقع تراثية بمصر وإيطاليا.",
        execution_en: "Crafted a gallery-style exhibition catalog, luxury showroom interactive displays, and an emotional anthem film broadcast on premier TV.",
        execution_ar: "تصميم كتالوج فني فاخر للمهندسين والمصممين، وشاشات تفاعلية في صالات العرض، وإطلاق الفيلم الرئيسي على كبرى الشاشات.",
        results_en: "Elevated the brand to #1 preferred supplier for Cairo top luxury interior designers with 4.5 million organic views.",
        results_ar: "أصبحت العلامة الخيار الأول لكبار المصممين والمعماريين في مصر مع انتشار عضوي تخطى 4.5 مليون مشاهدة."
      }
    }
  ],
  leads: [
    {
      id: "lead-1",
      fullName: "Eng. Tarek Mansour",
      company: "Apex Industrial Tech",
      email: "tarek.m@apex-ind.eg",
      phone: "+20 100 123 4567",
      serviceNeeded: "Branding & Web Development",
      message: "We need a complete corporate rebranding and a multilingual web experience ahead of our expansion in Riyadh and Cairo.",
      status: "qualified",
      notes: "High potential client. Sent NDA and scheduled discovery call for Tuesday.",
      source: "Website Direct",
      createdAt: "2026-09-24T14:20:00Z",
      updatedAt: "2026-09-24T15:00:00Z"
    },
    {
      id: "lead-2",
      fullName: "Nouran El-Ghamry",
      company: "Lumière Haute Parfumerie",
      email: "nouran@lumiere-fragrance.com",
      phone: "+20 111 888 9922",
      serviceNeeded: "Content Production & Social Media",
      message: "Launching a high-end oriental fragrance collection for Ramadan. Looking for cinematic film production and celebrity placements.",
      status: "contacted",
      notes: "Connected via WhatsApp. Shared our portfolio video reel.",
      source: "Instagram Campaign",
      createdAt: "2026-09-25T11:05:00Z",
      updatedAt: "2026-09-25T11:30:00Z"
    },
    {
      id: "lead-3",
      fullName: "Sherif Badawy",
      company: "Horizon Retail Chains",
      email: "sherif@horizon-eg.com",
      phone: "+20 122 456 7890",
      serviceNeeded: "Media Buying & Performance",
      message: "Looking for an agency that can manage 500k EGP monthly spend with strict ROAS reporting.",
      status: "new",
      notes: "Newly received from website project overlay.",
      source: "Google Search",
      createdAt: "2026-09-26T16:15:00Z",
      updatedAt: "2026-09-26T16:15:00Z"
    }
  ],
  hero_media: [
    {
      id: "hm-1",
      title_en: "Remas Land National FMCG Commercial",
      title_ar: "إعلان ريماس لاند التلفزيوني القومي",
      type: "image",
      url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=85",
      display_order: 1,
      duration_seconds: 6,
      active: true
    },
    {
      id: "hm-2",
      title_en: "Nile Luxury Ultra-Hospitality Flagship",
      title_ar: "واجهة النيل الفاخرة للضيافة والسياحة",
      type: "image",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
      display_order: 2,
      duration_seconds: 6,
      active: true
    },
    {
      id: "hm-3",
      title_en: "Capital Horizon 3D Commercial Megaproject",
      title_ar: "مشروع كابيتال هورايزون التجاري ثلاثي الأبعاد",
      type: "image",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
      display_order: 3,
      duration_seconds: 6,
      active: true
    }
  ]
};
