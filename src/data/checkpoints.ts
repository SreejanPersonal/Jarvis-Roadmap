// YouTube video IDs for implemented features
const DEMO_VIDEO_IDS = [
  'dQw4w9WgXcQ', // Using Rick Roll as placeholder
  'dQw4w9WgXcQ', // Same ID for all implemented videos
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
];

export const checkpoints = [
  {
    id: 1,
    title: "Good Voice + Custom Voice",
    status: "implemented",
    description: "Implementation of high-quality text-to-speech with customizable voice profiles.",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[0]}`,
    videoDuration: "10:45",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 3 },
      { language: "TTS Libraries", level: 2 },
    ],
    sections: [
      {
        title: "Technical Overview",
        content: "Advanced text-to-speech implementation using deep learning models for natural voice synthesis."
      },
      {
        title: "Implementation Details",
        content: "Integration with multiple TTS engines and custom voice training pipeline."
      }
    ]
  },
  {
    id: 2,
    title: "Realtime Chat Bot",
    status: "implemented",
    description: "Interactive chatbot with real-time response capabilities and natural language processing.",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[1]}`,
    videoDuration: "15:20",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "NLP", level: 2 },
      { language: "APIs", level: 2 }
    ],
    sections: [
      {
        title: "Architecture",
        content: "Event-driven architecture with websockets for real-time communication."
      },
      {
        title: "AI Integration",
        content: "Advanced language models for natural conversation flow."
      }
    ]
  },
  {
    id: 3,
    title: "Simple Content Generation",
    status: "implemented",
    description: "Generate various types of content including PPT, Images, PDFs, websites, and code.",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[2]}`,
    videoDuration: "12:30",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "AI Models", level: 3 },
    ],
    sections: [
      {
        title: "Content Types",
        content: "Supports multiple content formats with intelligent templating."
      }
    ]
  },
  {
    id: 4,
    title: "Gesture Control",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[3]}`,
    videoDuration: "18:45",
    description: "Advanced gesture recognition system for hands-free control.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Computer Vision", level: 3 },
    ],
    sections: [
      {
        title: "Vision System",
        content: "Real-time hand tracking and gesture recognition using computer vision."
      }
    ]
  },
  {
    id: 5,
    title: "Voice Lock",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[4]}`,
    videoDuration: "14:20",
    description: "Voice-based authentication and security system.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Speech Recognition", level: 3 },
    ],
    sections: [
      {
        title: "Security Features",
        content: "Voice print analysis and biometric authentication system."
      }
    ]
  },
  {
    id: 6,
    title: "Snap Function",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[5]}`,
    videoDuration: "11:15",
    description: "Quick action triggers through finger snapping detection.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Audio Processing", level: 3 },
    ],
    sections: [
      {
        title: "Audio Analysis",
        content: "Real-time audio processing for snap detection and action triggering."
      }
    ]
  },
  {
    id: 7,
    title: "Jarvis Start Up",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[6]}`,
    videoDuration: "16:30",
    description: "System initialization and startup sequence.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "System Integration", level: 3 },
    ],
    sections: [
      {
        title: "Boot Sequence",
        content: "Optimized startup routine with system checks and initialization."
      }
    ]
  },
  {
    id: 8,
    title: "Async with Threading",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[7]}`,
    videoDuration: "20:15",
    description: "Parallel processing and asynchronous task management.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Async/Threading", level: 3 },
    ],
    sections: [
      {
        title: "Performance",
        content: "Multi-threaded architecture for optimal task handling."
      }
    ]
  },
  {
    id: 9,
    title: "COT Agent Group",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[8]}`,
    videoDuration: "19:45",
    description: "Chain-of-thought agent system for complex task handling.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "AI/ML", level: 3 },
    ],
    sections: [
      {
        title: "Agent System",
        content: "Distributed AI agents working together through chain-of-thought processing."
      }
    ]
  },
  {
    id: 10,
    title: "Mini Home Automation",
    status: "implemented",
    videoUrl: `https://youtube.com/watch?v=${DEMO_VIDEO_IDS[9]}`,
    videoDuration: "17:30",
    description: "Basic home automation control system.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "IoT", level: 2 },
    ],
    sections: [
      {
        title: "Home Control",
        content: "Smart device integration and automation protocols."
      }
    ]
  },
  {
    id: 11,
    title: "Eye on the Screen",
    status: "planned",
    description: "Advanced screen activity monitoring and analysis.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Computer Vision", level: 3 },
    ]
  },
  {
    id: 12,
    title: "Browser Automation",
    status: "planned",
    description: "Automated web browser control and interaction.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Selenium", level: 3 },
    ]
  },
  {
    id: 13,
    title: "Social Media Automation",
    status: "planned",
    description: "Automated management of social media platforms.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "API Integration", level: 3 },
    ]
  },
  {
    id: 14,
    title: "Multiple Device Connection",
    status: "planned",
    description: "Multi-device synchronization and data management.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Networking", level: 3 },
    ]
  },
  {
    id: 15,
    title: "One-way Notification System",
    status: "planned",
    description: "Unified notification system across multiple platforms.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Messaging", level: 2 },
    ]
  },
  {
    id: 16,
    title: "Keep Automation",
    status: "planned",
    description: "Note-taking and information management automation.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Data Management", level: 2 },
    ]
  },
  {
    id: 17,
    title: "TODO Management",
    status: "planned",
    description: "Smart task management and organization system.",
    difficulty: "beginner",
    requirements: [
      { language: "Python", level: 1 },
      { language: "Data Storage", level: 2 },
    ]
  },
  {
    id: 18,
    title: "Reminder System",
    status: "planned",
    description: "Intelligent reminder and notification system.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Time Management", level: 2 },
    ]
  },
  {
    id: 19,
    title: "Smart Clock",
    status: "planned",
    description: "Advanced time management and scheduling system.",
    difficulty: "beginner",
    requirements: [
      { language: "Python", level: 1 },
      { language: "Time Processing", level: 2 },
    ]
  },
  {
    id: 20,
    title: "Basic Screen Automation",
    status: "planned",
    description: "Automated screen interaction and control.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "GUI Automation", level: 2 },
    ]
  },
  {
    id: 21,
    title: "Person Profiling",
    status: "planned",
    description: "AI-based personality and behavior analysis.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Machine Learning", level: 3 },
    ]
  },
  {
    id: 22,
    title: "Self Start Conversation",
    status: "planned",
    description: "Proactive conversation initiation system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "NLP", level: 3 },
    ]
  },
  {
    id: 23,
    title: "Clap Detection",
    status: "planned",
    description: "Audio-based clap recognition system.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Audio Processing", level: 2 },
    ]
  },
  {
    id: 24,
    title: "Wake Word Detection",
    status: "planned",
    description: "Custom wake word recognition system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Speech Recognition", level: 3 },
    ]
  },
  {
    id: 25,
    title: "Face Security System",
    status: "planned",
    description: "Facial recognition-based security system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Computer Vision", level: 3 },
    ]
  },
  {
    id: 26,
    title: "Smart Response System",
    status: "planned",
    description: "Context-aware response generation system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "NLP", level: 3 },
    ]
  },
  {
    id: 27,
    title: "System Optimization",
    status: "planned",
    description: "Performance optimization for low-end systems.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "System Engineering", level: 3 },
    ]
  },
  {
    id: 28,
    title: "Smart Conversation Filter",
    status: "planned",
    description: "Intelligent conversation priority system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "NLP", level: 3 },
    ]
  },
  {
    id: 29,
    title: "New GUI System",
    status: "planned",
    description: "Modern graphical user interface implementation.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "GUI Development", level: 3 },
    ]
  },
  {
    id: 30,
    title: "Web Automation",
    status: "planned",
    description: "Advanced web interaction and automation system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Web Automation", level: 3 },
    ]
  },
  {
    id: 31,
    title: "Deep File Analysis",
    status: "coming-soon",
    description: "Advanced file parsing and content analysis system.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "File Processing", level: 3 },
    ],
    sections: [
      {
        title: "File Processing",
        content: "Advanced algorithms for parsing and analyzing various file formats."
      }
    ]
  },
  {
    id: 32,
    title: "Real/Fake Data Detection",
    status: "coming-soon",
    description: "AI-powered system for detecting synthetic or manipulated content.",
    difficulty: "advanced",
    requirements: [
      { language: "Python", level: 3 },
      { language: "Machine Learning", level: 3 },
    ],
    sections: [
      {
        title: "Detection System",
        content: "Machine learning models for identifying synthetic and manipulated content."
      }
    ]
  },
  {
    id: 33,
    title: "Instant Stop on Speak",
    status: "coming-soon",
    description: "Voice-activated system interruption with immediate response.",
    difficulty: "intermediate",
    requirements: [
      { language: "Python", level: 2 },
      { language: "Speech Recognition", level: 2 },
    ],
    sections: [
      {
        title: "Voice Control",
        content: "Real-time voice command processing for instant system control."
      }
    ]
  }
] as const;