export interface SkillCategory { title: string; icon: string; skills: string[]; }
export const skillCategories: SkillCategory[] = [
  { title: "Mobile Development", icon: "📱", skills: ["Flutter", "Dart", "Android", "iOS", "Flutter Web", "Cross-Platform Development", "Responsive UI"] },
  { title: "Architecture & Design", icon: "🏛️", skills: ["Clean Architecture", "Clean Code", "SOLID Principles", "Object-Oriented Programming (OOP)", "Design Patterns", "Data Structures", "Algorithms"] },
  { title: "State Management", icon: "🔄", skills: ["BLoC", "Cubit", "Riverpod", "Provider", "GetX", "RxDart", "Streams"] },
  { title: "Backend & APIs", icon: "🌐", skills: ["REST APIs", "WebSockets", "GraphQL", "JSON", "API Integration", "Real-Time Features"] },
  { title: "Firebase", icon: "🔥", skills: ["Firebase Analytics", "Firebase Crashlytics", "Firebase Cloud Messaging (FCM)", "Firebase Authentication", "Firebase Remote Config", "Firebase Storage", "Firebase App Distribution", "Firebase Crashlytics"] },
  { title: "Data & Offline", icon: "💾", skills: ["SQLite", "Hive", "SharedPreferences", "Offline-First Architecture", "Data Synchronization", "Local Storage"] },
  { title: "AI Engineering & Development Tools", icon: "🤖", skills: ["Cursor", "GitHub Copilot", "Google Antigravity", "AI Coding Agents", "AI-Assisted Code Generation", "AI-Assisted Debugging", "AI-Assisted Testing", "Code Review", "Refactoring", "Documentation Generation"] },
  { title: "Security", icon: "🔒", skills: ["SSL/TLS Certificate Pinning", "Application Security", "Data Protection", "Secure API Integration"] },
  { title: "Integrations", icon: "🔌", skills: ["Payment Gateways", "POS Devices", "NFC", "Printing", "Google Maps", "Deep Linking", "Video Calling", "Live Video Streaming", "Third-Party SDKs"] },
  { title: "Testing & Quality", icon: "✅", skills: ["Unit Testing", "Widget Testing", "Integration Testing", "End-to-End (E2E) Testing", "Debugging", "Performance Profiling", "Performance Optimization"] },
  { title: "DevOps & Tools", icon: "⚙️", skills: ["Git", "CI/CD", "Continuous Integration", "Continuous Deployment", "FastLane", "Github Actions", "CodeMagic", "App Store Deployment", "Google Play", "Huawei AppGallery"] },
  { title: "Additional", icon: "✨", skills: ["Localization", "Internationalization (i18n)", "Multilingual Applications", "Flutter Animations", "Custom UI Transitions"] },
];
