export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} TechFocus.Pro. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-primary hover:underline"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
} 