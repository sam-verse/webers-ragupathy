# Webers - Digital Business Card

A modern, interactive digital business card built with Next.js and Tailwind CSS. This project showcases Webers' services, achievements, and contact information in an elegant and professional manner.

## Features

- 🎨 Modern and responsive design
- ⚡ Built with Next.js 14 and React
- 🎭 Smooth animations using Framer Motion
- 📱 Mobile-first approach
- 🎯 Interactive elements and hover effects
- 🌈 Beautiful gradient backgrounds
- 🔄 Dynamic content updates
- 📊 Animated statistics
- 🖼️ Optimized image loading
- 🔍 SEO friendly

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide Icons
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/webers.git
cd webers
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add any necessary environment variables:
```env
NEXT_PUBLIC_SITE_URL=your_site_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
webers/
├── app/
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── circuit-background.tsx  # Animated background component
├── public/
│   └── images/           # Static images
└── styles/
    └── globals.css       # Global styles
```

## Customization

### Images
Place your images in the `public/images` directory:
- `hero.jpg` - Profile image
- `electrical.jpg` - Electrical services image
- `network.jpg` - Networking services image
- `automation.jpg` - Home automation image
- `client-*.png` - Client logos

### Content
Edit the content in `app/page.tsx` to update:
- Personal information
- Services
- Statistics
- Contact details
- Social media links

## Deployment

The easiest way to deploy this project is using Vercel:

1. Push your code to a Git repository
2. Import the project to Vercel
3. Vercel will automatically detect Next.js and deploy it

## Features to Add

- [ ] Contact form integration
- [ ] Blog section
- [ ] Portfolio gallery
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Ragupathy - [ragu@webers.co.in](mailto:ragu@webers.co.in)

Project Link: [https://github.com/yourusername/webers](https://github.com/yourusername/webers)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/) 