import { Internship, Mentor, ResourceItem } from '../types';

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'int-1',
    title: 'Full Stack Web Development Training & Internship',
    company: 'InternsLoom',
    department: 'Web Engineering',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + Live Industry Project)',
    trainingDuration: '3 Months Intensive Hands-on Training',
    internshipDuration: '3 Months Industry Live Project Internship',
    mode: 'Live Interactive & Mentored',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'MSME & Startup India Accredited Grant Available',
    tags: ['Full Stack', 'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'HTML/CSS', 'JavaScript'],
    description: 'A comprehensive 6-month Full Stack Web Development program designed to bridge academic knowledge with industry demands. Master modern frontend frameworks, backend API architectures, database management, and complete a live project internship with InternsLoom.',
    responsibilities: [
      'Phase 1 (Training): Build responsive web applications using HTML5, CSS3, JavaScript ES6+, React, and Node.js.',
      'Phase 2 (Internship): Develop end-to-end full stack web portals and REST APIs for InternsLoom client solutions.',
      'Collaborate with industry mentors in weekly code review sessions and agile sprint boards.',
      'Participate in mock technical interviews, aptitude preparation, and HR personality development workshops.'
    ],
    requirements: [
      'Pursuing or completed B.Tech, BCA, BSc CS, IT, or any enthusiastic learner aiming for software careers.',
      'Basic familiarity with computer concepts and logic building.',
      'Dedication of 6-8 hours/week for training sessions and project assignments.',
      'Laptop/PC with stable internet connection.'
    ],
    benefits: [
      'ISO 9001:2015 Certified Web Development Training Certificate.',
      'Official InternsLoom Internship Experience Certificate.',
      'Letter of Recommendation (LOR) for top performing interns.',
      'Placement Support & Guaranteed Mock Interview preparation with 100+ partner companies.',
      'Recognized by MSME, Startup India, and Ministry of Corporate Affairs (MCA).'
    ],
    certifications: [
      'ISO Certified Full Stack Web Developer Certificate',
      'Verified InternsLoom Industry Internship Experience Certificate',
      'Letter of Recommendation (LOR) for High Performers'
    ],
    toolsCovered: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git & GitHub', 'Postman'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Frontend Fundamentals, UI Systems & React.js',
        duration: 'Month 1',
        topics: [
          'HTML5 semantic markup & responsive CSS3 Flexbox/Grid',
          'JavaScript ES6+ async/await, DOM manipulation, and promises',
          'React components, hooks, state management, and props',
          'Building modern interactive web interfaces with Tailwind CSS'
        ]
      },
      {
        moduleNumber: 2,
        title: 'Backend Architecture & RESTful API Engineering',
        duration: 'Month 2',
        topics: [
          'Node.js runtime environment & Express.js web server creation',
          'Database design with MongoDB, Mongoose schemas, and SQL basics',
          'Authentication, JWT tokens, password hashing, and middleware',
          'REST API design principles and CRUD operations'
        ]
      },
      {
        moduleNumber: 3,
        title: 'Full Stack Integration, Deployment & Git Workflows',
        duration: 'Month 3',
        topics: [
          'Connecting React frontend with Node/Express APIs',
          'Version control with Git, GitHub pull requests, and branching',
          'Deploying applications to cloud platforms (Vercel, Render, AWS)',
          'Performance optimization, debugging, and security best practices'
        ]
      },
      {
        moduleNumber: 4,
        title: 'Live Industry Capstone & Internship Execution',
        duration: 'Months 4 - 6',
        topics: [
          'Real-world client project allocation under senior tech mentors',
          'System architecture planning and sprint delivery',
          'Placement assistance: Aptitude training, Resume building, and Mock HR interviews'
        ]
      }
    ],
    liveProjects: [
      {
        title: 'E-Commerce Marketplace Portal with Payment Gateway',
        description: 'Build a production-ready shopping platform featuring user auth, cart management, and order tracking.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API']
      },
      {
        title: 'Real-Time Collaborative Dashboard',
        description: 'Construct a multi-user task management application with live notification feeds and search filters.',
        techStack: ['React', 'Tailwind CSS', 'Node.js', 'WebSockets']
      }
    ],
    postedDate: '1 day ago',
    applicantsCount: 512,
    featured: true
  },
  {
    id: 'int-2',
    title: 'Advanced Cyber Security Training & Internship',
    company: 'InternsLoom',
    department: 'Cyber Security & Forensics',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + Live Security Audits)',
    trainingDuration: '3 Months Cybersecurity Masterclass',
    internshipDuration: '3 Months Security Analyst Internship',
    mode: 'Live Interactive & Mentored',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'Early Bird Merit Scholarship Available',
    tags: ['Cyber Security', 'Ethical Hacking', 'Penetration Testing', 'Wireshark', 'Linux', 'Network Defense', 'Metasploit'],
    description: 'Master advanced cybersecurity, ethical hacking, network forensics, and penetration testing. Understand vulnerability identification, system defense mechanisms, and execute real-world security audit simulations.',
    responsibilities: [
      'Phase 1: Learn offensive and defensive security concepts, Linux administration, and network analysis.',
      'Phase 2: Perform web application security testing, vulnerability assessments, and log analysis on simulated enterprise networks.',
      'Draft comprehensive security audit reports detailing vulnerability findings and remediation steps.',
      'Participate in CTF (Capture The Flag) competitions and live threat hunting workshops.'
    ],
    requirements: [
      'Students in CS, IT, Computer Applications, or networking enthusiasts.',
      'Interest in cybersecurity, ethical hacking, and computer networks.',
      'Basic understanding of operating systems (Windows/Linux).'
    ],
    benefits: [
      'ISO 9001:2015 Certified Cyber Security Specialist Certificate.',
      'Official InternsLoom Cybersecurity Internship Completion Certificate.',
      'Letter of Recommendation (LOR) for top performers.',
      'Placement support for SOC Analyst and Security Auditor roles.'
    ],
    certifications: [
      'ISO Certified Advanced Cyber Security Specialist',
      'InternsLoom Security Analyst Internship Certificate',
      'Letter of Recommendation signed by Security Leads'
    ],
    toolsCovered: ['Kali Linux', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'OWASP ZAP', 'Hydra', 'John the Ripper'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Networking Fundamentals & Linux Administration',
        duration: 'Month 1',
        topics: ['TCP/IP protocol suite, OSI model, and IP subnets', 'Linux command line mastery and permissions', 'Network packet capturing with Wireshark', 'Footprinting & information gathering techniques']
      },
      {
        moduleNumber: 2,
        title: 'Ethical Hacking & Vulnerability Assessment',
        duration: 'Month 2',
        topics: ['Port scanning and network discovery with Nmap', 'System hacking, password cracking, and privilege escalation', 'Malware analysis concepts and social engineering vectors', 'Vulnerability scanning with Nessus and OpenVAS']
      },
      {
        moduleNumber: 3,
        title: 'Web Application Security & OWASP Top 10',
        duration: 'Month 3',
        topics: ['SQL Injection (SQLi) and Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF) & authentication bypass', 'Burp Suite web proxy interception and bug hunting', 'Securing REST APIs and web servers']
      },
      {
        moduleNumber: 4,
        title: 'Live Security Internship & Audit Operations',
        duration: 'Months 4 - 6',
        topics: ['Conducting end-to-end penetration testing on test labs', 'Security incident report writing and client presentation', 'Career guidance, SOC analyst interview prep, and placement assistance']
      }
    ],
    liveProjects: [
      {
        title: 'Enterprise Web Application Vulnerability Assessment',
        description: 'Audit an enterprise portal against OWASP Top 10 vulnerabilities and compile actionable security patch guides.',
        techStack: ['Burp Suite', 'OWASP ZAP', 'Nmap', 'Linux']
      }
    ],
    postedDate: '2 days ago',
    applicantsCount: 428,
    featured: true
  },
  {
    id: 'int-3',
    title: 'Artificial Intelligence & Generative AI Program',
    company: 'InternsLoom',
    department: 'Artificial Intelligence & ML',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + AI Industry Project)',
    trainingDuration: '3 Months AI Engineering Masterclass',
    internshipDuration: '3 Months AI Application Developer Internship',
    mode: 'Live Interactive',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'Startup India & MSME Student Waiver',
    tags: ['Artificial Intelligence', 'Python', 'Neural Networks', 'NLP', 'Generative AI', 'Deep Learning', 'PyTorch'],
    description: 'Explore the frontier of Artificial Intelligence. Master Python for AI, artificial neural networks, natural language processing (NLP), computer vision, and modern Generative AI application development.',
    responsibilities: [
      'Phase 1: Build AI models using Python, TensorFlow, PyTorch, and NLP libraries.',
      'Phase 2: Develop custom LLM pipelines, autonomous chatbots, and generative AI features for real business cases.',
      'Work alongside AI mentors on dataset curation, model evaluation, and prompt engineering.',
      'Present capstone AI solutions in demo days and build a high-impact portfolio.'
    ],
    requirements: [
      'Students or graduates with an interest in Python programming and AI.',
      'Basic knowledge of high-school mathematics (algebra, matrices).'
    ],
    benefits: [
      'ISO 9001:2015 Certified Artificial Intelligence Specialist Certificate.',
      'InternsLoom AI Internship Completion Certificate.',
      'Letter of Recommendation for top performing AI developers.',
      'Career placement support with AI product startups and tech firms.'
    ],
    certifications: [
      'ISO Certified Artificial Intelligence & GenAI Engineer',
      'InternsLoom AI Internship Experience Certificate',
      'AI Lead Recommendation Letter'
    ],
    toolsCovered: ['Python', 'NumPy', 'Pandas', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'OpenCV', 'Gemini API', 'LangChain'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Python for AI & Scientific Computing',
        duration: 'Month 1',
        topics: ['Python programming syntax, data structures, and OOP', 'Vectorized matrix operations with NumPy', 'Data manipulation and cleaning using Pandas', 'Data visualization with Matplotlib & Seaborn']
      },
      {
        moduleNumber: 2,
        title: 'Machine Learning & Neural Network Foundations',
        duration: 'Month 2',
        topics: ['Supervised and unsupervised learning algorithms', 'Perceptrons, activation functions, and gradient descent', 'Building Artificial Neural Networks (ANN) in PyTorch', 'Model evaluation, overfitting prevention, and hyperparameter tuning']
      },
      {
        moduleNumber: 3,
        title: 'NLP, Computer Vision & Generative AI',
        duration: 'Month 3',
        topics: ['Text processing, word embeddings (Word2Vec, SpaCy)', 'Natural Language Processing and Sentiment Analysis', 'Computer Vision basics with OpenCV', 'Generative AI, Large Language Models (LLMs), and Prompt Engineering']
      },
      {
        moduleNumber: 4,
        title: 'Live Industry AI Internship Project',
        duration: 'Months 4 - 6',
        topics: ['Deploying AI microservices with FastAPI/Flask', 'Building RAG (Retrieval-Augmented Generation) document search tools', 'Placement support and AI engineer technical interview prep']
      }
    ],
    liveProjects: [
      {
        title: 'Multimodal Generative AI Customer Assistant',
        description: 'Develop an intelligent customer support agent leveraging GenAI, document semantic search, and real-time response generation.',
        techStack: ['Python', 'PyTorch', 'Gemini API', 'FastAPI', 'LangChain']
      }
    ],
    postedDate: '3 days ago',
    applicantsCount: 610,
    featured: true
  },
  {
    id: 'int-4',
    title: 'Network Security & Infrastructure Program',
    company: 'InternsLoom',
    department: 'Network Engineering',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + Live Network Administration)',
    trainingDuration: '3 Months Network Architecture Training',
    internshipDuration: '3 Months Network Security Internship',
    mode: 'Live Interactive',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'Merit Scholarship Available',
    tags: ['Network Security', 'Cisco Protocols', 'Firewalls', 'TCP/IP', 'VPN', 'Routing & Switching', 'System Admin'],
    description: 'Build enterprise-grade network security skills. Learn routing and switching, firewall configuration, VPN tunnel management, intrusion prevention, and secure cloud networking architecture.',
    responsibilities: [
      'Phase 1: Configure routers, switches, subnets, and firewalls using network emulation tools.',
      'Phase 2: Assist in managing enterprise network security policies, monitoring traffic anomalies, and setting up secure VPN gateways.',
      'Analyze network logs to detect unauthorized access attempts and configure IDS/IPS rules.'
    ],
    requirements: [
      'Students in IT, Computer Science, Electronics, or Networking.',
      'Eagerness to learn computer networking protocols and security management.'
    ],
    benefits: [
      'ISO 9001:2015 Certified Network Security Engineer Certificate.',
      'InternsLoom Network Security Internship Certificate.',
      'Preparation support for CCNA / Network Security certifications.',
      'Direct interview referrals with IT infrastructure companies.'
    ],
    certifications: [
      'ISO Certified Network Security Engineer',
      'InternsLoom Network Infrastructure Internship Certificate',
      'Network Team LOR for Top Candidates'
    ],
    toolsCovered: ['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'PFSense Firewall', 'PuTTY', 'OpenVPN', 'Nmap'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Network Topology, Subnetting & Cisco Routing',
        duration: 'Month 1',
        topics: ['IP Addressing (IPv4/IPv6), CIDR, and VLSM subnetting', 'VLANs, Trunking, and Spanning Tree Protocol (STP)', 'Static and Dynamic Routing (OSPF, BGP basics)', 'Cisco IOS CLI configuration']
      },
      {
        moduleNumber: 2,
        title: 'Firewalls, VPNs & Network Access Control',
        duration: 'Month 2',
        topics: ['Stateful vs stateless firewall architecture', 'Configuring Access Control Lists (ACLs)', 'Setting up site-to-site and client VPNs (IPsec, OpenVPN)', 'NAT, PAT, and Port Forwarding rules']
      },
      {
        moduleNumber: 3,
        title: 'Network Monitoring & Intrusion Detection (IDS/IPS)',
        duration: 'Month 3',
        topics: ['Intrusion Detection & Prevention Systems (Snort, Suricata)', 'Network traffic baseline analysis and anomaly detection', 'Wireless security protocols (WPA2/WPA3 enterprise)', 'System logging (Syslog) and SIEM basics']
      },
      {
        moduleNumber: 4,
        title: 'Live Network Infrastructure Internship',
        duration: 'Months 4 - 6',
        topics: ['Simulated enterprise network architecture blueprinting', 'Disaster recovery and network redundancy design', 'Network administrator mock interviews and placement support']
      }
    ],
    liveProjects: [
      {
        title: 'Secure Multi-Branch Enterprise Network Architecture',
        description: 'Design and deploy a multi-site network topology complete with VLAN segmentation, firewall rules, and site-to-site VPN.',
        techStack: ['Cisco Packet Tracer', 'PFSense', 'Wireshark', 'OpenVPN']
      }
    ],
    postedDate: 'Just now',
    applicantsCount: 315,
    featured: true
  },
  {
    id: 'int-5',
    title: 'Data Science & Data Analytics Training & Internship',
    company: 'InternsLoom',
    department: 'Data & Business Intelligence',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + Live Data Analytics Project)',
    trainingDuration: '3 Months Data Analytics Masterclass',
    internshipDuration: '3 Months Data Analyst Internship',
    mode: 'Live Interactive & Mentored',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'Scholarship Waiver for Eligible Students',
    tags: ['Data Science', 'Data Analytics', 'Python', 'Pandas', 'SQL', 'Power BI', 'Excel', 'Scikit-Learn'],
    description: 'Transform raw data into strategic business insights. Learn data cleaning, SQL query mastery, exploratory data analysis, statistical modeling, machine learning, and interactive dashboard creation in Power BI.',
    responsibilities: [
      'Phase 1: Clean complex datasets, write analytical SQL queries, and construct predictive ML models.',
      'Phase 2: Build live executive dashboards and KPI reporting tools for business clients.',
      'Extract data from disparate sources, perform statistical hypothesis testing, and deliver data stories.'
    ],
    requirements: [
      'Open to students from CS, IT, Data Science, Math, Business, or Commerce background.',
      'Basic familiarity with Excel or any programming language.'
    ],
    benefits: [
      'ISO 9001:2015 Certified Data Analyst & Scientist Certificate.',
      'Verified InternsLoom Data Analytics Internship Certificate.',
      'Letter of Recommendation for outstanding performers.',
      'Resume review and interview preparation with senior data scientists.'
    ],
    certifications: [
      'ISO Certified Data Scientist & Analyst',
      'InternsLoom Data Analytics Internship Completion Certificate',
      'Senior Analyst Recommendation Letter'
    ],
    toolsCovered: ['Python', 'Pandas', 'NumPy', 'SQL / PostgreSQL', 'Power BI', 'Excel Advanced', 'Scikit-Learn', 'Tableau'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Excel & SQL Data Wrangling Mastery',
        duration: 'Month 1',
        topics: ['Advanced Excel formulas, pivot tables, and VLOOKUP/XLOOKUP', 'SQL relational database concepts and table creation', 'Complex SQL joins, group by, aggregations, and subqueries', 'Window functions and CTEs for business metrics']
      },
      {
        moduleNumber: 2,
        title: 'Python for Data Analysis & Exploratory Data Analysis',
        duration: 'Month 2',
        topics: ['Pandas DataFrames, data cleaning, and handling missing values', 'Data transformation and feature engineering', 'Statistical analysis and correlation discovery', 'Data visualization with Matplotlib, Seaborn, and Plotly']
      },
      {
        moduleNumber: 3,
        title: 'Machine Learning & Power BI Dashboarding',
        duration: 'Month 3',
        topics: ['Supervised learning: Linear Regression, Decision Trees, Random Forest', 'Customer segmentation with K-Means clustering', 'Power BI data modeling (DAX measures) and interactive visuals', 'Executive dashboard design and data storytelling']
      },
      {
        moduleNumber: 4,
        title: 'Live Industry Data Analytics Internship',
        duration: 'Months 4 - 6',
        topics: ['Analyzing real-world sales, marketing, and operational datasets', 'Automating data processing pipelines', 'Data science interview coaching, resume optimization, and placement assistance']
      }
    ],
    liveProjects: [
      {
        title: 'E-Commerce Customer Churn Prediction & BI Dashboard',
        description: 'Build a machine learning pipeline that forecasts user churn rate coupled with a Power BI interactive executive dashboard.',
        techStack: ['Python', 'Pandas', 'Scikit-Learn', 'SQL', 'Power BI']
      }
    ],
    postedDate: '4 days ago',
    applicantsCount: 480
  },
  {
    id: 'int-6',
    title: 'Cloud Computing & AWS DevOps Program',
    company: 'InternsLoom',
    department: 'Cloud & DevOps',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + Cloud Infrastructure Internship)',
    trainingDuration: '3 Months Cloud & DevOps Bootcamp',
    internshipDuration: '3 Months Cloud Engineer Internship',
    mode: 'Live Interactive',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'Grant Sponsored by EdTech Partner',
    tags: ['AWS', 'Cloud Computing', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Linux', 'Terraform'],
    description: 'Master Amazon Web Services (AWS) and modern DevOps practices. Learn server provisioning, containerization with Docker, orchestration with Kubernetes, CI/CD automation, and cloud security architecture.',
    responsibilities: [
      'Phase 1: Provision AWS EC2 instances, S3 storage buckets, VPC networks, and Docker containers.',
      'Phase 2: Deploy automated CI/CD pipelines and microservices infrastructure for live applications.',
      'Monitor cloud resource usage, configure auto-scaling, and enforce IAM security policies.'
    ],
    requirements: [
      'Students in CS, IT, Software Engineering, or IT management.',
      'Basic knowledge of Linux commands and web concepts.'
    ],
    benefits: [
      'ISO 9001:2015 Certified Cloud & DevOps Engineer Certificate.',
      'InternsLoom Cloud Internship Experience Certificate.',
      'AWS Certified Cloud Practitioner & Solutions Architect interview prep.',
      'Placement support with cloud consultancies and tech enterprises.'
    ],
    certifications: [
      'ISO Certified Cloud Computing & DevOps Specialist',
      'InternsLoom Cloud Engineering Internship Certificate',
      'Lead DevOps Engineer Letter of Recommendation'
    ],
    toolsCovered: ['AWS (EC2, S3, IAM, VPC, Lambda)', 'Docker', 'Kubernetes', 'GitHub Actions', 'Linux (Ubuntu)', 'Nginx', 'Terraform'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Linux Systems & AWS Cloud Fundamentals',
        duration: 'Month 1',
        topics: ['Linux shell scripting, user management, and SSH key pairs', 'Introduction to Cloud Computing & AWS Global Infrastructure', 'AWS EC2 virtual machines, Security Groups, and EBS storage', 'AWS S3 object storage, buckets, and lifecycle policies']
      },
      {
        moduleNumber: 2,
        title: 'Virtual Private Cloud (VPC) & AWS Identity Access',
        duration: 'Month 2',
        topics: ['Creating custom AWS VPCs, public/private subnets, and NAT Gateways', 'AWS IAM roles, policies, and multi-factor authentication', 'Elastic Load Balancing (ELB) and Auto-Scaling Groups', 'Serverless computing with AWS Lambda & API Gateway']
      },
      {
        moduleNumber: 3,
        title: 'Docker Containerization & CI/CD Pipelines',
        duration: 'Month 3',
        topics: ['Building lightweight Docker container images and Dockerfiles', 'Multi-container setups with Docker Compose', 'CI/CD pipeline automation using GitHub Actions', 'Introduction to Kubernetes container orchestration']
      },
      {
        moduleNumber: 4,
        title: 'Live Cloud Infrastructure Internship',
        duration: 'Months 4 - 6',
        topics: ['Deploying highly available multi-tier web applications on AWS', 'Infrastructure as Code (IaC) with Terraform basics', 'DevOps engineer placement assistance and mock interview sessions']
      }
    ],
    liveProjects: [
      {
        title: 'Automated Microservices Cloud Deployment Pipeline',
        description: 'Dockerize a full stack web app and configure automated CI/CD deployment to AWS Cloud infrastructure with SSL certificates.',
        techStack: ['AWS', 'Docker', 'GitHub Actions', 'Linux', 'Nginx']
      }
    ],
    postedDate: '3 days ago',
    applicantsCount: 390
  },
  {
    id: 'int-7',
    title: 'Java Enterprise & Spring Boot Development Program',
    company: 'InternsLoom',
    department: 'Backend Engineering',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend & Learning Allowance + Internship Certificate',
    duration: '6 Months (Training + Live Java Project)',
    trainingDuration: '3 Months Java & Spring Boot Masterclass',
    internshipDuration: '3 Months Java Developer Internship',
    mode: 'Live Interactive',
    batchDate: 'Upcoming Batch: Starting Next Week',
    scholarshipFee: 'Merit Scholarship Available',
    tags: ['Java', 'Spring Boot', 'Object-Oriented Programming', 'MySQL', 'REST APIs', 'Hibernate', 'Microservices'],
    description: 'Master core & enterprise Java development. Learn object-oriented design, data structures in Java, Spring Boot microservices framework, Hibernate ORM, relational databases, and RESTful web service architecture.',
    responsibilities: [
      'Phase 1: Solve complex algorithmic problems in Java and build Spring Boot backend applications.',
      'Phase 2: Construct secure microservices APIs and database integrations for enterprise software.',
      'Participate in daily standups, write clean documented Java code, and perform unit testing with JUnit.'
    ],
    requirements: [
      'Students or graduates in CS, IT, Software Engineering, or related technical fields.',
      'Fundamental understanding of logic building and basic programming principles.'
    ],
    benefits: [
      'ISO 9001:2015 Certified Java Enterprise Developer Certificate.',
      'InternsLoom Java Internship Completion Certificate.',
      'Letter of Recommendation signed by Senior Backend Leads.',
      'Direct placement assistance with product development firms.'
    ],
    certifications: [
      'ISO Certified Java & Spring Boot Developer',
      'InternsLoom Java Internship Experience Certificate',
      'Backend Lead Letter of Recommendation'
    ],
    toolsCovered: ['Java 17/21', 'Spring Boot', 'Spring Security', 'Hibernate ORM', 'MySQL', 'Maven', 'Postman', 'Git'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Core Java, OOP & Data Structures',
        duration: 'Month 1',
        topics: ['Java syntax, data types, control flow, and arrays', 'Object-Oriented Programming: Inheritance, Polymorphism, Encapsulation, Abstraction', 'Java Collections Framework (ArrayList, HashMap, HashSet)', 'Exception handling, I/O streams, and multithreading basics']
      },
      {
        moduleNumber: 2,
        title: 'Database Integration with MySQL & Hibernate',
        duration: 'Month 2',
        topics: ['Relational database design and SQL queries', 'JDBC database connectivity and connection pools', 'Hibernate ORM mapping entities and relationships (OneToMany, ManyToMany)', 'Spring Data JPA repositories and custom query creation']
      },
      {
        moduleNumber: 3,
        title: 'Spring Boot Framework & REST Microservices',
        duration: 'Month 3',
        topics: ['Dependency Injection (DI) and Inversion of Control (IoC)', 'Building RESTful APIs with @RestController and JSON', 'API authentication with Spring Security and JWT tokens', 'Unit testing with JUnit 5 and Mockito']
      },
      {
        moduleNumber: 4,
        title: 'Live Enterprise Java Internship',
        duration: 'Months 4 - 6',
        topics: ['Developing an end-to-end banking or ERP backend service', 'Microservice communications and Maven build tools', 'Java backend interview preparation and placement assistance']
      }
    ],
    liveProjects: [
      {
        title: 'Enterprise Banking & Transaction Management API',
        description: 'Design a high-security Spring Boot REST API for transaction logging, user accounts, and JWT token authentication.',
        techStack: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'Hibernate']
      }
    ],
    postedDate: '5 days ago',
    applicantsCount: 360
  },
  {
    id: 'int-8',
    title: 'Campus Engagement & Recruitment Internship',
    company: 'InternsLoom',
    department: 'Talent Acquisition & Marketing',
    location: 'Remote / Work From Home',
    workType: 'Remote',
    stipend: 'Stipend / Learning Allowance + Certificate + LOR',
    duration: '3 Months (Part-Time / Flexible Hours)',
    trainingDuration: '1 Week Orientation & Leadership Onboarding',
    internshipDuration: '3 Months Campus Ambassador & Recruitment Internship',
    mode: 'Flexible WFH',
    batchDate: 'Upcoming Batch: Immediate Onboarding',
    scholarshipFee: '100% Free Program (No Fee)',
    tags: ['HR Recruitment', 'Campus Outreach', 'Public Relations', 'Event Management', 'Communication', 'Marketing'],
    description: 'Gain real-world experience in corporate talent recruitment, campus leadership, and marketing outreach. Act as the primary brand liaison between InternsLoom and your university campus, organizing student workshops and referral drives.',
    responsibilities: [
      'Lead student engagement activities and promote tech training programs across campus networks.',
      'Coordinate with college societies, placement cells, and student groups for tech webinars.',
      'Assist the HR recruitment team in screening student applicants for tech internship cohorts.',
      'Represent InternsLoom in campus ambassador campaigns and community channels.'
    ],
    requirements: [
      'Currently enrolled college student in any year or degree program.',
      'Good communication, interpersonal skills, and active participation in college activities.',
      'Ability to dedicate 4-6 hours per week on flexible schedule.'
    ],
    benefits: [
      'Official Campus Ambassador & HR Recruitment Internship Certificate.',
      'Letter of Recommendation (LOR) for top performing ambassadors.',
      'Performance-based stipends, rewards, and free access to premium tech training courses.',
      'Leadership & event management experience for your resume.'
    ],
    certifications: [
      'InternsLoom Campus Ambassador Internship Certificate',
      'HR & Marketing Leadership Certificate',
      'Letter of Recommendation signed by Managing Director'
    ],
    toolsCovered: ['LinkedIn Outreach', 'Canva', 'Google Workspace', 'Zoom / Google Meet', 'Telegram / Discord Community Tools'],
    curriculum: [
      {
        moduleNumber: 1,
        title: 'Corporate Onboarding & Outreach Strategy',
        duration: 'Week 1',
        topics: ['Introduction to InternsLoom mission and training offerings', 'Campus branding strategies and social media presence', 'Communication etiquette and outreach techniques']
      },
      {
        moduleNumber: 2,
        title: 'Event Management & Workshop Coordination',
        duration: 'Weeks 2 - 6',
        topics: ['Planning tech webinars and campus coding competitions', 'Collaborating with college placement drives and student clubs', 'Student query resolution and program guidance']
      },
      {
        moduleNumber: 3,
        title: 'Talent Screening & Recruitment Operations',
        duration: 'Weeks 7 - 12',
        topics: ['Assisting HR in applicant profile evaluation', 'Building campus referral networks', 'Final performance evaluation and certificate distribution']
      }
    ],
    liveProjects: [
      {
        title: 'University Tech Career Fair & Student Drive',
        description: 'Organize a campus-wide online tech career drive connecting 200+ students with InternsLoom training bootcamps.',
        techStack: ['LinkedIn', 'Canva', 'Google Sheets', 'Community Outreach']
      }
    ],
    postedDate: 'Today',
    applicantsCount: 650,
    featured: true
  }
];


