export const skills = {
  hard: [
    {
      icon: "Server",
      title: "Server Engineering",
      description: "Experienced in Various Operating System, ensuring optimal performance and security.",
      tools: ["Linux", "Windows Server", "VMware ESXi", "OpenShift"],
      bgClass: "server-bg",
    },
    {
      icon: "Cloud",
      title: "Cloud Engineering",
      description: "Experienced hands-on cloud based server for deploying and managing scalable infrastructure.",
      tools: ["AWS", "Biznet Gio"],
      bgClass: "cloud-bg",
    },
    {
      icon: "Container",
      title: "Deployment Tools",
      description:
        "Skilled in setting up containers, managing multi-container apps, and streamlining CI/CD Pipeline Workflows.",
      tools: ["Podman/Docker", "Nginx", "Cloudflare", "Ansible", "Jenkins", "SonarQube"],
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
      "Business and Technology Modelling",
      "Database Modelling and Query Languages",
      "Backend and Frontend Development",
      "User Interface and User Experience Design",
      "Information System Analysis and Design",
    ],
  },
    {
    id: 2,
    institution: "Orbit Future Academy",
    degree: "AWS Re/Start Program",
    field: "Cloud Computing",
    location: "Jakarta, Indonesia",
    period: "2025",
    description:
      "Learned fundamentals of Cloud Computing, AWS Core Services, Cloud Security, Cloud Networking, and DevOps Basics.",
    fullDescription:
      "Learned fundamentals of Cloud Computing, AWS Core Services, Cloud Security, Cloud Networking, and DevOps Basics. Gained practical experience through hands-on labs and real-world projects simulating cloud infrastructure deployment and management.",
    courses: ["Cloud Security principles", "CI/CD toolchain", "Virtual Private Cloud", "Serverless services", "EC2 Instances", "Cloud Storage with S3" ],
  },

  {
    id: 3,
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
    title: "RedHat System Administration (RH124-RH134)",
    issuer: "RedHat",
    issuedDate: "Oct 2025",
    image: "/redhat.jpg",
    skills: ["NFS", "SELinux", "FirewallD", "Bash Scripting", "User and Group Management", "Storage Management (LVM & Partitioning)", "Process Management", "Podman Container"],
    description:
      "Foundational Linux skills such as managing files, users, networking, services, storage management, security (SELinux), system tuning, boot troubleshooting, and Bash scripting for RHEL (Red Hat Enterprise Linux), preparing for the RHCSA certification",
    credentialLink: "https://www.credly.com/badges/db926a27-a023-46f2-92cc-6022d0b6ff91/linked_in_profile",
  },

  {
    id: 3,
    title: "Fundamental of Red Hat Enterprise Linux",
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    description:
      "Build, maintain, monitor, and optimized reliable server infrastructures.",
    fullDescription:
      "During my time as a System Engineer, I was directly involved in, building, maintaining, and monitoring reliable server infrastructures.",
    jobDesc: [
      "Managed, Optimized, and Troubleshoot VMware ESXi, VCenter cluster orchestration.",
      "Manage, Configure, and Optimized HPE Proliant, and Dell PowerEdge devices.",
      "Maintaining Container based with microservices concept application",
      "Successfully reducing average deployment time by 80%+ with Ansible Automation Tools.",
      "Build Containerized Robust Monitoring System with various endpoint and datasources using Grafana",
    ],
    screenshots: ["/poweredge.jpeg?height=250&width=450", "/metricVmwareVisualization.png?height=250&width=450"],
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
      "Manage, Configure, and Optimized HPE Proliant, and Dell PowerEdge devices.",
      "Configure and maintained Vmware ESXi with VCenter Orchestration",
      "Configure and maintained Fortigate for VLAN Tagging and Firewall Policy to Securing Server environments",
      "Collaborated with development team for application deployment",
      "Monitored system performance and optimized resources",
    ],
    screenshots: ["/asiasistem-act1.jpeg?height=250&width=450", "/asiasistem-act2.jpeg?height=250&width=450"],
  },
]

