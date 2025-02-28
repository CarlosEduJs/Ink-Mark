interface SectionGroup {
  id: string;
  label: string;
  description: string;
  sections: Section[];
}

interface Section {
  id: string;
  label: string;
  description: string;
  default: boolean;
  added: boolean;
  code: string;
  defaultCode?: string;
}

const DefaultSectionGroups: SectionGroup[] = [
  {
    id: "001",
    label: "Essential Sections",
    description: "Essential and mandatory sections for your readme",
    sections: [
      {
        id: "001-001",
        label: "Title And Description",
        description: "The title and description of README.md",
        default: true,
        added: true,
        code: "# ${projectName}\n\n Enter description here...",
        defaultCode: "# ${projectName}\n\n Enter description here...",
      },
      {
        id: "001-002",
        label: "Badges",
        description: "Badges to show the status of the project",
        default: false,
        added: false,
        code: "[![Version](https://img.shields.io/badge/Version-${version}-green.svg)](${repoURL})",
        defaultCode:
          "[![Version](https://img.shields.io/badge/Version-${version}-green.svg)](${repoURL})",
      },
      {
        id: "001-003",
        label: "Getting Started",
        description: "Basic setup and first steps",
        default: false,
        added: false,
        defaultCode:
          "## 🏁 Getting Started\n\nClone the repository:\n```bash\ngit clone ${repoURL}\n```",
        code: "## 🏁 Getting Started\n\nClone the repository:\n```bash\ngit clone ${repoURL}\n```",
      },
    ],
  },
  {
    id: "002",
    label: "Project Information",
    description: "Information you can add to your readme",
    sections: [
      {
        id: "002-001",
        label: "Demonstration",
        description: "How to use: Gifs, images or link to an online version.",
        default: false,
        added: false,
        code: "## 🚀 Demonstration\n\n![Demo](https://example.com/demo.gif)\n\n[Live Demo](https://example.com)",
        defaultCode:
          "## 🚀 Demonstration\n\n![Demo](https://example.com/demo.gif)\n\n[Live Demo](https://example.com)",
      },
      {
        id: "002-002",
        label: "Installation",
        description: "How to install the project",
        default: false,
        added: false,
        code: "## 🔧 Installation\n\nUsing npm:\n```bash\nnpm install ${projectName}\n```\n\nUsing Docker:\n```bash\ndocker pull ${dockerImage}\n```",
        defaultCode:
          "## 🔧 Installation\n\nUsing npm:\n```bash\nnpm install ${projectName}\n```\n\nUsing Docker:\n```bash\ndocker pull ${dockerImage}\n```",
      },
      {
        id: "002-003",
        label: "Features & Functionality",
        description: "What the project offers and its functionalities",
        default: false,
        added: false,
        code: "## ✨ Features\n\n- Feature 1\n- Feature 2\n- Feature 3",
        defaultCode: "## ✨ Features\n\n- Feature 1\n- Feature 2\n- Feature 3",
      },
      {
        id: "002-004",
        label: "Technologies Used",
        description: "The stack used in the project",
        default: false,
        added: false,
        code: "## 🛠️ Technologies\n\n- React\n- TypeScript\n- Node.js\n- PostgreSQL",
        defaultCode:
          "## 🛠️ Technologies\n\n- React\n- TypeScript\n- Node.js\n- PostgreSQL",
      },
      {
        id: "002-005",
        label: "Deployment",
        description: "How to deploy the project",
        added: false,
        default: false,
        defaultCode: "## 🚀 Deployment\n\n```bash\nnpm run deploy\n```",
        code: "## 🚀 Deployment\n\n```bash\nnpm run deploy\n```",
      },
    ],
  },
  {
    id: "003",
    label: "Developer Guide",
    description: "Sections targeted at developers working on the project",
    sections: [
      {
        id: "003-001",
        label: "Usage",
        description: "How to use the application or code",
        default: false,
        added: false,
        code: "## 📖 Usage\n\n```javascript\nimport { Component } from '${projectName}';\n\n// Example usage\nconst example = new Component();\n```",
        defaultCode:
          "## 📖 Usage\n\n```javascript\nimport { Component } from '${projectName}';\n\n// Example usage\nconst example = new Component();\n```",
      },
      {
        id: "003-002",
        label: "Code Examples",
        description: "Code snippets to illustrate project functionality",
        default: false,
        added: false,
        code: '## 💡 Code Examples\n\n```python\ndef hello_world():\n    print("Hello World!")\n```',
        defaultCode:
          '## 💡 Code Examples\n\n```python\ndef hello_world():\n    print("Hello World!")\n```',
      },
      {
        id: "003-003",
        label: "Tests",
        description: "How to run tests for the project",
        default: false,
        added: false,
        code: "## 🧪 Tests\n\n```bash\nnpm test\n# or\nyarn test\n```",
        defaultCode: "## 🧪 Tests\n\n```bash\nnpm test\n# or\nyarn test\n```",
      },
      {
        id: "003-004",
        label: "Directory Structure",
        description: "Explanation of the project's directory layout",
        default: false,
        added: false,
        code: "## 📂 Directory Structure\n\n```\nproject/\n├── src/\n│   ├── index.js\n│   └── components/\n└── tests/\n```",
        defaultCode:
          "## 📂 Directory Structure\n\n```\nproject/\n├── src/\n│   ├── index.js\n│   └── components/\n└── tests/\n```",
      },
      {
        id: "003-005",
        label: "Contribution",
        description: "How others can contribute to the project",
        default: false,
        added: false,
        code: "## 🤝 Contribution\n\n1. Fork the project\n2. Create your feature branch\n3. Commit your changes\n4. Push to the branch\n5. Open a Pull Request",
        defaultCode:
          "## 🤝 Contribution\n\n1. Fork the project\n2. Create your feature branch\n3. Commit your changes\n4. Push to the branch\n5. Open a Pull Request",
      },
      {
        id: "003-006",
        label: "Roadmap",
        description: "Future features and enhancements planned for the project",
        default: false,
        added: false,
        code: "## 🗺 Roadmap\n\n- [ ] Feature 1\n- [ ] Feature 2\n- [x] Completed Feature",
        defaultCode:
          "## 🗺 Roadmap\n\n- [ ] Feature 1\n- [ ] Feature 2\n- [x] Completed Feature",
      },
      {
        id: "003-007",
        label: "Environment Variables",
        description: "Required environment variables configuration",
        default: false,
        added: false,
        code: "## 🔑 Environment Variables\n\n`API_KEY` - Your secret key\n`DB_URL` - Database connection URL",
        defaultCode:
          "## 🔑 Environment Variables\n\n`API_KEY` - Your secret key\n`DB_URL` - Database connection URL",
      },
    ],
  },
  {
    id: "004",
    label: "General Information",
    description: "Additional general information about the project",
    sections: [
      {
        id: "004-001",
        label: "Authors",
        description: "The contributors and authors of the project",
        default: false,
        added: false,
        code: "## 👥 Authors\n\n- [yourusername](https://github.com/yourusername)",
        defaultCode:
          "## 👥 Authors\n\n- [@yourusername](https://github.com/yourusername)",
      },
      {
        id: "004-002",
        label: "License",
        description: "Type of license used (e.g., MIT, GPL, etc.)",
        default: false,
        added: false,
        code: "## 📄 License\n\nThis project is licensed under the [MIT License](LICENSE).",
        defaultCode:
          "## 📄 License\n\nThis project is licensed under the [MIT License](LICENSE).",
      },
      {
        id: "004-003",
        label: "Acknowledgements",
        description: "Credits to tools, tutorials, or people who helped",
        default: false,
        added: false,
        code: "## 🙏 Acknowledgements\n\n- [Awesome Resource](https://example.com)\n- Inspiration Project\n- Community Support",
        defaultCode:
          "## 🙏 Acknowledgements\n\n- [Awesome Resource](https://example.com)\n- Inspiration Project\n- Community Support",
      },
    ],
  },
  {
    id: "005",
    label: "Additional Sections (Optional)",
    description: "Optional sections you can add to your readme",
    sections: [
      {
        id: "005-001",
        label: "FAQ",
        description: "Frequently Asked Questions about the project",
        default: false,
        added: false,
        code: "## ❓ FAQ\n\n**Q: How to start?**\nA: Run 'npm start'",
        defaultCode: "## ❓ FAQ\n\n**Q: How to start?**\nA: Run 'npm start'",
      },
      {
        id: "005-002",
        label: "Support",
        description: "How users can get support for the project",
        default: false,
        added: false,
        code: "## 💬 Support\n\nFor support, email example@email.com or join our Slack channel.",
        defaultCode:
          "## 💬 Support\n\nFor support, email example@email.com or join our Slack channel.",
      },
      {
        id: "005-003",
        label: "Sponsorship",
        description: "How users can financially support the project",
        default: false,
        added: false,
        code: "## ⭐ Sponsorship\n\nSupport this project by becoming a sponsor on [OpenCollective](https://opencollective.com/example).",
        defaultCode:
          "## ⭐ Sponsorship\n\nSupport this project by becoming a sponsor on [OpenCollective](https://opencollective.com/example).",
      },
      {
        id: "005-004",
        label: "Changelog",
        description: "History of releases and updates in the project",
        default: false,
        added: false,
        code: "## 📌 Changelog\n\n### 1.0.0\n- Initial Release",
        defaultCode: "## 📌 Changelog\n\n### 1.0.0\n- Initial Release",
      },
      {
        id: "005-005",
        label: "Version Comparison",
        added: false,
        default: false,
        description: "Feature comparison between versions",
        defaultCode:
          "## 📊 Version Matrix\n\n| Feature | v1.0 | v2.0 |\n|---------|------|------|\n| Auth    | ✅   | ✅   |\n| API     | ❌   | ✅   |",
        code: "## 📊 Version Matrix\n\n| Feature | v1.0 | v2.0 |\n|---------|------|------|\n| Auth    | ✅   | ✅   |\n| API     | ❌   | ✅   |",
      },
      {
        id: "005-006",
        label: "Troubleshooting",
        added: false,
        default: false,
        description: "Common issues and solutions",
        defaultCode: "## 🚑 Troubleshooting\n\n**Error: Connection timeout**\n- Check firewall settings\n- Verify database credentials",
        code: "## 🚑 Troubleshooting\n\n**Error: Connection timeout**\n- Check firewall settings\n- Verify database credentials"
      },
      {
        id: "005-007",
        label: "Related Projects",
        added: false,
        default: false,
        description: "Links to related repositories",
        defaultCode: "## 🔗 Related Projects\n\n- [${siblingProject}](https://github.com/example/sibling-project)",
        code: "## 🔗 Related Projects\n\n- [${siblingProject}](https://github.com/example/sibling-project)"
      }
    ],
  },
  {
    id: "006",
    label: "Community & Feedback",
    description: "Sections to engage with the community and gather feedback",
    sections: [
      {
        id: "006-001",
        label: "Feedback",
        description: "How users can provide feedback or report issues",
        default: false,
        added: false,
        code: "## 📢 Feedback\n\nWe'd love to hear your thoughts! Please [open an issue](https://github.com/yourusername/yourrepo/issues) or send us an email at feedback@example.com.",
        defaultCode:
          "## 📢 Feedback\n\nWe'd love to hear your thoughts! Please [open an issue](https://github.com/yourusername/yourrepo/issues) or send us an email at feedback@example.com.",
      },
      {
        id: "006-002",
        label: "Social Media",
        description: "Links to social media profiles related to the project",
        default: false,
        added: false,
        code: "## 🌐 Social Media\n\n- Twitter: [@yourhandle](https://twitter.com/yourhandle)\n- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)",
        defaultCode:
          "## 🌐 Social Media\n\n- Twitter: [@yourhandle](https://twitter.com/yourhandle)\n- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)",
      },
      {
        id: "006-003",
        label: "User Stories",
        description: "Stories or testimonials from users of the project",
        default: false,
        added: false,
        code: "## 🗣 User Stories\n\n- 'This tool saved me hours!' - @user1\n- 'Great for beginners!' - @user2",
        defaultCode:
          "## 🗣 User Stories\n\n- 'This tool saved me hours!' - @user1\n- 'Great for beginners!' - @user2",
      },
    ],
  },
  {
    id: "008",
    label: "Advanced Topics",
    description: "Advanced sections for developers who want to dive deeper",
    sections: [
      {
        id: "008-003",
        label: "Debugging",
        description: "Tips and tools for debugging the project",
        default: false,
        added: false,
        code: "## 🐛 Debugging\n\nUse the following command to enable debug mode:\n\n```bash\nDEBUG=true npm start\n```",
        defaultCode:
          "## 🐛 Debugging\n\nUse the following command to enable debug mode:\n\n```bash\nDEBUG=true npm start\n```",
      },
    ],
  },
  {
    id: "009",
    label: "Legal & Compliance",
    description:
      "Sections related to legal and compliance aspects of the project",
    sections: [
      {
        id: "009-001",
        label: "Terms of Use",
        description: "Terms and conditions for using the project",
        default: false,
        added: false,
        code: "## 📜 Terms of Use\n\nBy using this project, you agree to our [Terms of Service](https://example.com/terms).",
        defaultCode:
          "## 📜 Terms of Use\n\nBy using this project, you agree to our [Terms of Service](https://example.com/terms).",
      },
      {
        id: "009-002",
        label: "Privacy Policy",
        description: "Information about how user data is handled",
        default: false,
        added: false,
        code: "## 🔒 Privacy Policy\n\nRead our [Privacy Policy](https://example.com/privacy) to learn how we handle your data.",
        defaultCode:
          "## 🔒 Privacy Policy\n\nRead our [Privacy Policy](https://example.com/privacy) to learn how we handle your data.",
      },
      {
        id: "009-003",
        label: "Compliance",
        description: "Details about compliance with regulations (e.g., GDPR)",
        default: false,
        added: false,
        code: "## 📋 Compliance\n\nThis project complies with GDPR and other relevant regulations.",
        defaultCode:
          "## 📋 Compliance\n\nThis project complies with GDPR and other relevant regulations.",
      },
    ],
  },
  {
    id: "010",
    label: "Technical Documentation",
    description:
      "Sections related to legal and compliance aspects of the project",
    sections: [
      {
        id: "008-001",
        label: "API Reference",
        description: "Detailed documentation for the project's API",
        default: false,
        added: false,
        code: "## 📚 API Reference\n\n### `functionName(param1, param2)`\n- Description: Does something cool.\n- Returns: A value.",
        defaultCode:
          "## 📚 API Reference\n\n### `functionName(param1, param2)`\n- Description: Does something cool.\n- Returns: A value.",
      },
      {
        id: "008-002",
        label: "Customization",
        description: "How to customize or extend the project",
        default: false,
        added: false,
        code: '## 🎨 Customization\n\nYou can customize the theme by modifying the `config.json` file:\n\n```json\n{\n  "theme": "dark"\n}\n```',
        defaultCode:
          '## 🎨 Customization\n\nYou can customize the theme by modifying the `config.json` file:\n\n```json\n{\n  "theme": "dark"\n}\n```',
      },
    ],
  },
];

export { DefaultSectionGroups, type Section, type SectionGroup };
