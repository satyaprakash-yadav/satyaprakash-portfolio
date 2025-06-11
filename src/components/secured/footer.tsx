export const Footer = () => {
  return (
    <div className="supports-[backdrop-blur]:bg-background/60 z-20 w-full shadow bg-background/95 backdrop-blur">
      <div className="mx-8 flex h-14 items-center">
        <small className="text-muted-foreground">
          Created by{" "}
          <a
            href="#"
            className="hover:underline"
            aria-label="Satyaprakash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Satyaprakash
          </a>{" "}
          &copy; {new Date().getFullYear()}. All rights reserved.
        </small>
      </div>
    </div>
  );
};