export const portfolioActivities = [
  {
    id: 1,
    title: "Building High Availability Cluster OpenShift",
    location: "Independent Project",
    date: "December 2025",
    coverImage: "/openshift.png",
    gallery: [
      {
        src: "/Openshift-Clusters.drawio.png",
        caption: "Topologi High Availability Cluster OpenShift pada lingkungan VMware."
      },
      {
        src: "/PoweringOnCluster.png",
        caption: "Proses inisialisasi node cluster dan verifikasi konektivitas antar node."
      },
      {
        src: "/OCP-Dashboard-I.png",
        caption: "Tampilan dashboard OpenShift Web Console yang menunjukkan status kesehatan cluster."
      },
      {
        src: "/OCP-Dashboard-II.png",
        caption: "Monitoring detail penggunaan resource (CPU/Memory) pada setiap node."
      }
    ],
    description: [
      "Designed and deployed a highly availablity OpenShift cluster on VMware.",
      "Configured HAProxy for load balancing traffic across control plane and worker nodes.",
      "Integrated VIP Keepalived and HAProxy to ensure failover capabilities for critical services.",
      "Configured DNS Server for Communication Inter Node on Openshift Cluster.",
      "Hardened security using SELinux policies and RBAC for multi-tenant isolation."
    ],
    techStack: ["OpenShift", "Kubernetes", "HAProxy", "RHEL", "VMware", "Orchestrated Containers"],
    docLink: "https://www.notion.so/OpenShift-Container-Platform-2c87649716e780aabf8df99e4f7b74dd?source=copy_link"
  },
  {
    id: 2,
    title: "Robust Multi End-Point Grafana Monitoring System",
    location: "Media Telekomunikasi Mandiri",
    date: "July 2025",
    coverImage: "/grafana-wpp.png",
    gallery: [
      {
        src: "/Dashboard-Craft.png",
        caption: "Custom Dashboard Grafana untuk visualisasi metrik server secara real-time."
      },
      {
        src: "/InfluxDB-Dashboard.png",
        caption: "Konfigurasi Datasource InfluxDB untuk penyimpanan metrik time-series."
      },
      {
        src: "/Deploy-withAnsible.png",
        caption: "Automasi deployment agent monitoring menggunakan Ansible Playbook."
      },
      {
        src: "/SuccessVisualizedGrafanawithNodeExporter.png",
        caption: "Integrasi sukses Node Exporter untuk monitoring hardware resource."
      },
      {
        src: "/bgp-flap.png",
        caption: "Panel monitoring jaringan untuk mendeteksi BGP Flapping."
      }
    ],
    description: [
      "Building Container Pipeline for Grafana Monitoring System",
      "Setting up PostgreSQL as Grafana Database Backend for better performance and reliability.",
      "Integrated multiple data sources including Prometheus exporter, InfluxDB, and Node Exporter for specific metric device monitoring.",
      "Monitoring various endpoint including RHEL Based Server, Juniper Switch, and VMware Esxi Clusters.",
      "Developed custom dashboards for visualizing server performance, network traffic, and application metrics.",
      "Perform Deployment with Ansible Automation to streamline setup and configuration for above 20+ various endpoints."
    ],
    techStack: ["Docker", "Ansible", "Grafana"],
    docLink: "#"
  }
]

export const techStack = [
  {
    name: "Docker",
    logo: "/docker.png",
    description: "Containerization platform for deployment",
  },
  {
    name: "Red Hat",
    logo: "redhat.png",
    description: "Enterprise Linux for server infrastructure",
  },
  {
    name: "GitHub Actions",
    logo: "/github-actions.png",
    description: "Simple light-weighted CI/CD automation workflows",
  },
  {
    name: "Tailwind CSS",
    logo: "/tailwindcss.png",
    description: "Utility-first CSS framework",
  },
  {
    name: "React",
    logo: "/react.png",
    description: "React JS with Vite for frontend",
  },
  {
    name: "Node.js",
    logo: "/nodejs.png",
    description: "JavaScript runtime for backend",
  },
]

export const socialLinks = [
  { icon: "Linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/azkaabdillah/" },
  { icon: "Instagram", label: "Instagram", href: "https://www.instagram.com/abdi.azkaa/" },
  { icon: "Github", label: "Github", href: "https://github.com/silvaronna" },
]
