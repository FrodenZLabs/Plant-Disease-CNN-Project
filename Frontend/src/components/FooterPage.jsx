import { Footer } from "flowbite-react";
import LeafGuardLogo from "../assets/LeafGuard AI.png";

const FooterPage = () => {
  return (
    <Footer container className="bg-green-300">
      <div className="w-full text-center max-w-6xl mx-auto">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src={LeafGuardLogo}
            alt="LeafGuard AI Logo"
            name="LeafGuard AI"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="FrodenZ Labs" year={2025} />
      </div>
    </Footer>
  );
};

export default FooterPage;
