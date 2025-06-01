// Centralized data file for all portfolio content
// This makes it easier to update content without touching component logic

export const skills = {
  hard: [
    {
      icon: "Server",
      title: "System Administration",
      description: "Experienced in managing Linux and Windows servers, ensuring optimal performance and security.",
      tools: ["Linux", "Windows Server", "VMware ESXi"],
      bgClass: "server-bg",
    },
    {
      icon: "Cloud",
      title: "Cloud Management",
      description: "Experienced hands-on cloud based server for deploying and managing scalable infrastructure.",
      tools: ["AWS", "Biznet Gio"],
      bgClass: "cloud-bg",
    },
    {
      icon: "Container",
      title: "Deployment Tools",
      description:
        "Skilled in setting up containers, managing multi-container apps, and streamlining development workflows.",
      tools: ["Docker", "Nginx", "Cloudflare", "Ansible"],
      bgClass: "container-bg",
    },
    {
      icon: "Network",
      title: "Network Engineering",
      description: "Skilled in designing, implementing, and troubleshooting network architectures.",
      tools: ["Cisco", "Mikrotik", "Fortinet"],
      bgClass: "network-bg",
    },
  ],
  soft: [
    {
      icon: "Lightbulb",
      title: "Problem Solving",
      description: "Ability to analyze complex technical issues and develop effective solutions.",
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description: "Experience working in cross-functional teams to achieve project goals.",
    },
    {
      icon: "Clock",
      title: "Time Management",
      description: "Skilled at prioritizing tasks between work & studies.",
    },
    {
      icon: "RefreshCcw",
      title: "Continuous Learning",
      description: "Always eager to explore emerging technologies and continuously improve my technical capabilities.",
    },
  ],
}

export const education = [
  {
    id: 1,
    institution: "Cakrawala University",
    degree: "Bachelor of Computer Science",
    field: "Information System and Technology",
    location: "Jakarta, Indonesia",
    period: "2024 - 2028",
    description:
      "Learned on Software Development include Frontend and Relational Database fundamental, Information System Management & Bussiness, Network Architecture, etc.",
    fullDescription:
      "Gained hands-on experience in software development focusing on C++ and JavaScript, with a solid understanding of frontend development, relational databases, and structured information systems. Also explored essential concepts in network architecture and IT infrastructure.",
    courses: [
      "Information System Management",
      "Bussiness and Technology Modelling",
      "Database Modelling and Query Languages ",
      "Web Client Development",
      "User Experience Design",
      "Object Oriented Programming",
    ],
  },
  {
    id: 2,
    institution: "SMK-TI Umar Fatah",
    degree: "Vocational High School",
    field: "Computer and Network Engineering",
    location: "Rembang, Indonesia",
    period: "2021 - 2024",
    description:
      "Learned fundamentals of Network, Linux System Administration, and Software Fundamentals such as HTML and CSS.",
    fullDescription:
      "Participated in network simulations, Linux configuration practices, and local tech competitions during the final year of school.",
    courses: ["Computer Network Basics", "Linux System Administration", "HTML CSS Fundamentals", "Computer Hardware"],
  },
]