export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'men-1',
    name: 'Elena Rostova',
    role: 'Staff Software Engineer',
    company: 'TechNova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: '10+ years leading backend infrastructure and distributed systems. Helped 40+ students break into top tier tech.',
    expertise: ['System Design', 'Backend Architecture', 'Resume Review', 'Behavioral Interviews'],
    rating: 4.98,
    reviewsCount: 56,
    availability: 'This Week (Tue, Thu)'
  },
  {
    id: 'men-2',
    name: 'Marcus Vance',
    role: 'Principal Design Lead',
    company: 'Orbital',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Former Apple Human Interface designer. Specializes in glassmorphic UI systems and portfolio critiques.',
    expertise: ['Portfolio Critique', 'UI/UX Design', 'Design Systems', 'Figma Mastery'],
    rating: 5.00,
    reviewsCount: 42,
    availability: 'Tomorrow'
  },
  {
    id: 'men-3',
    name: 'Sarah Lin',
    role: 'VP of Product Strategy',
    company: 'Veritas Capital',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Ex-McKinsey Engagement Manager. Guides students on case interviews, financial modeling, and venture capital strategy.',
    expertise: ['Case Interviews', 'Venture Capital', 'Executive Comms', 'Networking'],
    rating: 4.95,
    reviewsCount: 38,
    availability: 'Friday'
  },
  {
    id: 'men-4',
    name: 'Devon Wright',
    role: 'Co-Founder & CTO',
    company: 'Nexus Core',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'YC alum building frontier AI. Passionate about helping ambitious engineering students land founding roles at early stage startups.',
    expertise: ['AI/ML Engineering', 'Startup Strategy', 'Technical Screening', 'Cold Outreach'],
    rating: 4.97,
    reviewsCount: 61,
    availability: 'This Weekend'
  }
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'The 2026 Tech & Design Resume Blueprint',
    category: 'Resume Vault',
    description: 'An actionable, line-by-line breakdown of resumes that passed ATS screens at TechNova, Orbital, and Nexus Core.',
    readTime: '8 min read',
    icon: 'file-text',
    featured: true
  },
  {
    id: 'res-2',
    title: 'System Design Interview Cheatsheet for Interns',
    category: 'Interview Prep',
    description: 'Master rate limiting, caching strategies, database sharding, and API protocol trade-offs with visual architecture diagrams.',
    readTime: '12 min read',
    icon: 'cpu',
    featured: true
  },
  {
    id: 'res-3',
    title: 'High-Conversion Cold Email Templates for Recruiters',
    category: 'Cold Outreach',
    description: 'Field-tested 4-line email scripts that get a 45%+ response rate from engineering directors and VC partners.',
    readTime: '5 min read',
    icon: 'mail',
    featured: true
  },
  {
    id: 'res-4',
    title: 'The College Negotiation Playbook: Equity & Stipends',
    category: 'Career Playbook',
    description: 'How to professionally leverage competing offers to maximize hourly rate, housing allowance, and return offer terms.',
    readTime: '10 min read',
    icon: 'award'
  }
];
