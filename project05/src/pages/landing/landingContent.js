/** Landing copy and structure — plain data only (no JSX imports). */

const sharedContact = {
  email: 'rueangsak.cha@ku.th',
  facebook: 'Tong Ruengsuk',
  tel: '095-224-1053',
};

const landingContent = {
  th: {
    brand: 'Teaching Assistance Tools',
    nav: [
      { id: 'features', label: 'ฟีเจอร์' },
      { id: 'about', label: 'เกี่ยวกับ' },
      { id: 'contact', label: 'ติดต่อ' },
    ],
    navActions: {
      login: 'เข้าสู่ระบบ',
      start: 'เริ่มใช้งาน',
    },
    hero: {
      title: 'เครื่องมือสื่อการสอนออนไลน์',
      subtitle: 'สร้างคำถามแบบโต้ตอบ Word cloud, ตัวเลือก, คำตอบเปิด และ Ranking — แชร์ QR ให้นักเรียนตอบแบบเรียลไทม์',
      cta: 'เริ่มใช้งาน',
      ctaSecondary: 'เข้าสู่ระบบ',
    },
    features: {
      title: 'ฟีเจอร์หลัก',
      subtitle: 'เครื่องมือครบสำหรับการนำเสนอและเก็บคำตอบในชั้นเรียน',
      items: [
        {
          icon: 'cloud',
          title: 'Word cloud',
          text: 'รวมคำตอบของผู้เรียนเป็นภาพเมคคำ ดูแนวโน้มความคิดในห้องเรียนได้ทันที',
        },
        {
          icon: 'poll',
          title: 'Multiple choice',
          text: 'สร้างข้อสอบหลายตัวเลือก แสดงผลสถิติแบบเรียลไทม์ขณะสอน',
        },
        {
          icon: 'qa',
          title: 'Open ended',
          text: 'รับคำตอบแบบเปิดจากผู้เรียน เหมาะกับ brainstorming และ feedback',
        },
        {
          icon: 'ranking',
          title: 'Ranking',
          text: 'จัดอันดับตัวเลือกหรือความคิดเห็น — เหมาะกับกิจกรรมในชั้นเรียน',
        },
      ],
    },
    about: {
      title: 'ทำไมต้องใช้แพลตฟอร์มนี้',
      paragraphs: [
        'ออกแบบสำหรับอาจารย์และผู้สอนในคณะวิศวกรรมศาสตร์ ที่ต้องการสื่อการสอนออนไลน์ที่ใช้งานง่าย ทันสมัย และไม่ต้องจ่ายค่าบริการรายเดือนแบบเว็บทั่วไป',
        'สร้าง session นำเสนอ แก้ไขสไลด์ แชร์ QR ให้ผู้เรียนเข้าร่วม และดูผลลัพธ์สดได้ในหน้าเดียว',
      ],
    },
    contact: {
      title: 'ติดต่อทีมพัฒนา',
      labels: {
        email: 'อีเมล',
        facebook: 'Facebook',
        tel: 'โทร',
      },
      cta: 'เริ่มสร้างงานนำเสนอ',
      ...sharedContact,
    },
    footer: 'คณะวิศวกรรมศาสตร์',
  },
  en: {
    brand: 'Teaching Assistance Tools',
    nav: [
      { id: 'features', label: 'Features' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    navActions: {
      login: 'Sign in',
      start: 'Get started',
    },
    hero: {
      title: 'Interactive Teaching Assistance Platform',
      subtitle: 'Create live Word Clouds, polls, open-ended prompts, and rankings, then share a QR code for instant student responses.',
      cta: 'Get started',
      ctaSecondary: 'Sign in',
    },
    features: {
      title: 'Core Features',
      subtitle: 'Everything you need to present, engage, and collect classroom responses in real time.',
      items: [
        {
          icon: 'cloud',
          title: 'Word cloud',
          text: 'Turn student responses into visual clusters and reveal class sentiment at a glance.',
        },
        {
          icon: 'poll',
          title: 'Multiple choice',
          text: 'Run quick polls and display live response distributions while teaching.',
        },
        {
          icon: 'qa',
          title: 'Open ended',
          text: 'Capture free-form student input for brainstorming, reflection, and feedback.',
        },
        {
          icon: 'ranking',
          title: 'Ranking',
          text: 'Prioritize options and ideas collaboratively through simple ranking activities.',
        },
      ],
    },
    about: {
      title: 'Why This Platform',
      paragraphs: [
        'Built for engineering instructors who need modern classroom interaction tools without paying recurring enterprise subscription fees.',
        'Create sessions, edit slides, share QR access, and monitor live responses from one streamlined interface.',
      ],
    },
    contact: {
      title: 'Contact the Team',
      labels: {
        email: 'Email',
        facebook: 'Facebook',
        tel: 'Phone',
      },
      cta: 'Start building your presentation',
      ...sharedContact,
    },
    footer: 'Faculty of Engineering',
  },
};

export { landingContent };
export default landingContent;