export const certifications = [
  {
    id: 1,
    title: "Certified in CyberSecurity",
    issuer: "ISC2",
    issuedDate: "May 2025",
    image: "/isc2.jpeg",
    skills: ["Risk Management", "Access Control", "Security Principles", "Network & Security"],
    description:
      "Establishes the core knowledge required of any cybersecurity role and provides a springboard to intermediate-level cybersecurity jobs, covering essential principles for network security and risk management.",
    credentialLink: "https://drive.google.com/file/d/1O7XAwKO-IMyiNq1qyEao33X_FwPrGLug/view?usp=drive_link",
  },
  {
    id: 2,
    title: "Fundamental of Red Hat Enterprise Linux Server",
    issuer: "Coursera - RedHat",
    issuedDate: "June 2024",
    image: "/redhat.jpg",
    skills: [
      "RedHat System Administration",
      "Process Management and Monitoring",
      "System Permission",
      "User   and Group",
    ],
    description:
      "Provides foundational knowledge of Red Hat Enterprise Linux system administration, including user and group management, file system permissions, process control, and essential command-line operations for server environments.",
    credentialLink: "https://www.coursera.org/account/accomplishments/verify/JS8PLJ9R9G6X",
  },
  {
    id: 3,
    title: "IT Support Technical Skills Helpdesk",
    issuer: "Udemy",
    issuedDate: "March 2023",
    image: "/udemy.jpg",
    skills: ["Office 365", "Ticketing System", "Active Directory", "File & Printer Sharing"],
    description:
      "Covers essential IT support skills including user account management, troubleshooting hardware/software issues, working with ticketing systems, and supporting productivity tools such as Office 365 in a helpdesk environment.",
    credentialLink: "https://www.udemy.com/certificate/UC-988d5836-144b-4fab-8fbe-d933fe5d70ac/",
  },
  {
    id: 4,
    title: "Fundamental of Network Engineering",
    issuer: "Course-Net",
    issuedDate: "February 2023",
    image: "/coursenet.png",
    skills: ["Cisco", "Network Design", "TCP/IP", "Routing"],
    description:
      "Covers the foundational knowledge of computer networks including OSI layers, IP addressing, subnetting, routing, switching, and basic Cisco configurations. Prepares learners to understand and design small to medium-sized network topologies.",
    credentialLink: "https://course-net.com/certificate-verifier/1330E0B76-1330DE465-3036A9C/",
  },
  {
    id: 5,
    title: "Basic Mikrotik",
    issuer: "ID Networkers",
    issuedDate: "May 2024",
    image: "/idnid.png",
    skills: ["VLAN", "TCP/IP", "Subnetting", "Firewall", "Routing"],
    description:
      "Validates the skills and knowledge to implement, monitor, and maintain Microsoft Azure solutions, including major services related to compute, storage, network, and security.",
    credentialLink: "https://drive.google.com/file/d/1FPgDPUVeFSVCzy9KpkUOwv12zIX4ydk1/view?usp=drive_link",
  },
]

export const workExperience = [
  {
    id: 1,
    title: "Media Telekomunikasi Mandiri",
    categories: "System Engineer",
    logo: "/mtm.png",
    period: "June 2025 - Present",
    description: "Managed server HPE with VMware Operating System",
    fullDescription:
      "Responsible for maintaining and optimizing Linux and Windows server environments, implementing security protocols, and providing technical support for enterprise clients. Collaborated with the development team to ensure smooth deployment of applications and services.",
    jobDesc: [
      "Managed and maintained Linux and Windows server environments",
      "Provided technical support for enterprise clients",
      "Maintaining Container based with microservices concept application",
      "Implemented weekly automation for database backup",
      "Collaborated with development team for application deployment",
      "Monitored system performance and optimized resources",
    ],
    screenshots: ["/placeholder.svg?height=250&width=450", "/placeholder.svg?height=250&width=450"],
  },
  {
    id: 2,
    title: "Asia Sistem Indonesia",
    categories: "System Administrator Associate - IT Support",
    logo: "/AsiaSistem.jpeg",
    period: "June 2024 - May 2025",
    description: "Managed server infrastructure include Dell and HPE Server with Vmware and Fortigate for Networking.",
    fullDescription:
      "Responsible for maintaining and optimizing on-premise server environments, designing and implementing security protocols. Collaborated with the development team to ensure smooth deployment of applications and services.",
    jobDesc: [
      "Configure and maintained Linux and Windows server environments",
      "Configure and maintained Dell and HPE Server Unit",
      "Configure and maintained Vmware ESXi with VCenter Orchestration",
      "Configure and maintained Fortigate for VLAN Tagging and Security Server environments",
      "Collaborated with development team for application deployment",
      "Monitored system performance and optimized resources",
    ],
    screenshots: ["/asiasistem-act1.jpeg?height=250&width=450", "/asiasistem-act2.jpeg?height=250&width=450"],
  },
]

export const socialLinks = [
  { icon: "Linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/azkaabdillah/" },
  { icon: "Instagram", label: "Instagram", href: "https://www.instagram.com/abdi.azkaa/" },
  { icon: "Github", label: "Github", href: "https://github.com/silvaronna" },
]
