import Link from "next/link";
import { Button } from "../ui/button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer id="footer" className="mt-32 bg-primary">
      <div className="container px-4 md:px-8 mx-auto w-full flex flex-col py-12">
        <div className="flex justify-center">
          <Button
            variant="link"
            className="text-primary-foreground text-4xl font-medium uppercase"
            asChild
          >
            <Link href="#home">Satyaprakash</Link>
          </Button>
        </div>
        <ul className="w-full max-w-3xl mx-auto flex flex-col items-center md:flex-row justify-between mt-8">
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#home">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#about">About</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#experience">Experience</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#expertise">Expertise</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#qualification">Qualification</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#portfolio">Portfolio</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#tool">Tool</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="text-primary-foreground" asChild>
              <Link href="#contact">Contact</Link>
            </Button>
          </li>
        </ul>
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="secondary" size="icon" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="size-5" />
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="size-5" />
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="size-5" />
            </Link>
          </Button>
        </div>
        <div className="flex justify-center my-16">
          <small className="text-muted">
            Created by
            <Button variant="link" className="text-muted text-xs px-1" asChild>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Satyaprakash Yadav
              </Link>
            </Button>
            &copy; {new Date().getFullYear()}.
          </small>
        </div>
      </div>
    </footer>
  );
};
