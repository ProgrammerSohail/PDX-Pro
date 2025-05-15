Files Path: Instuction/Change.log Project.md steps.md instuction.md


<StrictRules>
Always Read the instruction before you start.
Read project.md file,steps.md file,instuction.md file.
Always update the plan.md file after each step.
Also updated the steps.md file after each step.
Update the Change.log after each change.
</StrictRules>

<PlanMode>
Always Create a plan for the next step after completing the step.
</PlanMode>

<FolderStructure>
Always : Contains reusable UI elements like buttons, headers, and footers. Each component resides in its own file with its logic and can use as a child component.
src/
├── components/          # Reusable UI components
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.css
│   │   └── 
│   └── ...
├── containers/          # Components handling data fetching and state
│   ├── UserProfileContainer.jsx
│   └── ...
├── pages/               # Page-level components
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   └── ...
├── templates/           # Layout templates
│   ├── MainLayout.jsx
│   └── ...
├── assets/              # Static assets like images and fonts
│   ├── images/
│   └── fonts/
├── styles/              # Global styles and variables
│   ├── variables.css
│   └── global.css
├── utils/               # Utility functions
│   ├── api.js
│   └── helpers.js
├── App.jsx              # Root component
└── index.js             # Entry point

</FolderStructure>


