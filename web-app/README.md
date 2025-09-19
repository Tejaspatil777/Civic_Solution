# CivicFix Web Application

A modern React web application for civic issue reporting with responsive design and accessibility features.

## Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Authentication**: Role-based login system (User, Staff, Admin)
- **Issue Management**: Report, track, and manage civic issues
- **Real-time Dashboard**: Transparency dashboard with analytics
- **Multi-language**: English and Hindi support
- **Dark Mode**: Automatic theme switching
- **Accessibility**: WCAG compliant design

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to web app directory**
   ```bash
   cd web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Recharts** for data visualization

## Project Structure

```
web-app/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── auth-screen.tsx
│   │   ├── home-feed.tsx
│   │   └── ...
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
└── tailwind.config.ts    # Tailwind configuration
```

## Key Features

### Authentication System
- Multi-role login (Citizen, Staff, Admin)
- Guest access option
- Secure session management

### Issue Reporting
- Photo upload support
- Location detection
- Category-based classification
- Status tracking

### Dashboards
- **User Dashboard**: Personal issue tracking
- **Staff Dashboard**: Assigned issue management
- **Admin Dashboard**: System-wide analytics
- **Transparency Dashboard**: Public data visualization

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interface
- Keyboard navigation support

## Customization

### Theming
Customize colors in `src/index.css`:
```css
:root {
  --primary: #0EA5E9;
  --secondary: #10B981;
  /* ... more variables */
}
```

### Components
All UI components are in `src/components/ui/` and can be customized using Tailwind classes.

## Deployment

The web app can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `dist` folder to S3 bucket

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Code splitting with React.lazy()
- Image optimization
- CSS purging with Tailwind
- Bundle size optimization with Vite