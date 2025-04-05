import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import LeafGuardLogo from "../assets/LeafGuard AI.png";

const FooterSection = () => {
  return (
    <Footer container className="bg-[#08ab6f]">
      <div className="w-full text-center max-w-6xl mx-auto">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src={LeafGuardLogo}
            alt="LeafGuard AI Logo"
            name="LeafGuard AI"
            className="text-5xl font-semibold"
          />
          <FooterLinkGroup>
            <FooterLink href="#" className="text-gray-300">
              About
            </FooterLink>
            <FooterLink href="#" className="text-gray-300">
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" className="text-gray-300">
              Licensing
            </FooterLink>
            <FooterLink href="#" className="text-gray-300">
              Contact
            </FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="FrodenZ Labs" year={2025} />
      </div>
    </Footer>
  );
};

export default FooterSection;
