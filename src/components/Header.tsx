import * as React from "react";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatPhoneNumber } from "react-phone-number-input";
import { Image } from "@yext/pages-components";
import { Link } from "@yext/pages-components";

export interface HeaderProps {
  data?: any;
}

const navigation = [
  { name: "About", href: "#about" },
  { name: "Hours", href: "#hours" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Header = ({ data }: HeaderProps) => {

  // let phone = data.mainPhone ? data.mainPhone : "+12345678910";
  // let email = data.emails?.[0] ?? "test@test.com";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Yext Knowledge Base</span>
            
            <img className="h-14 w-auto rounded-md lg:h-24" src="/yext-logo.png" alt="Yext Logo" height="100px" width="100px" />
          </a>
          <div className="hidden sm:block text-3xl font-semibold">
            Yext Knowledge Base
          </div>
        </div>
      </nav>
    </header>
  )  

};

export default Header;
